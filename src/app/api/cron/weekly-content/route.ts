import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { moderateContent } from '@/lib/content-moderation'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

// Initialize OpenAI client only if API key is available
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

const createSupabaseClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceRoleKey) {
    return null
  }
  
  // Dynamically import and create Supabase client only when needed
  try {
    const { createClient } = await import('@supabase/supabase-js')
    return createClient(supabaseUrl, serviceRoleKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null
  }
}

// This endpoint can be called by cron services like Vercel Cron or external schedulers
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from an authorized source (you can add auth headers)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    const sections = [
      'biblical-wellness',
      'nutrition', 
      'exercise',
      'mental-health',
      'community',
      'resources'
    ]

    const contentTypes = ['tips', 'article', 'devotional', 'quote']
    const results = []

    // Generate content for each section
    for (const section of sections) {
      // Randomly select a content type for variety
      const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)]
      
      try {
        const content = await generateContentForSection(section, contentType)
        
        // Moderate the generated content
        const moderationResult = await moderateContent(content, section)
        
        if (!moderationResult.isApproved) {
          console.log(`Content rejected for ${section}:`, moderationResult.flaggedReasons)
          results.push({ 
            section, 
            contentType, 
            success: false, 
            error: 'Content failed moderation',
            flaggedReasons: moderationResult.flaggedReasons
          })
          continue
        }
        
        // Store approved content in database
        const supabase = await createSupabaseClient()
        if (!supabase) {
          results.push({ section, contentType, success: false, error: 'Database not configured' })
          continue
        }
        
        const { error } = await supabase
          .from('generated_content')
          .insert({
            section,
            content_type: contentType,
            content,
            moderation_score: moderationResult.confidence,
            flagged_reasons: moderationResult.flaggedReasons,
            generated_at: new Date().toISOString(),
            is_published: false // Admin can review and publish
          })

        if (error) {
          console.error(`Database error for ${section}:`, error)
          results.push({ section, contentType, success: false, error: error instanceof Error ? error.message : 'Unknown error' })
        } else {
          results.push({ 
            section, 
            contentType, 
            success: true, 
            moderationScore: moderationResult.confidence 
          })
        }
      } catch (error) {
        console.error(`Content generation error for ${section}:`, error)
        results.push({ section, contentType, success: false, error: error instanceof Error ? error.message : 'Unknown error' })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Weekly content generation completed',
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Weekly content generation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate weekly content'
    }, { status: 500 })
  }
}

async function generateContentForSection(section: string, contentType: string) {
  const sectionPrompts = {
    'biblical-wellness': `Generate inspiring content about Biblical wellness and Christian health principles. Focus on how faith and wellness intersect, including Bible verses that support healthy living, and practical applications of Christian values to physical and mental health.`,
    
    'nutrition': `Create informative content about holistic nutrition from a Christian perspective. Include natural foods mentioned in the Bible, seasonal eating, mindful consumption as stewardship of God's creation, and how proper nutrition supports spiritual well-being.`,
    
    'exercise': `Generate content about physical fitness and exercise from a Christian worldview. Focus on the body as a temple, finding joy in movement, community-based fitness activities, and how physical health supports spiritual disciplines like prayer and worship.`,
    
    'mental-health': `Create compassionate content about mental health and emotional wellness rooted in Christian faith. Address topics like anxiety, depression, stress management, finding peace in God, the importance of community support, and biblical approaches to healing.`,
    
    'community': `Generate content about building strong Christian wellness communities. Focus on fellowship, accountability, shared wellness goals, supporting each other's health journeys, and creating inclusive spaces for all stages of wellness.`,
    
    'resources': `Create helpful resource content for Christian wellness seekers. Include book recommendations, Bible study guides related to health, prayer practices for wellness, seasonal wellness activities, and practical tools for holistic living.`
  }

  const basePrompt = sectionPrompts[section as keyof typeof sectionPrompts]
  let prompt = ''

  switch (contentType) {
    case 'tips':
      prompt = `${basePrompt}\n\nGenerate 5-7 practical tips in a bulleted list format. Make each tip actionable and include relevant Bible verses where appropriate.`
      break
    case 'article':
      prompt = `${basePrompt}\n\nWrite a comprehensive 400-500 word article with a compelling title, introduction, main points, and conclusion. Include relevant scripture references.`
      break
    case 'devotional':
      prompt = `${basePrompt}\n\nCreate a daily devotional with a Bible verse, reflection (200-300 words), and a practical application for wellness. Include a closing prayer.`
      break
    case 'quote':
      prompt = `${basePrompt}\n\nGenerate an inspiring quote or affirmation related to this wellness area, rooted in Christian faith and biblical principles.`
      break
    default:
      prompt = `${basePrompt}\n\nGenerate helpful, engaging content that would be valuable for visitors to this section.`
  }

  const openai = getOpenAIClient()
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a Christian wellness expert who creates inspiring, biblically-grounded content about holistic health. Your writing is warm, encouraging, and practical while maintaining theological accuracy.

STRICT SAFETY GUIDELINES:
- Always include relevant Bible verses when appropriate
- Focus on the intersection of faith and wellness
- Never make absolute medical claims (use "may help", "could support", etc.)
- Avoid any inappropriate, harmful, or non-Christian content
- Keep content family-friendly and encouraging
- Base all advice on biblical principles
- Include disclaimers for medical advice ("consult your healthcare provider")
- Promote only safe, proven wellness practices
- Never suggest replacing professional medical care
- Avoid controversial topics not directly related to wellness
- Maintain theological accuracy and orthodox Christian beliefs`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 800,
    temperature: 0.2, // Very low temperature for consistent, safe output
  })

  return completion.choices[0]?.message?.content || ''
}