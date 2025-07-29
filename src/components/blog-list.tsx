'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  subtitle?: string
  created: number
  displayed_date?: number
  web_url?: string
  thumbnail_url?: string
  free_web_content?: string
}

interface BlogListResponse {
  success: boolean
  data: BlogPost[]
  pagination: {
    page: number
    limit: number
    total_results: number
    total_pages: number
  }
}

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<BlogListResponse['pagination'] | null>(null)

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/blog?page=${page}&limit=9`)
      const data: BlogListResponse = await response.json()
      
      if (data.success) {
        setPosts(data.data)
        setPagination(data.pagination)
      } else {
        setError(data.message || 'Failed to fetch blog posts')
      }
    } catch (err) {
      setError('Failed to fetch blog posts')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const createSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const extractTextFromHtml = (html: string, maxLength: number = 150) => {
    const div = document.createElement('div')
    div.innerHTML = html
    const text = div.textContent || div.innerText || ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Posts</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => fetchPosts(currentPage)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {post.thumbnail_url && (
              <div className="h-48 bg-gray-200">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <time dateTime={new Date(post.created * 1000).toISOString()}>
                  {formatDate(new Date(post.created * 1000))}
                </time>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                <Link
                  href={`/blog/${createSlugFromTitle(post.title)}`}
                  className="hover:text-green-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              {post.subtitle && (
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.subtitle}
                </p>
              )}
              
              {post.free_web_content && (
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {extractTextFromHtml(post.free_web_content)}
                </p>
              )}
              
              <Link
                href={`/blog/${createSlugFromTitle(post.title)}`}
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Read More
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {pagination && pagination.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <span className="text-gray-600">
            Page {pagination.page} of {pagination.total_pages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= pagination.total_pages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}