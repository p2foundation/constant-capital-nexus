

import { AIChatService } from '../AIChatService';
import { findBestMatch } from '../CompanyKnowledgeBase';

export const generateChatResponse = async (
  userMessage: string,
  chatService: AIChatService
): Promise<{ response: string; requiresFollowup: boolean; category: string; showSuggestions?: boolean }> => {
  try {
    // First, try to find a knowledge base match
    const knowledgeMatch = findBestMatch(userMessage);
    let response: string;
    let requiresFollowup = false;
    let category = 'general_inquiry';
    let showSuggestions = false;
    
    if (knowledgeMatch) {
      category = knowledgeMatch.category;
      requiresFollowup = knowledgeMatch.requiresHumanFollowup || false;
      
      // For basic company info, use knowledge base first and don't try AI enhancement
      const basicInfoCategories = ['company_overview', 'contact_info', 'regulatory'];
      const shouldUseKnowledgeBaseOnly = basicInfoCategories.includes(knowledgeMatch.category);
      
      if (shouldUseKnowledgeBaseOnly) {
        // Use knowledge base response directly for basic info - no AI enhancement needed
        response = knowledgeMatch.response;
        console.log('Using knowledge base response for basic info:', knowledgeMatch.category);
      } else {
        // For more complex topics, try AI first but fallback to knowledge base
        try {
          response = await chatService.generateResponse(
            userMessage, 
            `Knowledge base match: ${knowledgeMatch.response}`
          );
        } catch (aiError) {
          console.log('AI service unavailable, using knowledge base fallback for:', knowledgeMatch.category);
          response = knowledgeMatch.response;
          
          // Add a note about AI being temporarily unavailable for non-basic info
          response += "\n\nI'm currently experiencing high demand on my AI capabilities, so I've provided this response from our knowledge base. For more detailed assistance, I can connect you with our investment team.";
        }
      }
    } else {
      // No knowledge base match - try AI, but show suggestions regardless
      try {
        response = await chatService.generateResponse(userMessage);
        // Determine if this might need followup based on keywords
        const investmentKeywords = ['invest', 'portfolio', 'advisory', 'trading', 'account', 'fee'];
        requiresFollowup = investmentKeywords.some(keyword => 
          userMessage.toLowerCase().includes(keyword)
        );
        
        // Show suggestions since we don't have specific knowledge base info
        showSuggestions = true;
        category = 'general_services_inquiry';
      } catch (aiError) {
        console.log('AI service unavailable and no knowledge base match, providing enhanced general fallback');
        
        // Better fallback response that's more helpful
        response = "I understand you're asking about something specific. While I'm currently experiencing high demand on my AI capabilities, I have comprehensive information about our services and can help with many questions.";
        showSuggestions = true; // Show suggested questions
        requiresFollowup = false; // Don't immediately suggest human contact
        category = 'general_services_inquiry';
      }
    }
    
    return { response, requiresFollowup, category, showSuggestions };
  } catch (error) {
    console.error('Response generation error:', error);
    throw error;
  }
};

