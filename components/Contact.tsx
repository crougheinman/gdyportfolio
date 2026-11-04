"use client";

import Script from "next/script";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";
import { site } from "@/data/site";
import { Check } from "./Icons";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const initial: ContactState = { status: "idle", message: "" };
/** Gets a one-time reCAPTCHA v3 token, or "" if the script is blocked or fails (the server then decides). */
function getRecaptchaToken(siteKey: string): Promise<string> {
  return new Promise((resolve) => {
    const g = window.grecaptcha;
    if (!g) return resolve("");
    const timer = setTimeout(() => resolve(""), 6000);
    g.ready(() => {
      g.execute(siteKey, { action: "contact" }).then(
        (t) => {
          clearTimeout(timer);
          resolve(t);
        },
        () => {
          clearTimeout(timer);
          resolve("");
        },
      );
    });
  });
}

/** `recaptchaSiteKey` is the public reCAPTCHA v3 site key (PUBLIC_RECAPTCHA_SITE_KEY), passed in from the server page. */
export default function Contact({ recaptchaSiteKey = "" }: { recaptchaSiteKey?: string }) {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [referrer, setReferrer] = useState("");
  // When the form appeared, so the server can drop submissions that are impossibly fast (bots).
  const [ts, setTs] = useState("");
  const [checking, setChecking] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReferrer(document.referrer);
    setTs(String(Date.now()));
  }, []);

  // Clear the form only after a successful send, so nothing is lost on an error.
  // Move focus to the result so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status === "ok") formRef.current?.reset();
    if (state.status !== "idle") alertRef.current?.focus();
  }, [state]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (recaptchaSiteKey) {
      setChecking(true);
      data.set("recaptcha", await getRecaptchaToken(recaptchaSiteKey));
      setChecking(false);
    }
    startTransition(() => action(data));
  };

  const busy = pending || checking;
  const err = state.errors ?? {};

  return (
    <section id="contact" className="section" aria-label="Contact">
      {recaptchaSiteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />}
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
          <input type="hidden" name="ts" value={ts} />

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
            <input id="name" name="name" className="field" type="text" required autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "name-err" : undefined} disabled={busy} />
            {err.name && (
              <p id="name-err" className="field-err">
                {err.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" className="field" type="email" required autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "email-err" : undefined} disabled={busy} />
            {err.email && (
              <p id="email-err" className="field-err">
                {err.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" className="field" type="text" disabled={busy} />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" className="field" rows={5} required aria-invalid={!!err.message} aria-describedby={err.message ? "message-err" : undefined} disabled={busy} />
            {err.message && (
              <p id="message-err" className="field-err">
                {err.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-pri" disabled={busy}>
            {busy ? "Sending…" : "Send message"}
          </button>
          {recaptchaSiteKey && (
            <p className="recaptcha-note">
              Protected by reCAPTCHA. The Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
