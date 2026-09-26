-- GAMEOCEAN / SUPABASE SETUP
-- Ejecuta este archivo en Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.mods (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  version text not null,
  section text not null check (section in ('V-slice','Psych Engine','P-slice','Codename Engine','Executables')),
  youtube text,
  image_path text not null,
  file_path text not null,
  creators jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  mod_id uuid not null references public.mods(id) on delete cascade,
  author text not null,
  body text not null,
  parent_id uuid references public.comments(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

alter table public.mods enable row level security;
alter table public.comments enable row level security;

drop policy if exists "mods public read" on public.mods;
create policy "mods public read" on public.mods for select using (true);

drop policy if exists "mods anon insert" on public.mods;
create policy "mods anon insert" on public.mods for insert with check (true);

drop policy if exists "comments public read" on public.comments;
create policy "comments public read" on public.comments for select using (true);

drop policy if exists "comments anon insert" on public.comments;
create policy "comments anon insert" on public.comments for insert with check (true);

-- Storage buckets
insert into storage.buckets (id,name,public) values ('mod-images','mod-images',true)
on conflict (id) do update set public=true;
insert into storage.buckets (id,name,public) values ('mod-files','mod-files',true)
on conflict (id) do update set public=true;

drop policy if exists "public image read" on storage.objects;
create policy "public image read" on storage.objects for select using (bucket_id='mod-images');

drop policy if exists "public image upload" on storage.objects;
create policy "public image upload" on storage.objects for insert with check (bucket_id='mod-images');

drop policy if exists "public file read" on storage.objects;
create policy "public file read" on storage.objects for select using (bucket_id='mod-files');

drop policy if exists "public file upload" on storage.objects;
create policy "public file upload" on storage.objects for insert with check (bucket_id='mod-files');

-- IMPORTANT:
-- This starter intentionally keeps the admin gate client-side because GitHub Pages is static.
-- For a public production site, replace it with Supabase Auth/Edge Functions so the admin
-- password is not exposed in browser code.
