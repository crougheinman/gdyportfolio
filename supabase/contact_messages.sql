-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Stores messages from the portfolio contact form.

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320),
  subject     text check (char_length(subject) <= 300),
  message     text not null check (char_length(message) between 1 and 5000),
  referrer    text check (char_length(referrer) <= 500),
  -- Handy for triage in the dashboard: new -> read -> replied (or spam).
  status      text not null default 'new' check (status in ('new', 'read', 'replied', 'spam'))
);

-- Row Level Security: the public (anon / publishable) key can ONLY insert new rows.
-- Nobody can read, change or delete messages with that key, even if it leaks.
-- You read them in the dashboard (Table Editor), which uses your own login.
alter table public.contact_messages enable row level security;

drop policy if exists "contact form can insert" on public.contact_messages;
create policy "contact form can insert"
  on public.contact_messages
  for insert
  to anon
  with check (status = 'new');

grant insert on public.contact_messages to anon;
