
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  position: string | null;
  role: 'Admin' | 'Developer' | 'Analyst' | 'Customer' | 'User' | 'Client';
  avatar_url: string | null;
  phone: string | null;
  industry: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResearchReport {
  id: string;
  title: string;
  type: string;
  date: string;
  preview: string;
  content: string | null;
  author: string | null;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReportFile {
  id: string;
  report_id: string;
  file_path: string;
  file_name: string;
  file_size: number | null;
  created_at: string;
}

export interface ReportImage {
  id: string;
  report_id: string;
  image_path: string;
  image_name: string;
  is_featured: boolean;
  created_at: string;
}

export interface ContentBlock {
  id: string;
  page_key: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_path: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MarketData {
  id: string;
  data_type: string;
  ticker_symbol: string | null;
  date: string;
  value: number;
  change_percent: number | null;
  additional_data: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  report_id: string;
  user_id: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  interval: string;
  features: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  subscription_id: string | null;
  amount: number;
  currency: string;
  payment_method: string | null;
  status: string;
  payment_date: string;
  additional_data: Record<string, any> | null;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  image_path: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  key: string;
  value: Record<string, any>;
  updated_at: string;
}
