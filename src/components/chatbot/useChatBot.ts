
import { useState, useRef } from 'react';
import { AIChatService, ChatMessage } from './AIChatService';
import { 
  createUserMessage, 
  createBotMessage, 
  createFollowupMessage, 
  createErrorMessage,
  createThankYouMessage,
  createCancelMessage
} from './utils/messageHandlers';
import { createLeadContext, LeadContext } from './utils/leadManagement';
import { generateChatResponse } from './utils/responseGeneration';

export const useChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m Ako, Constant Capital\'s AI assistant. How can I help you with your investment needs today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [leadContext, setLeadContext] = useState<LeadContext>({ inquiry: '', category: '' });
  
  const chatService = useRef(new AIChatService());
  
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;
    
    const userMessage = createUserMessage(textToSend);
    
    setMessages(prev => [...prev, userMessage]);
    chatService.current.addToHistory(userMessage);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false); // Hide suggestions when sending a message
    
    try {
      const { response, requiresFollowup, category, showSuggestions: shouldShowSuggestions } = await generateChatResponse(
        textToSend,
        chatService.current
      );
      
      const botMessage = createBotMessage(response, requiresFollowup);
      
      setMessages(prev => [...prev, botMessage]);
      chatService.current.addToHistory(botMessage);
      
      // Show suggestions if AI is unavailable and no knowledge base match
      if (shouldShowSuggestions) {
        setShowSuggestions(true);
      }
      
      // If this requires followup, offer lead capture after a brief delay
      if (requiresFollowup) {
        setTimeout(() => {
          const followupMessage = createFollowupMessage();
          setMessages(prev => [...prev, followupMessage]);
          
          // Set context for potential lead capture
          setLeadContext(createLeadContext(textToSend, category));
        }, 2000);
      }
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = createErrorMessage();
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSuggestedQuestionClick = (question: string) => {
    setShowSuggestions(false);
    handleSendMessage(question);
  };
  
  const handleConnectRequest = () => {
    setShowLeadForm(true);
    setShowSuggestions(false);
  };

  const handleLeadSubmit = () => {
    setShowLeadForm(false);
    setShowSuggestions(false);
    const thankYouMessage = createThankYouMessage();
    setMessages(prev => [...prev, thankYouMessage]);
  };

  const handleLeadCancel = () => {
    setShowLeadForm(false);
    const cancelMessage = createCancelMessage();
    setMessages(prev => [...prev, cancelMessage]);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    showLeadForm,
    showSuggestions,
    leadContext,
    handleSendMessage,
    handleSuggestedQuestionClick,
    handleConnectRequest,
    handleLeadSubmit,
    handleLeadCancel
  };
};
