import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span>Built with Next.js</span>
    </footer>
  );
}
