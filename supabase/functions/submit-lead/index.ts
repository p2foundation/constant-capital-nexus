
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, inquiry, category, assignedTo, source, timestamp } = await req.json();

    // Here you would typically save to a database
    // For now, we'll send an email notification to Sefakor
    
    const emailBody = `
New Lead from Ako Chatbot

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Category: ${category}
Source: ${source}
Timestamp: ${timestamp}

Inquiry:
${inquiry}

---
This lead has been automatically assigned to you for follow-up.
`;

    // In a real implementation, you'd use an email service like SendGrid or similar
    // For now, we'll log the lead and return success
    console.log('New lead submitted:', {
      name,
      email,
      phone,
      inquiry,
      category,
      assignedTo,
      source,
      timestamp
    });

    // You could also save this to a Supabase table for tracking
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Lead submitted successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in submit-lead function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
