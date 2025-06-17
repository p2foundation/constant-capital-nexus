
import { ChatMessage } from '../AIChatService';

export const createUserMessage = (inputValue: string): ChatMessage => ({
  id: Date.now().toString(),
  text: inputValue,
  sender: 'user',
  timestamp: new Date()
});

export const createBotMessage = (text: string, requiresFollowup = false): ChatMessage => ({
  id: (Date.now() + 1).toString(),
  text,
  sender: 'bot',
  timestamp: new Date(),
  requiresFollowup
});

export const createFollowupMessage = (): ChatMessage => ({
  id: (Date.now() + 2).toString(),
  text: "Would you like me to connect you with our investment team for personalized assistance?",
  sender: 'bot',
  timestamp: new Date()
});

export const createErrorMessage = (): ChatMessage => ({
  id: (Date.now() + 1).toString(),
  text: "I'm experiencing technical difficulties. Please contact our team directly at info@constantcapital.com or +233 20 000 0000 for immediate assistance.",
  sender: 'bot',
  timestamp: new Date()
});

export const createThankYouMessage = (): ChatMessage => ({
  id: Date.now().toString(),
  text: "Perfect! I've forwarded your details to Sefakor from our investment team. She'll reach out to you within 24 hours. Is there anything else I can help you with today?",
  sender: 'bot',
  timestamp: new Date()
});

export const createCancelMessage = (): ChatMessage => ({
  id: Date.now().toString(),
  text: "No problem! Feel free to ask me any other questions about Constant Capital. I'm here to help!",
  sender: 'bot',
  timestamp: new Date()
});
