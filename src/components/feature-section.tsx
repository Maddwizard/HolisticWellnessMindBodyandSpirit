import React from 'react'
import Link from 'next/link'
import { Heart, BookOpen, Users, Award, Shield, Leaf } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Biblical Wellness',
    description: 'Discover how scripture guides us to honor God with our bodies through proper care and stewardship.',
    href: '/biblical-wellness',
    color: 'primary'
  },
  {
    icon: Leaf,
    title: 'Nutrition & Health',
    description: 'Learn about biblical foods and nutrition principles that promote optimal health and vitality.',
    href: '/nutrition',
    color: 'secondary'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connect with like-minded believers on your wellness journey through our supportive community.',
    href: '/community',
    color: 'accent'
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Access comprehensive guides, courses, and materials to deepen your understanding of holistic wellness.',
    href: '/resources',
    color: 'primary'
  },
  {
    icon: Shield,
    title: 'Mental Health',
    description: 'Find peace and mental clarity through biblical principles and faith-based mental health practices.',
    href: '/mental-health',
    color: 'secondary'
  },
  {
    icon: Award,
    title: 'Expert Guidance',
    description: 'Learn from certified wellness experts who integrate Christian faith with evidence-based practices.',
    href: '/experts',
    color: 'accent'
  }
]

const colorClasses = {
  primary: 'bg-primary-50 text-primary-600 border-primary-200',
  secondary: 'bg-secondary-50 text-secondary-600 border-secondary-200',
  accent: 'bg-accent-50 text-accent-600 border-accent-200'
}

export function FeatureSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
            Complete Wellness for{' '}
            <span className="text-gradient">Mind, Body & Spirit</span>
          </h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive approach addresses every aspect of your well-being, 
            grounded in biblical wisdom and modern wellness science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group block"
            >
              <div className="card hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-4 text-earth-900">
                  {feature.title}
                </h3>
                <p className="text-earth-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform duration-200">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary-600 mb-2">
              100+
            </div>
            <p className="text-earth-600">Biblical Wellness Principles</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-secondary-600 mb-2">
              24/7
            </div>
            <p className="text-earth-600">Community Support Available</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-accent-600 mb-2">
              95%
            </div>
            <p className="text-earth-600">Member Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
} 