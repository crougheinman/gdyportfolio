import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import Nav from "@/components/Nav";
import { getCaseStudy, getProject, projects, thumbSrc } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const study = getCaseStudy(slug);
  if (!project || !study) return {};
  const image = { url: study.images[0]?.src ?? thumbSrc(project), alt: study.seoTitle };
  return {
    title: { absolute: study.seoTitle },
    description: study.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "website",
      url: `/work/${slug}`,
      siteName: `${site.name} Portfolio`,
      locale: "en_US",
      title: study.seoTitle,
      description: study.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: study.seoTitle, description: study.description, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  const study = getCaseStudy(slug);
  if (!project || !study) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const hero = study.images[0];
  const rest = study.images.slice(1);

  return (
    <>
      <Nav />
      <main className="wrap" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <Link href="/#work" className="back-link">
          <ArrowLeft /> Back to all work
        </Link>

        <div className="cs-head">
          <div className="eyebrow">Case study · {project.kind}</div>
          <h1 className="cs-title">{project.title}</h1>
          {study.description && <p className="cs-lead">{study.description}</p>}
        </div>

        {hero && (
          <div className="cs-hero">
            <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1200px) 100vw, 1136px" />
          </div>
        )}

        <div className="cs-body">
          <div className="cs-main">
            {study.blocks.map((b, i) => (
              <section key={i} className="cs-block">
                {b.heading && <h2>{b.heading}</h2>}
                {b.nodes.map((n, j) =>
                  n.t === "p" ? (
                    <p key={j}>{n.text}</p>
                  ) : n.t === "h" ? (
                    <h3 key={j}>{n.text}</h3>
                  ) : (
                    <ul key={j}>
                      {n.items.map((it, k) => (
                        <li key={k}>{it}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </div>

          <aside className="cs-side" aria-label="Project information">
            {study.info.map((row) => (
              <div key={row.label}>
                <div className="info-label">{row.label}</div>
                <div className="info-value">
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noopener noreferrer">
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </div>
              </div>
            ))}
          </aside>
        </div>

        {rest.length > 0 && (
          <div className="gallery">
            {rest.map((img) => (
              <figure key={img.src}>
                <div className="shot">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 100vw, 380px" />
                </div>
                {img.alt && <figcaption>{img.alt}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <Link href={`/work/${next.slug}`} className="next-card">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Next project</div>
            <div className="next-title">{next.title}</div>
          </div>
          <div className="next-right">
            <div className="next-thumb">
              <Image src={thumbSrc(next)} alt="" fill sizes="180px" />
            </div>
            <span className="next-go">
              <ArrowRight size={20} />
            </span>
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
