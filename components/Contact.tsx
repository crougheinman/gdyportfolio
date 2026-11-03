"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/data/site";
import { Check } from "./Icons";

const initial: ContactState = { status: "idle", message: "" };

export default function Contact() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [referrer, setReferrer] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => setReferrer(document.referrer), []);

  // Clear the form only after a successful send, so nothing is lost on an error.
  // Move focus to the result so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "ok") formRef.current?.reset();
    if (state.status !== "idle") alertRef.current?.focus();
  }, [state]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  const err = state.errors ?? {};

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="section-head">
        <h2>Contact</h2>
      </div>
      <div className="box contact">
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600 }}>Let&apos;s work together</h3>
          <p>Hiring for a senior role, or need an engineer for a contract? Send a note and I&apos;ll reply soon.</p>
          <p>
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
        <form ref={formRef} onSubmit={onSubmit} className="form" noValidate>
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <input type="hidden" name="referrer" value={referrer} />

          {state.status !== "idle" && (
            <div
              ref={alertRef}
              tabIndex={-1}
              className={`alert ${state.status === "ok" ? "ok" : "err"}`}
              role={state.status === "ok" ? "status" : "alert"}
            >
              {state.status === "ok" && <Check />}
              <span>{state.message}</span>
            </div>
          )}

          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" className="field" type="text" required autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "name-err" : undefined} disabled={pending} />
            {err.name && (
              <p id="name-err" className="field-err">
                {err.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="field" type="email" required autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "email-err" : undefined} disabled={pending} />
            {err.email && (
              <p id="email-err" className="field-err">
                {err.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" className="field" type="text" disabled={pending} />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" className="field" rows={5} required aria-invalid={!!err.message} aria-describedby={err.message ? "message-err" : undefined} disabled={pending} />
            {err.message && (
              <p id="message-err" className="field-err">
                {err.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-pri" disabled={pending}>
            {pending ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
