import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { db } from '../lib/supabase';
import { PageLoader } from '../components/shared/Loader';
import Avatar from '../components/shared/Avatar';

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query param
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      setUsers([]);
      fetchPosts();
    }
  }, [query]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await db.getPosts(30, 0);
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const [usersResult, postsResult] = await Promise.all([
        db.searchUsers(searchTerm),
        db.searchPosts(searchTerm)
      ]);

      setUsers(usersResult.data || []);
      setPosts(postsResult.data || []);
    } catch (error) {
      console.error('Error exploring:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
            onKeyDown={handleMobileSearch}
            className="explore__search-input"
          />
        </div>

        {/* Search Results Header */}
        {query && (
          <div className="explore__header">
            <h2>Resultados para "{query}"</h2>
            <button onClick={() => navigate('/explore')} className="explore__clear">
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Users Results */}
        {users.length > 0 && (
          <div className="explore__section">
            <h3 className="explore__section-title">Personas</h3>
            <div className="explore__users-grid">
              {users.map(user => (
                <Link key={user.id} to={`/${user.username}`} className="explore__user-card">
                  <Avatar src={user.avatar_url} alt={user.username} size="lg" />
                  <span className="explore__user-name">{user.username}</span>
                  <span className="explore__user-display">{user.display_name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div className="explore__section">
            {query && <h3 className="explore__section-title">Publicaciones</h3>}
            <div className="explore__grid">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/feed?post=${post.id}`}
                  className={`explore__item ${!query && index % 5 === 0 ? 'explore__item--large' : ''}`}
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
                </Link>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && users.length === 0 && (
          <div className="explore__empty">
            <div className="explore__empty-icon">🔍</div>
            <p>{query ? `No se encontraron resultados para "${query}"` : 'No hay publicaciones para explorar aún.'}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .explore {
          padding: 16px 0;
        }

        .explore__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .explore__header h2 {
            font-size: 1.25rem;
            margin: 0;
        }

        .explore__clear {
            color: var(--accent-primary);
            background: none;
            border: none;
            cursor: pointer;
            font-weight: 500;
        }
        
        .explore__section {
            margin-bottom: 32px;
        }

        .explore__section-title {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 16px;
            font-weight: 600;
        }

        .explore__users-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 16px;
        }

        .explore__user-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 16px;
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
            text-decoration: none;
            transition: var(--transition-fast);
        }

        .explore__user-card:hover {
            border-color: var(--accent-primary);
            transform: translateY(-2px);
        }

        .explore__user-name {
            display: block;
            margin-top: 12px;
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.9375rem;
        }

        .explore__user-display {
            display: block;
            margin-top: 4px;
            color: var(--text-secondary);
            font-size: 0.8125rem;
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

        .explore__empty-icon {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
