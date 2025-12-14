import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { db, realtime } from '../lib/supabase';
import Avatar from '../components/shared/Avatar';
import toast from 'react-hot-toast';

export default function Messages() {
  const { user, profile } = useAuthStore();
  const { openAuthModal } = useUIStore();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Load conversations
  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  // Subscribe to new messages
  useEffect(() => {
    if (selectedConversation) {
      const channel = realtime.subscribeToMessages(selectedConversation.id, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      });

      return () => realtime.unsubscribe(channel);
    }
  }, [selectedConversation]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const { data, error } = await db.getConversations(user.id);
      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const { data, error } = await db.getMessages(conversationId);
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Error al cargar mensajes');
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation.id);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const { data, error } = await db.searchUsers(query);
      if (error) throw error;
      // Filter out current user
      setSearchResults((data || []).filter(u => u.id !== user.id));
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearching(false);
    }
  };

  const handleStartConversation = async (otherUser) => {
    try {
      // Check if conversation already exists
      const existing = conversations.find(c =>
        c.participants?.some(p => p.user_id === otherUser.id)
      );

      if (existing) {
        handleSelectConversation(existing);
        setSearchQuery('');
        setSearchResults([]);
        return;
      }

      // Create new conversation
      const { data, error } = await db.createConversation([user.id, otherUser.id]);
      if (error) throw error;

      const newConv = {
        id: data.id,
        otherUser: otherUser
      };

      setConversations(prev => [{ conversation: data }, ...prev]);
      setSelectedConversation(data);
      setMessages([]);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Error al crear conversación');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || sending) return;

    setSending(true);
    try {
      const { data, error } = await db.sendMessage(
        selectedConversation.id,
        user.id,
        newMessage.trim()
      );
      if (error) throw error;

      // Add message locally (realtime will also push it)
      setMessages(prev => [...prev, { ...data, sender: profile }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="messages-empty">
          <div className="messages-empty__icon">💬</div>
          <h2 className="messages-empty__title">Mensajes Directos</h2>
          <p className="messages-empty__text">
            Inicia sesión para ver y enviar mensajes a otros usuarios.
          </p>
          <button onClick={() => openAuthModal('login')} className="btn btn--primary">
            Iniciar Sesión
          </button>
        </div>

        <style jsx>{`
                    .messages-empty {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 64px 24px;
                        text-align: center;
                        min-height: 60vh;
                    }
                    
                    .messages-empty__icon {
                        font-size: 4rem;
                        margin-bottom: 16px;
                    }
                    
                    .messages-empty__title {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin: 0 0 8px 0;
                    }
                    
                    .messages-empty__text {
                        color: var(--text-secondary);
                        margin: 0 0 24px 0;
                    }
                `}</style>
      </div>
    );
  }

  return (
    <div className="messages-layout">
      {/* Conversations List */}
      <aside className={`messages-sidebar ${selectedConversation ? 'messages-sidebar--hidden-mobile' : ''}`}>
        <div className="messages-sidebar__header">
          <h2 className="messages-sidebar__title">Mensajes</h2>
        </div>

        {/* Search */}
        <div className="messages-search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar usuarios..."
            className="messages-search__input"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="messages-search-results">
            {searchResults.map((u) => (
              <button
                key={u.id}
                className="messages-user-item"
                onClick={() => handleStartConversation(u)}
              >
                <Avatar src={u.avatar_url} alt={u.username} size="sm" />
                <div className="messages-user-item__info">
                  <span className="messages-user-item__name">{u.display_name || u.username}</span>
                  <span className="messages-user-item__username">@{u.username}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Conversations List */}
        <div className="messages-sidebar__list">
          {conversations.length === 0 ? (
            <div className="messages-empty-state">
              <p>No hay conversaciones</p>
              <p className="text-small">Busca usuarios para chatear</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.conversation?.id}
                className={`messages-conv-item ${selectedConversation?.id === conv.conversation?.id ? 'messages-conv-item--active' : ''}`}
                onClick={() => handleSelectConversation(conv.conversation)}
              >
                <Avatar size="md" />
                <div className="messages-conv-item__info">
                  <span className="messages-conv-item__name">Conversación</span>
                  <span className="messages-conv-item__preview">Toca para ver mensajes</span>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <main className={`messages-chat ${selectedConversation ? 'messages-chat--active' : ''}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="messages-chat__header">
              <button
                className="messages-chat__back"
                onClick={() => setSelectedConversation(null)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <Avatar size="sm" />
              <span className="messages-chat__name">Chat</span>
            </div>

            {/* Messages */}
            <div className="messages-chat__messages">
              {messages.length === 0 ? (
                <div className="messages-chat__empty-messages">
                  <p>No hay mensajes aún</p>
                  <p className="text-small">Envía el primer mensaje</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sender_id === user.id ? 'message--sent' : 'message--received'}`}
                  >
                    <div className="message__content">{msg.content}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="messages-chat__input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="messages-input"
                disabled={sending}
              />
              <button
                type="submit"
                className="messages-send-btn"
                disabled={!newMessage.trim() || sending}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="messages-chat__empty">
            <div className="messages-chat__empty-icon">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3>Tus mensajes</h3>
            <p>Busca usuarios para iniciar una conversación</p>
          </div>
        )}
      </main>

      <style jsx>{`
                .messages-layout {
                    display: flex;
                    height: calc(100vh - var(--navbar-height) - var(--bottom-nav-height, 0px) - 32px);
                    background: var(--bg-secondary);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    margin: 16px;
                }
                
                @media (min-width: 768px) {
                    .messages-layout {
                        height: calc(100vh - var(--navbar-height) - 32px);
                    }
                }
                
                .messages-sidebar {
                    width: 100%;
                    border-right: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                }
                
                @media (min-width: 768px) {
                    .messages-sidebar {
                        max-width: 350px;
                    }
                    
                    .messages-sidebar--hidden-mobile {
                        display: flex;
                    }
                }
                
                .messages-sidebar--hidden-mobile {
                    display: none;
                }
                
                @media (min-width: 768px) {
                    .messages-sidebar--hidden-mobile {
                        display: flex;
                    }
                }
                
                .messages-sidebar__header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .messages-sidebar__title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0;
                }
                
                .messages-search {
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .messages-search__input {
                    width: 100%;
                    padding: 10px 14px;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    color: var(--text-primary);
                    font-size: 0.875rem;
                }
                
                .messages-search__input::placeholder {
                    color: var(--text-tertiary);
                }
                
                .messages-search-results {
                    border-bottom: 1px solid var(--border-color);
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                .messages-user-item,
                .messages-conv-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    padding: 12px 16px;
                    background: none;
                    border: none;
                    text-align: left;
                    cursor: pointer;
                    transition: var(--transition-fast);
                }
                
                .messages-user-item:hover,
                .messages-conv-item:hover,
                .messages-conv-item--active {
                    background: var(--bg-tertiary);
                }
                
                .messages-user-item__info,
                .messages-conv-item__info {
                    display: flex;
                    flex-direction: column;
                }
                
                .messages-user-item__name,
                .messages-conv-item__name {
                    font-weight: 500;
                    color: var(--text-primary);
                }
                
                .messages-user-item__username,
                .messages-conv-item__preview {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                }
                
                .messages-sidebar__list {
                    flex: 1;
                    overflow-y: auto;
                }
                
                .messages-empty-state {
                    padding: 32px 16px;
                    text-align: center;
                    color: var(--text-secondary);
                }
                
                .text-small {
                    font-size: 0.875rem;
                    color: var(--text-tertiary);
                }
                
                .messages-chat {
                    flex: 1;
                    display: none;
                    flex-direction: column;
                }
                
                .messages-chat--active {
                    display: flex;
                }
                
                @media (min-width: 768px) {
                    .messages-chat {
                        display: flex;
                    }
                }
                
                .messages-chat__header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .messages-chat__back {
                    display: flex;
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    cursor: pointer;
                    padding: 4px;
                }
                
                @media (min-width: 768px) {
                    .messages-chat__back {
                        display: none;
                    }
                }
                
                .messages-chat__name {
                    font-weight: 600;
                }
                
                .messages-chat__messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .messages-chat__empty-messages {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    color: var(--text-secondary);
                }
                
                .message {
                    max-width: 70%;
                    padding: 10px 14px;
                    border-radius: 18px;
                    font-size: 0.9375rem;
                }
                
                .message--sent {
                    align-self: flex-end;
                    background: var(--accent-gradient);
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                
                .message--received {
                    align-self: flex-start;
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border-bottom-left-radius: 4px;
                }
                
                .messages-chat__input {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-top: 1px solid var(--border-color);
                }
                
                .messages-input {
                    flex: 1;
                    padding: 10px 14px;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    color: var(--text-primary);
                    font-size: 0.9375rem;
                }
                
                .messages-input::placeholder {
                    color: var(--text-tertiary);
                }
                
                .messages-send-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: var(--accent-gradient);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    transition: var(--transition-fast);
                }
                
                .messages-send-btn:hover:not(:disabled) {
                    transform: scale(1.05);
                }
                
                .messages-send-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .messages-chat__empty {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    color: var(--text-secondary);
                }
                
                .messages-chat__empty-icon {
                    margin-bottom: 16px;
                    opacity: 0.5;
                }
                
                .messages-chat__empty h3 {
                    margin: 0 0 8px 0;
                    color: var(--text-primary);
                }
                
                .messages-chat__empty p {
                    margin: 0;
                    font-size: 0.875rem;
                }
            `}</style>
    </div>
  );
}
