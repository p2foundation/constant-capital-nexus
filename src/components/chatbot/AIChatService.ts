import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  requiresFollowup?: boolean;
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  inquiry: string;
  category: string;
}

export class AIChatService {
  private conversationHistory: ChatMessage[] = [];
  
  async generateResponse(userMessage: string, context?: string): Promise<string> {
    try {
      const response = await supabase.functions.invoke('chat-with-ako', {
        body: {
          message: userMessage,
          context: context,
          conversationHistory: this.conversationHistory.slice(-5) // Last 5 messages for context
        }
      });

      if (response.error) {
        console.error('AI Service Error:', response.error);
        return "I apologize, but I'm having trouble processing your request right now. Please try again or contact our team directly at info@constantcapital.com for immediate assistance.";
      }

      return response.data?.response || "I'm here to help! Could you please rephrase your question?";
    } catch (error) {
      console.error('Chat service error:', error);
      return "I'm experiencing technical difficulties. Please contact our team at info@constantcapital.com or call +233 20 000 0000 for immediate assistance.";
    }
  }

  async submitLead(leadData: LeadData): Promise<boolean> {
    try {
      const response = await supabase.functions.invoke('submit-lead', {
        body: {
          ...leadData,
          assignedTo: 'sefakor.add@constantcap.com.gh',
          source: 'Ako Chatbot',
          timestamp: new Date().toISOString()
        }
      });

      return !response.error;
    } catch (error) {
      console.error('Lead submission error:', error);
      return false;
    }
  }

  addToHistory(message: ChatMessage) {
    this.conversationHistory.push(message);
    // Keep only last 10 messages to manage memory
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
  }
}
