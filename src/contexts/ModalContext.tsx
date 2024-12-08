import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isHireTalentOpen: boolean;
  isJoinFreelancerOpen: boolean;
  isUpgradeOpen: boolean;
  openLogin: () => void;
  openSignup: () => void;
  openHireTalent: () => void;
  openJoinFreelancer: () => void;
  openUpgrade: () => void;
  closeLogin: () => void;
  closeSignup: () => void;
  closeHireTalent: () => void;
  closeJoinFreelancer: () => void;
  closeUpgrade: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isHireTalentOpen, setIsHireTalentOpen] = useState(false);
  const [isJoinFreelancerOpen, setIsJoinFreelancerOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsHireTalentOpen(false);
    setIsJoinFreelancerOpen(false);
    setIsUpgradeOpen(false);
  };

  const openLogin = () => {
    closeAllModals();
    setIsLoginOpen(true);
  };

  const openSignup = () => {
    closeAllModals();
    setIsSignupOpen(true);
  };

  const openHireTalent = () => {
    closeAllModals();
    setIsHireTalentOpen(true);
  };

  const openJoinFreelancer = () => {
    closeAllModals();
    setIsJoinFreelancerOpen(true);
  };

  const openUpgrade = () => {
    closeAllModals();
    setIsUpgradeOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        isSignupOpen,
        isHireTalentOpen,
        isJoinFreelancerOpen,
        isUpgradeOpen,
        openLogin,
        openSignup,
        openHireTalent,
        openJoinFreelancer,
        openUpgrade,
        closeLogin: () => setIsLoginOpen(false),
        closeSignup: () => setIsSignupOpen(false),
        closeHireTalent: () => setIsHireTalentOpen(false),
        closeJoinFreelancer: () => setIsJoinFreelancerOpen(false),
        closeUpgrade: () => setIsUpgradeOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}