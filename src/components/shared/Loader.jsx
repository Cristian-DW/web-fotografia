import React from 'react';

export default function Loader({ size = 'md', className = '' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <div className={`loader ${className}`}>
            <svg
                className={`loader__spinner ${sizeClasses[size]}`}
                viewBox="0 0 24 24"
            >
                <circle
                    className="loader__track"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeOpacity="0.2"
                />
                <path
                    className="loader__path"
                    fill="none"
                    stroke="url(#loader-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    d="M12 2a10 10 0 0 1 10 10"
                />
                <defs>
                    <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

// Full page loader
export function PageLoader() {
    return (
        <div className="page-loader">
            <Loader size="xl" />
            <p className="page-loader__text">Cargando...</p>
        </div>
    );
}
