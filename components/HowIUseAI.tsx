import { aiPoints } from "@/data/profile";
import { Sparkle } from "./Icons";
import Rich from "./Rich";

export default function HowIUseAI() {
  return (
    <section id="ai" className="section" aria-label="How I use AI">
      <div className="section-head">
        <h2>How I use AI</h2>
      </div>
      <div className="list">
        {aiPoints.map((p) => (
          <div key={p.title}>
            <Sparkle />
            <div>
              <h3>{p.title}</h3>
              <p>
                <Rich text={p.desc} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
