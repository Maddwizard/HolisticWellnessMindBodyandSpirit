-- ========================================
-- GENERATED CONTENT TABLE
-- ========================================
-- Copy and paste this into your Supabase SQL Editor

-- Create extensions (if not already created)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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

-- Create policy for authenticated users to view published content
DROP POLICY IF EXISTS "Allow authenticated users to view published content" ON public.generated_content;
CREATE POLICY "Allow authenticated users to view published content" ON public.generated_content
  FOR SELECT TO authenticated
  USING (is_published = true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_generated_content_section ON public.generated_content(section);
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON public.generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_generated_content_published ON public.generated_content(is_published);
CREATE INDEX IF NOT EXISTS idx_generated_content_generated_at ON public.generated_content(generated_at);
CREATE INDEX IF NOT EXISTS idx_generated_content_created_at ON public.generated_content(created_at);

-- Create update trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_generated_content_updated_at ON public.generated_content;
CREATE TRIGGER update_generated_content_updated_at 
  BEFORE UPDATE ON public.generated_content 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO public.generated_content (section, content_type, content, is_published) VALUES
('biblical-wellness', 'article', 'Biblical wellness combines spiritual practices with physical health, following the principle that our bodies are temples of the Holy Spirit.', true),
('nutrition', 'guide', 'Christian nutrition focuses on whole, natural foods as God''s provision for our nourishment and health.', true),
('exercise', 'workout', 'Faith-based exercise integrates physical movement with spiritual reflection, treating exercise as a form of worship.', true),
('mental-health', 'meditation', 'Christian mental health practices include prayer, meditation on scripture, and community support.', true);

-- Analyze table for better query planning
ANALYZE public.generated_content;

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check if table was created successfully
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'generated_content' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'generated_content';

-- Check if indexes were created
SELECT 
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'generated_content';