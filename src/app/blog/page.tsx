import { Suspense } from 'react'
import { BlogList } from '@/components/blog-list'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Holistic Wellness Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover biblical wisdom, wellness tips, and holistic approaches to living your best life
            </p>
          </div>
          
          <Suspense fallback={
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
          }>
            <BlogList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}