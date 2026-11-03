"use client";

import { useEffect, useState } from "react";
import { Book, Repo } from "./Icons";

type Tab = { id: string; label: string; icon?: "book" | "repo" };

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  // Follow the URL hash so the highlighted tab matches where the visitor jumped to.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.id === id)) setActive(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [tabs]);

  return (
    <nav className="tabs" aria-label="Sections">
      {tabs.map((t) => (
        <a key={t.id} href={`#${t.id}`} className={active === t.id ? "on" : ""} aria-current={active === t.id ? "page" : undefined} onClick={() => setActive(t.id)}>
          {t.icon === "book" && <Book />}
          {t.icon === "repo" && <Repo />}
          {t.label}
        </a>
      ))}
    </nav>
  );
}
