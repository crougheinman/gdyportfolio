import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowUpRight, Repo } from "@/components/Icons";
import ScrubbedStack from "@/components/ScrubbedStack";
import Tabs from "@/components/Tabs";
import { getGallery, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} case study — ${site.name}`;
  const shot = getGallery(project)[0];
  const image = shot ? { url: shot.src, alt: shot.alt } : { ...site.ogImage, alt: title };
  return {
    title: { absolute: title },
    description: project.seoDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "website",
      url: `/work/${slug}`,
      siteName: `${site.name} Portfolio`,
      locale: "en_US",
      title,
      description: project.seoDescription,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: project.seoDescription, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const gallery = getGallery(project);
  const hero = gallery[0];
  const rest = gallery.slice(1);
  const isPortrait = (s: { w?: number; h?: number }) => !!s.w && !!s.h && s.h > s.w;
  const landscape = rest.filter((s) => !isPortrait(s));
  const phones = rest.filter(isPortrait);
  const primary = project.links.filter((l) => l.primary);
  const secondary = project.links.filter((l) => !l.primary);

  const tabs = [
    { id: "readme", label: "Overview" },
    ...(rest.length ? [{ id: "screenshots", label: "Screenshots" }] : []),
  ];

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
            <span className="pill">{project.owner === "Personal" ? "Personal project" : "Client project"}</span>
            <div className="acts">
              {primary.map((l) => (
                <a key={l.href} className="btn btn-pri" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </div>

      <div className="wrap">
        <main>
          <section id="readme" className="box" aria-label="Case study">
            <div className="hd">README.md</div>
            <div className="md">
              <h1>{project.title}</h1>
              <p className="lead">{project.blurb}</p>
              {hero && (
                <div className="shot">
                  <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1344px) 100vw, 960px" />
                </div>
              )}

              <h2>Role</h2>
              <p>{project.role}</p>

              <h2>Problem</h2>
              <p>{project.problem}</p>

              {project.users && (
                <>
                  <h2>Who uses it</h2>
                  <ul>
                    {project.users.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </>
              )}

              <h2>What I built</h2>
              {project.featureGroups ? (
                project.featureGroups.map((g) => (
                  <div key={g.title}>
                    <h3>{g.title}</h3>
                    <ul>
                      {g.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <ul>
                  {project.built.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}

              {project.next && (
                <>
                  <h2>{project.next.title}</h2>
                  <ul>
                    {project.next.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.principles && (
                <>
                  <h2>Design principles</h2>
                  <ul>
                    {project.principles.map((pr) => (
                      <li key={pr}>{pr}</li>
                    ))}
                  </ul>
                </>
              )}

              <h2>Stack</h2>
              {project.scrubbed ? (
                <div className="stack-tags">
                  <ScrubbedStack />
                </div>
              ) : (
                <div className="topics stack-tags">
                  {project.stack.map((t) => (
                    <span key={t} className="topic">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <h2>Links</h2>
              {primary.length > 0 && (
                <div className="cta-row">
                  {primary.map((l) => (
                    <a key={l.href} className="btn btn-pri btn-lg" href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} <ArrowUpRight />
                    </a>
                  ))}
                </div>
              )}
              {secondary.length > 0 && (
                <ul className="plain-links">
                  {secondary.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {project.note && <p className="muted-note">{project.note}</p>}
              {project.links.length === 0 && !project.note && <p className="muted-note">No public links for this project.</p>}
            </div>
          </section>

          {rest.length > 0 && (
            <section id="screenshots" className="box section" aria-label="Screenshots">
              <div className="hd">Screenshots</div>
              <div className="gallery">
                {landscape.map((img) => (
                  <figure key={img.src}>
                    <div className="g">
                      <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 100vw, 320px" />
                    </div>
                    {img.alt && <figcaption>{img.alt}</figcaption>}
                  </figure>
                ))}
              </div>
              {phones.length > 0 && (
                <>
                  <div className="gallery-sub">Mobile app</div>
                  <div className="gallery phones">
                    {phones.map((img) => (
                      <figure key={img.src}>
                        <div className="g" style={{ aspectRatio: `${img.w} / ${img.h}` }}>
                          <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 80vw, 240px" />
                        </div>
                        {img.alt && <figcaption>{img.alt}</figcaption>}
                      </figure>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}

          <Link href={`/work/${next.slug}`} className="next">
            <span>
              <small>Next project</small>
              <strong>{next.title}</strong>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </main>

        <aside className="aside" aria-label="Project summary">
          <div className="blk">
            <h3>About</h3>
            <p className="abt">{project.kind}</p>
            {project.scrubbed ? (
              <ScrubbedStack compact count={4} />
            ) : (
              <div className="topics">
                {project.tags.map((t) => (
                  <span key={t} className="topic">
                    {t.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="blk">
            <div className="row">
              <span>Role</span>
              <b>{project.role}</b>
            </div>
          </div>
          {project.links.length > 0 && (
            <div className="blk">
              <h3>Links</h3>
              {project.links.map((l) => (
                <div key={l.href} className="row">
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}
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
