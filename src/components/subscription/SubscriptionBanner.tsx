import React from 'react';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useModal } from '../../contexts/ModalContext';
import { Clock, AlertCircle } from 'lucide-react';

export default function SubscriptionBanner() {
  const { type, trialEndsAt, monthlyViews } = useSubscriptionStore();
  const { openUpgrade } = useModal();

  if (type === 'paid') return null;

  const trialDaysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  if (type === 'trial' && trialDaysLeft > 0) {
    return (
      <div className="bg-indigo-600 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>
              Your free trial ends in {trialDaysLeft} days. Upgrade now to maintain full access!
            </span>
          </div>
          <button 
            onClick={openUpgrade}
            className="bg-white text-indigo-600 px-4 py-1 rounded-md text-sm font-medium hover:bg-indigo-50"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  if (type === 'limited') {
    return (
      <div className="bg-yellow-500 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>
              Limited access: {5 - monthlyViews} portfolio views remaining this month. Upgrade for unlimited access!
            </span>
          </div>
          <button 
            onClick={openUpgrade}
            className="bg-white text-yellow-500 px-4 py-1 rounded-md text-sm font-medium hover:bg-yellow-50"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  return null;
}