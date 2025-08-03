-- ========================================
-- HOLISTIC WELLNESS DATABASE SETUP
-- ========================================
-- Complete database script for holisticwellnessmindbodyspirit.com
-- Copy and paste this entire script into your Supabase SQL Editor

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================
-- USERS & PROFILES
-- ========================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  date_of_birth DATE,
  wellness_goals TEXT[],
  dietary_preferences TEXT[],
  fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  spiritual_practices TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- CONTENT MANAGEMENT
-- ========================================

-- Posts/Blog articles
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[],
  category TEXT,
  reading_time INTEGER, -- in minutes
  view_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0
);

-- Resources (articles, videos, podcasts, courses, guides)
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type TEXT CHECK (type IN ('article', 'video', 'podcast', 'course', 'guide', 'meditation', 'prayer')),
  url TEXT,
  thumbnail_url TEXT,
  duration TEXT, -- for videos/podcasts
  file_size INTEGER, -- in bytes
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  tags TEXT[],
  category TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated content table for AI-generated content
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

-- ========================================
-- COMMUNITY & ENGAGEMENT
-- ========================================

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community posts/forums
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT CHECK (category IN ('general', 'nutrition', 'exercise', 'mental-health', 'spiritual-growth', 'prayer-requests', 'testimonials')),
  tags TEXT[],
  is_anonymous BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments on community posts
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- for nested comments
  likes_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prayer requests
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_private BOOLEAN DEFAULT FALSE,
  is_answered BOOLEAN DEFAULT FALSE,
  answered_at TIMESTAMP WITH TIME ZONE,
  answered_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  prayer_count INTEGER DEFAULT 0,
  category TEXT CHECK (category IN ('health', 'family', 'spiritual', 'work', 'relationships', 'other')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- WELLNESS TRACKING
-- ========================================

-- Wellness journals
CREATE TABLE IF NOT EXISTS public.wellness_journals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  sleep_hours DECIMAL(3,1),
  exercise_minutes INTEGER,
  prayer_time_minutes INTEGER,
  gratitude_entries TEXT[],
  challenges TEXT,
  victories TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, entry_date)
);

-- Wellness goals
CREATE TABLE IF NOT EXISTS public.wellness_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('physical', 'mental', 'spiritual', 'nutrition', 'exercise', 'relationships')),
  target_date DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- MEMBERSHIP & SUBSCRIPTIONS
-- ========================================

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  preferences TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  source TEXT -- where they signed up from
);

-- Membership tiers
CREATE TABLE IF NOT EXISTS public.membership_tiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  interval TEXT CHECK (interval IN ('monthly', 'yearly', 'lifetime')),
  features TEXT[],
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User memberships
CREATE TABLE IF NOT EXISTS public.user_memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES public.membership_tiers(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- EVENTS & COURSES
-- ========================================

-- Events (workshops, webinars, etc.)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('online', 'in-person', 'hybrid')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  max_capacity INTEGER,
  current_registrations INTEGER DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  host_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event registrations
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('registered', 'attended', 'cancelled', 'no-show')),
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attended_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(event_id, user_id)
);

-- ========================================
-- ANALYTICS & TRACKING
-- ========================================

-- Page views tracking
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resource downloads/views
CREATE TABLE IF NOT EXISTS public.resource_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  interaction_type TEXT CHECK (interaction_type IN ('view', 'download', 'like', 'share')),
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_interactions ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS POLICIES
-- ========================================

-- Profiles policies
CREATE POLICY "Profile Management" ON public.profiles
FOR ALL USING (
    auth.uid() = id
) WITH CHECK (
    auth.uid() = id
);

-- Posts policies
CREATE POLICY "Posts Management" ON public.posts
FOR ALL USING (
    status = 'published' OR auth.uid() = author_id
) WITH CHECK (
    auth.uid() = author_id
);

-- Resources policies
CREATE POLICY "Resources Management" ON public.resources
FOR SELECT USING (
    NOT is_premium OR 
    EXISTS (
        SELECT 1 FROM public.user_memberships 
        WHERE user_id = auth.uid() AND status = 'active'
    )
);

CREATE POLICY "Resources Creation" ON public.resources
FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Resources Update" ON public.resources
FOR UPDATE USING (auth.uid() = author_id);

-- Generated content policies
CREATE POLICY "Allow service role to manage generated content" ON public.generated_content
FOR ALL TO service_role
USING (true);

CREATE POLICY "Allow authenticated users to view published content" ON public.generated_content
FOR SELECT TO authenticated
USING (is_published = true);

-- Testimonials policies
CREATE POLICY "Approved testimonials are viewable by everyone" ON public.testimonials
FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can submit testimonials" ON public.testimonials
FOR INSERT WITH CHECK (true);

-- Community posts policies
CREATE POLICY "Approved community posts are viewable by everyone" ON public.community_posts
FOR SELECT USING (is_approved = true);

CREATE POLICY "Authenticated users can create posts" ON public.community_posts
FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts" ON public.community_posts
FOR UPDATE USING (auth.uid() = author_id);

-- Comments policies
CREATE POLICY "Approved comments are viewable by everyone" ON public.comments
FOR SELECT USING (is_approved = true);

CREATE POLICY "Authenticated users can create comments" ON public.comments
FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments" ON public.comments
FOR UPDATE USING (auth.uid() = author_id);

-- Prayer requests policies
CREATE POLICY "Prayer Requests Management" ON public.prayer_requests
FOR ALL USING (
    NOT is_private OR auth.uid() = author_id
) WITH CHECK (
    auth.uid() = author_id
);

-- Wellness journals policies
CREATE POLICY "Users can only access own wellness journal" ON public.wellness_journals
FOR ALL USING (auth.uid() = user_id);

-- Wellness goals policies
CREATE POLICY "Users can only access own wellness goals" ON public.wellness_goals
FOR ALL USING (auth.uid() = user_id);

-- Newsletter subscriptions policies
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions
FOR INSERT WITH CHECK (true);

-- User memberships policies
CREATE POLICY "Users can only access own membership" ON public.user_memberships
FOR ALL USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Active events are viewable by everyone" ON public.events
FOR SELECT USING (is_active = true);

-- Event registrations policies
CREATE POLICY "Users can only access own event registrations" ON public.event_registrations
FOR ALL USING (auth.uid() = user_id);

-- Membership tiers policies
CREATE POLICY "Membership tiers are viewable by everyone" ON public.membership_tiers
FOR SELECT USING (is_active = true);

-- Page views policies
CREATE POLICY "Page views are insertable by everyone" ON public.page_views
FOR INSERT WITH CHECK (true);

CREATE POLICY "Page views are viewable by authenticated users" ON public.page_views
FOR SELECT USING (auth.uid() IS NOT NULL);

-- Resource interactions policies
CREATE POLICY "Resource interactions are insertable by everyone" ON public.resource_interactions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Resource interactions are viewable by authenticated users" ON public.resource_interactions
FOR SELECT USING (auth.uid() IS NOT NULL);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_status_published_at_author ON public.posts(status, published_at, author_id);
CREATE INDEX IF NOT EXISTS idx_posts_tags_gin ON public.posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_posts_published_active ON public.posts(published_at, author_id) WHERE status = 'published';

-- Resources indexes
CREATE INDEX IF NOT EXISTS idx_resources_type_category_premium ON public.resources(type, category, is_premium);
CREATE INDEX IF NOT EXISTS idx_resources_tags_gin ON public.resources USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_resources_author_id ON public.resources(author_id);

-- Generated content indexes
CREATE INDEX IF NOT EXISTS idx_generated_content_section ON public.generated_content(section);
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON public.generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_generated_content_published ON public.generated_content(is_published);
CREATE INDEX IF NOT EXISTS idx_generated_content_generated_at ON public.generated_content(generated_at);
CREATE INDEX IF NOT EXISTS idx_generated_content_created_at ON public.generated_content(created_at);

-- Community posts indexes
CREATE INDEX IF NOT EXISTS idx_community_posts_category_approved_created ON public.community_posts(category, is_approved, created_at);
CREATE INDEX IF NOT EXISTS idx_community_posts_author_approved ON public.community_posts(author_id, is_approved);
CREATE INDEX IF NOT EXISTS idx_community_posts_recent_approved ON public.community_posts(created_at, author_id) WHERE is_approved = true;

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_post_approved_created ON public.comments(post_id, is_approved, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_author_approved ON public.comments(author_id, is_approved);

-- Prayer requests indexes
CREATE INDEX IF NOT EXISTS idx_prayer_requests_author_id ON public.prayer_requests(author_id);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_answered_by ON public.prayer_requests(answered_by);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_category ON public.prayer_requests(category);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON public.prayer_requests(created_at);

-- Wellness journals indexes
CREATE INDEX IF NOT EXISTS idx_wellness_journals_user_date_created ON public.wellness_journals(user_id, entry_date, created_at);

-- Wellness goals indexes
CREATE INDEX IF NOT EXISTS idx_wellness_goals_user_id ON public.wellness_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_goals_category ON public.wellness_goals(category);

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_start_date_active_type ON public.events(start_date, is_active, type);
CREATE INDEX IF NOT EXISTS idx_events_host_active ON public.events(host_id, is_active);
CREATE INDEX IF NOT EXISTS idx_events_upcoming_active ON public.events(start_date, host_id) WHERE start_date > NOW() AND is_active = true;

-- Event registrations indexes
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON public.event_registrations(user_id);

-- User memberships indexes
CREATE INDEX IF NOT EXISTS idx_user_memberships_user_id ON public.user_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memberships_tier_id ON public.user_memberships(tier_id);
CREATE INDEX IF NOT EXISTS idx_user_memberships_status ON public.user_memberships(status);

-- Page views indexes
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON public.page_views(user_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON public.page_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON public.page_views(page_path);

-- Resource interactions indexes
CREATE INDEX IF NOT EXISTS idx_resource_interactions_resource_id ON public.resource_interactions(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_interactions_user_id ON public.resource_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_interactions_created_at ON public.resource_interactions(created_at);

-- ========================================
-- TRIGGERS FOR UPDATED_AT
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_generated_content_updated_at BEFORE UPDATE ON public.generated_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON public.prayer_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wellness_journals_updated_at BEFORE UPDATE ON public.wellness_journals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wellness_goals_updated_at BEFORE UPDATE ON public.wellness_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_memberships_updated_at BEFORE UPDATE ON public.user_memberships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA
-- ========================================

-- Insert sample membership tiers
INSERT INTO public.membership_tiers (name, description, price, interval, features, is_popular) VALUES
('Free', 'Basic access to wellness resources', 0, 'lifetime', ARRAY['Access to basic articles', 'Community forum access', 'Newsletter subscription'], false),
('Premium', 'Full access to all wellness content', 19.99, 'monthly', ARRAY['All free features', 'Premium courses', 'Expert consultations', 'Personalized meal plans', 'Wellness tracking tools', 'Priority support'], true),
('Lifetime', 'One-time payment for lifetime access', 299.99, 'lifetime', ARRAY['All premium features', 'Lifetime updates', 'Exclusive content', 'VIP community access', 'Personal wellness coach'], false)
ON CONFLICT DO NOTHING;

-- Insert sample events
INSERT INTO public.events (title, description, type, start_date, end_date, location, max_capacity, price, is_featured) VALUES
('Biblical Wellness Workshop', 'Learn how to integrate faith with modern wellness practices', 'online', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days' + INTERVAL '2 hours', 'Online', 100, 29.99, true),
('Christian Nutrition Seminar', 'Discover biblical foods and nutrition principles', 'hybrid', NOW() + INTERVAL '14 days', NOW() + INTERVAL '14 days' + INTERVAL '3 hours', 'Nashville, TN', 50, 49.99, false)
ON CONFLICT DO NOTHING;

-- Insert sample generated content
INSERT INTO public.generated_content (section, content_type, content, is_published) VALUES
('biblical-wellness', 'article', 'Biblical wellness combines spiritual practices with physical health, following the principle that our bodies are temples of the Holy Spirit.', true),
('nutrition', 'guide', 'Christian nutrition focuses on whole, natural foods as God''s provision for our nourishment and health.', true),
('exercise', 'workout', 'Faith-based exercise integrates physical movement with spiritual reflection, treating exercise as a form of worship.', true),
('mental-health', 'meditation', 'Christian mental health practices include prayer, meditation on scripture, and community support.', true)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO public.testimonials (name, role, content, rating, is_featured, is_approved) VALUES
('Sarah Johnson', 'Wellness Coach', 'This community has transformed my approach to health and spirituality. The biblical foundation makes all the difference.', 5, true, true),
('Michael Chen', 'Fitness Enthusiast', 'Finding a place that combines faith with fitness has been life-changing. The support here is incredible.', 5, true, true),
('Emily Rodriguez', 'Nutritionist', 'The holistic approach to wellness here is exactly what I was looking for. It''s more than just physical health.', 5, false, true)
ON CONFLICT DO NOTHING;

-- ========================================
-- PERFORMANCE OPTIMIZATIONS
-- ========================================

-- Create a function to cache user membership status for better RLS performance
CREATE OR REPLACE FUNCTION get_user_membership_status()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT status 
        FROM public.user_memberships 
        WHERE user_id = auth.uid() 
        AND status = 'active' 
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ========================================
-- ANALYZE TABLES FOR BETTER QUERY PLANNING
-- ========================================

-- Analyze all tables to update statistics for better query planning
ANALYZE public.profiles;
ANALYZE public.posts;
ANALYZE public.resources;
ANALYZE public.generated_content;
ANALYZE public.testimonials;
ANALYZE public.community_posts;
ANALYZE public.comments;
ANALYZE public.prayer_requests;
ANALYZE public.wellness_journals;
ANALYZE public.wellness_goals;
ANALYZE public.newsletter_subscriptions;
ANALYZE public.membership_tiers;
ANALYZE public.user_memberships;
ANALYZE public.events;
ANALYZE public.event_registrations;
ANALYZE public.page_views;
ANALYZE public.resource_interactions;

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check all tables were created
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check RLS is enabled on all tables
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
  'profiles', 'posts', 'resources', 'generated_content', 'testimonials',
  'community_posts', 'comments', 'prayer_requests', 'wellness_journals',
  'wellness_goals', 'newsletter_subscriptions', 'membership_tiers',
  'user_memberships', 'events', 'event_registrations', 'page_views',
  'resource_interactions'
)
ORDER BY tablename;

-- Check policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check indexes were created
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ========================================
-- SUCCESS MESSAGE
-- ========================================

-- Display success message
DO $$
BEGIN
    RAISE NOTICE '✅ Database setup completed successfully!';
    RAISE NOTICE '📊 Tables created: 17';
    RAISE NOTICE '🔒 RLS enabled on all tables';
    RAISE NOTICE '📋 Policies created for secure access';
    RAISE NOTICE '⚡ Indexes created for performance';
    RAISE NOTICE '🔄 Triggers created for automatic updates';
    RAISE NOTICE '📝 Sample data inserted';
    RAISE NOTICE '🎯 Ready for holisticwellnessmindbodyspirit.com!';
END $$; 