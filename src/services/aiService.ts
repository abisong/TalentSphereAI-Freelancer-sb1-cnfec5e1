import { Project } from '../types';

interface MatchResult {
  score: number;
  reasons: string[];
}

export const aiService = {
  async matchFreelancerToProject(projectRequirements: Project, freelancerId: string): Promise<MatchResult> {
    // Simulate AI matching logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      score: 0.85,
      reasons: [
        'Skills match project requirements',
        'Previous experience in similar projects',
        'Availability matches project timeline',
      ],
    };
  },

  async generateQuote(project: Project): Promise<{
    minAmount: number;
    maxAmount: number;
    estimatedDuration: string;
    confidence: number;
  }> {
    // Simulate AI quote generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      minAmount: 2000,
      maxAmount: 3500,
      estimatedDuration: '3-4 weeks',
      confidence: 0.85,
    };
  },

  async analyzeSimilarProjects(projectDescription: string): Promise<Project[]> {
    // Simulate finding similar projects
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      {
        id: '1',
        title: 'Similar E-commerce Project',
        description: 'An e-commerce platform with similar requirements',
        budget: 2500,
        category: 'Development',
        skills: ['React', 'Node.js', 'E-commerce'],
        clientId: '1',
        status: 'completed',
      },
      // Add more similar projects...
    ];
  },
};