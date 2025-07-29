import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Apple, Wheat, Fish, Droplets, ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Biblical Nutrition | God\'s Design for Healthy Eating',
  description: 'Discover biblical foods and nutrition principles that promote optimal health. Learn about God\'s design for nourishment and how to honor Him with our food choices.',
  keywords: ['biblical nutrition', 'Christian nutrition', 'biblical foods', 'healthy eating', 'faith-based nutrition'],
}

const biblicalFoods = [
  {
    icon: Apple,
    title: 'Fruits & Vegetables',
    verse: 'Genesis 1:29',
    description: 'God provided every seed-bearing plant and fruit-bearing tree for our nourishment.',
    benefits: ['Rich in vitamins and minerals', 'Natural antioxidants', 'Fiber for digestive health', 'Low in calories'],
    examples: ['Apples', 'Grapes', 'Olives', 'Figs', 'Pomegranates']
  },
  {
    icon: Wheat,
    title: 'Whole Grains',
    verse: 'Psalm 104:14',
    description: 'He makes grass grow for the cattle, and plants for people to cultivate.',
    benefits: ['Sustained energy', 'Fiber content', 'B vitamins', 'Complex carbohydrates'],
    examples: ['Wheat', 'Barley', 'Millet', 'Quinoa', 'Oats']
  },
  {
    icon: Fish,
    title: 'Lean Proteins',
    verse: 'Matthew 4:19',
    description: 'Come, follow me, and I will send you out to fish for people.',
    benefits: ['Essential amino acids', 'Omega-3 fatty acids', 'Lean protein source', 'Heart healthy'],
    examples: ['Fish', 'Lentils', 'Chickpeas', 'Lean meats', 'Eggs']
  },
  {
    icon: Droplets,
    title: 'Healthy Fats',
    verse: 'Deuteronomy 8:8',
    description: 'A land with wheat and barley, vines and fig trees, pomegranates, olive oil and honey.',
    benefits: ['Brain health', 'Hormone production', 'Vitamin absorption', 'Satiety'],
    examples: ['Olive oil', 'Nuts', 'Seeds', 'Avocados', 'Coconut']
  }
]

const nutritionPrinciples = [
  {
    title: 'Moderation',
    description: 'Enjoy all foods in appropriate portions, avoiding excess.',
    scripture: 'Proverbs 25:16 - "If you find honey, eat just enough—too much of it, and you will vomit."',
    application: 'Practice portion control and mindful eating.'
  },
  {
    title: 'Gratitude',
    description: 'Give thanks for your food and recognize God\'s provision.',
    scripture: '1 Timothy 4:4-5 - "For everything God created is good, and nothing is to be rejected if it is received with thanksgiving."',
    application: 'Pray before meals and express gratitude for nourishment.'
  },
  {
    title: 'Stewardship',
    description: 'Care for your body as God\'s temple through wise food choices.',
    scripture: '1 Corinthians 6:19-20 - "Your bodies are temples of the Holy Spirit... honor God with your bodies."',
    application: 'Choose foods that nourish and strengthen your body.'
  },
  {
    title: 'Community',
    description: 'Share meals with others as an act of fellowship and love.',
    scripture: 'Acts 2:46 - "They broke bread in their homes and ate together with glad and sincere hearts."',
    application: 'Make mealtimes opportunities for connection and fellowship.'
  }
]

const mealPlans = [
  {
    title: 'Biblical Breakfast',
    description: 'Start your day with nourishing foods mentioned in scripture.',
    foods: ['Whole grain bread with honey', 'Fresh fruits', 'Nuts and seeds', 'Herbal tea'],
    verse: 'Psalm 119:103 - "How sweet are your words to my taste, sweeter than honey to my mouth!"'
  },
  {
    title: 'Mediterranean Lunch',
    description: 'Inspired by the traditional diet of biblical lands.',
    foods: ['Olive oil and vegetables', 'Legumes and grains', 'Fresh herbs', 'Moderate fish'],
    verse: 'Daniel 1:12 - "Please test your servants for ten days: Give us nothing but vegetables to eat and water to drink."'
  },
  {
    title: 'Simple Supper',
    description: 'Light evening meal focused on nourishment and gratitude.',
    foods: ['Soup with vegetables', 'Whole grain bread', 'Fresh fruit', 'Herbal infusion'],
    verse: 'Luke 24:30 - "When he was at the table with them, he took bread, gave thanks, broke it and began to give it to them."'
  }
]

export default function NutritionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Biblical Nutrition{' '}
              <span className="text-gradient">God\'s Design</span>
            </h1>
            <p className="text-xl text-earth-600 mb-8 leading-relaxed">
              Discover how scripture guides us to nourish our bodies with the foods 
              God designed for our health and vitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/meal-plans" className="btn-primary">
                Get Meal Plans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/resources" className="btn-outline">
                Nutrition Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Biblical Foods */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Foods of the Bible
            </h2>
            <p className="text-lg text-earth-600 max-w-3xl mx-auto">
              These nourishing foods mentioned throughout scripture provide the foundation 
              for a healthy, God-honoring diet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {biblicalFoods.map((food, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <food.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{food.title}</h3>
                <p className="text-sm text-primary-600 font-medium mb-4">{food.verse}</p>
                <p className="text-earth-600 mb-4">{food.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-earth-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {food.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-earth-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-earth-900 mb-2">Examples:</h4>
                  <p className="text-sm text-earth-600">{food.examples.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Principles */}
      <section className="section-padding bg-gradient-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Biblical Nutrition Principles
            </h2>
            <p className="text-lg text-earth-600 max-w-3xl mx-auto">
              These timeless principles from scripture guide our approach to eating 
              and nourishing our bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nutritionPrinciples.map((principle, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-display font-semibold mb-4">{principle.title}</h3>
                <p className="text-earth-600 mb-4">{principle.description}</p>
                <blockquote className="text-earth-700 mb-4 italic border-l-4 border-primary-200 pl-4 text-sm">
                  "{principle.scripture}"
                </blockquote>
                <p className="text-earth-600">
                  <strong>Application:</strong> {principle.application}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Biblical Meal Plans
            </h2>
            <p className="text-lg text-earth-600 max-w-3xl mx-auto">
              Nourishing meal plans inspired by biblical foods and nutrition principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mealPlans.map((plan, index) => (
              <div key={index} className="card hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-display font-semibold mb-3">{plan.title}</h3>
                <p className="text-earth-600 mb-4 text-sm">{plan.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-earth-900 mb-2">Foods:</h4>
                  <ul className="space-y-1">
                    {plan.foods.map((food, foodIndex) => (
                      <li key={foodIndex} className="flex items-center text-sm text-earth-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {food}
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="text-earth-700 italic border-l-4 border-primary-200 pl-4 text-sm">
                  "{plan.verse}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Practical Nutrition Tips
              </h2>
              <p className="text-lg text-earth-600 mb-6">
                Simple ways to incorporate biblical nutrition principles into your daily life.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-900">Start with Prayer</h4>
                    <p className="text-earth-600 text-sm">Give thanks for your food and ask God to bless your nourishment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-900">Choose Whole Foods</h4>
                    <p className="text-earth-600 text-sm">Opt for foods as close to their natural state as possible.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-earth-900">Eat Mindfully</h4>
                    <p className="text-earth-600 text-sm">Slow down and savor your food, recognizing it as God's gift.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
                  alt="Healthy biblical foods"
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
            Transform Your Health Through Biblical Nutrition
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community and discover how to honor God with your food choices and nourish your body as His temple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/meal-plans" className="btn-primary bg-white text-primary-600 hover:bg-white/90">
              Get Your Meal Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/community" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 