import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { db } from '../lib/supabase';
import Avatar from '../components/shared/Avatar';
import Button from '../components/shared/Button';
import { PageLoader } from '../components/shared/Loader';
import toast from 'react-hot-toast';

export default function Profile() {
    const { username } = useParams();
    const { user, profile: currentUserProfile } = useAuthStore();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [activeTab, setActiveTab] = useState('posts');

    const isOwnProfile = user && currentUserProfile?.username === username;

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                // Get profile
                const { data: profileData, error: profileError } = await db.getProfileByUsername(username);
                if (profileError) throw profileError;

                if (!profileData) {
                    setProfile(null);
                    setLoading(false);
                    return;
                }

                setProfile(profileData);

                // Get posts
                const { data: postsData } = await db.getUserPosts(profileData.id);
                setPosts(postsData || []);

                // Get followers/following counts
                const { data: followers } = await db.getFollowers(profileData.id);
                const { data: following } = await db.getFollowing(profileData.id);
                setFollowersCount(followers?.length || 0);
                setFollowingCount(following?.length || 0);

                // Check if following
                if (user && !isOwnProfile) {
                    const { isFollowing: following } = await db.isFollowing(user.id, profileData.id);
                    setIsFollowing(following);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchProfile();
        }
    }, [username, user, isOwnProfile]);

    const handleFollow = async () => {
        if (!user) {
            toast.error('Inicia sesión para seguir usuarios');
            return;
        }

        try {
            if (isFollowing) {
                await db.unfollowUser(user.id, profile.id);
                setIsFollowing(false);
                setFollowersCount(prev => prev - 1);
                toast.success('Ya no sigues a este usuario');
            } else {
                await db.followUser(user.id, profile.id);
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
                toast.success('¡Ahora sigues a este usuario!');
            }
        } catch (error) {
            toast.error('Error al actualizar seguimiento');
        }
    };

    if (loading) {
        return <PageLoader />;
    }

    if (!profile) {
        return (
            <div className="container">
                <div className="not-found">
                    <h2>Usuario no encontrado</h2>
                    <p>El usuario @{username} no existe.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container container--wide">
            <div className="profile">
                {/* Header */}
                <header className="profile-header">
                    <div className="profile-header__top">
                        <div className="profile-header__avatar">
                            <Avatar
                                src={profile.avatar_url}
                                alt={profile.display_name || profile.username}
                                size="2xl"
                            />
                        </div>

                        <div className="profile-header__info">
                            <div className="profile-header__username">
                                <h1 className="profile-header__name">@{profile.username}</h1>
                                {!isOwnProfile && (
                                    <Button
                                        variant={isFollowing ? 'secondary' : 'primary'}
                                        onClick={handleFollow}
                                    >
                                        {isFollowing ? 'Siguiendo' : 'Seguir'}
                                    </Button>
                                )}
                                {isOwnProfile && (
                                    <Button variant="secondary">Editar Perfil</Button>
                                )}
                            </div>

                            <div className="profile-header__stats">
                                <div className="profile-header__stat">
                                    <span className="profile-header__stat-value">{posts.length}</span>
                                    <span className="profile-header__stat-label">publicaciones</span>
                                </div>
                                <div className="profile-header__stat">
                                    <span className="profile-header__stat-value">{followersCount}</span>
                                    <span className="profile-header__stat-label">seguidores</span>
                                </div>
                                <div className="profile-header__stat">
                                    <span className="profile-header__stat-value">{followingCount}</span>
                                    <span className="profile-header__stat-label">siguiendo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(profile.display_name || profile.bio) && (
                        <div className="profile-header__bio">
                            {profile.display_name && (
                                <p className="profile-header__display-name">{profile.display_name}</p>
                            )}
                            {profile.bio && (
                                <p className="profile-header__bio-text">{profile.bio}</p>
                            )}
                        </div>
                    )}
                </header>

                {/* Tabs */}
                <div className="profile-tabs">
                    <button
                        className={`profile-tabs__tab ${activeTab === 'posts' ? 'profile-tabs__tab--active' : ''}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Publicaciones
                    </button>
                    {isOwnProfile && (
                        <button
                            className={`profile-tabs__tab ${activeTab === 'saved' ? 'profile-tabs__tab--active' : ''}`}
                            onClick={() => setActiveTab('saved')}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Guardados
                        </button>
                    )}
                </div>

                {/* Posts Grid */}
                <div className="profile-grid">
                    {posts.length === 0 ? (
                        <div className="profile-empty">
                            <p>{isOwnProfile ? 'Aún no has publicado nada' : 'Este usuario no tiene publicaciones'}</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="profile-grid__item">
                                <img
                                    src={post.image_url}
                                    alt={post.caption || 'Post'}
                                    className="profile-grid__image"
                                    loading="lazy"
                                />
                                <div className="profile-grid__overlay">
                                    <span className="profile-grid__stat">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        {post.reactions?.length || 0}
                                    </span>
                                    <span className="profile-grid__stat">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        {post.comments?.length || 0}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <style jsx>{`
        .profile {
          padding-bottom: 32px;
        }
        
        .not-found {
          text-align: center;
          padding: 64px 24px;
        }
        
        .profile-tabs {
          display: flex;
          justify-content: center;
          border-top: 1px solid var(--border-color);
          margin-top: 24px;
        }
        
        .profile-tabs__tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          background: none;
          border: none;
          border-top: 2px solid transparent;
          color: var(--text-tertiary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
          margin-top: -1px;
        }
        
        .profile-tabs__tab--active {
          border-top-color: var(--text-primary);
          color: var(--text-primary);
        }
        
        .profile-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px 24px;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
