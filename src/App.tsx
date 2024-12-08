import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginModal from './components/modals/LoginModal';
import SignupModal from './components/modals/SignupModal';
import HireTalentModal from './components/modals/HireTalentModal';
import JoinFreelancerModal from './components/modals/JoinFreelancerModal';
import UpgradeModal from './components/modals/UpgradeModal';
import SubscriptionBanner from './components/subscription/SubscriptionBanner';

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <div className="min-h-screen bg-gray-50">
          <SubscriptionBanner />
          <Navbar />
          <HomePage />
          <LoginModal />
          <SignupModal />
          <HireTalentModal />
          <JoinFreelancerModal />
          <UpgradeModal />
        </div>
      </ModalProvider>
    </BrowserRouter>
  );
}