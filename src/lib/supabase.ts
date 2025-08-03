import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Client-side Supabase client
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for API routes and server components)
export const createServerClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Admin client for server-side operations (use with caution)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !serviceRoleKey) {
    return null
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Database types (you can generate these with Supabase CLI)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          location: string | null
          date_of_birth: string | null
          wellness_goals: string[] | null
          dietary_preferences: string[] | null
          fitness_level: 'beginner' | 'intermediate' | 'advanced' | null
          spiritual_practices: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          date_of_birth?: string | null
          wellness_goals?: string[] | null
          dietary_preferences?: string[] | null
          fitness_level?: 'beginner' | 'intermediate' | 'advanced' | null
          spiritual_practices?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          date_of_birth?: string | null
          wellness_goals?: string[] | null
          dietary_preferences?: string[] | null
          fitness_level?: 'beginner' | 'intermediate' | 'advanced' | null
          spiritual_practices?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          slug: string
          author_id: string | null
          featured_image: string | null
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          updated_at: string
          tags: string[] | null
          category: string | null
          reading_time: number | null
          view_count: number
          likes_count: number
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          slug: string
          author_id?: string | null
          featured_image?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          updated_at?: string
          tags?: string[] | null
          category?: string | null
          reading_time?: number | null
          view_count?: number
          likes_count?: number
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          slug?: string
          author_id?: string | null
          featured_image?: string | null
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          updated_at?: string
          tags?: string[] | null
          category?: string | null
          reading_time?: number | null
          view_count?: number
          likes_count?: number
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          content: string
          rating: number | null
          image_url: string | null
          is_featured: boolean
          is_approved: boolean
          user_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role?: string | null
          content: string
          rating?: number | null
          image_url?: string | null
          is_featured?: boolean
          is_approved?: boolean
          user_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string | null
          content?: string
          rating?: number | null
          image_url?: string | null
          is_featured?: boolean
          is_approved?: boolean
          user_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 