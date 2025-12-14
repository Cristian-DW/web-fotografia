import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import Avatar from '../shared/Avatar';

export default function Navbar() {
    const { user, profile, signOut } = useAuthStore();
    const { openAuthModal, openCreatePostModal, toggleNotificationPanel, toggleSidebar } = useUIStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();

    const handleLogout = async () => {
        await signOut();
        setShowUserMenu(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/feed" className="navbar__logo">
                    <span className="navbar__logo-icon">✦</span>
                    <span className="navbar__logo-text">Lumina</span>
                </Link>

                {/* Search Bar - Desktop */}
                <div className="navbar__search">
                    <svg className="navbar__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="navbar__search-input"
                    />
                </div>

                {/* Navigation Actions */}
                <div className="navbar__actions">
                    {user ? (
                        <>
                            {/* Home */}
                            <Link to="/feed" className={`navbar__action ${location.pathname === '/feed' ? 'navbar__action--active' : ''}`}>
                                <svg className="w-6 h-6" fill={location.pathname === '/feed' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </Link>

                            {/* Explore */}
                            <Link to="/explore" className={`navbar__action ${location.pathname === '/explore' ? 'navbar__action--active' : ''}`}>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Link>

                            {/* Create Post */}
                            <button onClick={openCreatePostModal} className="navbar__action navbar__action--create">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>

                            {/* Notifications */}
                            <button onClick={toggleNotificationPanel} className="navbar__action navbar__action--notifications">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="navbar__notification-badge">3</span>
                            </button>

                            {/* Messages */}
                            <Link to="/messages" className={`navbar__action ${location.pathname === '/messages' ? 'navbar__action--active' : ''}`}>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </Link>

                            {/* User Menu */}
                            <div className="navbar__user-menu">
                                <button onClick={() => setShowUserMenu(!showUserMenu)} className="navbar__user-trigger">
                                    <Avatar
                                        src={profile?.avatar_url}
                                        alt={profile?.display_name || profile?.username}
                                        size="sm"
                                    />
                                </button>

                                {showUserMenu && (
                                    <div className="navbar__dropdown">
                                        <Link
                                            to={`/${profile?.username}`}
                                            className="navbar__dropdown-item"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Perfil
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="navbar__dropdown-item"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Configuración
                                        </Link>
                                        <hr className="navbar__dropdown-divider" />
                                        <button onClick={handleLogout} className="navbar__dropdown-item navbar__dropdown-item--danger">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <button onClick={() => openAuthModal('login')} className="btn btn--ghost">
                                Iniciar Sesión
                            </button>
                            <button onClick={() => openAuthModal('register')} className="btn btn--primary">
                                Registrarse
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleSidebar} className="navbar__mobile-toggle">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
