"use server";

import { site } from "@/data/site";

export type ContactField = "name" | "email" | "message";
export type ContactState = {
  status: "idle" | "ok" | "error";
  message: string;
  /** Per-field problems, shown under the matching input. */
  errors?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Posts the contact form to the existing Google Apps Script web app,
// which appends a row to a Google Sheet (columns: name, email, subject, message, referrer).
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden "website" field.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "ok", message: "Message sent. Thank you, I'll get back to you soon." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email address doesn't look right.";
  if (!message) errors.message = "Please write a short message.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields and try again.", errors };
  }

  const body = new FormData();
  for (const key of ["name", "email", "subject", "message", "referrer"]) {
    body.append(key, String(formData.get(key) ?? "").slice(0, 5000));
  }

  try {
    const res = await fetch(site.contactScriptUrl, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return { status: "ok", message: "Message sent. Thank you, I'll get back to you soon." };
  } catch {
    return {
      status: "error",
      message: `Your message could not be sent. Please try again, or email me directly at ${site.email}.`,
    };
  }
}
