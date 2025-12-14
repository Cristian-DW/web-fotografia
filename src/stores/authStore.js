import { create } from 'zustand';
import { auth, db, supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
    user: null,
    profile: null,
    loading: true,
    error: null,

    // Initialize auth state
    initialize: async () => {
        console.log('🔄 Initializing auth...');
        try {
            // Add timeout to prevent infinite loading
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Session timeout')), 5000)
            );

            const sessionPromise = auth.getSession();

            let session;
            try {
                const result = await Promise.race([sessionPromise, timeoutPromise]);
                session = result.session;
            } catch (timeoutError) {
                console.warn('⚠️ Session check timed out, continuing without session');
                set({ user: null, profile: null, loading: false });
                return;
            }

            console.log('📋 Session:', session ? 'Found' : 'None');

            if (session?.user) {
                console.log('👤 User found:', session.user.id);
                // Try to get profile, create if doesn't exist
                let profile = await get().fetchOrCreateProfile(session.user);
                console.log('✅ Profile:', profile ? profile.username : 'None');
                set({ user: session.user, profile, loading: false });
            } else {
                console.log('👤 No user session');
                set({ user: null, profile: null, loading: false });
            }
        } catch (error) {
            console.error('❌ Error initializing auth:', error);
            set({ error: error.message, loading: false });
        }
    },

    // Fetch profile or create one if it doesn't exist
    fetchOrCreateProfile: async (user) => {
        console.log('🔍 Fetching profile for:', user.id);
        try {
            // Try to get existing profile
            const { data: existingProfile, error: profileError } = await db.getProfile(user.id);

            if (profileError) {
                console.warn('⚠️ Error fetching profile:', profileError);
            }

            if (existingProfile) {
                console.log('✅ Found existing profile:', existingProfile.username);
                return existingProfile;
            }

            // Profile doesn't exist, create one
            console.log('📝 Creating new profile for user:', user.id);
            const metadata = user.user_metadata || {};
            const username = metadata.username || metadata.name?.replace(/\s+/g, '_').toLowerCase() || `user_${user.id.slice(0, 8)}`;
            const displayName = metadata.display_name || metadata.full_name || metadata.name || username;

            const { data: newProfile, error: createError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    username: username,
                    display_name: displayName,
                    avatar_url: metadata.avatar_url || metadata.picture || null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' })
                .select()
                .single();

            if (createError) {
                console.error('❌ Error creating profile:', createError);
                // Return a minimal profile to prevent crashes
                return {
                    id: user.id,
                    username: username,
                    display_name: displayName,
                    avatar_url: null
                };
            }

            console.log('✅ Created new profile:', newProfile.username);
            return newProfile;
        } catch (error) {
            console.error('❌ Error in fetchOrCreateProfile:', error);
            // Return minimal profile to prevent crashes
            return {
                id: user.id,
                username: `user_${user.id.slice(0, 8)}`,
                display_name: 'Usuario',
                avatar_url: null
            };
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

            // If user is returned (no email confirmation required), create profile
            if (data.user) {
                const profile = await get().fetchOrCreateProfile({
                    id: data.user.id,
                    user_metadata: { username, display_name: displayName }
                });
                set({ user: data.user, profile, loading: false });
            } else {
                set({ loading: false });
            }

            return { success: true, needsConfirmation: !data.session };
        } catch (error) {
            console.error('SignUp error:', error);
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

            const profile = await get().fetchOrCreateProfile(data.user);
            set({ user: data.user, profile, loading: false });
            return { success: true };
        } catch (error) {
            console.error('SignIn error:', error);
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
        try {
            const { error } = await auth.signOut();
            if (!error) {
                set({ user: null, profile: null, loading: false });
            } else {
                set({ loading: false });
            }
            return { error };
        } catch (error) {
            set({ loading: false });
            return { error };
        }
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

    // Refresh profile from database
    refreshProfile: async () => {
        const { user } = get();
        if (!user) return;

        const profile = await get().fetchOrCreateProfile(user);
        set({ profile });
    },

    // Set user and profile
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setLoading: (loading) => set({ loading }),
    clearError: () => set({ error: null })
}));

export default useAuthStore;
