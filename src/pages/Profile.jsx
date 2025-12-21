import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { db } from '../lib/supabase';
import Avatar from '../components/shared/Avatar';
import Button from '../components/shared/Button';
import { PageLoader } from '../components/shared/Loader';
import toast from 'react-hot-toast';

export default function Profile() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user, profile: currentUserProfile } = useAuthStore();

    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [editForm, setEditForm] = useState({
        display_name: '',
        bio: '',
        website: ''
    });
    const [activeTab, setActiveTab] = useState('posts'); // posts | saved

    const isOwnProfile = user && profile && user.id === profile.id;

    useEffect(() => {
        if (username) {
            loadProfile();
        }
    }, [username]);

    const loadProfile = async () => {
        setLoading(true);
        try {
            // Load profile
            const { data: profileData, error: profileError } = await db.getProfileByUsername(username);
            if (profileError) throw profileError;
            if (!profileData) {
                toast.error('Usuario no encontrado');
                navigate('/');
                return;
            }

            setProfile(profileData);
            setEditForm({
                display_name: profileData.display_name || '',
                bio: profileData.bio || '',
                website: profileData.website || ''
            });

            // Load posts
            const { data: postsData } = await db.getUserPosts(profileData.id);
            setPosts(postsData || []);

            // Load follower counts
            await loadFollowerCounts(profileData.id);

            // Check if following (if logged in and not own profile)
            if (user && user.id !== profileData.id) {
                await checkFollowStatus(profileData.id);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            toast.error('Error al cargar perfil');
        } finally {
            setLoading(false);
        }
    };

    const loadFollowerCounts = async (userId) => {
        try {
            const { data: followers } = await db.getFollowers(userId);
            const { data: following } = await db.getFollowing(userId);
            setFollowerCount((followers || []).length);
            setFollowingCount((following || []).length);
        } catch (error) {
            console.error('Error loading follower counts:', error);
        }
    };

    const checkFollowStatus = async (profileUserId) => {
        try {
            const { data } = await db.checkFollow(user.id, profileUserId);
            setIsFollowing(!!data);
        } catch (error) {
            console.error('Error checking follow status:', error);
        }
    };

    const handleFollow = async () => {
        if (!user) {
            toast.error('Inicia sesión para seguir');
            return;
        }

        try {
            if (isFollowing) {
                await db.unfollowUser(user.id, profile.id);
                setIsFollowing(false);
                setFollowerCount(prev => prev - 1);
                toast.success('Dejaste de seguir');
            } else {
                await db.followUser(user.id, profile.id);
                setIsFollowing(true);
                setFollowerCount(prev => prev + 1);
                toast.success('Ahora sigues a este usuario');
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
            toast.error('Error al seguir/dejar de seguir');
        }
    };

    const handleSaveProfile = async () => {
        try {
            const { error } = await db.updateProfile(user.id, editForm);
            if (error) throw error;

            setProfile({ ...profile, ...editForm });
            setIsEditing(false);
            toast.success('Perfil actualizado');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error al actualizar perfil');
        }
    };

    if (loading) {
        return <PageLoader />;
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-header__avatar">
                    <Avatar src={profile.avatar_url} alt={profile.username} size="xl" />
                </div>

                <div className="profile-header__info">
                    <div className="profile-header__top">
                        <h1 className="profile-username">{profile.username}</h1>

                        {isOwnProfile ? (
                            <div className="profile-actions">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Cancelar' : 'Editar perfil'}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate('/settings')}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant={isFollowing ? 'secondary' : 'primary'}
                                onClick={handleFollow}
                            >
                                {isFollowing ? 'Siguiendo' : 'Seguir'}
                            </Button>
                        )}
                    </div>

                    <div className="profile-stats">
                        <div className="profile-stat">
                            <strong>{posts.length}</strong>
                            <span>publicaciones</span>
                        </div>
                        <button className="profile-stat">
                            <strong>{followerCount}</strong>
                            <span>seguidores</span>
                        </button>
                        <button className="profile-stat">
                            <strong>{followingCount}</strong>
                            <span>siguiendo</span>
                        </button>
                    </div>

                    {isEditing ? (
                        <div className="profile-edit-form">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={editForm.display_name}
                                onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                                className="profile-input"
                            />
                            <textarea
                                placeholder="Biografía"
                                value={editForm.bio}
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                className="profile-textarea"
                                rows="3"
                            />
                            <input
                                type="url"
                                placeholder="Sitio web"
                                value={editForm.website}
                                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                                className="profile-input"
                            />
                            <Button onClick={handleSaveProfile}>Guardar cambios</Button>
                        </div>
                    ) : (
                        <div className="profile-bio">
                            {profile.display_name && (
                                <p className="profile-name">{profile.display_name}</p>
                            )}
                            {profile.bio && <p className="profile-bio-text">{profile.bio}</p>}
                            {profile.website && (
                                <a
                                    href={profile.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-website"
                                >
                                    {profile.website}
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button
                    className={`profile-tab ${activeTab === 'posts' ? 'profile-tab--active' : ''}`}
                    onClick={() => setActiveTab('posts')}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zM14 3h7v7h-7V3zm0 11h7v7h-7v-7z" />
                    </svg>
                    <span>Publicaciones</span>
                </button>
                {isOwnProfile && (
                    <button
                        className={`profile-tab ${activeTab === 'saved' ? 'profile-tab--active' : ''}`}
                        onClick={() => setActiveTab('saved')}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span>Guardado</span>
                    </button>
                )}
            </div>

            {/* Posts Grid */}
            <div className="profile-grid">
                {posts.length === 0 ? (
                    <div className="profile-empty">
                        <div className="profile-empty__icon">📷</div>
                        <h3>No hay publicaciones aún</h3>
                        {isOwnProfile && <p>Comparte tus fotos para que aparezcan aquí</p>}
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="profile-grid-item">
                            <img src={post.image_url} alt={post.caption || 'Post'} />
                            <div className="profile-grid-overlay">
                                <div className="profile-grid-stat">
                                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span>{post.reactions?.length || 0}</span>
                                </div>
                                <div className="profile-grid-stat">
                                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                                    </svg>
                                    <span>{post.comments?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .profile-page {
                    max-width: 935px;
                    margin: 0 auto;
                    padding: 30px 20px;
                }

                .profile-header {
                    display: flex;
                    gap: 70px;
                    margin-bottom: 44px;
                    padding-bottom: 44px;
                    border-bottom: 1px solid var(--border-color);
                }

                .profile-header__avatar {
                    flex-shrink: 0;
                }

                .profile-header__info {
                    flex: 1;
                    min-width: 0;
                }

                .profile-header__top {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .profile-username {
                    font-size: 28px;
                    font-weight: 300;
                    margin: 0;
                }

                .profile-actions {
                    display: flex;
                    gap: 8px;
                }

                .profile-stats {
                    display: flex;
                    gap: 40px;
                    margin-bottom: 20px;
                }

                .profile-stat {
                    display: flex;
                    gap: 4px;
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    cursor: pointer;
                    font-size: 16px;
                }

                .profile-stat strong {
                    font-weight: 600;
                }

                .profile-stat span {
                    color: var(--text-secondary);
                }

                .profile-bio {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .profile-name {
                    font-weight: 600;
                    margin: 0;
                }

                .profile-bio-text {
                    white-space: pre-wrap;
                    margin: 0;
                }

                .profile-website {
                    color: var(--accent-primary);
                    text-decoration: none;
                    font-weight: 600;
                }

                .profile-website:hover {
                    text-decoration: underline;
                }

                .profile-edit-form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    max-width: 400px;
                }

                .profile-input,
                .profile-textarea {
                    padding: 10px 12px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    color: var(--text-primary);
                    font-family: inherit;
                }

                .profile-textarea {
                    resize: vertical;
                    min-height: 60px;
                }

                .profile-tabs {
                    display: flex;
                    justify-content: center;
                    gap: 60px;
                    border-top: 1px solid var(--border-color);
                    margin-bottom: 20px;
                }

                .profile-tab {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 16px 0;
                    background: none;
                    border: none;
                    border-top: 1px solid transparent;
                    margin-top: -1px;
                    color: var(--text-tertiary);
                    font-weight: 600;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: var(--transition-fast);
                }

                .profile-tab--active {
                    color: var(--text-primary);
                    border-top-color: var(--text-primary);
                }

                .profile-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 28px;
                }

                @media (max-width: 768px) {
                    .profile-grid {
                        gap: 3px;
                    }
                }

                .profile-grid-item {
                    position: relative;
                    aspect-ratio: 1;
                    overflow: hidden;
                    background: var(--bg-tertiary);
                    cursor: pointer;
                }

                .profile-grid-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .profile-grid-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 30px;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .profile-grid-item:hover .profile-grid-overlay {
                    opacity: 1;
                }

                .profile-grid-stat {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: white;
                    font-weight: 600;
                }

                .profile-empty {
                    grid-column: 1 / -1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    text-align: center;
                }

                .profile-empty__icon {
                    font-size: 4rem;
                    margin-bottom: 16px;
                }

                .profile-empty h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0 0 8px 0;
                }

                .profile-empty p {
                    color: var(--text-secondary);
                    margin: 0;
                }

                @media (max-width: 768px) {
                    .profile-header {
                        gap: 30px;
                    }

                    .profile-username {
                        font-size: 20px;
                    }

                    .profile-stats {
                        gap: 20px;
                    }

                    .profile-stat {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
}
