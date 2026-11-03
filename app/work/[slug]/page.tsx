import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Repo } from "@/components/Icons";
import Tabs from "@/components/Tabs";
import { getCaseStudy, getProject, ownerLabel, projects, thumbSrc } from "@/data/projects";
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

  const plain = study.info.filter((r) => !r.href);
  const linked = study.info.filter((r) => r.href);
  const source = linked.find((r) => /github\.com/.test(r.href!))?.href;
  const live = linked.find((r) => r.label === "Live Demo")?.href ?? linked.find((r) => !/github\.com/.test(r.href!) && /project url/i.test(r.label))?.href;

  const tabs = [
    { id: "readme", label: "Overview" },
    ...(rest.length ? [{ id: "screenshots", label: "Screenshots", count: study.images.length }] : []),
  ];

  const [first, ...otherBlocks] = study.blocks;
  const firstNodes = first?.nodes ?? [];
  const lead = firstNodes[0];
  const afterLead = firstNodes.slice(1);

  const renderNodes = (nodes: typeof firstNodes, keyPrefix: string) =>
    nodes.map((n, j) =>
      n.t === "p" ? (
        <p key={`${keyPrefix}${j}`}>{n.text}</p>
      ) : n.t === "h" ? (
        <h3 key={`${keyPrefix}${j}`}>{n.text}</h3>
      ) : (
        <ul key={`${keyPrefix}${j}`}>
          {n.items.map((it, k) => (
            <li key={k}>{it}</li>
          ))}
        </ul>
      ),
    );

  return (
    <>
      <Header />
      <div className="head">
        <div className="head-in">
          <div className="title">
            <Repo size={20} />
            <Link href="/">{site.username}</Link>
            <span className="sl">/</span>
            <b>
              <Link href={`/work/${slug}`}>{project.repo}</Link>
            </b>
            <span className="pill">{ownerLabel(slug) === "Personal" ? "Personal project" : "Client project"}</span>
            <div className="acts">
              {source && (
                <a className="btn" href={source} target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              )}
              {live && (
                <a className="btn btn-pri" href={live} target="_blank" rel="noopener noreferrer">
                  Live demo
                </a>
              )}
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>

      <div className="wrap">
        <main>
          <section id="readme" className="box" aria-label="README">
            <div className="hd">README.md</div>
            <div className="md">
              <h1>{project.title}</h1>
              {lead && renderNodes([lead], "lead")}
              {hero && (
                <div className="shot">
                  <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1344px) 100vw, 960px" />
                </div>
              )}
              {renderNodes(afterLead, "a")}
              {otherBlocks.map((b, i) => (
                <section key={i}>
                  {b.heading && <h2>{b.heading}</h2>}
                  {renderNodes(b.nodes, `b${i}-`)}
                </section>
              ))}
            </div>
          </section>

          {rest.length > 0 && (
            <section id="screenshots" className="box section" aria-label="Screenshots">
              <div className="hd">Screenshots</div>
              <div className="gallery">
                {rest.map((img) => (
                  <figure key={img.src}>
                    <div className="g">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 100vw, 320px" />
                    </div>
                    {img.alt && <figcaption>{img.alt}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}

          <Link href={`/work/${next.slug}`} className="next">
            <span>
              <small>Next project</small>
              <strong>{next.repo}</strong>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </main>

        <aside className="aside" aria-label="Project information">
          <div className="blk">
            <h3>About</h3>
            <p className="abt">{project.blurb}</p>
            <div className="topics">
              {project.tags.map((t) => (
                <span key={t} className="topic">
                  {t.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
          {plain.length > 0 && (
            <div className="blk">
              {plain.map((r) => (
                <div key={r.label} className="row">
                  <span>{r.label}</span>
                  <b>{r.value}</b>
                </div>
              ))}
            </div>
          )}
          {linked.length > 0 && (
            <div className="blk">
              <h3>Links</h3>
              {linked.map((r) => (
                <div key={r.label} className="row">
                  <a href={r.href!} target="_blank" rel="noopener noreferrer">
                    {r.label === "Project URL" ? r.value : r.label}
                  </a>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
      <Footer />
    </>
  );
}
