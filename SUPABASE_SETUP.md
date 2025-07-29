# Supabase Setup Guide

This guide will help you set up Supabase for your Natural Health Alternatives platform.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `natural-health-alternatives` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to execute the schema

## 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback`
3. Go to **Authentication** → **Providers**
4. Enable Email provider
5. Configure email templates if desired

## 6. Set Up Row Level Security (RLS)

The schema includes RLS policies. Make sure they're enabled:

1. Go to **Authentication** → **Policies**
2. Verify that RLS is enabled for all tables
3. Check that the policies are properly configured

## 7. Test Your Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/auth/signup`
3. Try creating a test account
4. Check the Supabase dashboard to see the user in **Authentication** → **Users**

## 8. Production Deployment

When deploying to production:

1. Update your environment variables with production values
2. Update the site URL in Supabase to your production domain
3. Add your production domain to redirect URLs
4. Consider setting up custom email templates

## 9. Database Tables Overview

Your schema includes these main tables:

- **profiles**: User profiles with wellness preferences
- **posts**: Blog articles and content
- **testimonials**: User testimonials and reviews
- **community_posts**: Forum discussions
- **wellness_journals**: Personal wellness tracking
- **prayer_requests**: Community prayer requests
- **events**: Wellness events and workshops

## 10. Security Best Practices

- Never commit your `.env.local` file to version control
- Use the service role key only on the server side
- Regularly rotate your API keys
- Monitor your database usage and costs
- Set up proper RLS policies for data security

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**: Check that your environment variables are correct
2. **CORS errors**: Verify your site URL and redirect URLs in Supabase settings
3. **RLS policy errors**: Make sure RLS policies are properly configured
4. **Email not sending**: Check your email provider settings in Supabase

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Next Steps

After setting up Supabase:

1. Customize the authentication flow
2. Add more database tables as needed
3. Set up real-time subscriptions
4. Configure storage for file uploads
5. Add analytics and monitoring 