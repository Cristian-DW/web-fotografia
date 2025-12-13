import React, { useEffect } from 'react';
import { useUIStore } from '../../stores/uiStore';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal() {
    const { authModalOpen, authModalMode, closeAuthModal } = useUIStore();

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeAuthModal();
        };

        if (authModalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [authModalOpen, closeAuthModal]);

    if (!authModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeAuthModal}>
            <div className="modal modal--auth" onClick={(e) => e.stopPropagation()}>
                <button className="modal__close" onClick={closeAuthModal} aria-label="Cerrar">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="modal__content">
                    {authModalMode === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </div>
    );
}
