import React, { useEffect } from 'react';
import Modal from './Modal';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Loader, Star, Globe, Award } from 'lucide-react';
import { Freelancer } from '../../types';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  freelancer: Freelancer;
}

export default function PortfolioModal({ isOpen, onClose, freelancer }: PortfolioModalProps) {
  const { currentPortfolio, loading, error, fetchPortfolio } = usePortfolioStore();

  useEffect(() => {
    if (isOpen) {
      fetchPortfolio(freelancer.id);
    }
  }, [isOpen, freelancer.id, fetchPortfolio]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${freelancer.name}'s Portfolio`}>
      <div className="space-y-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-semibold">
              {freelancer.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{freelancer.name}</h3>
            <p className="text-gray-600">{freelancer.role}</p>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="ml-1">{freelancer.rating}</span>
              <span className="mx-2">•</span>
              <span>{freelancer.projects} Projects</span>
              <span className="mx-2">•</span>
              <span>${freelancer.hourlyRate}/hr</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {freelancer.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {currentPortfolio.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Contact Freelancer
          </button>
        </div>
      </div>
    </Modal>
  );
}