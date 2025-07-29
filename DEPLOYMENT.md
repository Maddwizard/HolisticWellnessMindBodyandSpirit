# Deployment Guide - Holistic Christian Wellness Website

This guide provides step-by-step instructions for deploying the Holistic Christian Wellness website to production using Vercel, Supabase, and other recommended services.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Holistic Christian Wellness website"
   git branch -M main
   git remote add origin https://github.com/yourusername/holistic-christian-wellness.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Set environment variables
   - Deploy

## 🗄️ Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login
3. Click "New Project"
4. Choose organization and project name
5. Set database password
6. Choose region (closest to your users)
7. Click "Create new project"

### 2. Database Schema

Run these SQL commands in Supabase SQL Editor:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES public.profiles(id),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[],
  featured_image TEXT
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE public.resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('article', 'video', 'podcast', 'course', 'guide')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  preferences TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Posts are viewable by everyone" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "Authors can insert posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Resources are viewable by everyone" ON public.resources
  FOR SELECT USING (true);

CREATE POLICY "Newsletter subscriptions are insertable by everyone" ON public.newsletter_subscriptions
  FOR INSERT WITH CHECK (true);
```

### 3. Get API Keys

1. Go to Settings > API in your Supabase dashboard
2. Copy the Project URL and anon/public key
3. Add to your environment variables

## 🔧 Environment Variables

Create `.env.local` for local development:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Optional: Email (for newsletter)
RESEND_API_KEY=your_resend_api_key
```

## 📧 Email Setup (Optional)

### Resend.com Setup

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key
4. Add to environment variables

### Email Templates

Create email templates for:
- Welcome emails
- Newsletter
- Password reset
- Account verification

## 🔍 SEO & Analytics Setup

### Google Analytics

1. Create Google Analytics 4 property
2. Get Measurement ID
3. Add to environment variables
4. Update `app/layout.tsx` with GA script

### Google Search Console

1. Add your domain to Search Console
2. Verify ownership
3. Submit sitemap
4. Monitor performance

### Social Media

1. Create Facebook Pixel
2. Set up Twitter Card
3. Configure Open Graph images
4. Test social sharing

## 🚀 Performance Optimization

### Image Optimization

1. Use Next.js Image component
2. Optimize image formats (WebP, AVIF)
3. Implement lazy loading
4. Use appropriate image sizes

### Caching

1. Configure Vercel edge caching
2. Set up CDN for static assets
3. Implement service worker (optional)

### Monitoring

1. Set up Vercel Analytics
2. Configure error tracking (Sentry)
3. Monitor Core Web Vitals
4. Set up uptime monitoring

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CSP policy implemented
- [ ] Rate limiting enabled
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Regular security updates

## 📱 Mobile Optimization

- [ ] Responsive design tested
- [ ] Touch targets optimized
- [ ] Mobile navigation working
- [ ] Performance on mobile networks
- [ ] PWA features implemented

## 🧪 Testing

### Pre-deployment Checklist

- [ ] All pages load correctly
- [ ] Forms work properly
- [ ] Navigation functions
- [ ] Images load
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] SEO meta tags present
- [ ] Social sharing works

### Post-deployment Testing

- [ ] Monitor error logs
- [ ] Check analytics
- [ ] Test user flows
- [ ] Verify email functionality
- [ ] Test payment processing
- [ ] Monitor performance

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📊 Monitoring & Maintenance

### Regular Tasks

- [ ] Monitor error logs
- [ ] Update dependencies
- [ ] Backup database
- [ ] Review analytics
- [ ] Test user flows
- [ ] Update content
- [ ] Security audits

### Performance Monitoring

- [ ] Core Web Vitals
- [ ] Page load times
- [ ] Server response times
- [ ] Database performance
- [ ] CDN performance

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Environment Variables**
   - Verify all required variables set
   - Check variable names match code
   - Restart deployment after changes

3. **Database Connection**
   - Verify Supabase URL and keys
   - Check RLS policies
   - Test connection in Supabase dashboard

4. **Performance Issues**
   - Optimize images
   - Check bundle size
   - Review third-party scripts
   - Monitor Core Web Vitals

## 📞 Support

For deployment issues:
- Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

---

**Your Holistic Christian Wellness website is now ready to transform lives!** 🙏 