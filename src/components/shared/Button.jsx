import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) {
    const baseClass = 'btn';
    const variantClass = `btn--${variant}`;
    const sizeClass = `btn--${size}`;
    const widthClass = fullWidth ? 'btn--full' : '';
    const loadingClass = loading ? 'btn--loading' : '';

    const classes = [
        baseClass,
        variantClass,
        sizeClass,
        widthClass,
        loadingClass,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg className="btn__spinner" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="btn__icon">{icon}</span>}
                    {children && <span className="btn__text">{children}</span>}
                    {icon && iconPosition === 'right' && <span className="btn__icon">{icon}</span>}
                </>
            )}
        </button>
    );
}
