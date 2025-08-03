import React from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Mother of 3',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    content: 'This platform transformed my relationship with God and my health completely. The biblical foundation makes all the difference.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Pastor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    content: 'As a pastor, I appreciate how this integrates faith with practical wellness. It\'s helped me serve my congregation better.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Wellness Coach',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    content: 'The community support here is incredible. I\'ve found my tribe of like-minded believers on this wellness journey.',
    rating: 5
  },
  {
    name: 'David Thompson',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    content: 'The stress management techniques rooted in scripture have been life-changing for my business and family life.',
    rating: 5
  },
  {
    name: 'Lisa Park',
    role: 'Nurse',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    content: 'As a healthcare professional, I love how this combines evidence-based practices with spiritual wisdom.',
    rating: 5
  },
  {
    name: 'Robert Williams',
    role: 'Retired Teacher',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    content: 'At 65, I\'ve found renewed energy and purpose through these biblical wellness practices. It\'s never too late!',
    rating: 5
  }
]

export function TestimonialSection() {
  return (
    <section className="section-padding bg-gradient-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-balance">
            What Our Community{' '}
            <span className="text-gradient">Says</span>
          </h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of believers who have transformed their lives through 
            biblical wellness practices and community support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} className="card hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-primary-200 mb-4" />
              
              <p className="text-earth-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-earth-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-earth-900">{testimonial.name}</p>
                  <p className="text-sm text-earth-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-sm">

            <div className="text-center">
              <div className="text-2xl font-display font-bold text-secondary-600">4.9/5</div>
              <div className="text-sm text-earth-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-earth-200"></div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-accent-600">95%</div>
              <div className="text-sm text-earth-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 