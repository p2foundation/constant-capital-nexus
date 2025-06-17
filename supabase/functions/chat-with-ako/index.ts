
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context, conversationHistory } = await req.json();
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Build conversation context
    const systemPrompt = `You are Ako, the AI assistant for Constant Capital, Ghana's premier SEC-licensed investment brokerage firm. 

Key information about Constant Capital:
- SEC-licensed investment brokerage in Ghana
- Services: Securities Trading (GSE), Investment Research, Strategic Advisory, Capital Markets, Private Equity, Investment Advisory
- Serves institutional and corporate clients
- Expert in Ghana Stock Exchange and African markets
- Contact: info@constantcapital.com, +233 20 000 0000
- Investment team lead: Sefakor (sefakor.add@constantcap.com.gh)

Guidelines:
- Be professional, knowledgeable, and helpful
- Provide accurate information about Constant Capital's services
- For complex investment inquiries, offer to connect users with the investment team
- Be concise but informative
- If you don't know something specific, admit it and offer to connect them with the team
- Always maintain a professional financial services tone
- For investment advice or detailed service inquiries, suggest scheduling a consultation

Current context: ${context || 'General inquiry'}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error');
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-ako function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I apologize, but I'm having technical difficulties. Please contact our team directly at info@constantcapital.com or +233 20 000 0000."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
