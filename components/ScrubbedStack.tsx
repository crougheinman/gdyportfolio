import { Lock } from "./Icons";

// Meaningless placeholder text of varying widths. The real technology names are never sent to the
// browser for a scrubbed project, so removing the blur in DevTools reveals nothing.
const PLACEHOLDERS = ["xxxxxxxx", "xxxxxx", "xxxxxxxxxx", "xxxxx", "xxxxxxx", "xxxxxxxxx"];

/** Blurred placeholder pills with a "Scrubbed" label in front, used to hide a client's tech stack. */
export default function ScrubbedStack({ count = 6, compact = false }: { count?: number; compact?: boolean }) {
  return (
    <div className={`scrub${compact ? " scrub-sm" : ""}`} role="img" aria-label="Technology stack scrubbed for client protection">
      <div className="scrub-pills" aria-hidden="true">
        {PLACEHOLDERS.slice(0, count).map((p, i) => (
          <span key={i} className="topic">
            {p}
          </span>
        ))}
      </div>
      <div className="scrub-veil" aria-hidden="true">
        <span className="scrub-label">
          <Lock />
          Scrubbed, for client protection
        </span>
      </div>
    </div>
  );
}
