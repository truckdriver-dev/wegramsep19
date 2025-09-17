import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, User, Play, Volume2, VolumeX } from 'lucide-react';

interface VideoPost {
  id: string;
  username: string;
  displayName: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  thumbnail: string;
  gradient: string;
}

export const Video: React.FC = () => {
  const [videos] = useState<VideoPost[]>([
    {
      id: '1',
      username: '@crypto_trader',
      displayName: 'Crypto Trader',
      description: 'Just made 500% gains on this new Solana gem! 💎 Who else is buying the dip? #SolanaGems #CryptoGains',
      likes: 12400,
      comments: 892,
      shares: 234,
      isLiked: false,
      isBookmarked: false,
      thumbnail: '🚀',
      gradient: 'from-purple-600 via-blue-600 to-cyan-600'
    },
    {
      id: '2',
      username: '@defi_queen',
      displayName: 'DeFi Queen',
      description: 'How I earn $1000/day yield farming on Solana 🌾 Step by step tutorial! Link in bio #DeFi #YieldFarming',
      likes: 8900,
      comments: 567,
      shares: 189,
      isLiked: true,
      isBookmarked: false,
      thumbnail: '🌾',
      gradient: 'from-pink-600 via-purple-600 to-blue-600'
    },
    {
      id: '3',
      username: '@nft_artist',
      displayName: 'NFT Artist',
      description: 'Creating my latest NFT collection live! 🎨 What do you think of this piece? Drop your thoughts below!',
      likes: 15600,
      comments: 1234,
      shares: 456,
      isLiked: false,
      isBookmarked: true,
      thumbnail: '🎨',
      gradient: 'from-green-600 via-teal-600 to-blue-600'
    },
    {
      id: '4',
      username: '@solana_dev',
      displayName: 'Solana Dev',
      description: 'Building the next big dApp on Solana! 👨‍💻 This is going to change everything. Beta coming soon! #Solana #Web3',
      likes: 6700,
      comments: 345,
      shares: 123,
      isLiked: false,
      isBookmarked: false,
      thumbnail: '👨‍💻',
      gradient: 'from-orange-600 via-red-600 to-pink-600'
    },
    {
      id: '5',
      username: '@web3_influencer',
      displayName: 'Web3 Influencer',
      description: 'Why WEGRAM is the future of social media! 🔥 Earning while posting is revolutionary. Join the movement!',
      likes: 23400,
      comments: 1890,
      shares: 678,
      isLiked: true,
      isBookmarked: true,
      thumbnail: '🔥',
      gradient: 'from-indigo-600 via-purple-600 to-pink-600'
    }
  ]);

  const [likedVideos, setLikedVideos] = useState<Set<string>>(
    new Set(videos.filter(v => v.isLiked).map(v => v.id))
  );
  const [bookmarkedVideos, setBookmarkedVideos] = useState<Set<string>>(
    new Set(videos.filter(v => v.isBookmarked).map(v => v.id))
  );

  const handleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const handleBookmark = (videoId: string) => {
    setBookmarkedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const handleComment = (videoId: string) => {
    alert('Comments feature coming soon! 💬');
  };

  const handleShare = (videoId: string) => {
    alert('Video shared! 📤');
  };

  const handleFollow = (username: string) => {
    alert(`Now following ${username}! ✨`);
  };

  return (
    <div className="min-h-screen pt-20 pb-24" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Videos</h1>
          <p className="text-secondary text-sm">Discover Web3 content</p>
        </div>

        {/* Video Feed */}
        <div className="space-y-6">
          {videos.map((video) => (
            <div key={video.id} className="px-4">
              {/* Video Container */}
              <div className="relative">
                {/* Video Frame */}
                <div className={`aspect-[9/16] rounded-2xl bg-gradient-to-br ${video.gradient} relative overflow-hidden border-2 border-gray-700`}>
                  {/* Video Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-30 animate-pulse">
                      {video.thumbnail}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-1/4 left-1/4 text-3xl opacity-20 animate-bounce">
                    💎
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 text-2xl opacity-20 animate-pulse">
                    🚀
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all transform hover:scale-110">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </button>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-all">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <span>0:23</span>
                      <div className="flex-1 h-1 bg-white bg-opacity-30 rounded-full">
                        <div className="w-1/3 h-full bg-white rounded-full"></div>
                      </div>
                      <span>1:45</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Right Side */}
                <div className="absolute right-2 bottom-20 flex flex-col gap-4">
                  {/* Like */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleLike(video.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                        likedVideos.has(video.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                    </button>
                    <span className="text-white text-xs mt-1 font-medium">
                      {video.likes > 1000 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}
                    </span>
                  </div>

                  {/* Comment */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleComment(video.id)}
                      className="w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 flex items-center justify-center transition-all transform hover:scale-110"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <span className="text-white text-xs mt-1 font-medium">
                      {video.comments > 1000 ? `${(video.comments / 1000).toFixed(1)}K` : video.comments}
                    </span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleShare(video.id)}
                      className="w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 flex items-center justify-center transition-all transform hover:scale-110"
                    >
                      <Share className="w-6 h-6" />
                    </button>
                    <span className="text-white text-xs mt-1 font-medium">
                      {video.shares > 1000 ? `${(video.shares / 1000).toFixed(1)}K` : video.shares}
                    </span>
                  </div>

                  {/* Bookmark */}
                  <button
                    onClick={() => handleBookmark(video.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                      bookmarkedVideos.has(video.id)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
                    }`}
                  >
                    <Bookmark className={`w-6 h-6 ${bookmarkedVideos.has(video.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Video Info - Below Video */}
              <div className="mt-4">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-primary font-semibold">{video.displayName}</h3>
                    <p className="text-secondary text-sm">{video.username}</p>
                  </div>
                  <button
                    onClick={() => handleFollow(video.username)}
                    className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full transition-colors"
                  >
                    Follow
                  </button>
                </div>

                {/* Description */}
                <p className="text-primary text-sm leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="px-4 mt-8">
          <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-primary rounded-lg transition-colors">
            Load More Videos
          </button>
        </div>
      </div>
    </div>
  );
};