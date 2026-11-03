import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import { Certifications, Services, Skills } from "@/components/Sections";
import Work from "@/components/Work";
import { skillGroups } from "@/data/profile";
import { site } from "@/data/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Full-Stack Web Developer",
    sameAs: [site.linkedin, site.github],
    knowsAbout: skillGroups.flatMap((g) => g.items),
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
