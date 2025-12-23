import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import Button from './Button';

export default function FollowListModal({ isOpen, onClose, title, users, currentUserId, onFollowToggle }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal modal--follow-list" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button className="modal__close" onClick={onClose} aria-label="Cerrar">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="modal__body">
                    {users.length === 0 ? (
                        <p className="follow-list__empty">No hay usuarios aún</p>
                    ) : (
                        <div className="follow-list">
                            {users.map((user) => (
                                <div key={user.id} className="follow-list__item">
                                    <Link to={`/${user.username}`} className="follow-list__user" onClick={onClose}>
                                        <Avatar src={user.avatar_url} alt={user.username} size="md" />
                                        <div className="follow-list__info">
                                            <span className="follow-list__username">{user.username}</span>
                                            {user.display_name && (
                                                <span className="follow-list__display-name">{user.display_name}</span>
                                            )}
                                        </div>
                                    </Link>
                                    {currentUserId && currentUserId !== user.id && onFollowToggle && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onFollowToggle(user.id)}
                                        >
                                            Seguir
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <style jsx>{`
                    .modal--follow-list {
                        max-width: 400px;
                        max-height: 400px;
                        display: flex;
                        flex-direction: column;
                    }

                    .modal__body {
                        flex: 1;
                        overflow-y: auto;
                        padding: 0;
                    }

                    .follow-list {
                        display: flex;
                        flex-direction: column;
                    }

                    .follow-list__item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 12px 16px;
                        border-bottom: 1px solid var(--border-color);
                    }

                    .follow-list__item:last-child {
                        border-bottom: none;
                    }

                    .follow-list__user {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        flex: 1;
                        text-decoration: none;
                        color: inherit;
                    }

                    .follow-list__user:hover .follow-list__username {
                        text-decoration: underline;
                    }

                    .follow-list__info {
                        display: flex;
                        flex-direction: column;
                        gap: 2px;
                    }

                    .follow-list__username {
                        font-weight: 600;
                        color: var(--text-primary);
                    }

                    .follow-list__display-name {
                        font-size: 0.875rem;
                        color: var(--text-secondary);
                    }

                    .follow-list__empty {
                        padding: 32px 16px;
                        text-align: center;
                        color: var(--text-secondary);
                    }
                `}</style>
            </div>
        </div>
    );
}
