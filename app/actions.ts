"use server";

import { headers } from "next/headers";
import { site } from "@/data/site";

export type ContactField = "name" | "email" | "message";
export type ContactState = {
  status: "idle" | "ok" | "error";
  message: string;
  /** Per-field problems, shown under the matching input. */
  errors?: Partial<Record<ContactField, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OK: ContactState = { status: "ok", message: "Message sent. Thank you, I'll get back to you soon." };

/*
 * Where a message goes (see .env.example for the variables):
 *   1. Supabase table `contact_messages`  (SUPABASE_URL + SUPABASE_KEY)
 *   2. Telegram bot message to you         (TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID)
 *   3. Last resort, only if 1 and 2 both fail or are not configured:
 *      the original Google Apps Script -> Google Sheet.
 * The visitor sees success as soon as the message reached at least one of these.
 */

type Row = { name: string; email: string; subject: string; message: string; referrer: string };

const TIMEOUT_MS = 8000;

async function saveToSupabase(row: Row): Promise<boolean> {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url}/rest/v1/contact_messages`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ ...row, subject: row.subject || null, referrer: row.referrer || null }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[contact] Supabase insert failed: HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[contact] Supabase insert error:", err instanceof Error ? err.message : err);
    return false;
  }
}

async function notifyTelegram(row: Row, saved: boolean): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const base = (process.env.TELEGRAM_API_BASE || "https://api.telegram.org").replace(/\/+$/, "");
  // Plain text on purpose (no parse_mode), so visitor input can never be interpreted as markup.
  const text = [
    "New portfolio message",
    `From: ${row.name} <${row.email}>`,
    row.subject ? `Subject: ${row.subject}` : null,
    "",
    row.message,
    saved ? null : "\n(Not saved to the database. Check the Supabase setup.)",
  ]
    .filter((l) => l !== null)
    .join("\n")
    .slice(0, 3900);
  try {
    const res = await fetch(`${base}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[contact] Telegram notify failed: HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[contact] Telegram notify error:", err instanceof Error ? err.message : err);
    return false;
  }
}

async function saveToSheet(row: Row): Promise<boolean> {
  const url = process.env.CONTACT_FALLBACK_URL || site.contactScriptUrl;
  const body = new FormData();
  for (const [k, v] of Object.entries(row)) body.append(k, v);
  try {
    const res = await fetch(url, { method: "POST", body, cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!res.ok) console.error(`[contact] Sheet fallback failed: HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[contact] Sheet fallback error:", err instanceof Error ? err.message : err);
    return false;
  }
}

// Best-effort per-IP limit (in memory, so it applies per server instance). Keeps a bot from flooding Telegram.
const hits = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (v.every((t) => now - t >= 10 * 60 * 1000)) hits.delete(k);
  return recent.length > 5;
}

const cap = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Spam traps: a filled honeypot, or a form submitted faster than a person could type, is dropped silently.
  const started = Number(formData.get("ts"));
  const tooFast = !started || Date.now() - started < 1200;
  if (String(formData.get("website") ?? "").trim() !== "" || tooFast) return OK;

  const name = cap(formData.get("name"), 200);
  const email = cap(formData.get("email"), 320);
  const message = cap(formData.get("message"), 5000);

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email address doesn't look right.";
  if (!message) errors.message = "Please write a short message.";
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields and try again.", errors };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (tooMany(ip)) {
    return { status: "error", message: `You've sent several messages in a short time. Please wait a few minutes, or email me directly at ${site.email}.` };
  }

  const row: Row = { name, email, subject: cap(formData.get("subject"), 300), message, referrer: cap(formData.get("referrer"), 500) };

  const saved = await saveToSupabase(row);
  const notified = await notifyTelegram(row, saved);
  if (saved || notified) return OK;

  // Neither configured nor reachable: use the original Google Sheet so the message is never lost.
  if (await saveToSheet(row)) return OK;

  return {
    status: "error",
    message: `Your message could not be sent. Please try again, or email me directly at ${site.email}.`,
  };
}
