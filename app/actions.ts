"use server";

import { site } from "@/data/site";

export type ContactState = { status: "idle" | "ok" | "error"; message: string };

// Posts the contact form to the existing Google Apps Script web app,
// which appends a row to a Google Sheet (columns: name, email, subject, message, referrer).
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill the hidden "website" field.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "ok", message: "Thanks! Your message has been sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }

  const body = new FormData();
  for (const key of ["name", "email", "subject", "message", "referrer"]) {
    body.append(key, String(formData.get(key) ?? "").slice(0, 5000));
  }

  try {
    const res = await fetch(site.contactScriptUrl, { method: "POST", body, cache: "no-store" });
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    return { status: "ok", message: "Thanks! Your message has been sent." };
  } catch {
    return {
      status: "error",
      message: `Something went wrong. Please email ${site.email} directly.`,
    };
  }
}
