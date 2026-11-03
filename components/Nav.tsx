import Link from "next/link";
import { site } from "@/data/site";

export default function Nav() {
  return (
    <header className="wrap nav-bar">
      <Link href="/" className="brand">
        <span className="brand-mark">GY</span>
        {site.shortName}
      </Link>
      <nav className="nav-links" aria-label="Primary">
        <Link href="/#work">Work</Link>
        <Link href="/#services">Services</Link>
        <Link href="/#skills">Skills</Link>
        <Link href="/#certs">Certifications</Link>
        <Link href="/#contact" className="btn btn-primary btn-sm">
          Let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}
