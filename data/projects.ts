import caseStudies from "./case-studies.json";

export type FilterId = "react" | "vue" | "angular" | "php" | "webflow";

export type Project = {
  slug: string;
  /** Display title (used on the case-study page). */
  title: string;
  /** GitHub-style repository name shown on cards and the case-study header. */
  repo: string;
  kind: string;
  /** One-line description shown on cards. */
  blurb: string;
  /** Primary language/technology (the coloured dot on the card). */
  lang: string;
  langColor: string;
  thumb: string;
  cats: FilterId[];
  tags: string[];
};

export type CaseStudyNode =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] };

export type CaseStudy = {
  seoTitle: string;
  description: string;
  images: { src: string; alt: string }[];
  info: { label: string; value: string; href: string | null }[];
  blocks: { heading: string; nodes: CaseStudyNode[] }[];
};

export const filters: { id: "all" | FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "php", label: "PHP / CodeIgniter" },
  { id: "webflow", label: "Webflow" },
];

const PHP = "#4F5D95";
const TS = "#3178c6";
const JS = "#f1e05a";
const VUE = "#41b883";
const NG = "#dd0031";
const WF = "#4353ff";

// Order here is the order shown on the homepage.
export const projects: Project[] = [
  { slug: "smadmin", title: "Smith Group Admin", repo: "smith-group-admin", kind: "Admin platform", blurb: "Multi-tenant admin back office and REST API: orders from scanned invoices, delivery routing, SMS and WhatsApp messaging, role-based access.", lang: "PHP", langColor: PHP, thumb: "portfolio-details-1-smadmin", cats: ["php"], tags: ["CodeIgniter", "PHP", "MySQL"] },
  { slug: "watchy", title: "Watchy Streaming App", repo: "watchy", kind: "Mobile & web app", blurb: "Cross-platform streaming app built with React, TypeScript, Vite, Capacitor and Supabase.", lang: "TypeScript", langColor: TS, thumb: "portfolio-details-1-watchy", cats: ["react"], tags: ["React", "TypeScript", "Supabase"] },
  { slug: "entity", title: "Entity Duel", repo: "entity-duel", kind: "Trading card game", blurb: "Browser-based Magic-style trading card game. Play vs AI, local hotseat, or real-time online PvP.", lang: "JavaScript", langColor: JS, thumb: "portfolio-details-1-entity", cats: ["react"], tags: ["React", "Vite", "Supabase"] },
  { slug: "cb", title: "Carbnb", repo: "carbnb", kind: "Web app", blurb: "Car-rental web app built with Vue.js and the Quasar framework: a responsive SPA with booking flows.", lang: "Vue", langColor: VUE, thumb: "portfolio-1", cats: ["vue"], tags: ["Vue", "Quasar", "JavaScript"] },
  { slug: "peb", title: "Personal Expense Budgeting", repo: "personal-expense-budgeting", kind: "Web app", blurb: "Track spending with real-time sync, built with Angular and Firebase.", lang: "Angular", langColor: NG, thumb: "portfolio-details-1-peb", cats: ["angular"], tags: ["Angular", "Firebase"] },
  { slug: "m2g", title: "Mattress2Go", repo: "mattress2go", kind: "E-commerce", blurb: "Responsive React e-commerce website for an online mattress retailer, built with ReactJS and Vite.", lang: "JavaScript", langColor: JS, thumb: "portfolio-12", cats: ["react"], tags: ["React", "JavaScript"] },
  { slug: "copa", title: "Copa Mattress & Furniture", repo: "copa-mattress-furniture", kind: "E-commerce", blurb: "React e-commerce website with a custom storefront for Copa Mattress and Furniture.", lang: "JavaScript", langColor: JS, thumb: "portfolio-13", cats: ["react"], tags: ["React", "JavaScript"] },
  { slug: "cbadmin", title: "Carbnb Admin", repo: "carbnb-admin", kind: "Admin dashboard", blurb: "Admin dashboard to manage bookings, vehicles and users, built with CodeIgniter, PHP and MySQL.", lang: "PHP", langColor: PHP, thumb: "portfolio-details-1-cbadmin", cats: ["php"], tags: ["CodeIgniter", "PHP", "MySQL"] },
  { slug: "loansys", title: "YL Loan System", repo: "yl-loan-system", kind: "Loan management", blurb: "Loan management web application built with CodeIgniter, PHP and MySQL.", lang: "PHP", langColor: PHP, thumb: "portfolio-details-4-loansys", cats: ["php"], tags: ["CodeIgniter", "PHP", "MySQL"] },
  { slug: "rd", title: "Remarkable Destinations", repo: "remarkable-destinations", kind: "Marketing site", blurb: "Travel website designed and built in Webflow: responsive, content-driven and conversion focused.", lang: "Webflow", langColor: WF, thumb: "portfolio-11", cats: ["webflow"], tags: ["Webflow"] },
  { slug: "gs", title: "Get Sendy", repo: "get-sendy", kind: "Marketing site", blurb: "Marketing website built in Webflow: clean, responsive design with smooth interactions.", lang: "Webflow", langColor: WF, thumb: "portfolio-10", cats: ["webflow"], tags: ["Webflow"] },
];

export const thumbSrc = (p: Project) => `/img/thumbs/${p.thumb}.webp`;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return (caseStudies as Record<string, CaseStudy>)[slug];
}

/** "Personal" when the case study says Client = Personal Project, otherwise "Client". */
export function ownerLabel(slug: string): "Personal" | "Client" {
  const client = getCaseStudy(slug)?.info.find((i) => i.label === "Client")?.value ?? "";
  return /personal/i.test(client) ? "Personal" : "Client";
}

/** Year (or range) from the case study's "Project date" row, if it has one. */
export function projectYear(slug: string): string | undefined {
  const raw = getCaseStudy(slug)?.info.find((i) => i.label === "Project date")?.value;
  const years = raw?.match(/\d{4}/g);
  if (!years) return undefined;
  return years.length > 1 && years[0] !== years[years.length - 1] ? `${years[0]}–${years[years.length - 1]}` : years[0];
}
