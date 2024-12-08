import { create } from 'zustand';
import { PortfolioItem } from '../types';

interface PortfolioState {
  currentPortfolio: PortfolioItem[];
  loading: boolean;
  error: string | null;
  fetchPortfolio: (freelancerId: string) => Promise<void>;
}

const portfolioData: Record<string, PortfolioItem[]> = {
  '1': [ // Sarah Chen's Portfolio
    {
      id: '1',
      title: 'E-commerce Website Redesign',
      description: 'Redesigned the user interface for a major e-commerce platform, resulting in a 40% increase in conversion rate.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      category: 'Design',
      skills: ['UI Design', 'UX Research', 'Figma', 'User Testing'],
    },
    {
      id: '2',
      title: 'Healthcare App Design',
      description: 'Created an intuitive mobile app design for a telemedicine platform, focusing on accessibility and ease of use.',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      category: 'Design',
      skills: ['Mobile Design', 'Healthcare UX', 'Prototyping'],
    },
    {
      id: '3',
      title: 'SaaS Dashboard Redesign',
      description: 'Modernized a complex analytics dashboard, improving data visualization and user workflow efficiency.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      category: 'Design',
      skills: ['Dashboard Design', 'Data Visualization', 'Figma'],
    },
  ],
  '2': [ // Alex Rodriguez's Portfolio
    {
      id: '1',
      title: 'Real-time Chat Application',
      description: 'Built a scalable real-time chat platform using React and WebSocket, supporting thousands of concurrent users.',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      category: 'Development',
      skills: ['React', 'Node.js', 'WebSocket', 'Redis'],
    },
    {
      id: '2',
      title: 'Blockchain Trading Platform',
      description: 'Developed a secure cryptocurrency trading platform with real-time market data and automated trading features.',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      category: 'Development',
      skills: ['TypeScript', 'Blockchain', 'WebSocket', 'Security'],
    },
    {
      id: '3',
      title: 'AI-Powered CRM System',
      description: 'Created a modern CRM system with AI-driven insights and automated customer segmentation.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      category: 'Development',
      skills: ['React', 'Python', 'Machine Learning', 'API Design'],
    },
  ],
  '3': [ // Emily Watson's Portfolio
    {
      id: '1',
      title: 'Tech Blog Content Strategy',
      description: 'Developed and executed a comprehensive content strategy that increased organic traffic by 200% in 6 months.',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
      category: 'Writing',
      skills: ['Content Strategy', 'SEO', 'Technical Writing'],
    },
    {
      id: '2',
      title: 'SaaS Product Documentation',
      description: 'Created user-friendly documentation and tutorials for a complex enterprise software product.',
      imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80',
      category: 'Writing',
      skills: ['Technical Documentation', 'UX Writing', 'Information Architecture'],
    },
    {
      id: '3',
      title: 'Email Marketing Campaign',
      description: 'Designed and wrote a series of high-converting email campaigns achieving a 45% open rate.',
      imageUrl: 'https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?w=800&q=80',
      category: 'Writing',
      skills: ['Email Marketing', 'Copywriting', 'A/B Testing'],
    },
  ],
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  currentPortfolio: [],
  loading: false,
  error: null,

  fetchPortfolio: async (freelancerId: string) => {
    set({ loading: true });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const portfolio = portfolioData[freelancerId];
      if (!portfolio) {
        throw new Error('Portfolio not found');
      }
      
      set({ currentPortfolio: portfolio, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch portfolio', loading: false });
    }
  },
}));