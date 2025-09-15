import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { PostComposer } from '../components/Post/PostComposer';
import { PostCard } from '../components/Post/PostCard';
import { mockPosts, Post } from '../data/mockData';

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handlePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: '@demo_user',
      content,
      timestamp: 'now',
      likes: 0,
      replies: 0,
      shares: 0,
      gifts: 0
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleGift = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Show gift modal/selection
    const giftOptions = ['🎁 1 WGM', '💎 5 WGM', '🚀 10 WGM', '👑 25 WGM'];
    const selectedGift = prompt(`Send a gift to ${post.username}:\n\n${giftOptions.join('\n')}\n\nEnter gift (1, 5, 10, or 25):`);
    
    if (selectedGift && ['1', '5', '10', '25'].includes(selectedGift)) {
      setPosts(posts.map(p => 
        p.id === postId 
          ? { ...p, gifts: (p.gifts || 0) + 1 }
          : p
      ));
      alert(`🎁 Sent ${selectedGift} WGM to ${post.username}!`);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      <PostComposer 
        onPost={handlePost}
        onCancel={() => {}}
      />
      
      <div>
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            onLike={handleLike}
            onGift={handleGift}
          />
        ))}
      </div>
    </div>
  );
};