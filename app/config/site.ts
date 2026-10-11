export const SITE = {
  name: 'Lotus',
  title: 'Lotus - software that stays out of your way',
  tagline:
    'Lotus builds calm, fast software for Windows. Tools that do their job quietly, without the clutter or the tracking.',
  discordUrl: 'https://discord.gg/F8ZHvA9Z5C',
  githubUrl: 'https://github.com/LotusBrowser',
  licenseUrl: 'https://github.com/LotusBrowser/LotusWebsite/blob/main/LICENSE'
};

export const PRODUCTS = {
  lotus: {
    slug: 'lotus',
    name: 'Lotus Browser',
    blurb:
      'A fast, quiet browser for Windows. Tabs, bookmarks and downloads without the clutter, with searches on DuckDuckGo.',
    shortBlurb: 'A fast, quiet browser for Windows',
    href: '/products/lotus',
    downloadUrl: '/versions/Lotus.Installer.exe',
    sourceUrl: 'https://github.com/LotusBrowser/Lotus.Source',
    tags: ['Windows 10 & 11', 'Free']
  },
  sysinfo: {
    slug: 'sysinfo',
    name: 'SysInfo by Lotus',
    blurb:
      'Share your exact system specs with friends, easily. A lightweight tool that builds a clean report of your hardware and OS, with personal identifiers filtered out.',
    shortBlurb: 'Share your exact PC specs, easily',
    href: '/products/sysinfo',
    downloadUrl: 'https://github.com/LotusBrowser/SysInfo/releases/latest',
    sourceUrl: 'https://github.com/LotusBrowser/SysInfo',
    tags: ['Windows x64', 'Linux x64', 'Free', 'Source-available']
  }
};

export const PRODUCT_LIST = [PRODUCTS.lotus, PRODUCTS.sysinfo];
