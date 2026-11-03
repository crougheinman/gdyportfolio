import gallery from "./gallery.json";

export type FilterId = "react" | "vue" | "angular" | "php" | "webflow";

export type ProjectLink = { label: string; href: string; primary?: boolean };
export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  /** Display title shown on cards and as the case-study heading. */
  title: string;
  /** GitHub-style repo name used in the case-study header strip. */
  repo: string;
  kind: string;
  /** Short description shown on cards and as the case-study lead. */
  blurb: string;
  owner: "Client" | "Personal";
  /** Primary language/technology (the coloured dot on the card). */
  lang: string;
  langColor: string;
  thumb: string;
  cats: FilterId[];
  /** Short tags shown on cards. */
  tags: string[];
  featured?: boolean;
  // ---- case-study content ----
  role: string;
  problem: string;
  built: string[];
  stack: string[];
  links: ProjectLink[];
  /** Shown under Links when there is no public demo. */
  note?: string;
  seoDescription: string;
  /** Keys into gallery.json whose screenshots make up this project's gallery. */
  gallery: string[];
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
  {
    slug: "smadmin",
    title: "Smith Group CRM",
    repo: "smith-group-crm",
    kind: "Multi-tenant CRM",
    blurb:
      "Lead engineer on a multi-tenant CRM that runs several furniture and mattress stores. Scanned invoices become orders, deliveries are routed automatically, and customers get Twilio SMS updates, all through one API that powers every storefront.",
    owner: "Client",
    lang: "PHP",
    langColor: PHP,
    thumb: "portfolio-details-1-smadmin",
    cats: ["php"],
    tags: ["CodeIgniter 4", "MySQL", "Docker", "Twilio"],
    featured: true,
    role: "Lead engineer",
    problem:
      "A group of mattress and furniture retailers needed one system to run several stores: turning scanned paper invoices into orders, scheduling deliveries and keeping customers informed, with each store's data kept separate.",
    built: [
      "One multi-tenant CodeIgniter 4 application that serves every store, with each store's orders, staff, delivery zones and website kept isolated.",
      "A REST API that powers every storefront, using token auth for apps and per-store keys for public sites.",
      "Orders from scans: scan an invoice, review the AI-extracted draft, then confirm the sale.",
      "Payments, an order status tracker, and delivery scheduling by zone with an approval step.",
      "Customer messaging through Twilio: automatic order texts plus a chat view for replies.",
      "Role-based screens for admin, manager, sales, delivery and warehouse staff, with an activity log of important changes.",
      "Queued email, print and fax through PrintNode, and Telegram alerts for new activity.",
      "Containerized with Docker and deployed on hardened, Cloudflare-fronted servers.",
    ],
    stack: ["CodeIgniter 4", "PHP", "MySQL", "JavaScript", "Docker", "Twilio", "Cloudflare"],
    links: [],
    note: "Private internal tool, so there is no public demo. Screenshots use demo data, with customer details blurred.",
    seoDescription:
      "Case study: Smith Group CRM, a multi-tenant CRM built with CodeIgniter 4, PHP and MySQL that turns scanned invoices into orders, routes deliveries and texts customers through Twilio.",
    gallery: ["smadmin"],
  },
  {
    slug: "mattress2go-copa",
    title: "Mattress2Go / Copa",
    repo: "mattress2go-copa",
    kind: "E-commerce storefronts",
    blurb:
      "React + Vite storefront for an online mattress retailer, with per-size pricing and live inventory and orders pulled from the Smith Group API. Built to load fast on any device.",
    owner: "Client",
    lang: "JavaScript",
    langColor: JS,
    thumb: "portfolio-12",
    cats: ["react"],
    tags: ["React", "Vite", "JavaScript"],
    role: "Front-end engineer, integrating with the Smith Group API",
    problem:
      "Online mattress and furniture retailers needed fast, easy-to-browse storefronts that show accurate pricing, inventory and orders.",
    built: [
      "Responsive React + Vite storefronts for Mattress2Go and Copa Mattress and Furniture.",
      "Per-size product pricing, so shoppers see the price for the size they choose.",
      "Live inventory and orders pulled from the Smith Group API.",
      "Clean navigation and e-commerce-ready components, built to load fast on any device.",
    ],
    stack: ["React", "Vite", "JavaScript", "HTML", "CSS"],
    links: [
      { label: "Live demo: Mattress2Go", href: "https://mattress2gooutlet.com/", primary: true },
      { label: "Live demo: Copa", href: "https://copamattressandfurniture.com/", primary: true },
    ],
    seoDescription:
      "Case study: React + Vite e-commerce storefronts for Mattress2Go and Copa Mattress and Furniture, with per-size pricing and live inventory from the Smith Group API.",
    gallery: ["m2g", "copa"],
  },
  {
    slug: "peb",
    title: "Personal Expense Budgeting",
    repo: "personal-expense-budgeting",
    kind: "Web app (PWA)",
    blurb:
      "Angular + Firebase PWA with AI receipt scanning, voice entry and conversational spending insights, with failover across multiple AI providers. Built with NgRx and a clean facade architecture.",
    owner: "Personal",
    lang: "Angular",
    langColor: NG,
    thumb: "portfolio-details-1-peb",
    cats: ["angular"],
    tags: ["Angular", "NgRx", "Firebase"],
    role: "Designer and developer (personal project)",
    problem:
      "Keeping an accurate record of everyday spending takes effort. This app makes it quick to capture expenses and understand spending habits, on any device.",
    built: [
      "An Angular + Firebase PWA with Google sign-in, real-time sync and a responsive, mobile-first interface.",
      "AI receipt scanning that extracts line items from photos or PDFs, and voice entry for adding expenses by speech.",
      "Failover across multiple AI providers, so scanning and insights keep working if one provider is down.",
      "Pebby, a conversational AI that analyses spending and answers questions about it.",
      "A statistics dashboard with daily, weekly and monthly trends, category icons, search and filtering.",
      "NgRx state management behind a facade layer that keeps components clean.",
    ],
    stack: ["Angular", "TypeScript", "NgRx", "RxJS", "Angular Material", "SCSS", "Firebase", "PWA"],
    links: [
      { label: "Live demo", href: "https://personal-expense-budgetting.vercel.app/", primary: true },
      { label: "Source on GitHub", href: "https://github.com/crougheinman/personal-expense-budgetting" },
    ],
    seoDescription:
      "Case study: Personal Expense Budgeting, an Angular + Firebase PWA with AI receipt scanning, voice entry and conversational spending insights, built with NgRx.",
    gallery: ["peb"],
  },
  {
    slug: "cb",
    title: "CarBnb",
    repo: "carbnb",
    kind: "Car-rental marketplace",
    blurb:
      "Built the CodeIgniter 4 REST API and admin panel behind a live car-rental marketplace, covering bookings, vehicles and user management, plus a responsive Vue/Quasar booking app.",
    owner: "Client",
    lang: "Vue",
    langColor: VUE,
    thumb: "portfolio-1",
    cats: ["vue", "php"],
    tags: ["Vue", "Quasar", "CodeIgniter 4", "MySQL"],
    role: "Back-end developer, who also built the Vue/Quasar booking app",
    problem:
      "A car-rental marketplace needed a reliable backend so people can rent a car, and car owners can earn by listing theirs, with staff able to manage bookings, vehicles and users.",
    built: [
      "REST API endpoints in CodeIgniter 4 that carry the marketplace's business functions.",
      "An admin panel for bookings, vehicles and user management.",
      "A responsive Vue/Quasar single-page booking app with booking flows.",
    ],
    stack: ["CodeIgniter 4", "PHP", "MySQL", "Vue", "Quasar", "JavaScript", "HTML", "CSS"],
    links: [{ label: "Live demo", href: "https://carbnbrentals.com/", primary: true }],
    seoDescription:
      "Case study: CarBnb, a live car-rental marketplace with a CodeIgniter 4 REST API, admin panel and a responsive Vue/Quasar booking app.",
    gallery: ["cb"],
  },
  {
    slug: "rd",
    title: "Remarkable Destinations",
    repo: "remarkable-destinations",
    kind: "Travel blog",
    blurb:
      "Designed and built a travel blog in Webflow that showcases destinations around the world. It has a CMS-driven article layout, rich photo galleries and SEO-friendly pages, so the client can publish new stories on their own and readers can find their next trip.",
    owner: "Client",
    lang: "Webflow",
    langColor: WF,
    thumb: "portfolio-11",
    cats: ["webflow"],
    tags: ["Webflow", "CMS", "SEO"],
    role: "Designer and Webflow developer",
    problem:
      "A travel journal needed a place to publish destination stories that the client could manage alone and readers could easily find.",
    built: [
      "A CMS-driven article layout, so new stories are published without developer help.",
      "Rich photo galleries that let destinations tell their story.",
      "SEO-friendly pages that help readers discover each article.",
      "A responsive design with curated destination showcases and a blog feed.",
    ],
    stack: ["Webflow", "CMS", "HTML", "CSS", "JavaScript"],
    links: [{ label: "Live demo", href: "https://www.remarkabledestination.com/", primary: true }],
    seoDescription:
      "Case study: Remarkable Destinations, a travel blog designed and built in Webflow with a CMS-driven article layout, rich photo galleries and SEO-friendly pages.",
    gallery: ["rd"],
  },
  {
    slug: "gs",
    title: "Get Sendy",
    repo: "get-sendy",
    kind: "Marketing site",
    blurb:
      "Webflow marketing site for Get Sendy, backed by security hardening I did on the servers (security headers, SPF/DMARC, SSL auto-renewal) and fronted by Cloudflare for speed and protection.",
    owner: "Client",
    lang: "Webflow",
    langColor: WF,
    thumb: "portfolio-10",
    cats: ["webflow"],
    tags: ["Webflow", "Cloudflare", "Security"],
    role: "Webflow developer and security hardening",
    problem:
      "A marketing site needed to stay fast, online and trusted by email providers, without changing its design.",
    built: [
      "Security headers added to the site's servers.",
      "SPF and DMARC email authentication, to protect the domain's reputation and keep it off blocklists.",
      "SSL auto-renewal, so certificates never lapse.",
      "Cloudflare in front of the site for speed and protection.",
      "Performance improvements that keep the original design intact.",
    ],
    stack: ["Webflow", "Cloudflare", "HTML", "CSS", "JavaScript"],
    links: [{ label: "Live demo", href: "https://www.getsendymedia.com/", primary: true }],
    seoDescription:
      "Case study: Get Sendy, a Webflow marketing site with server security hardening (security headers, SPF/DMARC, SSL auto-renewal) and Cloudflare for speed and protection.",
    gallery: ["gs"],
  },
  {
    slug: "entity",
    title: "Entity Duel",
    repo: "entity-duel",
    kind: "Multiplayer game",
    blurb: "Real-time multiplayer game built on Supabase, with a rule-based AI opponent for solo play.",
    owner: "Personal",
    lang: "JavaScript",
    langColor: JS,
    thumb: "portfolio-details-1-entity",
    cats: ["react"],
    tags: ["React", "Supabase", "Zustand"],
    role: "Designer and developer (personal project)",
    problem:
      "A card game with real rules (mana, combat, keywords) needs an engine where every interaction resolves the same way, whether you play solo, on one device or online in real time.",
    built: [
      "A deterministic rules engine for mana, card types, combat and keyword resolution.",
      "A rule-based AI opponent that evaluates the board each turn, for solo play.",
      "Real-time online matches synchronised through Supabase.",
      "A local hotseat mode for two players on one device.",
      "Pre-built decks with distinct archetypes, an in-app rulebook and an activity log.",
      "Central game state in Zustand and a responsive, hand-crafted CSS interface.",
    ],
    stack: ["React", "Vite", "Zustand", "Supabase", "JavaScript", "CSS"],
    links: [{ label: "Live demo", href: "https://entity-duel.vercel.app", primary: true }],
    seoDescription:
      "Case study: Entity Duel, a real-time multiplayer card game built with React and Supabase, with a rule-based AI opponent for solo play.",
    gallery: ["entity"],
  },
  {
    slug: "earlier-work",
    title: "Earlier work (2019–2022)",
    repo: "earlier-work",
    kind: "Internal admin tools",
    blurb:
      "Backend developer on YL Loan System and CarBnb Admin. I built the core business logic, loan and booking workflows, and admin dashboards in PHP/CodeIgniter and MySQL.",
    owner: "Client",
    lang: "PHP",
    langColor: PHP,
    thumb: "portfolio-details-4-loansys",
    cats: ["php"],
    tags: ["CodeIgniter", "PHP", "MySQL"],
    role: "Backend developer",
    problem:
      "Staff and management at a loan business and a car-rental marketplace needed internal admin tools to run daily operations.",
    built: [
      "YL Loan System: core business logic and loan workflows, plus an administrative view for staff and management.",
      "CarBnb Admin: booking workflows and an admin dashboard for CarBnb staff and management.",
      "Both built in PHP/CodeIgniter and MySQL with Bootstrap front ends.",
    ],
    stack: ["CodeIgniter", "PHP", "MySQL", "Bootstrap", "jQuery", "Vue", "JavaScript", "HTML", "CSS"],
    links: [{ label: "CarBnb Admin", href: "https://carbnbadmin.com/" }],
    note: "YL Loan System is an internal tool with no public demo.",
    seoDescription:
      "Case study: earlier backend work on YL Loan System and CarBnb Admin, with core business logic, loan and booking workflows and admin dashboards in PHP/CodeIgniter and MySQL.",
    gallery: ["cbadmin", "loansys"],
  },
];

export const flagship = projects[0];

export const thumbSrc = (p: Project) => `/img/thumbs/${p.thumb}.webp`;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getGallery(p: Project): Shot[] {
  const g = gallery as Record<string, Shot[]>;
  return p.gallery.flatMap((k) => g[k] ?? []);
}
