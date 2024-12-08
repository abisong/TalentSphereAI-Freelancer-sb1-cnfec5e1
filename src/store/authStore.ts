import { create } from 'zustand';
import { User } from '../types';
import { useSubscriptionStore } from './subscriptionStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: { name: string; email: string; password: string; role: 'client' | 'freelancer' }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'client',
        subscriptionStatus: {
          isActive: true,
          type: 'trial'
        },
        trialEndsAt: null,
        monthlyViews: 0
      };

      // Start trial for new users
      const subscriptionStore = useSubscriptionStore.getState();
      subscriptionStore.startTrial();

      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  signup: async (userData) => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
        role: userData.role,
        subscriptionStatus: {
          isActive: true,
          type: 'trial'
        },
        trialEndsAt: null,
        monthlyViews: 0
      };

      // Start trial for new users
      const subscriptionStore = useSubscriptionStore.getState();
      subscriptionStore.startTrial();

      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  },
}));