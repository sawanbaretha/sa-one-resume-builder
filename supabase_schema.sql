-- SQL Schema Migration for Resume Builder App with Storage Bucket & History
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/jkhukbwnqkioyxotpnmj/sql/new

-- 1. Create resumes table
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text default 'My Resume',
  content jsonb not null,
  customization jsonb not null,
  pdf_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure pdf_url column exists if table was created previously
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name='resumes' and column_name='pdf_url'
  ) then
    alter table public.resumes add column pdf_url text;
  end if;
end $$;

-- 2. Enable Row Level Security (RLS) on resumes table
alter table public.resumes enable row level security;

-- 3. Security Policies for Database Table
drop policy if exists "Users can view their own resumes" on public.resumes;
create policy "Users can view their own resumes"
  on public.resumes for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own resumes" on public.resumes;
create policy "Users can insert their own resumes"
  on public.resumes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own resumes" on public.resumes;
create policy "Users can update their own resumes"
  on public.resumes for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own resumes" on public.resumes;
create policy "Users can delete their own resumes"
  on public.resumes for delete
  using (auth.uid() = user_id);

-- 4. Create Public Storage Bucket for PDF Files
insert into storage.buckets (id, name, public)
values ('resumes-pdf', 'resumes-pdf', true)
on conflict (id) do nothing;

-- 5. Storage Security Policies for resumes-pdf Bucket
drop policy if exists "Public Access PDF view" on storage.objects;
create policy "Public Access PDF view"
  on storage.objects for select
  using (bucket_id = 'resumes-pdf');

drop policy if exists "Authenticated users can upload PDFs" on storage.objects;
create policy "Authenticated users can upload PDFs"
  on storage.objects for insert
  with check (bucket_id = 'resumes-pdf' and auth.role() = 'authenticated');

drop policy if exists "Users can delete own PDFs" on storage.objects;
create policy "Users can delete own PDFs"
  on storage.objects for delete
  using (bucket_id = 'resumes-pdf' and auth.uid()::text = (storage.foldername(name))[1]);
