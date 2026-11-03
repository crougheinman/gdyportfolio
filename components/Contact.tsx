"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/data/site";

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
    <section id="contact" className="section" aria-label="Contact">
      <div className="section-head">
        <h2>Contact</h2>
      </div>
      <div className="box contact">
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Let&apos;s work together</h3>
          <p>Have a project in mind, or need a hand on an existing one? Send a note and I&apos;ll reply soon.</p>
          <p>
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
        <form ref={formRef} action={action} className="form">
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input type="hidden" name="referrer" value={referrer} />
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" className="field" type="text" required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="field" type="email" required autoComplete="email" />
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" className="field" type="text" />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" className="field" rows={5} required />
          </div>
          <button type="submit" className="btn btn-pri" disabled={pending}>
            {pending ? "Sending…" : "Send message"}
          </button>
          <p className={`form-note ${state.status === "ok" ? "ok" : state.status === "error" ? "err" : ""}`} role="status">
            {state.message}
          </p>
        </form>
      </div>
    </section>
  );
}
