// @ts-nocheck
// This library prefers file-backed storage but falls back to an in-memory store
// if filesystem access is not available (for example when running in Edge).
let HAS_FS = true
let fs: any
let path: any
try {
  // require at runtime to avoid bundling issues in Edge runtimes
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fs = require('fs').promises
  path = require('path')
} catch (e) {
  HAS_FS = false
}

export type Reply = {
  id: string
  author: string
  content: string
  createdAt: string
}

export type Thread = {
  id: string
  title: string
  author: string
  content: string
  createdAt: string
  replies: Reply[]
}

const DATA_DIR = HAS_FS ? path.join(process.cwd(), 'data') : null
const DATA_FILE = HAS_FS ? path.join(DATA_DIR, 'fourms.json') : null

// in-memory fallback
let MEMORY_STORE: Thread[] = []
let MEMORY_INITIALIZED = false

async function ensureDataFile() {
  if (!HAS_FS) {
    if (!MEMORY_INITIALIZED) {
      MEMORY_STORE = []
      MEMORY_INITIALIZED = true
    }
    return
  }
  try {
    await fs.access(DATA_FILE)
  } catch (e) {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

export async function readData(): Promise<Thread[]> {
  await ensureDataFile()
  if (!HAS_FS) {
    return MEMORY_STORE
  }
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch (e) {
    console.error('readData JSON error:', e)
    return []
  }
}

export async function writeData(data: Thread[]) {
  await ensureDataFile()
  if (!HAS_FS) {
    MEMORY_STORE = data
    return
  }
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {
    console.error('writeData error, switching to MEMORY_STORE:', e)
    // fallback to memory store to avoid throwing
    MEMORY_STORE = data
    MEMORY_INITIALIZED = true
  }
}

export async function getThreads(): Promise<Thread[]> {
  const data = await readData()
  // newest first
  try {
    return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch (e) {
    return data
  }
}

export async function getThreadById(id: string): Promise<Thread | undefined> {
  const data = await readData()
  return data.find((t) => t.id === id)
}

export async function addThread({ title, author, content }: { title: string; author: string; content: string; }): Promise<Thread> {
  const data = await readData()
  const thread: Thread = {
    id: (Date.now() + Math.floor(Math.random() * 10000)).toString(),
    title,
    author,
    content,
    createdAt: new Date().toISOString(),
    replies: [],
  }
  data.push(thread)
  await writeData(data)
  return thread
}

export async function addReply(threadId: string, { author, content }: { author: string; content: string; }) {
  const data = await readData()
  const thread = data.find((t) => t.id === threadId)
  if (!thread) throw new Error('thread not found')
  const reply: Reply = {
    id: (Date.now() + Math.floor(Math.random() * 10000)).toString(),
    author,
    content,
    createdAt: new Date().toISOString(),
  }
  thread.replies.push(reply)
  await writeData(data)
  return reply
}

export async function createThreadWithId(id: string, { title, author, content }: { title?: string; author?: string; content?: string }): Promise<Thread> {
  const data = await readData()
  const thread: Thread = {
    id: id,
    title: title || `Thread ${id}`,
    author: author || 'System',
    content: content || 'This thread was automatically created.',
    createdAt: new Date().toISOString(),
    replies: [],
  }
  data.push(thread)
  await writeData(data)
  return thread
}
