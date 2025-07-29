'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

export function NewsletterSignup() {
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

  if (isSubscribed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Welcome to Our Newsletter!
        </h3>
        <p className="text-green-700 mb-4">
          You&apos;ve been successfully subscribed. Check your email for a confirmation message.
        </p>
        <button
          onClick={() => setIsSubscribed(false)}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          Subscribe another email
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
          <Mail className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-earth-900">Stay Connected</h3>
          <p className="text-sm text-earth-600">Get weekly wellness tips and biblical insights</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !email}
          className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
              Subscribing...
            </div>
          ) : (
            'Subscribe to Newsletter'
          )}
        </button>
        {error && (
          <p className="text-red-600 text-xs text-center">{error}</p>
        )}
        <p className="text-xs text-earth-500 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  )
} 