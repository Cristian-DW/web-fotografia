import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import Avatar from '../shared/Avatar';

export default function Sidebar() {
    const { user, profile, signOut } = useAuthStore();
    const { sidebarOpen, closeSidebar, openAuthModal, openCreatePostModal } = useUIStore();
    const location = useLocation();

    const handleLogout = async () => {
        await signOut();
        closeSidebar();
    };

    const navItems = [
        { path: '/', icon: 'home', label: 'Inicio' },
        { path: '/explore', icon: 'explore', label: 'Explorar' },
        { path: '/messages', icon: 'messages', label: 'Mensajes' },
        { path: '/notifications', icon: 'notifications', label: 'Notificaciones' },
    ];

    const icons = {
        home: (active) => (
            <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        explore: () => (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        messages: () => (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        notifications: () => (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    };

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={closeSidebar} />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
                <div className="sidebar__header">
                    <Link to="/" className="sidebar__logo" onClick={closeSidebar}>
                        <span className="sidebar__logo-icon">📸</span>
                        <span className="sidebar__logo-text">FrameFusion</span>
                    </Link>
                </div>

                <nav className="sidebar__nav">
                    {user ? (
                        <>
                            {/* User Profile Card */}
                            <Link
                                to={`/${profile?.username}`}
                                className="sidebar__user-card"
                                onClick={closeSidebar}
                            >
                                <Avatar
                                    src={profile?.avatar_url}
                                    alt={profile?.display_name || profile?.username}
                                    size="lg"
                                />
                                <div className="sidebar__user-info">
                                    <span className="sidebar__user-name">{profile?.display_name || profile?.username}</span>
                                    <span className="sidebar__user-handle">@{profile?.username}</span>
                                </div>
                            </Link>

                            {/* Navigation Items */}
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`sidebar__item ${location.pathname === item.path ? 'sidebar__item--active' : ''}`}
                                    onClick={closeSidebar}
                                >
                                    {icons[item.icon](location.pathname === item.path)}
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                            {/* Create Post Button */}
                            <button
                                onClick={() => { openCreatePostModal(); closeSidebar(); }}
                                className="sidebar__item sidebar__item--create"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Crear</span>
                            </button>

                            {/* Settings */}
                            <Link
                                to="/settings"
                                className={`sidebar__item ${location.pathname === '/settings' ? 'sidebar__item--active' : ''}`}
                                onClick={closeSidebar}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Configuración</span>
                            </Link>

                            {/* Logout */}
                            <button onClick={handleLogout} className="sidebar__item sidebar__item--danger">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Cerrar Sesión</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => { openAuthModal('login'); closeSidebar(); }}
                                className="sidebar__item"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>Iniciar Sesión</span>
                            </button>
                            <button
                                onClick={() => { openAuthModal('register'); closeSidebar(); }}
                                className="sidebar__item sidebar__item--highlight"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                <span>Registrarse</span>
                            </button>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}
