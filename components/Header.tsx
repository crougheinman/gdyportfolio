"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { Menu, Search } from "./Icons";

export const SEARCH_EVENT = "projects-search";

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

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

  const onChange = (q: string) => window.dispatchEvent(new CustomEvent(SEARCH_EVENT, { detail: q }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value.trim() ?? "";
    // Works from any page: the home page reads ?q= on load and scrolls to the projects list.
    router.push(q ? `/?q=${encodeURIComponent(q)}#projects` : "/#projects");
  };

  return (
    <header className="bar">
      <Link href="/" className="mark" aria-label={`${site.name} — home`}>
        GY
      </Link>
      <Link href="/" className="bar-name">
        {site.name}
      </Link>
      <form className="search" role="search" onSubmit={onSubmit}>
        <Search />
        <input ref={inputRef} type="search" name="q" placeholder="Search projects…" aria-label="Search projects" autoComplete="off" onChange={(e) => onChange(e.target.value)} />
        <kbd aria-hidden="true">/</kbd>
      </form>
      <nav className="bar-nav" aria-label="Primary">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>
      <button type="button" className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Menu />
      </button>
      <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile">
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
