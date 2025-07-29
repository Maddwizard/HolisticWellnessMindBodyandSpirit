'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-earth-700">
                Trusted by 10,000+ Christians worldwide
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-balance">
              Transform Your Life Through{' '}
              <span className="text-gradient">Biblical Wellness</span>
            </h1>
            
            <p className="text-xl text-earth-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover how to honor God with your body through holistic wellness practices. 
              Integrate faith, nutrition, exercise, and mental health for complete transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/membership" className="btn-primary text-lg px-8 py-4">
                Start Your Wellness Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="btn-outline text-lg px-8 py-4 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Our Story
              </button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-earth-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free 7-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Peaceful Christian wellness and meditation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🙏</span>
                </div>
                <div>
                  <p className="font-semibold text-earth-900">Biblical Foundation</p>
                  <p className="text-sm text-earth-600">100+ scripture-based wellness principles</p>
                </div>
              </div>
            </div>
            
            {/* Floating Testimonial Card */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-secondary-600">S</span>
                </div>
                <div>
                  <p className="text-sm text-earth-700 mb-2">
                    "This transformed my relationship with God and my health completely."
                  </p>
                  <p className="text-xs text-earth-600">- Sarah M.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-earth-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-earth-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
} 