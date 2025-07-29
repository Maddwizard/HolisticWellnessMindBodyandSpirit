import React from 'react'
import { Crown, Heart, Users, BookOpen, Award, Shield, CheckCircle } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              Choose Your Membership
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Join our community and unlock exclusive wellness resources, personalized guidance, 
              and deeper connections with fellow believers on the wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Available Now
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-bold text-earth-900 mb-2">Free Membership</h3>
                <p className="text-3xl font-bold text-primary-600 mb-1">$0</p>
                <p className="text-earth-600">Start your wellness journey</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-earth-700">Access to wellness articles</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-earth-700">Community forum access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-earth-700">Newsletter subscription</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-earth-700">Basic wellness resources</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-earth-700">Community support</span>
                </li>
              </ul>
              <button className="w-full btn-primary">Get Started Free</button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-earth-600 text-sm">
                Premium and lifetime memberships coming soon!
              </p>
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
              Start Your{' '}
              <span className="text-yellow-300">Wellness Journey</span>{' '}
              Today
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join our community and access free wellness resources to support your mind, body, and spirit. 
              Begin your journey to holistic health today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Get Started Free
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