import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { method, url } = req
  
  // Handle CORS
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  // Health check endpoint
  if (method === 'GET' && url.includes('/health')) {
    return new Response(
      JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Holistic Wellness API',
        version: '1.0.0'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }

  // Default response
  return new Response(
    JSON.stringify({
      message: 'Holistic Wellness Edge Function is running',
      endpoints: {
        health: '/health',
        docs: 'https://supabase.com/docs/guides/functions'
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
}) 