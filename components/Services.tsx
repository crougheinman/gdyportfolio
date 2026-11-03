import { services } from "@/data/profile";
import { Check } from "./Icons";

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
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
