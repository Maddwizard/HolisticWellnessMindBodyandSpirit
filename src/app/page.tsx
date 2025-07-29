import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, BookOpen, Users, Award, Shield, Clock, Star } from 'lucide-react'
import { HeroSection } from '@/components/hero-section'
import { FeatureSection } from '@/components/feature-section'
import { TestimonialSection } from '@/components/testimonial-section'
import { CTASection } from '@/components/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Biblical Wellness Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
                Biblical Foundation for{' '}
                <span className="text-gradient">Holistic Wellness</span>
              </h2>
              <p className="text-lg text-earth-700 mb-8 leading-relaxed">
                "Do you not know that your bodies are temples of the Holy Spirit, who is in you, 
                whom you have received from God? You are not your own; you were bought at a price. 
                Therefore honor God with your bodies." - 1 Corinthians 6:19-20
              </p>
              <p className="text-earth-600 mb-8 leading-relaxed">
                Our approach integrates timeless biblical wisdom with modern wellness practices. 
                We believe that true health encompasses mind, body, and spirit - all created by God 
                and designed to work in harmony.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/biblical-wellness" className="btn-primary">
                  Explore Biblical Wellness
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/about" className="btn-outline">
                  Learn Our Story
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Peaceful meditation and wellness"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-earth-900">100+ Bible Verses</p>
                    <p className="text-sm text-earth-600">On health & wellness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
                10,000+
              </div>
              <p className="text-earth-600">Community Members</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-secondary-600 mb-2">
                500+
              </div>
              <p className="text-earth-600">Wellness Resources</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-accent-600 mb-2">
                50+
              </div>
              <p className="text-earth-600">Expert Contributors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-600 mb-2">
                95%
              </div>
              <p className="text-earth-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
} 