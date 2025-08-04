
-- Simple script to add generated_content table
-- Copy and paste this into your Supabase SQL Editor

-- Create the generated_content table
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

-- Enable Row Level Security  
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
DROP POLICY IF EXISTS "Allow service role to manage generated content" ON public.generated_content;
CREATE POLICY "Allow service role to manage generated content" ON public.generated_content
  FOR ALL TO service_role
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_generated_content_section ON public.generated_content(section);
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON public.generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_generated_content_published ON public.generated_content(is_published);
CREATE INDEX IF NOT EXISTS idx_generated_content_generated_at ON public.generated_content(generated_at);