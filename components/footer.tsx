import React from 'react'
import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  wellness: [
    { name: 'Biblical Wellness', href: '/biblical-wellness' },
    { name: 'Nutrition Guide', href: '/nutrition' },
    { name: 'Exercise Plans', href: '/exercise' },
    { name: 'Mental Health', href: '/mental-health' },
    { name: 'Spiritual Growth', href: '/spiritual-growth' },
  ],
  resources: [
    { name: 'Free Resources', href: '/resources' },
    { name: 'Blog', href: '/blog' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Community', href: '/community' },
    { name: 'Events', href: '/events' },
  ],
  support: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'FAQ', href: '/faq' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'YouTube', href: '#', icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-earth-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Holistic Christian Wellness
              </span>
            </div>
            <p className="text-earth-300 mb-6 text-balance">
              Integrating biblical wisdom with modern wellness practices for complete mind, body, and spirit transformation.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-earth-300">
                <Mail className="w-4 h-4" />
                <span>hello@holisticchristianwellness.com</span>
              </div>
              <div className="flex items-center space-x-3 text-earth-300">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-earth-300">
                <MapPin className="w-4 h-4" />
                <span>Nashville, TN</span>
              </div>
            </div>
          </div>

          {/* Wellness Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Wellness</h3>
            <ul className="space-y-2">
              {footerLinks.wellness.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-earth-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-earth-400 text-sm">
              © {new Date().getFullYear()} Holistic Christian Wellness. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-earth-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 