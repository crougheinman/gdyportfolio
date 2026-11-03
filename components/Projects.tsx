"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { filters, projects, thumbSrc } from "@/data/projects";
import { SEARCH_EVENT } from "./Header";
import { Repo } from "./Icons";

export default function Projects() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Header search: live while typing on this page, and via ?q= when submitted from any page.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) {
      setQuery(q);
      document.getElementById("projects")?.scrollIntoView();
    }
    const onSearch = (e: Event) => setQuery((e as CustomEvent<string>).detail ?? "");
    window.addEventListener(SEARCH_EVENT, onSearch);
    return () => window.removeEventListener(SEARCH_EVENT, onSearch);
  }, []);

  const needle = query.trim().toLowerCase();
  const visible = projects.filter((p) => {
    if (active !== "all" && !(p.cats as string[]).includes(active)) return false;
    if (!needle) return true;
    return [p.title, p.repo, p.kind, p.blurb, p.lang, ...p.tags].join(" ").toLowerCase().includes(needle);
  });

  return (
    <section id="projects" className="section" aria-label="Selected work">
      <div className="section-head">
        <h2>
          Selected work{needle && <span style={{ color: "var(--mu)" }}> · matching “{query.trim()}”</span>}
        </h2>
        <div className="filters" role="group" aria-label="Filter projects by technology">
          {filters.map((f) => (
            <button key={f.id} type="button" className={`fbtn${active === f.id ? " on" : ""}`} aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="empty">No projects match that search.</div>
      ) : (
        <div className="grid">
          {visible.map((p) => {
            const stack = p.tags.filter((t) => t !== p.lang).join(" · ");
            return (
              <div key={p.slug} className={`card${p.featured ? " feat" : ""}`}>
                {p.featured && (
                  <div className="feat-shot">
                    <Image src={thumbSrc(p)} alt={`${p.title} screenshot`} fill sizes="(max-width: 720px) 100vw, 280px" />
                  </div>
                )}
                <div className="card-main">
                  <div className="card-t">
                    <Repo />
                    <Link href={`/work/${p.slug}`}>{p.title}</Link>
                    <span className="pill">{p.owner}</span>
                  </div>
                  <p>{p.blurb}</p>
                  <div className="card-m">
                    <span>
                      <i className="dot" style={{ background: p.langColor }} />
                      {p.lang}
                    </span>
                    {stack && <span>{stack}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
