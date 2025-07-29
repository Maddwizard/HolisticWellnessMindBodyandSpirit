'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, Cross } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Biblical Wellness', href: '/biblical-wellness' },
  { name: 'Nutrition', href: '/nutrition' },
  { name: 'Exercise', href: '/exercise' },
  { name: 'Mental Health', href: '/mental-health' },
  { name: 'Community', href: '/community' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-earth-200 sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-earth-900">
              Holistic Christian Wellness
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-earth-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/newsletter" className="btn-outline">
            Join Newsletter
          </Link>
          <Link href="/membership" className="btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-earth-700 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-earth-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-earth-700 hover:text-primary-600 hover:bg-earth-50 rounded-md font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/newsletter"
                className="block px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-md font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Newsletter
              </Link>
              <Link
                href="/membership"
                className="block mx-3 py-2 bg-primary-600 text-white text-center rounded-lg font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 