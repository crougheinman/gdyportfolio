// Old static URLs were indexed by Google. 301 them to the new routes so rankings carry over.
const legacy = {
  "smadmin-portfolio-details.html": "smadmin",
  "m2g-portfolio.html": "m2g",
  "copa-portfolio.html": "copa",
  "rd-webflow-portfolio.html": "rd",
  "gs-webflow-portfolio.html": "gs",
  "cb-portfolio-details.html": "cb",
  "cb-admin-portfolio-details.html": "cbadmin",
  "cb-loansys-portfolio-details.html": "loansys",
  "peb-portfolio-details.html": "peb",
  "watchy-portfolio-details.html": "watchy",
  "entity-portfolio-details.html": "entity",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...Object.entries(legacy).map(([file, slug]) => ({
        source: `/${file}`,
        destination: `/work/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
