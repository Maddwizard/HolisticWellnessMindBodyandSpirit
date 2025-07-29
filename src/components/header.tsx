'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Wellness', href: '/biblical-wellness' },
  { name: 'Nutrition', href: '/nutrition' },
  { name: 'Exercise', href: '/exercise' },
  { name: 'Community', href: '/community' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (mobileMenuOpen && !target.closest('header')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <header className="bg-white shadow-sm border-b border-earth-200 sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-earth-900">
              Holistic Wellness
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-earth-700 hover:text-primary-600 font-medium transition-colors duration-200 ${
                pathname === item.href ? 'text-primary-600' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/newsletter" className="btn-outline text-sm px-4 py-2">
            Newsletter
          </Link>
          <Link href="/membership" className="btn-primary text-sm px-4 py-2">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="text-earth-700 hover:text-primary-600 p-2 rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-earth-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-earth-700 hover:text-primary-600 hover:bg-earth-50 rounded-md font-medium transition-colors duration-200 ${
                  pathname === item.href ? 'text-primary-600 bg-primary-50' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-earth-200 mt-4">
              <Link
                href="/newsletter"
                className="block px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-md font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Newsletter
              </Link>
              <Link
                href="/membership"
                className="block mx-3 py-2 bg-primary-600 text-white text-center rounded-lg font-medium transition-colors duration-200 hover:bg-primary-700"
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