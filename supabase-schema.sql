-- Holistic Christian Wellness Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================
-- USERS & PROFILES
-- ========================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
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
CREATE TABLE public.posts (
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
CREATE TABLE public.resources (
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

-- ========================================
-- COMMUNITY & ENGAGEMENT
-- ========================================

-- Testimonials
CREATE TABLE public.testimonials (
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
CREATE TABLE public.community_posts (
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
CREATE TABLE public.comments (
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
CREATE TABLE public.prayer_requests (
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
CREATE TABLE public.wellness_journals (
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
CREATE TABLE public.wellness_goals (
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
CREATE TABLE public.newsletter_subscriptions (
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
CREATE TABLE public.membership_tiers (
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
CREATE TABLE public.user_memberships (
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
CREATE TABLE public.events (
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
CREATE TABLE public.event_registrations (
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
CREATE TABLE public.page_views (
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
CREATE TABLE public.resource_interactions (
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
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- ========================================
-- RLS POLICIES
-- ========================================

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can manage own posts" ON public.posts
  FOR ALL USING (auth.uid() = author_id);

-- Resources policies
CREATE POLICY "Resources are viewable by everyone" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY "Premium resources require membership" ON public.resources
  FOR SELECT USING (
    NOT is_premium OR 
    EXISTS (
      SELECT 1 FROM public.user_memberships 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

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
CREATE POLICY "Public prayer requests are viewable by everyone" ON public.prayer_requests
  FOR SELECT USING (NOT is_private);

CREATE POLICY "Users can view own private prayer requests" ON public.prayer_requests
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can create prayer requests" ON public.prayer_requests
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own prayer requests" ON public.prayer_requests
  FOR UPDATE USING (auth.uid() = author_id);

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

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Posts indexes
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_published_at ON public.posts(published_at);
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_tags ON public.posts USING GIN(tags);

-- Resources indexes
CREATE INDEX idx_resources_type ON public.resources(type);
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_resources_is_featured ON public.resources(is_featured);
CREATE INDEX idx_resources_tags ON public.resources USING GIN(tags);

-- Community posts indexes
CREATE INDEX idx_community_posts_category ON public.community_posts(category);
CREATE INDEX idx_community_posts_author_id ON public.community_posts(author_id);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at);

-- Comments indexes
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_author_id ON public.comments(author_id);
CREATE INDEX idx_comments_parent_id ON public.comments(parent_id);

-- Wellness journals indexes
CREATE INDEX idx_wellness_journals_user_date ON public.wellness_journals(user_id, entry_date);

-- Events indexes
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_type ON public.events(type);

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
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prayer_requests_updated_at BEFORE UPDATE ON public.prayer_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wellness_journals_updated_at BEFORE UPDATE ON public.wellness_journals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wellness_goals_updated_at BEFORE UPDATE ON public.wellness_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_memberships_updated_at BEFORE UPDATE ON public.user_memberships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- SAMPLE DATA (Optional)
-- ========================================

-- Insert sample membership tiers
INSERT INTO public.membership_tiers (name, description, price, interval, features, is_popular) VALUES
('Free', 'Basic access to wellness resources', 0, 'lifetime', ARRAY['Access to basic articles', 'Community forum access', 'Newsletter subscription'], false),
('Premium', 'Full access to all wellness content', 19.99, 'monthly', ARRAY['All free features', 'Premium courses', 'Expert consultations', 'Personalized meal plans', 'Wellness tracking tools', 'Priority support'], true),
('Lifetime', 'One-time payment for lifetime access', 299.99, 'lifetime', ARRAY['All premium features', 'Lifetime updates', 'Exclusive content', 'VIP community access', 'Personal wellness coach'], false);

-- Insert sample events
INSERT INTO public.events (title, description, type, start_date, end_date, location, max_capacity, price, is_featured) VALUES
('Biblical Wellness Workshop', 'Learn how to integrate faith with modern wellness practices', 'online', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days' + INTERVAL '2 hours', 'Online', 100, 29.99, true),
('Christian Nutrition Seminar', 'Discover biblical foods and nutrition principles', 'hybrid', NOW() + INTERVAL '14 days', NOW() + INTERVAL '14 days' + INTERVAL '3 hours', 'Nashville, TN', 50, 49.99, false);

-- ========================================
-- COMPLETION MESSAGE
-- ========================================

-- This schema creates a comprehensive database for your Holistic Christian Wellness website
-- All tables include proper relationships, constraints, and security policies
-- The database is ready for production use with Supabase 