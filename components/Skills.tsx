import { certifications, skillGroups } from "@/data/profile";
import { Medal } from "./Icons";

export default function Skills() {
  return (
    <section id="skills" className="section" aria-label="Skills and certifications">
      <div className="section-head">
        <h2>Skills &amp; certifications</h2>
      </div>
      <div className="grid skill-grid">
        {skillGroups.map((g) => (
          <div key={g.category} className="card">
            <div className="panel-label">{g.category}</div>
            <div className="topics">
              {g.items.map((s) => (
                <span key={s} className="topic">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="sub-h">Certifications</h3>
      <div className="list">
        {certifications.map((c) => (
          <div key={c.href}>
            <Medal />
            <div>
              <h3>
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.title}
                </a>
              </h3>
              <p>Verify the badge on Oracle&apos;s certification site.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
