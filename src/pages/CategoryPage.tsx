import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFreelancerStore } from '../store/freelancerStore';
import FreelancerCard from '../components/FreelancerCard';
import SearchBar from '../components/search/SearchBar';
import { Loader } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { freelancers, loading, error, filterFreelancers } = useFreelancerStore();

  useEffect(() => {
    if (category) {
      filterFreelancers(category);
    }
  }, [category, filterFreelancers]);

  const getCategoryTitle = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'development':
        return 'Development & Programming';
      case 'design':
        return 'Design & Creative';
      case 'writing':
        return 'Writing & Content';
      case 'marketing':
        return 'Marketing & SEO';
      default:
        return category;
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getCategoryTitle(category || '')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and hire top {category?.toLowerCase()} freelancers for your next project.
            Our AI-powered matching system ensures the perfect fit for your needs.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freelancers.map((freelancer) => (
              <FreelancerCard
                key={freelancer.id}
                id={freelancer.id}
                name={freelancer.name}
                role={freelancer.role}
                rating={freelancer.rating}
                projects={freelancer.projects}
                verified={freelancer.verified}
                initials={freelancer.name.split(' ').map(n => n[0]).join('')}
                skills={freelancer.skills}
                hourlyRate={freelancer.hourlyRate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}