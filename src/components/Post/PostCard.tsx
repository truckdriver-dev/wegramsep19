import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Gift, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../data/mockData';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onReply?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onGift?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onReply, onShare, onGift, onBookmark }) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate(`/user/${post.username}`);
  };

  const handleGift = () => {
    onGift?.(post.id);
  };

  const handleBookmark = () => {
    onBookmark?.(post.id);
  };
  return (
    <div className="card mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <button onClick={handleAvatarClick} className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <span className="text-white text-sm font-semibold">
              {post.username.charAt(1).toUpperCase()}
            </span>
          </button>
          <div>
            <button onClick={handleAvatarClick} className="text-primary font-medium hover:text-purple-400 transition-colors cursor-pointer">
              {post.username}
            </button>
            <div className="text-secondary text-sm">{post.timestamp}</div>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-700 rounded transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <p className="text-primary mb-4 leading-relaxed">{post.content}</p>

      <div className="flex items-center justify-between text-secondary">
        <button
          onClick={() => onLike?.(post.id)}
          className="flex items-center gap-2 hover:text-red-400 transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm">{post.likes}</span>
        </button>
        <button
          onClick={() => onReply?.(post.id)}
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{post.replies}</span>
        </button>
        <button
          onClick={() => onShare?.(post.id)}
          className="flex items-center gap-2 hover:text-green-400 transition-colors"
        >
          <Share className="w-4 h-4" />
          <span className="text-sm">{post.shares}</span>
        </button>
        <button
          onClick={handleGift}
          className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
          <Gift className="w-4 h-4" />
          <span className="text-sm">{post.gifts || 0}</span>
        </button>
        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 hover:text-purple-400 transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};