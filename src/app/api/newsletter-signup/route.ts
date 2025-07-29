import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Beehiiv API integration
    // You'll need to replace these with your actual Beehiiv credentials
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY

    if (!BEEHIIV_PUBLICATION_ID || !BEEHIIV_API_KEY) {
      console.error('Beehiiv credentials not configured')
      return NextResponse.json(
        { success: false, message: 'Newsletter service not configured' },
        { status: 500 }
      )
    }

    // Add subscriber to Beehiiv
    const beehiivResponse = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: name || undefined,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'website',
        utm_medium: 'newsletter_signup',
        utm_campaign: 'holistic_wellness',
      }),
    })

    if (!beehiivResponse.ok) {
      const errorData = await beehiivResponse.json().catch(() => ({}))
      console.error('Beehiiv API error:', errorData)
      
      // Handle specific Beehiiv errors
      if (beehiivResponse.status === 409) {
        return NextResponse.json(
          { success: false, message: 'You are already subscribed to our newsletter!' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe to newsletter' },
        { status: 500 }
      )
    }

    const beehiivData = await beehiivResponse.json()

    // Also save to Supabase database for analytics and backup
    try {
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .upsert({
          email,
          name: name || null,
          is_active: true,
          source: 'website',
          subscribed_at: new Date().toISOString(),
        })

      if (dbError) {
        console.error('Database save error:', dbError)
        // Don't fail the whole request if database save fails
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      // Don't fail the whole request if database is unavailable
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: beehiivData,
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 