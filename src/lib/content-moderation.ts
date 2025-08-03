import OpenAI from 'openai'

// Initialize OpenAI client only if API key is available
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

// Prohibited content categories
const PROHIBITED_KEYWORDS = [
  // Explicit content
  'explicit', 'sexual', 'adult', 'pornographic', 'erotic',
  // Violence and harmful content
  'violence', 'violent', 'kill', 'murder', 'suicide', 'self-harm', 'cutting',
  // Drugs and illegal substances
  'illegal drugs', 'cocaine', 'heroin', 'methamphetamine', 'cannabis abuse',
  // Hate speech and discrimination
  'hate speech', 'racist', 'discrimination', 'bigotry', 'homophobic',
  // False medical claims
  'cure cancer', 'miracle cure', 'instant healing', 'replace medication',
  // Extremist content
  'extremist', 'radical', 'terrorist', 'cult',
  // Financial scams
  'get rich quick', 'guaranteed money', 'pyramid scheme',
  // Non-Christian religious promotion
  'convert to islam', 'convert to hinduism', 'abandon christianity',
]

// Required Christian values and themes
const REQUIRED_CHRISTIAN_THEMES = [
  'faith', 'god', 'jesus', 'christ', 'biblical', 'scripture', 'christian',
  'prayer', 'worship', 'holy spirit', 'lord', 'gospel', 'salvation'
]

interface ModerationResult {
  isApproved: boolean
  flaggedReasons: string[]
  confidence: number
  suggestions?: string[]
}

export async function moderateContent(content: string, section: string): Promise<ModerationResult> {
  const results: ModerationResult = {
    isApproved: true,
    flaggedReasons: [],
    confidence: 0,
    suggestions: []
  }

  try {
    // 1. OpenAI Moderation API Check
    const moderationResult = await checkOpenAIModerationAPI(content)
    if (!moderationResult.isApproved) {
      results.isApproved = false
      results.flaggedReasons.push(...moderationResult.flaggedReasons)
    }

    // 2. Keyword Filtering
    const keywordResult = checkProhibitedKeywords(content)
    if (!keywordResult.isApproved) {
      results.isApproved = false
      results.flaggedReasons.push(...keywordResult.flaggedReasons)
    }

    // 3. Christian Content Validation
    const christianResult = validateChristianContent(content, section)
    if (!christianResult.isApproved) {
      results.isApproved = false
      results.flaggedReasons.push(...christianResult.flaggedReasons)
    }

    // 4. Medical Claims Check
    const medicalResult = checkMedicalClaims(content)
    if (!medicalResult.isApproved) {
      results.isApproved = false
      results.flaggedReasons.push(...medicalResult.flaggedReasons)
    }

    // 5. AI Content Review
    const aiReviewResult = await performAIContentReview(content, section)
    if (!aiReviewResult.isApproved) {
      results.isApproved = false
      results.flaggedReasons.push(...aiReviewResult.flaggedReasons)
    }

    // Calculate overall confidence
    results.confidence = calculateConfidenceScore(results.flaggedReasons.length)

    // Generate suggestions for improvement if content is flagged
    if (!results.isApproved) {
      results.suggestions = generateImprovementSuggestions(results.flaggedReasons, section)
    }

  } catch (error) {
    console.error('Content moderation error:', error)
    // Fail safe: reject content if moderation fails
    results.isApproved = false
    results.flaggedReasons.push('Moderation system error - content rejected for safety')
    results.confidence = 0
  }

  return results
}

async function checkOpenAIModerationAPI(content: string): Promise<ModerationResult> {
  try {
    const openai = getOpenAIClient()
    const response = await openai.moderations.create({
      input: content,
    })

    const result = response.results[0]
    const flaggedCategories: string[] = []

    if (result.flagged) {
      Object.entries(result.categories).forEach(([category, flagged]) => {
        if (flagged) {
          flaggedCategories.push(`OpenAI flagged: ${category}`)
        }
      })
    }

    return {
      isApproved: !result.flagged,
      flaggedReasons: flaggedCategories,
      confidence: result.flagged ? 0.9 : 0.1
    }
  } catch (error) {
    console.error('OpenAI moderation error:', error)
    return {
      isApproved: false,
      flaggedReasons: ['OpenAI moderation API error'],
      confidence: 0
    }
  }
}

function checkProhibitedKeywords(content: string): ModerationResult {
  const contentLower = content.toLowerCase()
  const flaggedKeywords = PROHIBITED_KEYWORDS.filter(keyword => 
    contentLower.includes(keyword.toLowerCase())
  )

  return {
    isApproved: flaggedKeywords.length === 0,
    flaggedReasons: flaggedKeywords.map(keyword => `Prohibited keyword: ${keyword}`),
    confidence: flaggedKeywords.length > 0 ? 0.8 : 0.1
  }
}

function validateChristianContent(content: string, section: string): ModerationResult {
  const contentLower = content.toLowerCase()
  const hasChristianThemes = REQUIRED_CHRISTIAN_THEMES.some(theme => 
    contentLower.includes(theme.toLowerCase())
  )

  // Stricter requirements for biblical-wellness section
  const isStrictSection = section === 'biblical-wellness'
  const minThemeCount = isStrictSection ? 2 : 1
  const themeCount = REQUIRED_CHRISTIAN_THEMES.filter(theme => 
    contentLower.includes(theme.toLowerCase())
  ).length

  const flaggedReasons = []
  if (!hasChristianThemes) {
    flaggedReasons.push('Content lacks Christian themes and references')
  }
  if (isStrictSection && themeCount < minThemeCount) {
    flaggedReasons.push('Biblical wellness content requires stronger Christian foundation')
  }

  return {
    isApproved: hasChristianThemes && themeCount >= minThemeCount,
    flaggedReasons,
    confidence: hasChristianThemes ? 0.2 : 0.7
  }
}

function checkMedicalClaims(content: string): ModerationResult {
  const problematicClaims = [
    /cure\s+(cancer|diabetes|heart disease|aids)/gi,
    /guaranteed\s+(healing|cure)/gi,
    /miracle\s+(cure|healing)/gi,
    /replace\s+(medication|doctor|treatment)/gi,
    /instant\s+(healing|cure)/gi,
    /FDA\s+approved/gi
  ]

  const flaggedClaims = problematicClaims.filter(pattern => pattern.test(content))

  return {
    isApproved: flaggedClaims.length === 0,
    flaggedReasons: flaggedClaims.length > 0 ? ['Contains potentially harmful medical claims'] : [],
    confidence: flaggedClaims.length > 0 ? 0.9 : 0.1
  }
}

async function performAIContentReview(content: string, section: string): Promise<ModerationResult> {
  try {
    const reviewPrompt = `
As a Christian content moderator, review this content for a holistic wellness website section: ${section}

Content to review:
"${content}"

Check for:
1. Alignment with biblical Christian values
2. Appropriate wellness advice (no dangerous medical claims)
3. Positive, encouraging tone
4. Theological accuracy
5. Safety and appropriateness for all ages

Respond with:
- APPROVED or REJECTED
- Specific concerns if any
- Confidence level (1-10)

Be strict but fair. Reject anything that could harm readers physically, spiritually, or emotionally.
`

    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Christian content moderator focused on safety, biblical accuracy, and appropriate wellness guidance.'
        },
        {
          role: 'user',
          content: reviewPrompt
        }
      ],
      max_tokens: 300,
      temperature: 0.1,
    })

    const review = response.choices[0]?.message?.content || ''
    const isApproved = review.toUpperCase().includes('APPROVED')
    const flaggedReasons = isApproved ? [] : [`AI Review: ${review}`]

    return {
      isApproved,
      flaggedReasons,
      confidence: isApproved ? 0.2 : 0.8
    }
  } catch (error) {
    console.error('AI content review error:', error)
    return {
      isApproved: false,
      flaggedReasons: ['AI content review failed - rejected for safety'],
      confidence: 0.5
    }
  }
}

function calculateConfidenceScore(flagCount: number): number {
  if (flagCount === 0) return 0.95
  if (flagCount === 1) return 0.7
  if (flagCount === 2) return 0.4
  return 0.1
}

function generateImprovementSuggestions(flaggedReasons: string[], section: string): string[] {
  const suggestions = []

  if (flaggedReasons.some(reason => reason.includes('Christian themes'))) {
    suggestions.push('Include more biblical references, scripture verses, or Christian perspectives')
  }

  if (flaggedReasons.some(reason => reason.includes('medical claims'))) {
    suggestions.push('Avoid absolute medical claims - use phrases like "may help" or "consult your doctor"')
  }

  if (flaggedReasons.some(reason => reason.includes('OpenAI flagged'))) {
    suggestions.push('Content may contain inappropriate language or themes - revise for family-friendly audience')
  }

  if (flaggedReasons.some(reason => reason.includes('keyword'))) {
    suggestions.push('Remove inappropriate language and focus on positive, encouraging content')
  }

  // Section-specific suggestions
  if (section === 'biblical-wellness') {
    suggestions.push('Ensure content strongly connects wellness practices to biblical principles')
  }

  return suggestions
}