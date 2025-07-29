'use client'

import { useState } from 'react'
import { ContentGenerator } from '@/components/content-generator'
import { Settings, BookOpen, Activity, Brain, Users, Library, Heart } from 'lucide-react'

const sections = [
  {
    id: 'biblical-wellness',
    name: 'Biblical Wellness',
    icon: Heart,
    description: 'Faith-based wellness content and Christian health principles'
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: BookOpen,
    description: 'Holistic nutrition and biblical foods content'
  },
  {
    id: 'exercise',
    name: 'Exercise',
    icon: Activity,
    description: 'Physical fitness from a Christian perspective'
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: Brain,
    description: 'Christian mental health and emotional wellness'
  },
  {
    id: 'community',
    name: 'Community',
    icon: Users,
    description: 'Building Christian wellness communities'
  },
  {
    id: 'resources',
    name: 'Resources',
    icon: Library,
    description: 'Helpful resources for Christian wellness'
  }
]

export default function ContentManagementPage() {
  const [selectedSection, setSelectedSection] = useState('biblical-wellness')
  const [generatedContents, setGeneratedContents] = useState<Record<string, string[]>>({})

  const handleContentGenerated = (sectionId: string, content: string) => {
    setGeneratedContents(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), content]
    }))
  }

  const selectedSectionData = sections.find(s => s.id === selectedSection)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Content Management
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate fresh, AI-powered content for different sections of your holistic wellness website
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section Selector */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Section
                </h2>
                <div className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setSelectedSection(section.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedSection === section.id
                            ? 'bg-purple-100 border-2 border-purple-300 text-purple-800'
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 mr-3" />
                          <div>
                            <div className="font-medium">{section.name}</div>
                            <div className="text-sm opacity-75">
                              {section.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Content Generator */}
            <div className="lg:col-span-2">
              {selectedSectionData && (
                <div className="space-y-6">
                  {/* Current Section Info */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-2">
                      <selectedSectionData.icon className="w-6 h-6 text-purple-600 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedSectionData.name}
                      </h2>
                    </div>
                    <p className="text-gray-600">{selectedSectionData.description}</p>
                  </div>

                  {/* Content Generator Component */}
                  <ContentGenerator
                    section={selectedSection}
                    onContentGenerated={(content) => handleContentGenerated(selectedSection, content)}
                  />

                  {/* Generated Content History */}
                  {generatedContents[selectedSection] && generatedContents[selectedSection].length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Generations ({generatedContents[selectedSection].length})
                      </h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {generatedContents[selectedSection].slice().reverse().map((content, index) => (
                          <div key={index} className="bg-gray-50 rounded-md p-4 border-l-4 border-purple-400">
                            <div className="text-sm text-gray-600 mb-2">
                              Generated {new Date().toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4">
                              {content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              How to Use Content Generator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Content Types:</h4>
                <ul className="space-y-1">
                  <li>• <strong>Tips:</strong> Practical, actionable advice</li>
                  <li>• <strong>Article:</strong> Comprehensive content pieces</li>
                  <li>• <strong>Devotional:</strong> Daily spiritual wellness content</li>
                  <li>• <strong>Quote:</strong> Inspirational affirmations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices:</h4>
                <ul className="space-y-1">
                  <li>• Use custom prompts for specific needs</li>
                  <li>• Generated content includes Bible verses</li>
                  <li>• Copy content to use in your pages</li>
                  <li>• Review and edit before publishing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}