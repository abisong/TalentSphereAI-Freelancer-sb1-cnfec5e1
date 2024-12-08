import React from 'react';
import Modal from './Modal';
import LoginForm from '../auth/LoginForm';
import { useModal } from '../../contexts/ModalContext';

export default function LoginModal() {
  const { isLoginOpen, closeLogin, openSignup } = useModal();

  return (
    <Modal isOpen={isLoginOpen} onClose={closeLogin} title="Log In">
      <LoginForm />
      <div className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => {
            closeLogin();
            openSignup();
          }}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Sign up
        </button>
      </div>
    </Modal>
  );
}