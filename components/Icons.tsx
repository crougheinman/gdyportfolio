type P = { size?: number; className?: string; style?: React.CSSProperties };

const svg = (size: number, p: P, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={p.className} style={p.style}>
    {children}
  </svg>
);

export const Repo = (p: P) =>
  svg(p.size ?? 16, p, <path d="M4 19V5a2 2 0 012-2h13v14H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h13" />);
export const Mail = (p: P) =>
  svg(p.size ?? 16, p, <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>);
export const LinkIcon = (p: P) =>
  svg(p.size ?? 16, p, <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1" />);
export const Code = (p: P) => svg(p.size ?? 16, p, <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />);
export const Medal = (p: P) =>
  svg(p.size ?? 16, p, <><circle cx="12" cy="9" r="5" /><path d="M9 13.5L8 21l4-2 4 2-1-7.5" /></>);
export const Sparkle = (p: P) =>
  svg(p.size ?? 16, p, <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />);
export const Menu = (p: P) => svg(p.size ?? 18, p, <path d="M4 7h16M4 12h16M4 17h16" />);
export const Book = (p: P) =>
  svg(p.size ?? 16, p, <path d="M4 5a1 1 0 011-1h5a2 2 0 012 2v13a2 2 0 00-2-2H4zM20 5a1 1 0 00-1-1h-5a2 2 0 00-2 2v13a2 2 0 012-2h7z" />);
export const Lines = (p: P) => svg(p.size ?? 14, p, <path d="M4 6h16M4 12h16M4 18h10" />);
export const Check = (p: P) => svg(p.size ?? 16, p, <path d="M5 12l5 5 9-10" />);
export const Search = (p: P) => svg(p.size ?? 14, p, <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>);
