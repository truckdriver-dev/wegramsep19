import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          email: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          email?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          username?: string;
          email?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          likes: number;
          replies: number;
          shares: number;
          gifts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          content: string;
          likes?: number;
          replies?: number;
          shares?: number;
          gifts?: number;
        };
        Update: {
          content?: string;
          likes?: number;
          replies?: number;
          shares?: number;
          gifts?: number;
          updated_at?: string;
        };
      };
      rewards: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          amount: string;
          type: 'daily' | 'invite' | 'task';
          claimed: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          amount: string;
          type: 'daily' | 'invite' | 'task';
          claimed?: boolean;
        };
        Update: {
          claimed?: boolean;
        };
      };
    };
  };
}