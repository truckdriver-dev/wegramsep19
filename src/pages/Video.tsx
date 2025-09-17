import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play, Pause, Volume2, VolumeX, User } from 'lucide-react';

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
  duration: string;
}

export const Video: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextVideo, setNextVideo] = useState<number | null>(null);

  // Mock video data
  const videos: VideoPost[] = [
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
      duration: '0:45'
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
      duration: '1:23'
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
      duration: '2:15'
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
      duration: '1:56'
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
      duration: '0:38'
    }
  ];

  const handleScroll = (direction: 'up' | 'down') => {
    if (isTransitioning) return; // Prevent multiple transitions
    
    let targetVideo = currentVideo;
    if (direction === 'down' && currentVideo < videos.length - 1) {
      targetVideo = currentVideo + 1;
    } else if (direction === 'up' && currentVideo > 0) {
      targetVideo = currentVideo - 1;
    } else {
      return; // No change needed
    }
    
    // Start transition
    setIsTransitioning(true);
    setNextVideo(targetVideo);
    
    // Complete transition after animation
    setTimeout(() => {
      setCurrentVideo(targetVideo);
      setNextVideo(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleLike = (videoId: string) => {
    console.log('Liking video:', videoId);
  };

  const handleComment = (videoId: string) => {
    console.log('Opening comments for video:', videoId);
    alert('Comments feature coming soon! 💬');
  };

  const handleShare = (videoId: string) => {
    console.log('Sharing video:', videoId);
    alert('Video shared! 📤');
  };

  const handleBookmark = (videoId: string) => {
    console.log('Bookmarking video:', videoId);
    alert('Video bookmarked! 📖');
  };

  const handleFollow = (username: string) => {
    console.log('Following user:', username);
    alert(`Now following ${username}! ✨`);
  };

  const video = videos[currentVideo];
  const nextVideoData = nextVideo !== null ? videos[nextVideo] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        handleScroll('up');
      } else if (e.key === 'ArrowDown') {
        handleScroll('down');
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentVideo, isPlaying]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Video Container with Transition */}
      <div className="relative w-full h-full">
        {/* Current Video */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out ${
            isTransitioning 
              ? (nextVideo! > currentVideo ? '-translate-y-full' : 'translate-y-full')
              : 'translate-y-0'
          }`}
        >
          <VideoContent video={video} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
        
        {/* Next Video (during transition) */}
        {isTransitioning && nextVideoData && (
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out ${
              nextVideo! > currentVideo ? 'translate-y-0' : 'translate-y-0'
            }`}
            style={{
              transform: nextVideo! > currentVideo 
                ? 'translateY(100%)' 
                : 'translateY(-100%)',
              animation: 'slideIn 0.3s ease-out forwards'
            }}
          >
            <VideoContent video={nextVideoData} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          </div>
        )}
        
        {/* UI Overlays */}
        <VideoOverlays 
          video={video} 
          currentVideo={currentVideo} 
          totalVideos={videos.length}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onBookmark={handleBookmark}
          onFollow={handleFollow}
        />
        
        {/* Navigation Areas */}
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {/* Top half - scroll up */}
          <button
            onClick={() => handleScroll('up')}
            className="flex-1 w-full opacity-0 hover:opacity-10 bg-gradient-to-b from-white to-transparent transition-opacity pointer-events-auto"
            disabled={currentVideo === 0 || isTransitioning}
          />
          {/* Bottom half - scroll down */}
          <button
            onClick={() => handleScroll('down')}
            className="flex-1 w-full opacity-0 hover:opacity-10 bg-gradient-to-t from-white to-transparent transition-opacity pointer-events-auto"
            disabled={currentVideo === videos.length - 1 || isTransitioning}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded-lg">
        <p>↑↓ Arrow keys or click to navigate</p>
        <p>Space to play/pause</p>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(${nextVideo! > currentVideo ? '100%' : '-100%'});
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Separate component for video content
interface VideoContentProps {
  video: VideoPost;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const VideoContent: React.FC<VideoContentProps> = ({ video, isPlaying, setIsPlaying }) => {
  // Generate unique gradient for each video
  const gradients = [
    'from-purple-900 via-blue-900 to-cyan-900',
    'from-pink-900 via-purple-900 to-blue-900',
    'from-green-900 via-teal-900 to-blue-900',
    'from-orange-900 via-red-900 to-pink-900',
    'from-indigo-900 via-purple-900 to-pink-900'
  ];
  
  const gradientIndex = parseInt(video.id) % gradients.length;
  const gradient = gradients[gradientIndex];
  
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
      {/* Video Thumbnail/Placeholder */}
      <div className="text-9xl opacity-20 animate-pulse">
        {video.thumbnail}
      </div>
      
      {/* Floating elements for more dynamic feel */}
      <div className="absolute top-1/4 left-1/4 text-4xl opacity-10 animate-bounce">
        💎
      </div>
      <div className="absolute bottom-1/3 right-1/4 text-3xl opacity-10 animate-pulse">
        🚀
      </div>
      
      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-20 h-20 rounded-full bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-70 transition-all transform hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 text-white ml-1" />
          ) : (
            <Play className="w-10 h-10 text-white ml-2" />
          )}
        </button>
      </div>

      {/* Video Progress Bar */}
      <div className="absolute bottom-20 left-4 right-20">
        <div className="flex items-center gap-2 text-white text-sm">
          <span>0:23</span>
          <div className="flex-1 h-1 bg-white bg-opacity-30 rounded-full">
            <div className="w-1/3 h-full bg-white rounded-full animate-pulse"></div>
          </div>
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );
};

// Separate component for UI overlays
interface VideoOverlaysProps {
  video: VideoPost;
  currentVideo: number;
  totalVideos: number;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onLike: (videoId: string) => void;
  onComment: (videoId: string) => void;
  onShare: (videoId: string) => void;
  onBookmark: (videoId: string) => void;
  onFollow: (username: string) => void;
}

const VideoOverlays: React.FC<VideoOverlaysProps> = ({
  video,
  currentVideo,
  totalVideos,
  isMuted,
  setIsMuted,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onFollow
}) => {
  return (
    <>
      {/* Left Side - User Info & Description */}
      <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{video.displayName}</h3>
            <p className="text-gray-300 text-sm">{video.username}</p>
          </div>
          <button
            onClick={() => onFollow(video.username)}
            className="ml-auto px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-full transition-colors"
          >
            Follow
          </button>
        </div>
        
        <p className="text-white text-sm leading-relaxed mb-4 max-w-sm">
          {video.description}
        </p>
      </div>

      {/* Right Side - Action Buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-6">
        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onLike(video.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
              video.isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
            }`}
          >
            <Heart className={`w-6 h-6 ${video.isLiked ? 'fill-current' : ''}`} />
          </button>
          <span className="text-white text-xs mt-1 font-medium">
            {video.likes > 1000 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}
          </span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onComment(video.id)}
            className="w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 flex items-center justify-center transition-all transform hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
          <span className="text-white text-xs mt-1 font-medium">
            {video.comments > 1000 ? `${(video.comments / 1000).toFixed(1)}K` : video.comments}
          </span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onShare(video.id)}
            className="w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 flex items-center justify-center transition-all transform hover:scale-110"
          >
            <Share className="w-6 h-6" />
          </button>
          <span className="text-white text-xs mt-1 font-medium">
            {video.shares > 1000 ? `${(video.shares / 1000).toFixed(1)}K` : video.shares}
          </span>
        </div>

        {/* Bookmark Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onBookmark(video.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
              video.isBookmarked 
                ? 'bg-yellow-500 text-white' 
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${video.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* More Options */}
        <button className="w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 flex items-center justify-center transition-all transform hover:scale-110">
          <MoreHorizontal className="w-6 h-6" />
        </button>

        {/* Volume Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-12 h-12 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 flex items-center justify-center transition-all transform hover:scale-110"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation Hints */}
      <div className="absolute top-4 right-4 text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded-full">
        {currentVideo + 1} / {totalVideos}
      </div>
    </>
  );
};