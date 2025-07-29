import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface BlogPostProps {
  post: {
    id: string
    title: string
    subtitle?: string
    created: number
    displayed_date?: number
    web_url?: string
    thumbnail_url?: string
    free_web_content?: string
  }
}

export function BlogPost({ post }: BlogPostProps) {
  const publishDate = new Date(post.displayed_date ? post.displayed_date * 1000 : post.created * 1000)

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        {/* Back to blog link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          {post.subtitle && (
            <p className="text-xl text-gray-600 mb-6">
              {post.subtitle}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <time dateTime={publishDate.toISOString()}>
              Published on {formatDate(publishDate)}
            </time>
            
            {post.web_url && (
              <a
                href={post.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                View on Beehiiv →
              </a>
            )}
          </div>
        </header>

        {/* Featured image */}
        {post.thumbnail_url && (
          <div className="mb-8">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post content */}
        {post.free_web_content && (
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 hover:prose-a:text-green-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.free_web_content }}
          />
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-500">
              Originally published on Beehiiv
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/blog"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                ← More Articles
              </Link>
              
              <Link
                href="/newsletter"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}