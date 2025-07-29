# Beehiiv Newsletter Setup

This guide will help you set up Beehiiv integration for your HolisticWellness newsletter.

## Step 1: Create a Beehiiv Account

1. Go to [Beehiiv](https://beehiiv.com) and create an account
2. Set up your publication (newsletter)
3. Choose a publication name and URL

## Step 2: Get Your API Credentials

1. Go to your Beehiiv dashboard: https://app.beehiiv.com/settings/api
2. Copy your **Publication ID** (starts with `pub_`)
3. Copy your **API Key** (starts with `key_`)

## Step 3: Update Environment Variables

1. Open your `.env.local` file
2. Add your Beehiiv credentials:

```env
# Beehiiv Newsletter Configuration
BEEHIIV_PUBLICATION_ID=pub_your_publication_id_here
BEEHIIV_API_KEY=key_your_api_key_here
```

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/newsletter` page
3. Try subscribing with a test email
4. Check your Beehiiv dashboard to see the new subscriber

## Features Included

✅ **Functional signup form** with name and email fields
✅ **Success confirmation** with visual feedback
✅ **Error handling** for various scenarios
✅ **Loading states** during submission
✅ **Duplicate subscription handling**
✅ **UTM tracking** for analytics
✅ **Reusable component** for other pages

## API Endpoint

The newsletter signup uses the `/api/newsletter-signup` endpoint which:
- Validates email input
- Integrates with Beehiiv API
- Handles errors gracefully
- Returns appropriate responses

## Usage

You can add the newsletter signup to any page by importing and using the `NewsletterSignup` component:

```tsx
import { NewsletterSignup } from '@/components/newsletter-signup'

// In your component
<NewsletterSignup />
```

## Troubleshooting

- **"Newsletter service not configured"**: Check your environment variables
- **"Already subscribed"**: User is already in your Beehiiv list
- **API errors**: Verify your Beehiiv credentials are correct

## Next Steps

1. Customize your Beehiiv publication settings
2. Set up welcome emails
3. Create your first newsletter post
4. Add the newsletter signup component to other pages 