import Image from "next/image";
import Link from "next/link";
import { flagship, getGallery } from "@/data/projects";
import { Repo } from "./Icons";

export default function Flagship() {
  const shot = getGallery(flagship)[0];
  return (
    <section id="flagship" className="section" aria-label="Flagship case study">
      <div className="section-head">
        <h2>Flagship case study</h2>
      </div>
      <div className="box flag">
        {shot && (
          <div className="flag-shot">
            <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 720px) 100vw, 480px" />
          </div>
        )}
        <div className="flag-body">
          <div className="flag-title">
            <Repo />
            <Link href={`/work/${flagship.slug}`}>{flagship.title}</Link>
            <span className="pill">{flagship.owner}</span>
          </div>
          <p className="flag-lead">{flagship.blurb}</p>
          <ul className="flag-list">
            {flagship.built.slice(0, 4).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="topics">
            {flagship.stack.map((t) => (
              <span key={t} className="topic">
                {t.toLowerCase()}
              </span>
            ))}
          </div>
          <div className="flag-cta">
            <Link className="btn btn-pri" href={`/work/${flagship.slug}`}>
              Read the case study
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
