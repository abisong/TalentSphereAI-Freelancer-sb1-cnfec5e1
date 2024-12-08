export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt: string | null;
  monthlyViews: number;
}

export interface SubscriptionStatus {
  isActive: boolean;
  type: 'trial' | 'paid' | 'limited' | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  clientId: string;
  status: 'open' | 'in-progress' | 'completed';
}

export interface Freelancer {
  id: string;
  userId: string;
  name: string;
  role: string;
  rating: number;
  projects: number;
  verified: boolean;
  skills: string[];
  hourlyRate: number;
  portfolio: PortfolioItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  skills: string[];
}