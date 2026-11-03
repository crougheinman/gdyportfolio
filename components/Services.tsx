import { services } from "@/data/profile";
import { Check } from "./Icons";

/** Renders `**bold**` segments; brand names get their own emphasis. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className={part === "Claude Code" ? "cc" : "em"}>
            {part}
          </b>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function Services() {
  return (
    <section id="services" className="section" aria-label="Services">
      <div className="section-head">
        <h2>Services</h2>
      </div>
      <div className="list">
        {services.map((s) => (
          <div key={s.title}>
            <Check />
            <div>
              <h3>{s.title}</h3>
              <p><Rich text={s.desc} /></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
