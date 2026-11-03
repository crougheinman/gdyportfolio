"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { Menu, Repo, Search } from "./Icons";

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

type Hit = { slug: string; title: string; kind: string };

/** Projects matching the query, best matches first (title, then name/kind/tech, then description). */
function findProjects(query: string): Hit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // Outside the title, only match at the start of a word ("mat" finds "Mattress", not "automatically").
  const wordStart = new RegExp(`(^|[^a-z0-9])${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  return projects
    .map((p, order) => {
      const title = p.title.toLowerCase();
      const tech = [p.repo, p.kind, p.lang, ...p.tags, ...p.stack].join(" ").toLowerCase();
      const score = title.startsWith(q) ? 0 : title.includes(q) ? 1 : wordStart.test(tech) ? 2 : wordStart.test(p.blurb.toLowerCase()) ? 3 : -1;
      return { p, order, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => a.score - b.score || a.order - b.order)
    .slice(0, 6)
    .map(({ p }) => ({ slug: p.slug, title: p.title, kind: p.kind }));
}

/** Bold the part of the title that matches the query, like GitHub's search suggestions. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <b>{text.slice(i, i + q.length)}</b>
      {text.slice(i + q.length)}
    </>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const hits = findProjects(query);
  const showing = open && query.trim() !== "";

  // Press "/" anywhere to focus the search box (like GitHub).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the dropdown when clicking elsewhere.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // After navigating to a project, reset the search.
  useEffect(() => {
    setOpen(false);
    setQuery("");
    setMenuOpen(false);
  }, [pathname]);

  const go = (slug: string) => {
    setOpen(false);
    router.push(`/work/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showing || hits.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(hits[active].slug);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <header className="bar">
      <Link href="/" className="mark" aria-label={`${site.name} — home`}>
        GY
      </Link>
      <Link href="/" className="bar-name">
        {site.name}
      </Link>

      <div className="search-wrap" ref={wrapRef}>
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <Search />
          <input
            ref={inputRef}
            type="text"
            name="q"
            value={query}
            placeholder="Search projects…"
            aria-label="Search projects"
            autoComplete="off"
            role="combobox"
            aria-expanded={showing}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={showing && hits.length ? `${listId}-${active}` : undefined}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
          />
          <kbd aria-hidden="true">/</kbd>
        </form>

        {showing && (
          <div className="sd" id={listId} role="listbox" aria-label="Project suggestions">
            {hits.length > 0 ? (
              <>
                <div className="sd-label">Projects</div>
                {hits.map((h, i) => (
                  <Link
                    key={h.slug}
                    id={`${listId}-${i}`}
                    href={`/work/${h.slug}`}
                    role="option"
                    aria-selected={i === active}
                    tabIndex={-1}
                    className={`sd-item${i === active ? " on" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setOpen(false)}
                  >
                    <Repo />
                    <span className="sd-main">
                      <span className="sd-title">
                        <Highlight text={h.title} query={query} />
                      </span>
                      <span className="sd-sub">{h.kind}</span>
                    </span>
                    {i === active && (
                      <span className="sd-jump">
                        Jump to <kbd>↵</kbd>
                      </span>
                    )}
                  </Link>
                ))}
              </>
            ) : (
              <div className="sd-empty">No projects match “{query.trim()}”</div>
            )}
          </div>
        )}
      </div>

      <nav className="bar-nav" aria-label="Primary">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
      <button type="button" className="menu-btn" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
        <Menu />
      </button>
      <nav className={`mobile-nav${menuOpen ? " open" : ""}`} aria-label="Mobile">
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
