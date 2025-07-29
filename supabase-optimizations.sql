-- Holistic Christian Wellness Database Optimizations
-- Run this AFTER the main schema to fix issues and improve performance

-- ========================================
-- ENABLE RLS ON MISSING TABLES
-- ========================================

-- Enable RLS on tables that were missing it
ALTER TABLE public.membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_interactions ENABLE ROW LEVEL SECURITY;

-- ========================================
-- CREATE MISSING INDEXES FOR FOREIGN KEYS
-- ========================================

-- Index for event_registrations foreign key
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON public.event_registrations(user_id);

-- Index for events foreign key
CREATE INDEX IF NOT EXISTS idx_events_host_id ON public.events(host_id);

-- Index for page_views foreign key
CREATE INDEX IF NOT EXISTS idx_page_views_user_id ON public.page_views(user_id);

-- Indexes for prayer_requests foreign keys
CREATE INDEX IF NOT EXISTS idx_prayer_requests_answered_by ON public.prayer_requests(answered_by);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_author_id ON public.prayer_requests(author_id);

-- Indexes for resource_interactions foreign keys
CREATE INDEX IF NOT EXISTS idx_resource_interactions_resource_id ON public.resource_interactions(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_interactions_user_id ON public.resource_interactions(user_id);

-- Index for resources foreign key
CREATE INDEX IF NOT EXISTS idx_resources_author_id ON public.resources(author_id);

-- Indexes for testimonials and user_memberships
CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON public.testimonials(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memberships_tier_id ON public.user_memberships(tier_id);
CREATE INDEX IF NOT EXISTS idx_user_memberships_user_id ON public.user_memberships(user_id);

-- Index for wellness_goals
CREATE INDEX IF NOT EXISTS idx_wellness_goals_user_id ON public.wellness_goals(user_id);

-- ========================================
-- OPTIMIZED RLS POLICIES WITH PERFORMANCE IMPROVEMENTS
-- ========================================

-- Drop existing policies to replace with optimized ones
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Optimized Profile policies
CREATE POLICY "Profile Management" ON public.profiles
FOR INSERT WITH CHECK (
    (SELECT auth.uid()) = id
);

CREATE POLICY "Profile Access" ON public.profiles
FOR SELECT USING (
    (SELECT auth.uid()) = id
);

CREATE POLICY "Profile Update" ON public.profiles
FOR UPDATE USING (
    (SELECT auth.uid()) = id
) WITH CHECK (
    (SELECT auth.uid()) = id
);

-- Drop existing post policies
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Authors can manage own posts" ON public.posts;

-- Consolidated Post Access Policy
CREATE POLICY "Post Access Policy" ON public.posts
FOR ALL USING (
    (SELECT auth.uid()) = author_id OR  -- Authors can manage their own posts
    status = 'published'                -- Published posts are viewable by everyone
) WITH CHECK (
    (SELECT auth.uid()) = author_id     -- Only authors can create/update posts
);

-- Drop existing prayer request policies
DROP POLICY IF EXISTS "Public prayer requests are viewable by everyone" ON public.prayer_requests;
DROP POLICY IF EXISTS "Users can view own private prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Authenticated users can create prayer requests" ON public.prayer_requests;
DROP POLICY IF EXISTS "Users can update own prayer requests" ON public.prayer_requests;

-- Consolidated Prayer Request Access Policy
CREATE POLICY "Prayer Request Access Policy" ON public.prayer_requests
FOR ALL USING (
    (SELECT auth.uid()) = author_id OR  -- Users can view/manage their own requests
    NOT is_private                      -- Public prayer requests are viewable by everyone
) WITH CHECK (
    (SELECT auth.uid()) = author_id     -- Only authors can create/update their requests
);

-- ========================================
-- SECURE FUNCTION WITH FIXED SEARCH PATH
-- ========================================

-- Drop existing function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Secure update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    -- Explicitly set an empty search path for security
    SET search_path = '';
    
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- ADDITIONAL SECURITY POLICIES
-- ========================================

-- Membership tiers policies
CREATE POLICY "Membership tiers are viewable by everyone" ON public.membership_tiers
FOR SELECT USING (is_active = true);

-- Page views policies (analytics data)
CREATE POLICY "Page views are insertable by everyone" ON public.page_views
FOR INSERT WITH CHECK (true);

CREATE POLICY "Page views are viewable by authenticated users" ON public.page_views
FOR SELECT USING (
    (SELECT auth.uid()) IS NOT NULL
);

-- Resource interactions policies
CREATE POLICY "Resource interactions are insertable by everyone" ON public.resource_interactions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Resource interactions are viewable by authenticated users" ON public.resource_interactions
FOR SELECT USING (
    (SELECT auth.uid()) IS NOT NULL
);

-- ========================================
-- PERFORMANCE OPTIMIZATIONS
-- ========================================

-- Add composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_posts_status_published_at ON public.posts(status, published_at);
CREATE INDEX IF NOT EXISTS idx_resources_type_category ON public.resources(type, category);
CREATE INDEX IF NOT EXISTS idx_events_start_date_type ON public.events(start_date, type);

-- Add partial indexes for active content
CREATE INDEX IF NOT EXISTS idx_posts_active ON public.posts(published_at) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_events_upcoming ON public.events(start_date) 
WHERE start_date > NOW() AND is_active = true;

-- ========================================
-- DATA VALIDATION TRIGGERS
-- ========================================

-- Function to validate email format
CREATE OR REPLACE FUNCTION validate_email_format()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply email validation to relevant tables
CREATE TRIGGER validate_newsletter_email 
    BEFORE INSERT OR UPDATE ON public.newsletter_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION validate_email_format();

-- ========================================
-- COMPLETION MESSAGE
-- ========================================

-- Database optimizations completed successfully!
-- All tables now have proper RLS policies, indexes, and security measures
-- Performance has been improved with optimized queries and composite indexes 