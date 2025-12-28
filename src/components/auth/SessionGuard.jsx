import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

/**
 * SessionGuard monitors API errors and handles expired sessions
 * Redirects to landing page when session expires
 */
export function SessionGuard({ children }) {
    const navigate = useNavigate();
    const { user, setUser, setProfile } = useAuthStore();

    useEffect(() => {
        // Global error handler for API responses
        const handleAuthError = (event, session) => {
            // Check for session expiration events
            if (event === 'TOKEN_REFRESHED' && !session) {
                console.warn('⚠️ Token refresh failed - session expired');
                handleSessionExpired();
            }
        };

        const handleSessionExpired = () => {
            // Clear auth state
            setUser(null);
            setProfile(null);
            localStorage.clear();

            // Show notification
            toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');

            // Redirect to landing page
            navigate('/', { replace: true });
        };

        // Subscribe to auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthError);

        // Periodic session validation (every 5 minutes)
        const intervalId = setInterval(async () => {
            if (user) {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error || !session) {
                    console.warn('⚠️ Session validation failed');
                    handleSessionExpired();
                }
            }
        }, 5 * 60 * 1000); // 5 minutes

        return () => {
            subscription?.unsubscribe();
            clearInterval(intervalId);
        };
    }, [user, navigate, setUser, setProfile]);

    return <>{children}</>;
}

export default SessionGuard;
