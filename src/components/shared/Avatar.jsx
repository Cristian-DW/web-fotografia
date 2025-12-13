import React from 'react';

export default function Avatar({
    src,
    alt = 'Avatar',
    size = 'md',
    className = '',
    onClick,
    isOnline = false
}) {
    const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-14 h-14',
        xl: 'w-20 h-20',
        '2xl': 'w-32 h-32'
    };

    const placeholderSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=8b5cf6&color=fff`;

    return (
        <div className={`avatar ${sizeClasses[size]} ${className}`} onClick={onClick}>
            <img
                src={src || placeholderSrc}
                alt={alt}
                className="avatar__image"
                onError={(e) => { e.target.src = placeholderSrc; }}
            />
            {isOnline && <span className="avatar__status avatar__status--online" />}
        </div>
    );
}
