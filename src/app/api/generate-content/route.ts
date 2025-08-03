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

export async function POST(request: NextRequest) {
  try {
    const { section, contentType, customPrompt } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    if (!section) {
      return NextResponse.json(
        { success: false, message: 'Section is required' },
        { status: 400 }
      )
    }

    // Define section-specific prompts
    const sectionPrompts = {
      'biblical-wellness': `Generate inspiring content about Biblical wellness and Christian health principles. Focus on how faith and wellness intersect, including Bible verses that support healthy living, and practical applications of Christian values to physical and mental health.`,
      
      'nutrition': `Create informative content about holistic nutrition from a Christian perspective. Include natural foods mentioned in the Bible, seasonal eating, mindful consumption as stewardship of God's creation, and how proper nutrition supports spiritual well-being.`,
      
      'exercise': `Generate content about physical fitness and exercise from a Christian worldview. Focus on the body as a temple, finding joy in movement, community-based fitness activities, and how physical health supports spiritual disciplines like prayer and worship.`,
      
      'mental-health': `Create compassionate content about mental health and emotional wellness rooted in Christian faith. Address topics like anxiety, depression, stress management, finding peace in God, the importance of community support, and biblical approaches to healing.`,
      
      'community': `Generate content about building strong Christian wellness communities. Focus on fellowship, accountability, shared wellness goals, supporting each other's health journeys, and creating inclusive spaces for all stages of wellness.`,
      
      'resources': `Create helpful resource content for Christian wellness seekers. Include book recommendations, Bible study guides related to health, prayer practices for wellness, seasonal wellness activities, and practical tools for holistic living.`
    }

    // Determine content type and structure
    let prompt = ''
    const basePrompt = sectionPrompts[section as keyof typeof sectionPrompts] || 'Generate helpful wellness content from a Christian perspective.'

    if (customPrompt) {
      prompt = `${basePrompt}\n\nSpecific request: ${customPrompt}`
    } else {
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
    }

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a Christian wellness expert who creates inspiring, biblically-grounded content about holistic health. Your writing is warm, encouraging, and practical while maintaining theological accuracy. 

IMPORTANT GUIDELINES:
- Always include relevant Bible verses when appropriate
- Focus on the intersection of faith and wellness
- Never make absolute medical claims (use "may help", "could support", etc.)
- Avoid any inappropriate, harmful, or non-Christian content
- Keep content family-friendly and encouraging
- Base all advice on biblical principles
- Include disclaimers for medical advice ("consult your healthcare provider")
- Promote only safe, proven wellness practices`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.3, // Lower temperature for more consistent, safer output
    })

    const generatedContent = completion.choices[0]?.message?.content

    if (!generatedContent) {
      return NextResponse.json(
        { success: false, message: 'Failed to generate content' },
        { status: 500 }
      )
    }

    // Moderate the generated content
    const moderationResult = await moderateContent(generatedContent, section)
    
    if (!moderationResult.isApproved) {
      console.log('Content rejected by moderation:', {
        section,
        flaggedReasons: moderationResult.flaggedReasons,
        confidence: moderationResult.confidence
      })

      return NextResponse.json({
        success: false,
        message: 'Generated content did not pass safety review',
        flaggedReasons: moderationResult.flaggedReasons,
        suggestions: moderationResult.suggestions,
        retryRecommended: true
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      content: generatedContent,
      section,
      contentType: contentType || 'general',
      moderationScore: moderationResult.confidence,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Content generation error:', error)
    
    if (error instanceof Error && error.message.includes('API key')) {
      return NextResponse.json(
        { success: false, message: 'Invalid OpenAI API key' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to generate content' },
      { status: 500 }
    )
  }
}