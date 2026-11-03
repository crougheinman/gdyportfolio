import { certifications, services, skillGroups } from "@/data/profile";

export function Services() {
  return (
    <section id="services" className="band">
      <div className="wrap section">
        <div className="section-head">
          <div className="eyebrow">02 / Services</div>
          <h2 className="h2">What I can do for you</h2>
        </div>
        <div className="services">
          {services.map((s, i) => (
            <div key={s.title} className="service">
              <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="wrap section">
      <div className="section-head">
        <div className="eyebrow">03 / Stack</div>
        <h2 className="h2">Tools I work with</h2>
      </div>
      <div className="grid">
        {skillGroups.map((g) => (
          <div key={g.category} className="panel">
            <div className="panel-label">{g.category}</div>
            <div className="skills-wrap">
              {g.items.map((s) => (
                <span key={s} className="skill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certs" className="wrap" style={{ paddingBottom: 96 }}>
      <div className="section-head" style={{ marginBottom: 36 }}>
        <div className="eyebrow">04 / Certifications</div>
        <h2 className="h2">Verified credentials</h2>
      </div>
      <div className="grid">
        {certifications.map((c) => (
          <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" className="card cert">
            <div className="cert-issuer">ORACLE · VERIFY BADGE ↗</div>
            <div className="cert-title">{c.title}</div>
            <div className="cert-meta">
              Issued {c.issued}
              {c.valid ? ` · Valid to ${c.valid}` : ""}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
