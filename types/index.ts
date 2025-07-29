export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  author: User
  publishedAt: Date
  updatedAt: Date
  tags: string[]
  featuredImage?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image?: string
  createdAt: Date
}

export interface Resource {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'podcast' | 'course' | 'guide'
  url: string
  thumbnail?: string
  duration?: string
  tags: string[]
  createdAt: Date
}

export interface WellnessCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  resources: Resource[]
}

export interface NavigationItem {
  name: string
  href: string
  description?: string
  icon?: string
}

export interface FormData {
  name: string
  email: string
  message: string
}

export interface NewsletterSubscription {
  email: string
  preferences: string[]
  createdAt: Date
}

export interface MembershipTier {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  features: string[]
  popular?: boolean
}

export interface CommunityPost {
  id: string
  title: string
  content: string
  author: User
  category: string
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  content: string
  author: User
  postId: string
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
  type: 'online' | 'in-person' | 'hybrid'
  capacity: number
  registeredUsers: User[]
  createdAt: Date
}

export interface PrayerRequest {
  id: string
  title: string
  content: string
  author: User
  isPrivate: boolean
  answered: boolean
  answeredAt?: Date
  createdAt: Date
  updatedAt: Date
} 