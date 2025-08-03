-- Complete RLS Fix - Enable RLS on ALL public tables
-- This will fix all RLS warnings by enabling RLS on every table

-- First, let's enable RLS on all existing tables
DO $$
DECLARE 
    table_name text;
BEGIN
    -- Loop through all tables in public schema and enable RLS
    FOR table_name IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
        RAISE NOTICE 'Enabled RLS on table: %', table_name;
    END LOOP;
END $$;

-- Now create specific policies for each table type

-- Profiles policies
CREATE POLICY IF NOT EXISTS "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Posts policies (if table exists)
CREATE POLICY IF NOT EXISTS "Anyone can view published posts" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Authenticated users can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Authors can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

-- Testimonials policies (if table exists)
CREATE POLICY IF NOT EXISTS "Anyone can view approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY IF NOT EXISTS "Authenticated users can create testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Blog posts policies (public read)
CREATE POLICY IF NOT EXISTS "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Service role can manage blog posts" ON public.blog_posts
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Membership tiers policies (public read)
CREATE POLICY IF NOT EXISTS "Anyone can view active membership tiers" ON public.membership_tiers
  FOR SELECT USING (is_active = true);

CREATE POLICY IF NOT EXISTS "Service role can manage membership tiers" ON public.membership_tiers
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Analytics/System tables (service role only)
CREATE POLICY IF NOT EXISTS "Service role can manage page views" ON public.page_views
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage newsletter subscriptions" ON public.newsletter_subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage generated content" ON public.generated_content
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- For any other tables, create a restrictive policy (service role only)
DO $$
DECLARE 
    table_name text;
    policy_exists boolean;
BEGIN
    FOR table_name IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename NOT IN ('profiles', 'posts', 'testimonials', 'blog_posts', 'membership_tiers', 'page_views', 'newsletter_subscriptions', 'generated_content')
    LOOP
        -- Check if any policy exists for this table
        SELECT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'public' AND tablename = table_name
        ) INTO policy_exists;
        
        -- If no policies exist, create a restrictive one
        IF NOT policy_exists THEN
            EXECUTE format('CREATE POLICY "Service role only access" ON public.%I FOR ALL USING (auth.jwt() ->> ''role'' = ''service_role'')', table_name);
            RAISE NOTICE 'Created restrictive policy for table: %', table_name;
        END IF;
    END LOOP;
END $$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant public read access to specific tables
GRANT SELECT ON public.posts TO anon;
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT ON public.membership_tiers TO anon;

RAISE NOTICE 'RLS setup complete! All tables now have Row Level Security enabled.';