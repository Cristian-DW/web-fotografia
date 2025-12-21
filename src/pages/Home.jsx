import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { db } from '../lib/supabase';
import PostCard from '../components/feed/PostCard';
import SuggestedUsers from '../components/social/SuggestedUsers';
import { PageLoader } from '../components/shared/Loader';

export default function Home() {
    const { user } = useAuthStore();
    const { openAuthModal } = useUIStore();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    // Fetch posts
    const fetchPosts = async (offset = 0) => {
        try {
            const { data, error } = await db.getPosts(10, offset);
            if (error) throw error;

            if (offset === 0) {
                setPosts(data || []);
            } else {
                setPosts(prev => [...prev, ...(data || [])]);
            }

            setHasMore((data?.length || 0) === 10);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Infinite scroll
    useEffect(() => {
        if (inView && hasMore && !loadingMore) {
            setLoadingMore(true);
            fetchPosts(posts.length);
        }
    }, [inView, hasMore, loadingMore, posts.length]);

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className="home-layout">
            <div className="home-container">
                {/* Welcome Section for non-authenticated users */}
                {!user && (
                    <div className="welcome-banner">
                        <div className="welcome-banner__content">
                            <h1 className="welcome-banner__title">
                                Bienvenido a <span className="text-gradient">Lumina</span>
                            </h1>
                            <p className="welcome-banner__text">
                                Comparte tus momentos, conecta con otros y sé tú mismo.
                            </p>
                            <div className="welcome-banner__actions">
                                <button onClick={() => openAuthModal('register')} className="btn btn--primary btn--lg">
                                    Únete Gratis
                                </button>
                                <button onClick={() => openAuthModal('login')} className="btn btn--ghost btn--lg">
                                    Inicia Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Feed */}
                <div className="feed">
                    {posts.length === 0 ? (
                        <div className="empty-feed">
                            <div className="empty-feed__icon">📷</div>
                            <h3 className="empty-feed__title">No hay publicaciones aún</h3>
                            <p className="empty-feed__text">
                                {user
                                    ? '¡Sé el primero en compartir algo increíble!'
                                    : 'Regístrate para ver y crear publicaciones'}
                            </p>
                        </div>
                    ) : (
                        <>
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}

                            {/* Load more trigger */}
                            {hasMore && (
                                <div ref={ref} className="load-more">
                                    {loadingMore && <PageLoader />}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Right Sidebar for Suggestions (Desktop only) */}
            {user && (
                <aside className="home-sidebar">
                    <SuggestedUsers />

                    <div className="home-sidebar__footer">
                        <nav className="footer-links">
                            <a href="#">Información</a>
                            <a href="#">Ayuda</a>
                            <a href="#">Prensa</a>
                            <a href="#">API</a>
                            <a href="#">Empleo</a>
                            <a href="#">Privacidad</a>
                            <a href="#">Condiciones</a>
                        </nav>
                        <p className="copyright">© 2024 LUMINA</p>
                    </div>
                </aside>
            )}

            <style jsx>{`
                .home-layout {
                    display: flex;
                    justify-content: center;
                    gap: 32px;
                    max-width: 1024px;
                    margin: 0 auto;
                    padding: 0 16px;
                }

                .home-container {
                    flex: 1;
                    max-width: 630px;
                    width: 100%;
                }

                .home-sidebar {
                    display: none;
                    width: 320px;
                    padding-top: 32px;
                    position: sticky;
                    top: var(--navbar-height);
                    height: calc(100vh - var(--navbar-height));
                    overflow-y: auto;
                }

                @media (min-width: 1024px) {
                    .home-sidebar {
                        display: block;
                    }
                }

                .welcome-banner {
                    padding: 48px 24px;
                    margin: 24px 0;
                    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
                    border: 1px solid rgba(139, 92, 246, 0.2);
                    border-radius: 24px;
                    text-align: center;
                }
                
                .welcome-banner__title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 0 0 12px 0;
                }
                
                .welcome-banner__text {
                    color: var(--text-secondary);
                    font-size: 1.125rem;
                    margin: 0 0 24px 0;
                }
                
                .welcome-banner__actions {
                    display: flex;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                .feed {
                    padding: 16px 0;
                }
                
                .empty-feed {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 64px 24px;
                    text-align: center;
                }
                
                .empty-feed__icon {
                    font-size: 4rem;
                    margin-bottom: 16px;
                }
                
                .empty-feed__title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0 0 8px 0;
                }
                
                .empty-feed__text {
                    color: var(--text-secondary);
                    margin: 0;
                }
                
                .load-more {
                    padding: 24px;
                }

                .home-sidebar__footer {
                    margin-top: 24px;
                    padding: 0 16px;
                }

                .footer-links {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px 12px;
                    margin-bottom: 16px;
                }

                .footer-links a {
                    color: var(--text-tertiary);
                    font-size: 0.75rem;
                    text-decoration: none;
                }

                .footer-links a:hover {
                    text-decoration: underline;
                }

                .copyright {
                    color: var(--text-tertiary);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                }
            `}</style>
        </div>
    );
}
