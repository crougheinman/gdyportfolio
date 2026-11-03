import { testimonials } from "@/data/testimonials";

/** Renders nothing while data/testimonials.ts is empty. */
export default function Testimonials({ items = testimonials }: { items?: typeof testimonials }) {
  if (!items || items.length === 0) return null;
  return (
    <section id="testimonials" className="section" aria-label="Testimonials">
      <div className="section-head">
        <h2>Testimonials</h2>
      </div>
      <div className="grid">
        {items.map((t, i) => (
          <figure key={`${t.name}-${i}`} className="card quote">
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <b>{t.name}</b>
              {(t.role || t.company) && <span>{[t.role, t.company].filter(Boolean).join(", ")}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
