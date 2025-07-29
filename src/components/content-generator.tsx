'use client'

import { useState } from 'react'
import { Loader2, Sparkles, Copy, Check } from 'lucide-react'

interface ContentGeneratorProps {
  section: string
  onContentGenerated?: (content: string) => void
}

export function ContentGenerator({ section, onContentGenerated }: ContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [contentType, setContentType] = useState('tips')
  const [customPrompt, setCustomPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const contentTypes = [
    { value: 'tips', label: 'Practical Tips' },
    { value: 'article', label: 'Article' },
    { value: 'devotional', label: 'Daily Devotional' },
    { value: 'quote', label: 'Inspirational Quote' },
  ]

  const generateContent = async () => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          contentType,
          customPrompt: customPrompt.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)
        onContentGenerated?.(data.content)
      } else {
        setError(data.message || 'Failed to generate content')
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error('Content generation error:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          AI Content Generator
        </h3>
      </div>

      <div className="space-y-4">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {contentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Request (Optional)
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., Focus on stress management techniques for busy parents..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateContent}
          disabled={isGenerating}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </button>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Generated Content */}
        {generatedContent && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-md font-medium text-gray-900">Generated Content</h4>
              <button
                onClick={copyToClipboard}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 max-h-96 overflow-y-auto">
              <div className="whitespace-pre-wrap text-sm text-gray-800">
                {generatedContent}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}