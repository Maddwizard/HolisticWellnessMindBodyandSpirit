import { createClient } from 'jsr:@supabase/supabase-js@^2';

Deno.serve(async (req) => {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Missing authorization header' }), 
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Supabase client with proper authentication
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    );

    // Get the request method and path
    const { method } = req;
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // Route based on path
    switch (path) {
      case 'profile':
        return await handleProfileRequest(supabase, method, req);
      
      case 'wellness-journal':
        return await handleWellnessJournalRequest(supabase, method, req);
      
      case 'prayer-requests':
        return await handlePrayerRequestsRequest(supabase, method, req);
      
      default:
        return new Response(
          JSON.stringify({ error: 'Endpoint not found' }), 
          { 
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
    }

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// Handle profile requests
async function handleProfileRequest(supabase: any, method: string, req: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (method === 'GET') {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(data), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

// Handle wellness journal requests
async function handleWellnessJournalRequest(supabase: any, method: string, req: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }), 
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  if (method === 'GET') {
    const url = new URL(req.url);
    const date = url.searchParams.get('date');

    let query = supabase
      .from('wellness_journals')
      .select('*')
      .eq('user_id', user.id);

    if (date) {
      query = query.eq('entry_date', date);
    } else {
      query = query.order('entry_date', { ascending: false }).limit(10);
    }

    const { data, error } = await query;

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(data), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  if (method === 'POST') {
    const body = await req.json();
    
    const { data, error } = await supabase
      .from('wellness_journals')
      .insert({
        user_id: user.id,
        ...body
      })
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(data), 
      { 
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

// Handle prayer requests
async function handlePrayerRequestsRequest(supabase: any, method: string, req: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (method === 'GET') {
    // Get public prayer requests (non-private ones)
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .eq('is_private', false)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(data), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  if (method === 'POST') {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const body = await req.json();
    
    const { data, error } = await supabase
      .from('prayer_requests')
      .insert({
        author_id: user.id,
        ...body
      })
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(data), 
      { 
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }), 
    { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
} 