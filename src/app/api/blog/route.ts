import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    
    const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID
    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY

    if (!BEEHIIV_PUBLICATION_ID || !BEEHIIV_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Beehiiv credentials not configured' },
        { status: 500 }
      )
    }

    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/posts?platform=web&status=confirmed&limit=${limit}&page=${page}&expand=free_web_content`,
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
        { success: false, message: 'Failed to fetch blog posts' },
        { status: 500 }
      )
    }

    const data = await beehiivResponse.json()
    
    return NextResponse.json({
      success: true,
      data: data.data,
      pagination: {
        page: data.page,
        limit: data.limit,
        total_results: data.total_results,
        total_pages: data.total_pages
      }
    })

  } catch (error) {
    console.error('Blog API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}