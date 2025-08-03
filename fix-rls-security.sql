-- Fix Row Level Security (RLS) for all public tables
-- Run this in your Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Posts policies (public read, authenticated users can create)
CREATE POLICY "Anyone can view published posts" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authors can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- Testimonials policies (public read for approved, users can create their own)
CREATE POLICY "Anyone can view approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Authenticated users can create testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own testimonials" ON public.testimonials
  FOR UPDATE USING (auth.uid() = user_id);

-- Newsletter subscriptions policies (service role only)
CREATE POLICY "Service role can manage newsletter subscriptions" ON public.newsletter_subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Generated content policies (admin/service role only)
CREATE POLICY "Service role can manage generated content" ON public.generated_content
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Blog posts policies (public read)
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Service role can manage blog posts" ON public.blog_posts
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Membership tiers policies (public read)
CREATE POLICY "Anyone can view membership tiers" ON public.membership_tiers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Service role can manage membership tiers" ON public.membership_tiers
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.posts TO anon;
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT ON public.membership_tiers TO anon;

-- Page views policies (analytics data - service role only)
CREATE POLICY "Service role can manage page views" ON public.page_views
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Grant authenticated users access to profiles
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.posts TO authenticated;
GRANT ALL ON public.testimonials TO authenticated;