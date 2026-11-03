import { site } from "@/data/site";
import { Lines } from "./Icons";

export default function Readme() {
  return (
    <section id="overview" className="box" aria-label="README">
      <div className="hd">
        <Lines />
        {site.username} / README.md
      </div>
      <div className="md">
        <h2 className="first-h2">Hi, I&apos;m Gregory</h2>
        <p>
          I build web applications from the database up. Most of my work is <code>PHP</code> and <code>CodeIgniter</code> back ends with{" "}
          <code>Angular</code>, <code>React</code> or <code>Vue</code> on the front end, plus a few <code>Webflow</code> sites.
        </p>
        <ul>
          <li>Back end: PHP, CodeIgniter, MySQL, Node.js, Firebase, Supabase</li>
          <li>Front end: Angular, React, Vue, TypeScript</li>
          <li>Email marketing automation with Oracle Eloqua</li>
          <li>
            Currently using <b className="cc">Claude Code</b>
          </li>
        </ul>
      </div>
    </section>
  );
}
