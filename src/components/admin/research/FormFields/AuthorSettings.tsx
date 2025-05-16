
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AuthorSettingsProps {
  author: string;
  setAuthor: (author: string) => void;
  isPremium: boolean;
  setIsPremium: (isPremium: boolean) => void;
}

const AuthorSettings: React.FC<AuthorSettingsProps> = ({
  author,
  setAuthor,
  isPremium,
  setIsPremium,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="author">Author</Label>
        <div className="relative">
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name or team"
            className="pr-8"
          />
          {author && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-7 w-7 p-0"
              onClick={() => setAuthor("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear author</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-6">
        <Switch 
          id="premium"
          checked={isPremium}
          onCheckedChange={setIsPremium}
        />
        <Label htmlFor="premium">Premium Content (Subscription Required)</Label>
      </div>
    </div>
  );
};

export default AuthorSettings;
