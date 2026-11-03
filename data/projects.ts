import caseStudies from "./case-studies.json";

export type FilterId = "react" | "vue" | "angular" | "php" | "webflow";

export type Project = {
  slug: string;
  title: string;
  kind: string;
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

// Order here is the order shown on the homepage.
export const projects: Project[] = [
  { slug: "smadmin", title: "Smith Group Admin", kind: "Admin platform", thumb: "portfolio-details-1-smadmin", cats: ["php"], tags: ["CodeIgniter", "PHP", "MySQL"] },
  { slug: "m2g", title: "Mattress2Go", kind: "E-commerce", thumb: "portfolio-12", cats: ["react"], tags: ["React", "JavaScript"] },
  { slug: "copa", title: "Copa Mattress & Furniture", kind: "E-commerce", thumb: "portfolio-13", cats: ["react"], tags: ["React", "JavaScript"] },
  { slug: "watchy", title: "Watchy Streaming App", kind: "Mobile & web app", thumb: "portfolio-details-1-watchy", cats: ["react"], tags: ["React", "TypeScript", "Supabase"] },
  { slug: "entity", title: "Entity Duel", kind: "Trading card game", thumb: "portfolio-details-1-entity", cats: ["react"], tags: ["React", "Vite", "Supabase"] },
  { slug: "rd", title: "Remarkable Destinations", kind: "Marketing site", thumb: "portfolio-11", cats: ["webflow"], tags: ["Webflow"] },
  { slug: "gs", title: "Get Sendy", kind: "Marketing site", thumb: "portfolio-10", cats: ["webflow"], tags: ["Webflow"] },
  { slug: "cb", title: "Carbnb", kind: "Web app", thumb: "portfolio-1", cats: ["vue"], tags: ["Vue", "Quasar", "JavaScript"] },
  { slug: "cbadmin", title: "Carbnb Admin", kind: "Admin dashboard", thumb: "portfolio-details-1-cbadmin", cats: ["php"], tags: ["CodeIgniter", "PHP", "MySQL"] },
  { slug: "loansys", title: "YL Loan System", kind: "Loan management", thumb: "portfolio-details-4-loansys", cats: ["php"], tags: ["CodeIgniter", "PHP", "MySQL"] },
  { slug: "peb", title: "Personal Expense Budgeting", kind: "Web app", thumb: "portfolio-details-1-peb", cats: ["angular"], tags: ["Angular", "Firebase"] },
];

export const thumbSrc = (p: Project) => `/img/thumbs/${p.thumb}.webp`;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return (caseStudies as Record<string, CaseStudy>)[slug];
}
