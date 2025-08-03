-- Minimal script to create generated_content table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.generated_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL,
  content_type text NOT NULL,
  content text NOT NULL,
  moderation_score real DEFAULT 0,
  flagged_reasons text[] DEFAULT '{}',
  generated_at timestamp with time zone DEFAULT now(),
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);