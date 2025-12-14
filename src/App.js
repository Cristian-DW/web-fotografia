import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css';

// Layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';

// Auth
import { useAuthStore } from './stores/authStore';
import { auth } from './lib/supabase';

// Pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

// Components
import { PageLoader } from './components/shared/Loader';
import CreatePost from './components/feed/CreatePost';

// Layout wrapper for authenticated pages
function AuthenticatedLayout({ children }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <BottomNav />
      <CreatePost />
    </>
  );
}

// Public layout wrapper
function PublicLayout({ children }) {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  return children;
}

function App() {
  const { initialize, loading, setUser, setProfile } = useAuthStore();

  useEffect(() => {
    // Initialize auth state
    initialize();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        // Profile will be fetched by the store
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, [initialize, setUser, setProfile]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <div className="app-layout">
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f1f1f',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#8b5cf6',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout>
              <Landing />
            </PublicLayout>
          } />

          {/* Authenticated Routes */}
          <Route path="/feed" element={
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          } />
          <Route path="/explore" element={
            <AuthenticatedLayout>
              <Explore />
            </AuthenticatedLayout>
          } />
          <Route path="/messages" element={
            <AuthenticatedLayout>
              <Messages />
            </AuthenticatedLayout>
          } />
          <Route path="/settings" element={
            <AuthenticatedLayout>
              <Settings />
            </AuthenticatedLayout>
          } />
          <Route path="/:username" element={
            <AuthenticatedLayout>
              <Profile />
            </AuthenticatedLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
