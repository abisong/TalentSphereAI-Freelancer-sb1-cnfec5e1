import { create } from 'zustand';
import { Freelancer } from '../types';

interface FreelancerState {
  freelancers: Freelancer[];
  loading: boolean;
  error: string | null;
  fetchFreelancers: () => Promise<void>;
  searchFreelancers: (query: string) => Promise<void>;
  filterFreelancers: (category: string) => Promise<void>;
}

const mockFreelancers: Record<string, Freelancer[]> = {
  development: [
    {
      id: '1',
      userId: '1',
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer',
      rating: 4.8,
      projects: 93,
      verified: true,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      hourlyRate: 95,
      portfolio: [],
    },
    // Add more development freelancers
  ],
  design: [
    {
      id: '2',
      userId: '2',
      name: 'Sarah Chen',
      role: 'UX/UI Designer',
      rating: 4.9,
      projects: 127,
      verified: true,
      skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD'],
      hourlyRate: 85,
      portfolio: [],
    },
    // Add more design freelancers
  ],
  writing: [
    {
      id: '3',
      userId: '3',
      name: 'Emily Watson',
      role: 'Content Strategist',
      rating: 4.7,
      projects: 84,
      verified: true,
      skills: ['Content Strategy', 'SEO', 'Technical Writing'],
      hourlyRate: 75,
      portfolio: [],
    },
    // Add more writing freelancers
  ],
  marketing: [
    {
      id: '4',
      userId: '4',
      name: 'Michael Brown',
      role: 'Digital Marketing Specialist',
      rating: 4.6,
      projects: 76,
      verified: true,
      skills: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
      hourlyRate: 80,
      portfolio: [],
    },
    // Add more marketing freelancers
  ],
};

export const useFreelancerStore = create<FreelancerState>((set) => ({
  freelancers: [],
  loading: false,
  error: null,

  fetchFreelancers: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const allFreelancers = Object.values(mockFreelancers).flat();
      set({ freelancers: allFreelancers, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch freelancers', loading: false });
    }
  },

  searchFreelancers: async (query: string) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const allFreelancers = Object.values(mockFreelancers).flat();
      const filtered = allFreelancers.filter(freelancer => 
        freelancer.name.toLowerCase().includes(query.toLowerCase()) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
      );
      set({ freelancers: filtered, loading: false });
    } catch (error) {
      set({ error: 'Search failed', loading: false });
    }
  },

  filterFreelancers: async (category: string) => {
    set({ loading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const categoryFreelancers = mockFreelancers[category.toLowerCase()] || [];
      set({ freelancers: categoryFreelancers, loading: false });
    } catch (error) {
      set({ error: 'Filtering failed', loading: false });
    }
  },
}));