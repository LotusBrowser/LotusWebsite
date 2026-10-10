// Shared (client + server) ticket types and limits. No server-only imports here.

export const CATEGORIES = ["Support", "Bug report", "Feature request", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

export const LIMITS = {
  subject: 100,
  message: 2000,
  maxOpenPerUser: 3,
} as const;

export type TicketStatus = "open" | "closed";

export type TicketMessage = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  staff: boolean;
  content: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  subject: string;
  category: Category;
  status: TicketStatus;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
};

export type TicketSummary = Omit<Ticket, "messages"> & { messageCount: number };

export type TicketUser = {
  id: string;
  name: string;
  avatar?: string;
  isStaff: boolean;
};
