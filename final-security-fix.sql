-- COMPLETE SECURITY FIX for Supabase
-- This will fix ALL RLS warnings and function security issues

-- 1. Enable RLS on all specific tables mentioned in warnings
ALTER TABLE IF EXISTS public.resource_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.membership_tiers ENABLE ROW LEVEL SECURITY;

-- 2. Enable RLS on all other common tables
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for each table

-- Resource interactions (analytics - service role only)
DROP POLICY IF EXISTS "Service role can manage resource interactions" ON public.resource_interactions;
CREATE POLICY "Service role can manage resource interactions" ON public.resource_interactions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Page views (analytics - service role only)  
DROP POLICY IF EXISTS "Service role can manage page views" ON public.page_views;
CREATE POLICY "Service role can manage page views" ON public.page_views
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Membership tiers (public read, service role manage)
DROP POLICY IF EXISTS "Anyone can view active membership tiers" ON public.membership_tiers;
CREATE POLICY "Anyone can view active membership tiers" ON public.membership_tiers
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Service role can manage membership tiers" ON public.membership_tiers;
CREATE POLICY "Service role can manage membership tiers" ON public.membership_tiers
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Profiles (users can manage their own)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Posts (public read published, authors manage their own)
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.posts;
CREATE POLICY "Anyone can view published posts" ON public.posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Authors can manage their own posts" ON public.posts;
CREATE POLICY "Authors can manage their own posts" ON public.posts
  FOR ALL USING (auth.uid() = author_id);

-- Testimonials (public read approved, users manage their own)
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON public.testimonials;
CREATE POLICY "Anyone can view approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "Users can manage their own testimonials" ON public.testimonials;
CREATE POLICY "Users can manage their own testimonials" ON public.testimonials
  FOR ALL USING (auth.uid() = user_id);

-- Newsletter subscriptions (service role only)
DROP POLICY IF EXISTS "Service role can manage newsletter subscriptions" ON public.newsletter_subscriptions;
CREATE POLICY "Service role can manage newsletter subscriptions" ON public.newsletter_subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Generated content (service role only)
DROP POLICY IF EXISTS "Service role can manage generated content" ON public.generated_content;
CREATE POLICY "Service role can manage generated content" ON public.generated_content
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Blog posts (public read published, service role manage)
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Service role can manage blog posts" ON public.blog_posts;
CREATE POLICY "Service role can manage blog posts" ON public.blog_posts
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 4. Fix the function security issue
-- Drop and recreate the function with secure search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 5. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Public read access to appropriate tables
GRANT SELECT ON public.posts TO anon;
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT ON public.membership_tiers TO anon;

-- Authenticated user access
GRANT ALL ON public.profiles TO authenticated;
GRANT INSERT, UPDATE ON public.posts TO authenticated;
GRANT INSERT, UPDATE ON public.testimonials TO authenticated;

-- 6. Enable RLS on any remaining tables (catch-all)
DO $$
DECLARE 
    table_name text;
    policy_count integer;
BEGIN
    FOR table_name IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        -- Enable RLS if not already enabled
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
        
        -- Check if table has any policies
        SELECT COUNT(*) INTO policy_count
        FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = table_name;
        
        -- If no policies exist, create a restrictive one
        IF policy_count = 0 THEN
            EXECUTE format('CREATE POLICY "Restrictive access" ON public.%I FOR ALL USING (auth.jwt() ->> ''role'' = ''service_role'')', table_name);
            RAISE NOTICE 'Created restrictive policy for table: %', table_name;
        END IF;
    END LOOP;
END $$;

-- Final verification
SELECT 
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;