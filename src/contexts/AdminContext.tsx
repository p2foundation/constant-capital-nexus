
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

// Define types for our content
export interface ContentItem {
  id: string;
  title: string;
  type: string;
  content: string;
  dateCreated: string;
  lastModified: string;
  status: 'draft' | 'published';
  author?: string;
}

export interface AdminContextType {
  // Auth
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Content Management
  contentItems: ContentItem[];
  addContentItem: (item: Omit<ContentItem, 'id' | 'dateCreated' | 'lastModified'>) => void;
  updateContentItem: (id: string, item: Partial<ContentItem>) => void;
  deleteContentItem: (id: string) => void;
  getContentByType: (type: string) => ContentItem[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo user for initial development
const DEMO_USER: UserProfile = {
  id: '1',
  email: 'admin@constantcapital.com.gh',
  name: 'Admin User',
  role: 'admin',
};

// Demo content items for initial development
const DEMO_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'Market Overview - May 2025',
    type: 'market-summary',
    content: 'The Ghanaian market showed strong performance in Q1 2025 with the GSE index rising 12.3%...',
    dateCreated: '2025-05-01',
    lastModified: '2025-05-05',
    status: 'published',
    author: 'Market Research Team'
  },
  {
    id: '2',
    title: 'Banking Sector Report',
    type: 'research-report',
    content: 'Ghana\'s banking sector continues to show resilience with strong capital adequacy ratios...',
    dateCreated: '2025-04-15',
    lastModified: '2025-04-30',
    status: 'published',
    author: 'Emmanuel Agyei'
  }
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>(DEMO_CONTENT);

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // This would be replaced with actual API call
    if (email === 'admin@constantcapital.com.gh' && password === 'admin123') {
      setIsAuthenticated(true);
      setCurrentUser(DEMO_USER);
      toast.success("Login successful");
      return true;
    }
    
    toast.error("Invalid credentials");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast.info("Logged out successfully");
  };

  // Content management functions
  const addContentItem = (item: Omit<ContentItem, 'id' | 'dateCreated' | 'lastModified'>) => {
    const newItem: ContentItem = {
      ...item,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    
    setContentItems([...contentItems, newItem]);
    toast.success("Content item created");
  };

  const updateContentItem = (id: string, item: Partial<ContentItem>) => {
    setContentItems(
      contentItems.map(content => 
        content.id === id 
          ? { 
              ...content, 
              ...item, 
              lastModified: new Date().toISOString().split('T')[0] 
            } 
          : content
      )
    );
    toast.success("Content item updated");
  };

  const deleteContentItem = (id: string) => {
    setContentItems(contentItems.filter(item => item.id !== id));
    toast.success("Content item deleted");
  };

  const getContentByType = (type: string) => {
    return contentItems.filter(item => item.type === type);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      currentUser,
      login,
      logout,
      contentItems,
      addContentItem,
      updateContentItem,
      deleteContentItem,
      getContentByType
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
