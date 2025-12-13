import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuthStore } from '../../stores/authStore';
import { db } from '../../lib/supabase';
import Avatar from '../shared/Avatar';
import toast from 'react-hot-toast';

export default function PostCard({ post, onUpdate }) {
    const { user } = useAuthStore();
    const [liked, setLiked] = useState(
        post.reactions?.some(r => r.user_id === user?.id) || false
    );
    const [likesCount, setLikesCount] = useState(post.reactions?.length || 0);
    const [showReactions, setShowReactions] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleLike = async () => {
        if (!user) {
            toast.error('Inicia sesión para reaccionar');
            return;
        }

        try {
            if (liked) {
                await db.removeReaction(user.id, post.id);
                setLiked(false);
                setLikesCount(prev => prev - 1);
            } else {
                await db.addReaction(user.id, post.id, 'like');
                setLiked(true);
                setLikesCount(prev => prev + 1);
            }
        } catch (error) {
            toast.error('Error al reaccionar');
        }
    };

    const handleDoubleTap = () => {
        if (!liked) {
            handleLike();
        }
    };

    const reactions = ['❤️', '🔥', '😮', '👏', '😢'];

    const handleReaction = async (emoji) => {
        if (!user) {
            toast.error('Inicia sesión para reaccionar');
            return;
        }

        const reactionMap = {
            '❤️': 'love',
            '🔥': 'fire',
            '😮': 'wow',
            '👏': 'clap',
            '😢': 'sad'
        };

        try {
            await db.addReaction(user.id, post.id, reactionMap[emoji] || 'like');
            setLiked(true);
            setLikesCount(prev => prev + 1);
            setShowReactions(false);
        } catch (error) {
            toast.error('Error al reaccionar');
        }
    };

    const timeAgo = formatDistanceToNow(new Date(post.created_at), {
        addSuffix: false,
        locale: es
    });

    return (
        <article className="post-card">
            {/* Header */}
            <header className="post-card__header">
                <Link to={`/${post.profiles?.username}`} className="post-card__user">
                    <Avatar
                        src={post.profiles?.avatar_url}
                        alt={post.profiles?.display_name || post.profiles?.username}
                        size="sm"
                    />
                    <div>
                        <span className="post-card__username">{post.profiles?.username}</span>
                        {post.location && (
                            <span className="post-card__location">{post.location}</span>
                        )}
                    </div>
                </Link>
                <button className="post-card__menu">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </button>
            </header>

            {/* Image */}
            <div className="post-card__image-container" onDoubleClick={handleDoubleTap}>
                <img
                    src={post.image_url}
                    alt={post.caption || 'Post'}
                    className="post-card__image"
                    loading="lazy"
                />
            </div>

            {/* Actions */}
            <div className="post-card__actions">
                <div className="post-card__actions-left">
                    <button
                        className={`post-card__action ${liked ? 'post-card__action--liked' : ''}`}
                        onClick={handleLike}
                        onMouseEnter={() => setShowReactions(true)}
                        onMouseLeave={() => setShowReactions(false)}
                    >
                        {liked ? (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        )}

                        {/* Reactions popup */}
                        {showReactions && (
                            <div className="reactions-popup">
                                {reactions.map((emoji) => (
                                    <button
                                        key={emoji}
                                        className="reaction-btn"
                                        onClick={(e) => { e.stopPropagation(); handleReaction(emoji); }}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                    </button>

                    <button className="post-card__action">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>

                    <button className="post-card__action">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                </div>

                <button
                    className={`post-card__action post-card__action--save ${saved ? 'post-card__action--saved' : ''}`}
                    onClick={() => setSaved(!saved)}
                >
                    <svg className="w-6 h-6" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
            </div>

            {/* Likes */}
            {likesCount > 0 && (
                <div className="post-card__likes">
                    <strong>{likesCount}</strong> {likesCount === 1 ? 'Me gusta' : 'Me gusta'}
                </div>
            )}

            {/* Caption */}
            {post.caption && (
                <div className="post-card__caption">
                    <Link to={`/${post.profiles?.username}`} className="post-card__caption-username">
                        {post.profiles?.username}
                    </Link>
                    {post.caption}
                </div>
            )}

            {/* Comments count */}
            {post.comments?.length > 0 && (
                <button className="post-card__comments-count">
                    Ver los {post.comments.length} comentarios
                </button>
            )}

            {/* Time */}
            <time className="post-card__time">{timeAgo}</time>

            <style jsx>{`
        .post-card__menu {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          border-radius: var(--radius-full);
          transition: var(--transition-fast);
        }
        
        .post-card__menu:hover {
          background: var(--bg-tertiary);
        }
        
        .post-card__actions-left {
          display: flex;
          gap: 12px;
        }
        
        .post-card__action {
          position: relative;
        }
        
        .post-card__action--saved {
          color: var(--text-primary);
        }
        
        .reactions-popup {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 4px;
          padding: 8px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-lg);
          margin-bottom: 8px;
        }
        
        .reaction-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          font-size: 1.25rem;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: var(--radius-full);
          transition: var(--transition-fast);
        }
        
        .reaction-btn:hover {
          background: var(--bg-tertiary);
          transform: scale(1.2);
        }
      `}</style>
        </article>
    );
}
