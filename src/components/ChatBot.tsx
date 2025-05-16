import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m Constant Capital\'s AI assistant. How can I help you with your investment needs today?',
    sender: 'bot',
    timestamp: new Date()
  }
];

// Mock responses based on keywords
const getBotResponse = (message: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  if (lowerCaseMessage.includes('investment') || lowerCaseMessage.includes('invest')) {
    return "At Constant Capital, we offer various investment options tailored to your financial goals. Our advisory team can help you build a diversified portfolio across equities, fixed income, and alternative investments. Would you like to speak with an investment advisor?";
  }
  
  if (lowerCaseMessage.includes('market') || lowerCaseMessage.includes('stock')) {
    return "Our research team provides comprehensive market analysis across West African and global markets. We cover equities, fixed income, and macroeconomic trends. Would you like to receive our latest market report?";
  }
  
  if (lowerCaseMessage.includes('account') || lowerCaseMessage.includes('open')) {
    return "Opening an account with Constant Capital is easy. You'll need to complete our application form, provide identification documents, and make an initial deposit. Would you like me to arrange a call with our client services team to guide you through the process?";
  }
  
  if (lowerCaseMessage.includes('fee') || lowerCaseMessage.includes('charge') || lowerCaseMessage.includes('commission')) {
    return "Our fee structure varies depending on the services you require. We offer competitive rates for trading, advisory, and fund management services. For a detailed breakdown of our fees, I recommend speaking with one of our client representatives who can provide information specific to your needs.";
  }
  
  if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('speak') || lowerCaseMessage.includes('call')) {
    return "You can contact our team at +233 20 000 0000 or email us at info@constantcapital.com. Alternatively, I can arrange for one of our representatives to call you at a convenient time. Would you like me to schedule a call for you?";
  }
  
  return "Thank you for your question. To provide you with the most accurate information, I'd recommend speaking with one of our financial advisors who can address your specific needs. Would you like me to arrange a call with our team?";
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot reply after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-cc-gold hover:bg-cc-gold/90 text-cc-navy"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] h-[600px] max-h-[80vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#F2981D] p-1.5 rounded-md">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="font-medium">
                Constant Capital Assistant
              </DialogTitle>
            </div>
            {/* Only one close button */}
          </DialogHeader>
          
          <ScrollArea className="flex-1 p-4 space-y-4">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-[#F2981D] text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-right mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <DialogFooter className="flex p-4 border-t mt-auto">
            <div className="flex w-full gap-0 items-center bg-white dark:bg-gray-950 border rounded-md overflow-hidden pr-1">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                className="bg-[#F2981D] hover:bg-[#F2981D]/90 text-white rounded-md h-9 w-9"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
