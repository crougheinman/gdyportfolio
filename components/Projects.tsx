"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { filters, projects, thumbSrc } from "@/data/projects";
import { Repo } from "./Icons";
import ScrubbedStack from "./ScrubbedStack";

export default function Projects() {
  const [active, setActive] = useState<string>("all");
  const visible = projects.filter((p) => active === "all" || (p.cats as string[]).includes(active));

  return (
    <section id="projects" className="section" aria-label="Selected work">
      <div className="section-head">
        <h2>Selected work</h2>
        <div className="filters" role="group" aria-label="Filter projects by technology">
          {filters.map((f) => (
            <button key={f.id} type="button" className={`fbtn${active === f.id ? " on" : ""}`} aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {visible.map((p) => {
          const stack = p.tags.filter((t) => t !== p.lang).join(" · ");
          return (
            <div key={p.slug} className={`card${p.featured ? " feat" : ""}`}>
              {p.featured && (
                <div className="feat-shot">
                  <Image src={p.flagshipMedia?.still ?? thumbSrc(p)} alt={p.flagshipMedia?.stillAlt ?? `${p.title} screenshot`} fill sizes="(max-width: 720px) 100vw, 280px" />
                </div>
              )}
              <div className="card-main">
                <div className="card-t">
                  <Repo />
                  <Link href={`/work/${p.slug}`}>{p.title}</Link>
                  <span className="pill">{p.owner}</span>
                </div>
                <p>{p.blurb}</p>
                {p.scrubbed ? (
                  <ScrubbedStack compact count={4} />
                ) : (
                  <div className="card-m">
                    <span>
                      <i className="dot" style={{ background: p.langColor }} />
                      {p.lang}
                    </span>
                    {stack && <span>{stack}</span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
