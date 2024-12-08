import React from 'react';
import FreelancerCard from './FreelancerCard';

export default function FeaturedPortfolios() {
  const freelancers = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'UX/UI Designer',
      rating: 4.9,
      projects: 127,
      verified: true,
      initials: 'SC',
      skills: ['UI Design', 'UX Research', 'Figma', 'User Testing'],
      hourlyRate: 85,
      specialization: 'Enterprise UX Design',
      languages: ['English', 'Mandarin'],
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer',
      rating: 4.8,
      projects: 93,
      verified: true,
      initials: 'AR',
      skills: ['React', 'Node.js', 'TypeScript', 'Blockchain'],
      hourlyRate: 95,
      specialization: 'Web3 Development',
      languages: ['English', 'Spanish'],
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'Content Strategist',
      rating: 4.7,
      projects: 84,
      verified: true,
      initials: 'EW',
      skills: ['Content Strategy', 'SEO', 'Technical Writing'],
      hourlyRate: 75,
      specialization: 'Technical Documentation',
      languages: ['English'],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Portfolios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} {...freelancer} />
          ))}
        </div>
      </div>
    </section>
  );
}