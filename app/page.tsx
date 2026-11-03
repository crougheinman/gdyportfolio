import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import Readme from "@/components/Readme";
import Services from "@/components/Services";
import Sidebar from "@/components/Sidebar";
import Tabs from "@/components/Tabs";
import { services, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
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

const tabs = [
  { id: "overview", label: "Overview", icon: "book" as const },
  { id: "projects", label: "Projects", count: projects.length, icon: "repo" as const },
  { id: "services", label: "Services", count: services.length },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <div className="wrap">
        <Sidebar />
        <main>
          <Tabs tabs={tabs} />
          <Readme />
          <Projects />
          <Services />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
