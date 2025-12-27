import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials not found. Please add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to your .env.local file');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Auth helpers
export const auth = {
    signUp: async (email, password, metadata = {}) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: metadata }
        });
        return { data, error };
    },

    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    signInWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        return { data, error };
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    getSession: async () => {
        const { data: { session }, error } = await supabase.auth.getSession();
        return { session, error };
    },

    getUser: async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        return { user, error };
    },

    onAuthStateChange: (callback) => {
        return supabase.auth.onAuthStateChange(callback);
    }
};

// Storage helpers
export const storage = {
    uploadPostImage: async (userId, file) => {
        try {
            console.log('📦 Storage: Starting upload', { userId, fileName: file.name, fileSize: file.size });

            // Simple filename with timestamp
            const timestamp = Date.now();
            const fileExt = file.name.split('.').pop();
            const fileName = `${timestamp}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            console.log('📦 Storage: Uploading to path:', filePath);

            // Upload to bucket 'posts'
            const { data, error } = await supabase.storage
                .from('posts')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error('❌ Storage upload error:', error);
                return { url: null, error };
            }

            console.log('✅ Storage: Upload successful', data);

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('posts')
                .getPublicUrl(filePath);

            console.log('✅ Storage: Public URL generated:', urlData.publicUrl);

            return { url: urlData.publicUrl, error: null };
        } catch (error) {
            console.error('❌ Storage exception:', error);
            return { url: null, error };
        }
    },

    uploadAvatarImage: async (userId, file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}.${fileExt}`;
            const filePath = fileName;

            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (error) return { url: null, error };

            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            return { url: urlData.publicUrl, error: null };
        } catch (error) {
            return { url: null, error };
        }
    },

    deleteImage: async (bucket, path) => {
        const { error } = await supabase.storage.from(bucket).remove([path]);
        return { error };
    }
};

// Database helpers
export const db = {
    // Profiles
    getProfile: async (userId) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        return { data, error };
    },

    getProfileByUsername: async (username) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();
        return { data, error };
    },

    updateProfile: async (userId, updates) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', userId)
            .select()
            .single();
        return { data, error };
    },

    // Posts
    createPost: async (post) => {
        const { data, error } = await supabase
            .from('posts')
            .insert(post)
            .select(`
        *,
        profiles:user_id (id, username, display_name, avatar_url)
      `)
            .single();
        return { data, error };
    },

    getPosts: async (limit = 20, offset = 0) => {
        const { data, error } = await supabase
            .from('posts')
            .select(`
        *,
        profiles:user_id (id, username, display_name, avatar_url),
        reactions (id, user_id, reaction_type),
        comments (id)
      `)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);
        return { data, error };
    },

    getUserPosts: async (userId) => {
        const { data, error } = await supabase
            .from('posts')
            .select(`
        *,
        reactions (id, user_id, reaction_type),
        comments (id)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    deletePost: async (postId) => {
        const { error } = await supabase.from('posts').delete().eq('id', postId);
        return { error };
    },

    // Reactions
    addReaction: async (userId, postId, reactionType = 'like') => {
        const { data, error } = await supabase
            .from('reactions')
            .upsert({ user_id: userId, post_id: postId, reaction_type: reactionType })
            .select()
            .single();
        return { data, error };
    },

    removeReaction: async (userId, postId) => {
        const { error } = await supabase
            .from('reactions')
            .delete()
            .eq('user_id', userId)
            .eq('post_id', postId);
        return { error };
    },

    // Comments
    addComment: async (userId, postId, content) => {
        const { data, error } = await supabase
            .from('comments')
            .insert({ user_id: userId, post_id: postId, content })
            .select(`
                *,
                profiles:user_id (username, avatar_url)
            `)
            .single();
        return { data, error };
    },

    getComments: async (postId) => {
        const { data, error } = await supabase
            .from('comments')
            .select(`
                *,
                profiles:user_id (id, username, display_name, avatar_url)
            `)
            .eq('post_id', postId)
            .order('created_at', { ascending: true });
        return { data, error };
    },

    deleteComment: async (commentId) => {
        const { error } = await supabase.from('comments').delete().eq('id', commentId);
        return { error };
    },

    // Follows & Suggestions
    followUser: async (followerId, followingId) => {
        const { data, error } = await supabase
            .from('follows')
            .insert({ follower_id: followerId, following_id: followingId })
            .select()
            .single();
        return { data, error };
    },

    unfollowUser: async (followerId, followingId) => {
        const { error } = await supabase
            .from('follows')
            .delete()
            .match({ follower_id: followerId, following_id: followingId });
        return { error };
    },

    getSuggestedUsers: async (userId, limit = 5) => {
        // Get IDs of users already followed
        const { data: following } = await supabase
            .from('follows')
            .select('following_id')
            .eq('follower_id', userId);

        const followingIds = following?.map(f => f.following_id) || [];
        followingIds.push(userId); // Exclude self

        // Get random profiles not in following list
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .not('id', 'in', `(${followingIds.join(',')})`)
            .limit(limit);

        return { data, error };
    },

    getFollowers: async (userId) => {
        const { data, error } = await supabase
            .from('follows')
            .select(`
                follower:profiles!follows_follower_id_fkey (id, username, display_name, avatar_url)
            `)
            .eq('following_id', userId);
        return { data: data?.map(f => f.follower), error };
    },

    getFollowing: async (userId) => {
        const { data, error } = await supabase
            .from('follows')
            .select(`
                following:profiles!follows_following_id_fkey (id, username, display_name, avatar_url)
            `)
            .eq('follower_id', userId);
        return { data: data?.map(f => f.following), error };
    },

    checkFollow: async (followerId, followingId) => {
        const { data, error } = await supabase
            .from('follows')
            .select('*')
            .match({ follower_id: followerId, following_id: followingId })
            .single();
        return { data, error };
    },

    isFollowing: async (followerId, followingId) => {
        const { data, error } = await supabase
            .from('follows')
            .select('follower_id')
            .eq('follower_id', followerId)
            .eq('following_id', followingId)
            .single();
        return { isFollowing: !!data, error };
    },

    // Notifications
    getNotifications: async (userId) => {
        const { data, error } = await supabase
            .from('notifications')
            .select(`
                *,
                actor:actor_id (id, username, display_name, avatar_url),
                post:post_id (id, image_url)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(50);
        return { data, error };
    },

    markNotificationRead: async (notificationId) => {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId);
        return { error };
    },

    markAllNotificationsRead: async (userId) => {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId);
        return { error };
    },

    // Messages
    getConversations: async (userId) => {
        const { data, error } = await supabase
            .from('conversation_participants')
            .select(`
                conversation:conversation_id (
                    id,
                    created_at,
                    messages (
                        id,
                        content,
                        sender_id,
                        created_at
                    )
                )
            `)
            .eq('user_id', userId);
        return { data, error };
    },

    getMessages: async (conversationId) => {
        const { data, error } = await supabase
            .from('messages')
            .select(`
                *,
                sender:sender_id (id, username, display_name, avatar_url)
            `)
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true });
        return { data, error };
    },

    sendMessage: async (conversationId, senderId, content) => {
        const { data, error } = await supabase
            .from('messages')
            .insert({ conversation_id: conversationId, sender_id: senderId, content })
            .select()
            .single();
        return { data, error };
    },

    createConversation: async (userIds) => {
        // Create conversation
        const { data: conversation, error: convError } = await supabase
            .from('conversations')
            .insert({})
            .select()
            .single();

        if (convError) return { data: null, error: convError };

        // Add participants
        const participants = userIds.map(userId => ({
            conversation_id: conversation.id,
            user_id: userId
        }));

        const { error: partError } = await supabase
            .from('conversation_participants')
            .insert(participants);

        if (partError) return { data: null, error: partError };

        return { data: conversation, error: null };
    },

    // Search
    searchUsers: async (query) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, username, display_name, avatar_url')
            .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
            .limit(20);
        return { data, error };
    },

    searchPosts: async (query) => {
        const { data, error } = await supabase
            .from('posts')
            .select(`
                *,
                profiles:user_id (id, username, display_name, avatar_url),
                reactions (id, user_id, reaction_type),
                comments (id)
            `)
            .ilike('caption', `%${query}%`)
            .limit(20);
        return { data, error };
    },

    // Saved Posts
    savePost: async (userId, postId) => {
        const { data, error } = await supabase
            .from('saved_posts')
            .insert({ user_id: userId, post_id: postId })
            .select()
            .single();
        return { data, error };
    },

    unsavePost: async (userId, postId) => {
        const { error } = await supabase
            .from('saved_posts')
            .delete()
            .match({ user_id: userId, post_id: postId });
        return { error };
    },

    getSavedPosts: async (userId) => {
        const { data, error } = await supabase
            .from('saved_posts')
            .select(`
                post:posts (
                    *,
                    profiles:user_id (id, username, display_name, avatar_url),
                    reactions (id, user_id, reaction_type),
                    comments (id)
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
        return { data: data?.map(s => s.post), error };
    },

    checkIfPostSaved: async (userId, postId) => {
        const { data, error } = await supabase
            .from('saved_posts')
            .select('id')
            .match({ user_id: userId, post_id: postId })
            .single();
        return { isSaved: !!data, error };
    }
};

// Realtime subscriptions
export const realtime = {
    subscribeToNotifications: (userId, callback) => {
        return supabase
            .channel(`notifications:${userId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`
            }, callback)
            .subscribe();
    },

    subscribeToMessages: (conversationId, callback) => {
        return supabase
            .channel(`messages:${conversationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`
            }, callback)
            .subscribe();
    },

    subscribeToFeed: (callback) => {
        return supabase
            .channel('feed')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'posts'
            }, callback)
            .subscribe();
    },

    unsubscribe: (channel) => {
        supabase.removeChannel(channel);
    }
};

export default supabase;
