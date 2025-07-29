import React from 'react'
import { Activity, Heart, Target, Users, Clock, Award } from 'lucide-react'
import { FeatureSection } from '@/components/feature-section'

export default function ExercisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-earth-900 mb-6">
              Movement as Worship
            </h1>
            <p className="text-xl text-earth-700 mb-8 max-w-3xl mx-auto">
              Discover how physical exercise can be a form of worship and gratitude for the body God has given you. 
              Transform your fitness journey into a spiritual practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Your Journey
              </button>
              <button className="btn-outline">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-earth-900 mb-6">
                Biblical Wisdom for Physical Health
              </h2>
              <div className="space-y-4 text-earth-700">
                <p>
                  The Bible teaches us that our bodies are temples of the Holy Spirit (1 Corinthians 6:19-20). 
                  This profound truth calls us to care for our physical health as an act of worship and gratitude.
                </p>
                <p>
                  Exercise is not just about looking good or achieving personal goals—it's about honoring the 
                  incredible gift of life that God has given us and being good stewards of our bodies.
                </p>
                <p>
                  When we exercise with this mindset, every workout becomes an opportunity to connect with God, 
                  express gratitude, and strengthen our bodies for His service.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-display font-bold text-earth-900 mb-4">
                Christian Fitness Principles
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-earth-700">Exercise with gratitude for your body</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-earth-700">Set goals that honor God and serve others</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-earth-700">Practice consistency as spiritual discipline</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-earth-700">Celebrate progress as God's blessing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-earth-700">Use your strength to serve and help others</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Ready to Transform Your{' '}
              <span className="text-yellow-300">Fitness Journey</span>?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Join our community and discover how exercise can become a powerful form of worship. 
              Start your journey to physical and spiritual wellness today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-primary-600 hover:bg-white/90">
                Get Started Today
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