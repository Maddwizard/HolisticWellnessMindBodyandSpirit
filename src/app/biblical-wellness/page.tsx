import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, BookOpen, Leaf, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biblical Wellness | Scripture-Based Health Principles',
  description: 'Discover how scripture guides us to honor God with our bodies through biblical wellness principles, nutrition, exercise, and spiritual practices.',
  keywords: ['biblical wellness', 'scripture health', 'Christian health principles', 'biblical nutrition', 'faith-based wellness'],
}

const principles = [
  {
    icon: Heart,
    title: 'Body as Temple',
    verse: '1 Corinthians 6:19-20',
    content: 'Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies.',
    application: 'Treat your body with respect and care, recognizing it as God\'s dwelling place.'
  },
  {
    icon: Leaf,
    title: 'Natural Nutrition',
    verse: 'Genesis 1:29',
    content: 'Then God said, "I give you every seed-bearing plant on the face of the whole earth and every tree that has fruit with seed in it. They will be yours for food."',
    application: 'Embrace whole, natural foods as God\'s provision for our nourishment and health.'
  },
  {
    icon: Users,
    title: 'Community Health',
    verse: 'Hebrews 10:24-25',
    content: 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.',
    application: 'Build supportive relationships that encourage healthy habits and spiritual growth.'
  },
  {
    icon: BookOpen,
    title: 'Mind Renewal',
    verse: 'Romans 12:2',
    content: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God\'s will is—his good, pleasing and perfect will.',
    application: 'Transform your thinking through scripture study and prayer for mental wellness.'
  }
]

const practices = [
  {
    title: 'Prayer & Meditation',
    description: 'Daily prayer and meditation on scripture for mental clarity and spiritual peace.',
    benefits: ['Reduces stress', 'Improves focus', 'Strengthens faith', 'Promotes gratitude']
  },
  {
    title: 'Sabbath Rest',
    description: 'Honoring the Sabbath principle through regular rest and rejuvenation.',
    benefits: ['Prevents burnout', 'Restores energy', 'Improves relationships', 'Deepens spirituality']
  },
  {
    title: 'Gratitude Practice',
    description: 'Cultivating thankfulness as a daily spiritual and mental health practice.',
    benefits: ['Reduces anxiety', 'Improves mood', 'Strengthens relationships', 'Enhances perspective']
  },
  {
    title: 'Stewardship',
    description: 'Responsible care of our bodies, minds, and resources as God\'s gifts.',
    benefits: ['Promotes discipline', 'Builds character', 'Honors God', 'Creates balance']
  }
]

export default function BiblicalWellnessPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Biblical Foundation for{' '}
              <span className="text-gradient">Holistic Wellness</span>
            </h1>
            <p className="text-xl text-earth-600 mb-8 leading-relaxed">
              Discover how scripture provides timeless wisdom for caring for our bodies, 
              minds, and spirits as God intended.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources" className="btn-primary">
                Explore Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/community" className="btn-outline">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Core Biblical Wellness Principles
            </h2>
            <p className="text-lg text-earth-600 max-w-3xl mx-auto">
              These foundational principles from scripture guide our approach to holistic wellness, 
              integrating faith with practical health practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <principle.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{principle.title}</h3>
                <p className="text-sm text-primary-600 font-medium mb-4">{principle.verse}</p>
                <blockquote className="text-earth-700 mb-4 italic border-l-4 border-primary-200 pl-4">
                  &ldquo;{principle.content}&rdquo;
                </blockquote>
                <p className="text-earth-600">
                  <strong>Application:</strong> {principle.application}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Practices */}
      <section className="section-padding bg-gradient-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Biblical Wellness Practices
            </h2>
            <p className="text-lg text-earth-600 max-w-3xl mx-auto">
              Practical applications of biblical wisdom for daily wellness and spiritual growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practices.map((practice, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-display font-semibold mb-3">{practice.title}</h3>
                <p className="text-earth-600 mb-4 text-sm">{practice.description}</p>
                <ul className="space-y-2">
                  {practice.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-earth-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Study Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Scripture Study for Wellness
              </h2>
              <p className="text-lg text-earth-600 mb-6">
                Regular study of scripture provides guidance for every aspect of wellness, 
                from physical health to mental clarity and spiritual growth.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-900">Daily Devotionals</h4>
                    <p className="text-earth-600 text-sm">Start each day with scripture focused on wellness and health.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-900">Meditation</h4>
                    <p className="text-earth-600 text-sm">Reflect on biblical passages about health and stewardship.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-900">Application</h4>
                    <p className="text-earth-600 text-sm">Apply biblical wisdom to daily health decisions and habits.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Bible study and meditation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Start Your Biblical Wellness Journey
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of believers committed to honoring God through holistic wellness practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="btn-primary bg-white text-primary-600 hover:bg-white/90">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/resources" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Free Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 