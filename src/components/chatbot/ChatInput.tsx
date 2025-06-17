
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isTyping
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="flex p-4 border-t mt-auto">
      <div className="flex w-full gap-0 items-center bg-white dark:bg-gray-950 border rounded-md overflow-hidden pr-1">
        <Input
          placeholder="Ask Ako about our services..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={isTyping}
        />
        <Button 
          onClick={onSendMessage} 
          size="icon"
          className="bg-[#F2981D] hover:bg-[#F2981D]/90 text-white rounded-md h-9 w-9"
          disabled={isTyping || !inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
