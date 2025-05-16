
import React from 'react';
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}) => {
  return (
    <form onSubmit={handleSearchSubmit} className="mb-4 flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search reports by title, preview or author..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
