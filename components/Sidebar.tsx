import Image from "next/image";
import { certifications, topics } from "@/data/profile";
import { site } from "@/data/site";
import { Code, LinkIcon, Mail, Medal } from "./Icons";

export default function Sidebar() {
  return (
    <aside className="side" id="skills" aria-label="Profile">
      <div className="idrow">
        <div className="av">
          <Image src="/img/profile.jpg" alt={`Portrait of ${site.name}`} fill priority sizes="(max-width: 720px) 88px, 296px" />
        </div>
        <div>
          <h1 className="nm">{site.name}</h1>
          <div className="un">{site.username}</div>
        </div>
      </div>

      <p className="bio">{site.bio}</p>
      <a className="btn btn-pri" href="#contact">
        Get in touch
      </a>

      <div className="links">
        <div>
          <Mail />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <LinkIcon />
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            {site.linkedinLabel}
          </a>
        </div>
        <div>
          <Code />
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            {site.githubLabel}
          </a>
        </div>
      </div>

      <h3>Works with</h3>
      <div className="topics">
        {topics.map((t) => (
          <span key={t} className="topic">
            {t}
          </span>
        ))}
      </div>

      <h3 id="certifications">Certifications</h3>
      <div className="certs">
        {certifications.map((c) => (
          <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" title={`Verify badge · issued ${c.issued}`}>
            <Medal />
            <span>{c.title}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
