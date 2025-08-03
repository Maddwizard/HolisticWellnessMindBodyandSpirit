import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY

    if (!BEEHIIV_PUBLICATION_ID || !BEEHIIV_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Beehiiv credentials not configured' },
        { status: 500 }
      )
    }

    // First, get all posts to find the one with matching slug
    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/posts?platform=web&status=confirmed&limit=100&expand=free_web_content`,
      {
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!beehiivResponse.ok) {
      const errorData = await beehiivResponse.json().catch(() => ({}))
      console.error('Beehiiv API error:', errorData)
      return NextResponse.json(
        { success: false, message: 'Failed to fetch blog post' },
        { status: 500 }
      )
    }

    const data = await beehiivResponse.json()
    
    // Find post by slug (assuming slug is derived from title or ID)
    const post = data.data.find((post: { title?: string; id: string }) => {
      const slugFromTitle = post.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      return slugFromTitle === params.slug || post.id === params.slug
    })

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: post
    })

  } catch (error) {
    console.error('Blog post API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}