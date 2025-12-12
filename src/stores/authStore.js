import { create } from 'zustand';
import { auth, db } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
    user: null,
    profile: null,
    loading: true,
    error: null,

    // Initialize auth state
    initialize: async () => {
        try {
            const { session } = await auth.getSession();
            if (session?.user) {
                const { data: profile } = await db.getProfile(session.user.id);
                set({ user: session.user, profile, loading: false });
            } else {
                set({ user: null, profile: null, loading: false });
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Sign up
    signUp: async (email, password, username, displayName) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await auth.signUp(email, password, {
                username,
                display_name: displayName
            });

            if (error) throw error;

            set({ user: data.user, loading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, error: error.message };
        }
    },

    // Sign in
    signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data, error } = await auth.signIn(email, password);

            if (error) throw error;

            const { data: profile } = await db.getProfile(data.user.id);
            set({ user: data.user, profile, loading: false });
            return { success: true };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, error: error.message };
        }
    },

    // Sign in with Google
    signInWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
            const { error } = await auth.signInWithGoogle();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, error: error.message };
        }
    },

    // Sign out
    signOut: async () => {
        set({ loading: true });
        const { error } = await auth.signOut();
        if (!error) {
            set({ user: null, profile: null, loading: false });
        }
        return { error };
    },

    // Update profile
    updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return { error: 'Not authenticated' };

        try {
            const { data, error } = await db.updateProfile(user.id, updates);
            if (error) throw error;
            set({ profile: data });
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Set user and profile
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setLoading: (loading) => set({ loading }),
    clearError: () => set({ error: null })
}));

export default useAuthStore;
