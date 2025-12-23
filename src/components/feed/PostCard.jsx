import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuthStore } from '../../stores/authStore';
import { db } from '../../lib/supabase';
import Avatar from '../shared/Avatar';
import toast from 'react-hot-toast';

export default function PostCard({ post, onUpdate }) {
    const { user, profile } = useAuthStore();
    const [liked, setLiked] = useState(
        post.reactions?.some(r => r.user_id === user?.id) || false
    );
    const [likesCount, setLikesCount] = useState(post.reactions?.length || 0);
    const [showReactions, setShowReactions] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);

    // Check if post is saved on mount
    React.useEffect(() => {
        const checkSavedStatus = async () => {
            if (!user) return;
            try {
                const { isSaved } = await db.checkIfPostSaved(user.id, post.id);
                setSaved(isSaved);
            } catch (error) {
                console.error('Error checking saved status:', error);
            }
        };
        checkSavedStatus();
    }, [user, post.id]);

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
            console.error('Error reacting:', error);
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
            console.error('Error reacting:', error);
            toast.error('Error al reaccionar');
        }
    };

    const loadComments = async () => {
        if (loadingComments) return;
        setLoadingComments(true);
        try {
            const { data, error } = await db.getComments(post.id);
            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error('Error loading comments:', error);
            toast.error('Error al cargar comentarios');
        } finally {
            setLoadingComments(false);
        }
    };

    const handleToggleComments = () => {
        if (!showComments) {
            loadComments();
        }
        setShowComments(!showComments);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Inicia sesión para comentar');
            return;
        }
        if (!newComment.trim()) return;

        setSubmittingComment(true);
        try {
            const { data, error } = await db.addComment(user.id, post.id, newComment.trim());
            if (error) throw error;

            setComments(prev => [...prev, data]);
            setNewComment('');
            toast.success('Comentario publicado');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Error al comentar');
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Post de ${post.profiles?.username}`,
                    text: post.caption || 'Mira este post en Lumina',
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Enlace copiado al portapapeles');
            }
        } catch (error) {
            // User cancelled or error occurred
            if (error.name !== 'AbortError') {
                console.error('Error sharing:', error);
            }
        }
    };

    const handleSaveToggle = async () => {
        if (!user) {
            toast.error('Inicia sesión para guardar posts');
            return;
        }

        try {
            if (saved) {
                await db.unsavePost(user.id, post.id);
                setSaved(false);
                toast.success('Post eliminado de guardados');
            } else {
                await db.savePost(user.id, post.id);
                setSaved(true);
                toast.success('Post guardado');
            }
        } catch (error) {
            console.error('Error toggling save:', error);
            toast.error('Error al guardar post');
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
                    {/* Like with reactions */}
                    <div
                        className="post-card__reaction-wrapper"
                        onMouseEnter={() => setShowReactions(true)}
                        onMouseLeave={() => setShowReactions(false)}
                    >
                        <button
                            className={`post-card__action-btn ${liked ? 'post-card__action-btn--liked' : ''}`}
                            onClick={handleLike}
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
                        </button>

                        {/* Reactions popup */}
                        {showReactions && (
                            <div className="post-card__reactions-popup">
                                {reactions.map((emoji) => (
                                    <button
                                        key={emoji}
                                        className="post-card__reaction-btn"
                                        onClick={() => handleReaction(emoji)}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Comment button */}
                    <button className="post-card__action-btn" onClick={handleToggleComments}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </button>

                    {/* Share button */}
                    <button className="post-card__action-btn" onClick={handleShare}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                </div>

                {/* Save button */}
                <button
                    className={`post-card__action-btn ${saved ? 'post-card__action-btn--saved' : ''}`}
                    onClick={handleSaveToggle}
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
                    {' '}{post.caption}
                </div>
            )}

            {/* Comments count */}
            {(post.comments?.length > 0 || comments.length > 0) && !showComments && (
                <button className="post-card__comments-count" onClick={handleToggleComments}>
                    Ver los {post.comments?.length || comments.length} comentarios
                </button>
            )}

            {/* Comments section */}
            {showComments && (
                <div className="post-card__comments">
                    {loadingComments ? (
                        <p className="post-card__comments-loading">Cargando comentarios...</p>
                    ) : (
                        <>
                            {comments.map((comment) => (
                                <div key={comment.id} className="post-card__comment">
                                    <Link to={`/${comment.profiles?.username}`} className="post-card__comment-username">
                                        {comment.profiles?.username}
                                    </Link>
                                    <span className="post-card__comment-text">{comment.content}</span>
                                </div>
                            ))}
                            {comments.length === 0 && (
                                <p className="post-card__no-comments">No hay comentarios aún</p>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Comment input */}
            {user && (
                <form className="post-card__comment-form" onSubmit={handleSubmitComment}>
                    <Avatar src={profile?.avatar_url} alt={profile?.username} size="xs" />
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Añade un comentario..."
                        className="post-card__comment-input"
                        disabled={submittingComment}
                    />
                    {newComment.trim() && (
                        <button
                            type="submit"
                            className="post-card__comment-submit"
                            disabled={submittingComment}
                        >
                            {submittingComment ? '...' : 'Publicar'}
                        </button>
                    )}
                </form>
            )}

            {/* Time */}
            <time className="post-card__time">{timeAgo}</time>

            <style jsx>{`
                .post-card__actions-left {
                    display: flex;
                    gap: 12px;
                }
                
                .post-card__reaction-wrapper {
                    position: relative;
                }
                
                .post-card__action-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    cursor: pointer;
                    padding: 4px;
                    transition: var(--transition-fast);
                }
                
                .post-card__action-btn:hover {
                    opacity: 0.7;
                    transform: scale(1.1);
                }
                
                .post-card__action-btn--liked {
                    color: #ef4444;
                }
                
                .post-card__action-btn--saved {
                    color: var(--text-primary);
                }
                
                .post-card__reactions-popup {
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    display: flex;
                    gap: 4px;
                    padding: 8px 12px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    margin-bottom: 8px;
                    z-index: 100;
                    animation: fadeIn 0.2s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .post-card__reaction-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    border-radius: var(--radius-full);
                    transition: var(--transition-fast);
                }
                
                .post-card__reaction-btn:hover {
                    background: var(--bg-tertiary);
                    transform: scale(1.3);
                }
                
                .post-card__comments {
                    padding: 8px 16px;
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                .post-card__comments-loading,
                .post-card__no-comments {
                    color: var(--text-tertiary);
                    font-size: 0.875rem;
                    margin: 0;
                }
                
                .post-card__comment {
                    margin-bottom: 8px;
                    font-size: 0.875rem;
                    line-height: 1.4;
                }
                
                .post-card__comment-username {
                    font-weight: 600;
                    color: var(--text-primary);
                    margin-right: 6px;
                }
                
                .post-card__comment-username:hover {
                    text-decoration: underline;
                }
                
                .post-card__comment-text {
                    color: var(--text-secondary);
                }
                
                .post-card__comment-form {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-top: 1px solid var(--border-color);
                }
                
                .post-card__comment-input {
                    flex: 1;
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    font-size: 0.875rem;
                    outline: none;
                }
                
                .post-card__comment-input::placeholder {
                    color: var(--text-tertiary);
                }
                
                .post-card__comment-submit {
                    background: none;
                    border: none;
                    color: var(--accent-primary);
                    font-weight: 600;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: var(--transition-fast);
                }
                
                .post-card__comment-submit:hover:not(:disabled) {
                    opacity: 0.8;
                }
                
                .post-card__comment-submit:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </article>
    );
}
