import { create } from 'zustand';
import { SubscriptionStatus } from '../types';

interface SubscriptionState {
  isActive: boolean;
  type: 'trial' | 'paid' | 'limited' | null;
  trialEndsAt: string | null;
  monthlyViews: number;
  startTrial: () => void;
  upgradeToPaid: () => void;
  checkSubscriptionStatus: () => void;
  incrementViews: () => boolean; // Returns true if view was allowed
}

const MAX_MONTHLY_VIEWS_LIMITED = 5;

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  isActive: false,
  type: null,
  trialEndsAt: null,
  monthlyViews: 0,

  startTrial: () => {
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 30);
    
    set({
      isActive: true,
      type: 'trial',
      trialEndsAt: trialEnd.toISOString(),
      monthlyViews: 0,
    });
  },

  upgradeToPaid: () => {
    set({
      isActive: true,
      type: 'paid',
      monthlyViews: 0,
    });
  },

  checkSubscriptionStatus: () => {
    const state = get();
    
    if (state.type === 'trial' && state.trialEndsAt) {
      const trialEnd = new Date(state.trialEndsAt);
      if (trialEnd < new Date()) {
        set({
          isActive: false,
          type: 'limited',
          trialEndsAt: null,
        });
      }
    }
  },

  incrementViews: () => {
    const state = get();
    
    // Paid subscribers have unlimited views
    if (state.type === 'paid') {
      return true;
    }

    // Trial users have unlimited views during trial period
    if (state.type === 'trial') {
      const trialEnd = state.trialEndsAt ? new Date(state.trialEndsAt) : null;
      if (trialEnd && trialEnd > new Date()) {
        return true;
      }
    }

    // Limited users have restricted views
    if (state.type === 'limited') {
      if (state.monthlyViews >= MAX_MONTHLY_VIEWS_LIMITED) {
        return false;
      }
      set({ monthlyViews: state.monthlyViews + 1 });
      return true;
    }

    return false;
  },
}));