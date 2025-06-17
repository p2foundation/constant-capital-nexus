
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquare, Bird } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatBot } from './chatbot/useChatBot';
import LeadCaptureForm from './chatbot/LeadCaptureForm';
import ChatMessage from './chatbot/ChatMessage';
import TypingIndicator from './chatbot/TypingIndicator';
import ChatInput from './chatbot/ChatInput';
import SuggestedQuestions from './chatbot/SuggestedQuestions';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
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
  } = useChatBot();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
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
                <Bird className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="font-medium">
                Ako - Constant Capital Assistant
              </DialogTitle>
            </div>
          </DialogHeader>
          
          <ScrollArea className="flex-1 p-4 space-y-4">
            <div className="space-y-4">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Suggested Questions */}
              {showSuggestions && (
                <SuggestedQuestions onQuestionClick={handleSuggestedQuestionClick} />
              )}
              
              {/* Lead Capture Form */}
              {showLeadForm && (
                <LeadCaptureForm
                  onSubmit={handleLeadSubmit}
                  onCancel={handleLeadCancel}
                  initialInquiry={leadContext.inquiry}
                  category={leadContext.category}
                />
              )}

              {/* Connect Button */}
              {!showLeadForm && !showSuggestions && messages.length > 2 && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleConnectRequest}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    Connect with Investment Team
                  </Button>
                </div>
              )}
              
              {isTyping && <TypingIndicator />}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {!showLeadForm && (
            <ChatInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
