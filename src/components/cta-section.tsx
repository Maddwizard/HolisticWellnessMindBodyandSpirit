import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Star } from 'lucide-react'

const benefits = [
  'Access to 500+ biblical wellness resources',
  '24/7 community support and encouragement',
  'Expert-led courses and workshops',
  'Personalized wellness plans',
  'Mobile app for on-the-go access',
  'Monthly live Q&A sessions'
]

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span className="text-sm font-medium">
              Join 10,000+ believers on their wellness journey
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
            Start Your{' '}
            <span className="text-yellow-300">Biblical Wellness</span>{' '}
            Journey Today
          </h2>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Transform your mind, body, and spirit through faith-based wellness practices. 
            Join our community and discover the abundant life God intended for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-display font-semibold mb-4">Free Trial</h3>
              <div className="text-4xl font-display font-bold mb-2">$0</div>
              <p className="text-white/80 mb-6">Start your 7-day free trial</p>
              <ul className="space-y-3 mb-8">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/trial" className="btn-outline w-full text-center border-white text-white hover:bg-white hover:text-primary-600">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-primary-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4">Premium Membership</h3>
              <div className="text-4xl font-display font-bold mb-2">$19<span className="text-lg">/month</span></div>
              <p className="text-white/80 mb-6">Full access to all features</p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/membership" className="btn-primary w-full text-center bg-white text-primary-600 hover:bg-white/90">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 