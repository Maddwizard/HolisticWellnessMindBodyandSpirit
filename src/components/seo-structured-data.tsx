'use client'

import React from 'react'

interface SEOStructuredDataProps {
  type: 'website' | 'article' | 'organization' | 'breadcrumb' | 'faq' | 'howto'
  data: any
}

export function SEOStructuredData({ type, data }: SEOStructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Holistic Wellness Mind Body Spirit",
          "url": "https://holisticwellnessmindbodyspirit.com",
          "description": "Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://holisticwellnessmindbodyspirit.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Holistic Wellness Mind Body Spirit",
          "url": "https://holisticwellnessmindbodyspirit.com",
          "logo": "https://holisticwellnessmindbodyspirit.com/logo.png",
          "description": "Transform your life with holistic wellness principles grounded in biblical wisdom. Discover nutrition, exercise, mental health, and spiritual practices for complete mind, body, and spirit harmony.",
          "sameAs": [
            "https://facebook.com/holisticwellnessmindbodyspirit",
            "https://instagram.com/holisticwellnessmindbodyspirit",
            "https://twitter.com/holisticwellnessmbs"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "hello@holisticwellnessmindbodyspirit.com"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nashville",
            "addressRegion": "TN",
            "addressCountry": "US"
          },
          "foundingDate": "2024",
          "areaServed": "Worldwide",
          "serviceType": "Holistic Wellness Coaching",
          "category": "Health & Wellness"
        }
      
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "Holistic Wellness Mind Body Spirit"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Holistic Wellness Mind Body Spirit",
            "logo": {
              "@type": "ImageObject",
              "url": "https://holisticwellnessmindbodyspirit.com/logo.png"
            }
          },
          "datePublished": data.publishedAt,
          "dateModified": data.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        }
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.questions.map((q: any) => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        }
      
      case 'howto':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": data.title,
          "description": data.description,
          "image": data.image,
          "totalTime": data.totalTime,
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": data.cost
          },
          "supply": data.supplies.map((supply: any) => ({
            "@type": "HowToSupply",
            "name": supply.name
          })),
          "step": data.steps.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text,
            "image": step.image
          }))
        }
      
      default:
        return data
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
} 