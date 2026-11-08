// Old URLs were indexed by Google. 301 them to the current routes so rankings carry over.
// Legacy static pages -> new case-study slugs.
const legacy = {
  "smadmin-portfolio-details.html": "smadmin",
  "m2g-portfolio.html": "mattress2go-copa",
  "copa-portfolio.html": "mattress2go-copa",
  "rd-webflow-portfolio.html": "rd",
  "gs-webflow-portfolio.html": "gs",
  "cb-portfolio-details.html": "cb",
  "cb-admin-portfolio-details.html": "cb",
  "cb-loansys-portfolio-details.html": "loansys",
  "peb-portfolio-details.html": "peb",
  "entity-portfolio-details.html": "entity",
};

// Slugs from the first Next.js version that were merged or removed.
const renamed = {
  m2g: "/work/mattress2go-copa",
  copa: "/work/mattress2go-copa",
  cbadmin: "/work/cb", // CarBnb Admin is now part of the CarBnb project
  "earlier-work": "/work/cb", // the short-lived combined page; YL Loan System is /work/loansys again
  // Watchy was removed from the portfolio.
  watchy: "/#projects",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/watchy-portfolio-details.html", destination: "/#projects", permanent: true },
      ...Object.entries(legacy).map(([file, slug]) => ({
        source: `/${file}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
      ...Object.entries(renamed).map(([slug, destination]) => ({
        source: `/work/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
