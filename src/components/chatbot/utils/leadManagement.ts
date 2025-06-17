
export interface LeadContext {
  inquiry: string;
  category: string;
}

export const createLeadContext = (inquiry: string, category: string): LeadContext => ({
  inquiry,
  category
});

export const shouldRequireFollowup = (userMessage: string, knowledgeCategory?: string): boolean => {
  if (knowledgeCategory) {
    // If we have a knowledge base match, check its requiresFollowup flag
    return true; // This will be determined by the knowledge base item
  }
  
  // For non-knowledge base responses, check for investment keywords
  const investmentKeywords = ['invest', 'portfolio', 'advisory', 'trading', 'account', 'fee'];
  return investmentKeywords.some(keyword => 
    userMessage.toLowerCase().includes(keyword)
  );
};
