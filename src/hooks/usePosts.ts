import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Post {
  id: string;
  user_id: string;
  content: string;
  likes: number;
  replies: number;
  shares: number;
  gifts: number;
  created_at: string;
  updated_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error in fetchPosts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          content,
          user_id: userId,
        })
        .select(`
          *,
          profiles (
            username,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Error creating post:', error);
        return { error };
      } else {
        setPosts([data, ...posts]);
        return { data };
      }
    } catch (error) {
      console.error('Error in createPost:', error);
      return { error };
    }
  };

  const likePost = async (postId: string) => {
    try {
      // Get current post
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const { error } = await supabase
        .from('posts')
        .update({ likes: post.likes + 1 })
        .eq('id', postId);

      if (error) {
        console.error('Error liking post:', error);
      } else {
        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, likes: p.likes + 1 }
            : p
        ));
      }
    } catch (error) {
      console.error('Error in likePost:', error);
    }
  };

  const giftPost = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const { error } = await supabase
        .from('posts')
        .update({ gifts: post.gifts + 1 })
        .eq('id', postId);

      if (error) {
        console.error('Error gifting post:', error);
      } else {
        setPosts(posts.map(p => 
          p.id === postId 
            ? { ...p, gifts: p.gifts + 1 }
            : p
        ));
      }
    } catch (error) {
      console.error('Error in giftPost:', error);
    }
  };

  return {
    posts,
    loading,
    createPost,
    likePost,
    giftPost,
    refetch: fetchPosts,
  };
};