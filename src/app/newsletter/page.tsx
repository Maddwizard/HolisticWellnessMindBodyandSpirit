'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, Heart, Users, BookOpen } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      const data = await response.json()
      
      if (data.success) {
        setIsSubscribed(true)
        setEmail('')
        setName('')
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Newsletter signup error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              Stay Connected
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Join our newsletter and receive weekly wellness tips, biblical insights, and community updates 
              to support your holistic health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-earth-900 mb-6">
                  Get Weekly Wellness Wisdom
                </h2>
                <div className="space-y-4 text-earth-700">
                  <p>
                    Our newsletter brings you curated content that nourishes your mind, body, and spirit. 
                    Each week, you'll receive practical wellness tips grounded in biblical wisdom.
                  </p>
                  <p>
                    From nutrition guidance and exercise inspiration to mental health practices and spiritual 
                    insights, we're here to support your complete wellness journey.
                  </p>
                  <p>
                    Join thousands of believers who are transforming their health through faith-based wellness practices.
                  </p>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-earth-700">Weekly wellness tips and inspiration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-earth-700">Biblical insights for health and wellness</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-earth-700">Community updates and events</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-display font-bold text-earth-900 mb-6 text-center">
                  Subscribe to Our Newsletter
                </h3>
                
                {isSubscribed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Welcome to Our Newsletter!
                    </h3>
                    <p className="text-green-700 mb-4">
                      You've been successfully subscribed. Check your email for a confirmation message.
                    </p>
                    <button
                      onClick={() => setIsSubscribed(false)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isLoading || !email}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Subscribing...
                        </div>
                      ) : (
                        'Subscribe to Newsletter'
                      )}
                    </button>
                    {error && (
                      <p className="text-red-600 text-sm text-center">{error}</p>
                    )}
                    <p className="text-sm text-earth-600 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Join Our{' '}
              <span className="text-yellow-300">Wellness Community</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Connect with like-minded believers on the wellness journey. Share experiences, 
              find encouragement, and grow together in faith and health.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Join Community
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 