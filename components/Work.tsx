"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { filters, projects, thumbSrc } from "@/data/projects";
import { ArrowUpRight } from "./Icons";

export default function Work() {
  const [active, setActive] = useState<string>("all");
  const visible = projects.filter((p) => active === "all" || (p.cats as string[]).includes(active));

  return (
    <section id="work" className="wrap section" style={{ paddingTop: 40 }}>
      <div className="work-head">
        <div className="section-head">
          <div className="eyebrow">01 / Selected work</div>
          <h2 className="h2">Things I&apos;ve built</h2>
        </div>
        <div className="chips" role="group" aria-label="Filter projects by technology">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip${active === f.id ? " on" : ""}`}
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {visible.map((p, i) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="card">
            <div className="card-media">
              <Image
                src={thumbSrc(p)}
                alt={`${p.title} preview`}
                fill
                priority={i < 3}
                sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 380px"
              />
            </div>
            <div className="card-body">
              <div className="card-top">
                <div>
                  <div className="card-kind">{p.kind}</div>
                  <div className="card-title">{p.title}</div>
                </div>
                <span className="arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="card-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
