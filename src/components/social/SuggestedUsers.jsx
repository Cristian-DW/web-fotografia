import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { db } from '../../lib/supabase';
import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import toast from 'react-hot-toast';

export default function SuggestedUsers({ limit = 5 }) {
    const { user } = useAuthStore();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [followingIds, setFollowingIds] = useState(new Set());

    useEffect(() => {
        if (user) {
            loadSuggestions();
        }
    }, [user]);

    const loadSuggestions = async () => {
        setLoading(true);
        try {
            const { data, error } = await db.getSuggestedUsers(user.id, limit);
            if (error) throw error;
            setSuggestions(data || []);
        } catch (error) {
            console.error('Error loading suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (userId) => {
        try {
            const { error } = await db.followUser(user.id, userId);
            if (error) throw error;

            setFollowingIds(prev => new Set([...prev, userId]));
            toast.success('¡Ahora sigues a este usuario!');
        } catch (error) {
            console.error('Error following user:', error);
            toast.error('Error al seguir');
        }
    };

    if (!user) return null;

    return (
        <div className="suggested-users">
            <div className="suggested-users__header">
                <span className="suggested-users__title">Sugerencias para ti</span>
                <Link to="/explore" className="suggested-users__see-all">Ver todo</Link>
            </div>

            {loading ? (
                <div className="suggested-users__loading">
                    <div className="loading-skeleton" />
                    <div className="loading-skeleton" />
                    <div className="loading-skeleton" />
                </div>
            ) : suggestions.length === 0 ? (
                <p className="suggested-users__empty">No hay sugerencias por ahora</p>
            ) : (
                <ul className="suggested-users__list">
                    {suggestions.map((profile) => (
                        <li key={profile.id} className="suggested-user">
                            <Link to={`/${profile.username}`} className="suggested-user__info">
                                <Avatar
                                    src={profile.avatar_url}
                                    alt={profile.display_name || profile.username}
                                    size="sm"
                                />
                                <div className="suggested-user__text">
                                    <span className="suggested-user__username">{profile.username}</span>
                                    <span className="suggested-user__name">{profile.display_name}</span>
                                </div>
                            </Link>
                            <Button
                                variant={followingIds.has(profile.id) ? 'secondary' : 'primary'}
                                size="sm"
                                onClick={() => handleFollow(profile.id)}
                                disabled={followingIds.has(profile.id)}
                            >
                                {followingIds.has(profile.id) ? 'Siguiendo' : 'Seguir'}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}

            <style jsx>{`
                .suggested-users {
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    padding: 16px;
                    margin-bottom: 16px;
                }
                
                .suggested-users__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }
                
                .suggested-users__title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                }
                
                .suggested-users__see-all {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--accent-primary);
                    text-decoration: none;
                }
                
                .suggested-users__see-all:hover {
                    text-decoration: underline;
                }
                
                .suggested-users__loading {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .loading-skeleton {
                    height: 48px;
                    background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: var(--radius-sm);
                }
                
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                
                .suggested-users__empty {
                    text-align: center;
                    color: var(--text-tertiary);
                    font-size: 0.875rem;
                    padding: 16px 0;
                    margin: 0;
                }
                
                .suggested-users__list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .suggested-user {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                
                .suggested-user__info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                    flex: 1;
                    min-width: 0;
                }
                
                .suggested-user__info:hover .suggested-user__username {
                    text-decoration: underline;
                }
                
                .suggested-user__text {
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }
                
                .suggested-user__username {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .suggested-user__name {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}
