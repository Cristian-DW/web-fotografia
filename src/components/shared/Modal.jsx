import React, { useEffect } from 'react';

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showClose = true,
    className = ''
}) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose?.();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'modal--sm',
        md: 'modal--md',
        lg: 'modal--lg',
        xl: 'modal--xl',
        full: 'modal--full'
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal ${sizeClasses[size]} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || showClose) && (
                    <div className="modal__header">
                        {title && <h3 className="modal__title">{title}</h3>}
                        {showClose && (
                            <button className="modal__close" onClick={onClose} aria-label="Cerrar">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}
                <div className="modal__content">
                    {children}
                </div>
            </div>
        </div>
    );
}
