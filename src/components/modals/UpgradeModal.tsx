import React from 'react';
import Modal from './Modal';
import { useModal } from '../../contexts/ModalContext';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { Check, Zap } from 'lucide-react';

export default function UpgradeModal() {
  const { isUpgradeOpen, closeUpgrade } = useModal();
  const { upgradeToPaid } = useSubscriptionStore();

  const handleUpgrade = () => {
    upgradeToPaid();
    closeUpgrade();
  };

  const features = [
    'Unlimited portfolio views',
    'Priority support',
    'Advanced AI matching',
    'Detailed analytics',
    'Custom project recommendations',
  ];

  return (
    <Modal isOpen={isUpgradeOpen} onClose={closeUpgrade} title="Upgrade to Premium">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Zap className="w-12 h-12 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Unlock Full Access</h3>
          <p className="text-gray-600">Get unlimited access to all features and portfolios</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center mb-4">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-gray-600">/month</span>
          </div>

          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleUpgrade}
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Upgrade Now
        </button>

        <p className="text-center text-sm text-gray-600">
          Cancel anytime. No long-term commitment required.
        </p>
      </div>
    </Modal>
  );
}