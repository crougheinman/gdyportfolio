import { site } from "@/data/site";
import { Lines } from "./Icons";

export default function Hero() {
  return (
    <section id="overview" className="box" aria-label="Introduction">
      <div className="hd">
        <Lines />
        {site.username} / README.md
      </div>
      <div className="md hero">
        <h1>Senior Full-Stack Engineer who ships production systems businesses run on.</h1>
        <p className="lead">
          7+ years building web apps, CRMs and e-commerce in TypeScript, React, PHP and Node, from database to deployment. I use AI tools like{" "}
          <b className="cc">Claude Code</b> and <b className="em">Cursor</b> to deliver faster without skipping tests or security.
        </p>
        <p className="avail">
          <span className="live-dot" aria-hidden="true" />
          Available for senior roles &amp; contracts · Remote (UTC+8, US-hours overlap)
        </p>
        <a className="btn btn-pri btn-lg" href="#contact">
          Get in Touch
        </a>

        <h2 id="about">About</h2>
        <p>
          I&apos;m Gregory, a full-stack engineer with 7+ years turning messy business processes into reliable software. I&apos;m currently the lead
          engineer behind a multi-tenant CRM running multiple retail stores. It turns scanned invoices into orders, routes deliveries, texts
          customers through Twilio, and runs on hardened, Cloudflare-fronted servers. I work in TypeScript, JavaScript, Python and PHP,
          containerize with Docker, and treat testing and security as part of the job.
        </p>
      </div>
    </section>
  );
}
