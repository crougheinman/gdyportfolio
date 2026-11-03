const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = ({ size = 18 }: { size?: number }) => (
  <svg {...base} width={size} height={size}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size = 16 }: { size?: number }) => (
  <svg {...base} width={size} height={size}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const ArrowUpRight = ({ size = 16 }: { size?: number }) => (
  <svg {...base} width={size} height={size}><path d="M7 17L17 7M8 7h9v9" /></svg>
);
