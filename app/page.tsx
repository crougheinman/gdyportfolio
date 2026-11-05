import Contact from "@/components/Contact";
import Flagship from "@/components/Flagship";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowIUseAI from "@/components/HowIUseAI";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Sidebar from "@/components/Sidebar";
import Skills from "@/components/Skills";
import Tabs from "@/components/Tabs";
import Testimonials from "@/components/Testimonials";
import { findFlagshipMotion } from "@/lib/flagshipMotion";
import { skillGroups } from "@/data/profile";
import { site } from "@/data/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Senior Full-Stack Engineer",
    sameAs: [site.linkedin, site.github],
    knowsAbout: skillGroups.flatMap((g) => g.items.map((i) => i.replace(/ · .*$/, ""))),
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url },
];

const tabs = [
  { id: "overview", label: "Overview", icon: "book" as const },
  { id: "projects", label: "Work", icon: "repo" as const },
  { id: "services", label: "Services" },
  { id: "ai", label: "How I use AI" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// Section order: Hero → Flagship case study → Selected work → Services → How I use AI
// → Testimonials → Skills & certifications → Contact.
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <div className="wrap">
        <Sidebar />
        <main>
          <Tabs tabs={tabs} />
          <Hero />
          <Flagship motion={findFlagshipMotion()} />
          <Projects />
          <Services />
          <HowIUseAI />
          <Testimonials />
          <Skills />
          {/* Public site key; read on the server so the variable does not need a NEXT_PUBLIC_ prefix. */}
          <Contact recaptchaSiteKey={process.env.PUBLIC_RECAPTCHA_SITE_KEY ?? ""} />
        </main>
      </div>
      <Footer />
    </>
  );
}
