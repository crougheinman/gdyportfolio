import { existsSync } from "node:fs";
import path from "node:path";

// Drop the explainer into public/img/flagship/ named "retail-ops-explainer-25s" with one of these
// extensions and the flagship card plays it on hover automatically. No code change needed.
// MP4 or WebM is strongly recommended over GIF: a 25-second GIF is very large and slow to start.
const BASE = "retail-ops-explainer-25s";
const EXTENSIONS = ["mp4", "webm", "gif", "webp"];

/** Server-only: public URL of the explainer if the file exists (checked at build time). */
export function findFlagshipMotion(): string | undefined {
  for (const ext of EXTENSIONS) {
    const file = `${BASE}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", "img", "flagship", file))) return `/img/flagship/${file}`;
  }
  return undefined;
}
