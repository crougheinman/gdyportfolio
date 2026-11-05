"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { flagship, getGallery } from "@/data/projects";
import { Repo } from "./Icons";
import ScrubbedStack from "./ScrubbedStack";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/** `motion` is the hover clip found at build time (see lib/flagshipMotion.ts); it overrides flagshipMedia.motion. */
export default function Flagship({ motion: motionProp }: { motion?: string }) {
  const media = flagship.flagshipMedia;
  const fallback = getGallery(flagship)[0];
  const still = media ? { src: media.still, alt: media.stillAlt } : fallback;
  const motion = motionProp ?? media?.motion;

  // Hovering the card plays the motion clip; leaving swaps back to the still. The clip layer is only mounted
  // while hovered, so it is not downloaded until first use and always restarts from the beginning.
  const [hovered, setHovered] = useState(false);
  const [ready, setReady] = useState(false);

  const start = (e: React.PointerEvent) => {
    if (!motion || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setHovered(true);
  };
  const stop = () => {
    setHovered(false);
    setReady(false);
  };

  return (
    <section id="flagship" className="section" aria-label="Flagship case study">
      <div className="section-head">
        <h2>Flagship case study</h2>
      </div>
      <div className="box flag" onPointerEnter={start} onPointerLeave={stop}>
        {still && (
          <div className="flag-shot">
            <Image src={still.src} alt={still.alt} fill priority sizes="(max-width: 900px) 100vw, 560px" />
            {motion && hovered && (
              <div className={`flag-motion${ready ? " on" : ""}`} aria-hidden="true">
                {isVideo(motion) ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video src={motion} poster={still.src} autoPlay muted loop playsInline preload="auto" onCanPlay={() => setReady(true)} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={motion} alt="" onLoad={() => setReady(true)} />
                )}
              </div>
            )}
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
        </div>
        <div className="flag-tags">
          {flagship.scrubbed ? (
            <ScrubbedStack />
          ) : (
            <div className="topics">
              {flagship.stack.map((t) => (
                <span key={t} className="topic">
                  {t.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flag-cta">
          <Link className="btn btn-pri" href={`/work/${flagship.slug}`}>
            Read the case study
          </Link>
        </div>
      </div>
    </section>
  );
}
