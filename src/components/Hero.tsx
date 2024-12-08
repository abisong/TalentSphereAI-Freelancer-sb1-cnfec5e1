import React from 'react';
import { useModal } from '../contexts/ModalContext';
import { useAuthStore } from '../store/authStore';

export default function Hero() {
  const { openHireTalent, openJoinFreelancer, openLogin } = useModal();
  const { isAuthenticated } = useAuthStore();

  const handleHireTalent = () => {
    if (isAuthenticated) {
      openHireTalent();
    } else {
      openLogin();
    }
  };

  const handleJoinFreelancer = () => {
    if (isAuthenticated) {
      openJoinFreelancer();
    } else {
      openLogin();
    }
  };

  return (
    <div className="bg-indigo-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Where AI Meets Talent
          </h1>
          <p className="text-xl text-indigo-200 mb-8">
            Connect with top freelancers through our AI-powered matching system
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleHireTalent}
              className="bg-white text-indigo-900 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors"
            >
              Hire Talent
            </button>
            <button
              onClick={handleJoinFreelancer}
              className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-800 transition-colors"
            >
              Join as Freelancer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}