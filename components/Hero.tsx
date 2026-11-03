import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { certifications } from "@/data/profile";
import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="wrap hero">
      <div className="hero-copy">
        <div className="status-pill">
          <span className="status-dot" />
          Open to new projects
        </div>
        <h1>
          Full-stack web developer who ships <em>end to end.</em>
        </h1>
        <p className="hero-sub">
          PHP &amp; CodeIgniter engineer who also builds with Angular, React and Vue — from database design to
          polished front ends and email automation.
        </p>
        <div className="hero-actions">
          <Link href="/#work" className="btn btn-primary">
            View selected work <ArrowRight />
          </Link>
          <Link href="/#contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
        <div className="stats">
          <div>
            <div className="stat-num">{projects.length}</div>
            <div className="stat-label">projects shipped</div>
          </div>
          <div>
            <div className="stat-num">{certifications.length}</div>
            <div className="stat-label">certifications</div>
          </div>
        </div>
      </div>
      <div className="hero-photo">
        <div className="hero-glow" />
        <div className="hero-img-frame">
          <Image
            src="/img/profile.jpg"
            alt="Portrait of Gregory Peter Yanoc"
            fill
            priority
            sizes="(max-width: 720px) 90vw, 400px"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div className="hero-badge">PHP · React · Vue · Angular</div>
      </div>
    </section>
  );
}
