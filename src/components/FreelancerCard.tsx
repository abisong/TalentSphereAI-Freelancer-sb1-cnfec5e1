import React, { useState } from 'react';
import { Star, CheckCircle, Lock } from 'lucide-react';
import PortfolioModal from './modals/PortfolioModal';
import { Freelancer } from '../types';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { useModal } from '../contexts/ModalContext';

interface FreelancerCardProps {
  name: string;
  role: string;
  rating: number;
  projects: number;
  verified: boolean;
  initials: string;
  id: string;
  skills: string[];
  hourlyRate: number;
}

export default function FreelancerCard({
  name,
  role,
  rating,
  projects,
  verified,
  initials,
  id,
  skills,
  hourlyRate,
}: FreelancerCardProps) {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const { incrementViews, type } = useSubscriptionStore();
  const { openLogin } = useModal();

  const freelancer: Freelancer = {
    id,
    userId: id,
    name,
    role,
    rating,
    projects,
    verified,
    skills,
    hourlyRate,
    portfolio: [],
  };

  const handleViewPortfolio = () => {
    if (type === null) {
      openLogin();
      return;
    }

    const canView = incrementViews();
    if (canView) {
      setIsPortfolioOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">{initials}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              {verified && (
                <CheckCircle className="w-5 h-5 text-indigo-600 ml-2" />
              )}
            </div>
            <p className="text-gray-600">{role}</p>
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="ml-1 text-gray-700">{rating}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-600">{projects} Projects</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleViewPortfolio}
          className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center"
        >
          {type === 'limited' && (
            <Lock className="w-4 h-4 mr-2" />
          )}
          View Portfolio
        </button>
      </div>

      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        freelancer={freelancer}
      />
    </>
  );
}