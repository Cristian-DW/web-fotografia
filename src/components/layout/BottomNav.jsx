import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import Avatar from '../shared/Avatar';

export default function BottomNav() {
    const { user, profile } = useAuthStore();
    const { openAuthModal, openCreatePostModal } = useUIStore();
    const location = useLocation();

    if (!user) {
        return (
            <nav className="bottom-nav">
                <div className="bottom-nav__container">
                    <button onClick={() => openAuthModal('login')} className="bottom-nav__item">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Entrar</span>
                    </button>
                    <button onClick={() => openAuthModal('register')} className="bottom-nav__item bottom-nav__item--highlight">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>Únete</span>
                    </button>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav__container">
                {/* Home */}
                <Link to="/feed" className={`bottom-nav__item ${location.pathname === '/feed' ? 'bottom-nav__item--active' : ''}`}>
                    <svg className="w-6 h-6" fill={location.pathname === '/feed' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Inicio</span>
                </Link>

                {/* Explore */}
                <Link to="/explore" className={`bottom-nav__item ${location.pathname === '/explore' ? 'bottom-nav__item--active' : ''}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Explorar</span>
                </Link>

                {/* Create - Centered with gradient */}
                <button onClick={openCreatePostModal} className="bottom-nav__item bottom-nav__item--create">
                    <div className="bottom-nav__create-btn">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </button>

                {/* Messages */}
                <Link to="/messages" className={`bottom-nav__item ${location.pathname === '/messages' ? 'bottom-nav__item--active' : ''}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Mensajes</span>
                </Link>

                {/* Profile */}
                <Link to={`/${profile?.username}`} className={`bottom-nav__item ${location.pathname === `/${profile?.username}` ? 'bottom-nav__item--active' : ''}`}>
                    <Avatar
                        src={profile?.avatar_url}
                        alt={profile?.display_name || profile?.username}
                        size="xs"
                    />
                    <span>Perfil</span>
                </Link>
            </div>
        </nav>
    );
}
