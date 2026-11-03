"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/data/site";
import { ArrowRight } from "./Icons";

const initial: ContactState = { status: "idle", message: "" };

export default function Contact() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [referrer, setReferrer] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setReferrer(document.referrer), []);
  useEffect(() => {
    if (state.status === "ok") formRef.current?.reset();
  }, [state]);

  return (
    <section id="contact" className="wrap" style={{ paddingBottom: 96 }}>
      <div className="contact-card">
        <div className="contact-copy">
          <div className="eyebrow">05 / Contact</div>
          <h2 className="contact-title">Let&apos;s work together.</h2>
          <p className="contact-lead">
            Have a project in mind, or need a hand on an existing one? Send a note and I&apos;ll reply soon.
          </p>
          <a className="contact-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="social">
            <a className="btn btn-ghost btn-sm" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="btn btn-ghost btn-sm" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <form ref={formRef} action={action} className="form">
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input type="hidden" name="referrer" value={referrer} />

          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" className="field" type="text" required autoComplete="name" />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="field" type="email" required autoComplete="email" />
          </div>
          <div className="form-row">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" className="field" type="text" />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" className="field" rows={5} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} disabled={pending}>
            {pending ? "Sending…" : "Send message"} <ArrowRight />
          </button>
          <p className={`form-note ${state.status === "ok" ? "ok" : state.status === "error" ? "err" : ""}`} role="status">
            {state.message}
          </p>
        </form>
      </div>
    </section>
  );
}
