import React, { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { PageLoader } from '../components/shared/Loader';

export default function Explore() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await db.getPosts(30, 0);
                setPosts(data || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className="container container--wide">
            <div className="explore">
                {/* Search - Mobile */}
                <div className="explore__search">
                    <svg className="explore__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="explore__search-input"
                    />
                </div>

                {/* Explore Grid */}
                <div className="explore__grid">
                    {posts.map((post, index) => (
                        <div
                            key={post.id}
                            className={`explore__item ${index % 5 === 0 ? 'explore__item--large' : ''}`}
                        >
                            <img
                                src={post.image_url}
                                alt={post.caption || 'Post'}
                                className="explore__image"
                                loading="lazy"
                            />
                            <div className="explore__overlay">
                                <div className="explore__stats">
                                    <span className="explore__stat">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        {post.reactions?.length || 0}
                                    </span>
                                    <span className="explore__stat">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        {post.comments?.length || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="explore__empty">
                        <p>No hay publicaciones para explorar aún.</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .explore {
          padding: 16px 0;
        }
        
        .explore__search {
          display: block;
          position: relative;
          margin-bottom: 16px;
        }
        
        @media (min-width: 768px) {
          .explore__search {
            display: none;
          }
        }
        
        .explore__search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: var(--text-tertiary);
        }
        
        .explore__search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          font-size: 0.875rem;
        }
        
        .explore__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }
        
        .explore__item {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          cursor: pointer;
        }
        
        .explore__item--large {
          grid-column: span 2;
          grid-row: span 2;
        }
        
        .explore__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-fast);
        }
        
        .explore__item:hover .explore__image {
          transform: scale(1.05);
        }
        
        .explore__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-fast);
        }
        
        .explore__item:hover .explore__overlay {
          opacity: 1;
        }
        
        .explore__stats {
          display: flex;
          gap: 24px;
        }
        
        .explore__stat {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-weight: 600;
        }
        
        .explore__empty {
          text-align: center;
          padding: 64px 24px;
          color: var(--text-secondary);
        }
      `}</style>
        </div>
    );
}
