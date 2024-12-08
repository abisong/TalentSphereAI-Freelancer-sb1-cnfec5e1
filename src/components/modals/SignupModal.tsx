import React from 'react';
import Modal from './Modal';
import SignupForm from '../auth/SignupForm';
import { useModal } from '../../contexts/ModalContext';

export default function SignupModal() {
  const { isSignupOpen, closeSignup, openLogin } = useModal();

  return (
    <Modal isOpen={isSignupOpen} onClose={closeSignup} title="Create Account">
      <SignupForm />
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={() => {
            closeSignup();
            openLogin();
          }}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Log in
        </button>
      </div>
    </Modal>
  );
}