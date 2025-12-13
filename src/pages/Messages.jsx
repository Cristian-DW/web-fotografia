import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';

export default function Messages() {
    const { user } = useAuthStore();
    const { openAuthModal } = useUIStore();

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
            <aside className="messages-sidebar">
                <div className="messages-sidebar__header">
                    <h2 className="messages-sidebar__title">Mensajes</h2>
                    <button className="messages-sidebar__new">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                <div className="messages-sidebar__list">
                    <div className="messages-empty-state">
                        <p>No hay conversaciones aún</p>
                        <p className="text-small">Busca usuarios para iniciar una conversación</p>
                    </div>
                </div>
            </aside>

            {/* Chat Area */}
            <main className="messages-chat">
                <div className="messages-chat__empty">
                    <div className="messages-chat__empty-icon">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3>Tus mensajes</h3>
                    <p>Envía mensajes privados a otros usuarios</p>
                </div>
            </main>

            <style jsx>{`
        .messages-layout {
          display: flex;
          height: calc(100vh - var(--navbar-height) - var(--bottom-nav-height) - 32px);
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
          max-width: 350px;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
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
        
        .messages-sidebar__new {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          border-radius: var(--radius-full);
          transition: var(--transition-fast);
        }
        
        .messages-sidebar__new:hover {
          background: var(--bg-tertiary);
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
        }
        
        @media (min-width: 768px) {
          .messages-chat {
            display: flex;
          }
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
