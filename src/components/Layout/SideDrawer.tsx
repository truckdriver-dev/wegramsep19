import React from 'react';
import { X, Home, TrendingUp, Compass, Gamepad2, MessageCircle, Gift, Bot, Video, Bell, RotateCcw, Grid3X3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, path: '/trending' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
    { id: 'games', label: 'Games', icon: Gamepad2, path: '/games' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    { id: 'rewards', label: 'Rewards', icon: Gift, path: '/rewards' },
    { id: 'ai', label: 'Wegram AI', icon: Bot, path: '/ai' },
    { id: 'livestream', label: 'Livestream', icon: Video, path: '/livestream' }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-80 max-w-sm bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: 'var(--card)' }}>
        {/* Header with logo */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center relative overflow-hidden shadow-2xl border border-purple-400/30">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="text-white font-black text-xl tracking-widest transform -skew-x-6 relative z-10 drop-shadow-lg">
                W
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-cyan-300/20"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-sm"></div>
            </div>
            <span className="text-xl font-bold text-primary">WEGRAM</span>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className="w-full flex items-center gap-4 py-4 hover:bg-gray-700 transition-all duration-200 text-left group"
              >
                <Icon className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-200" 
                      style={{
                        filter: 'drop-shadow(0 0 2px currentColor)',
                        background: 'linear-gradient(135deg, #00D4FF, #9945FF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }} />
                <span className="font-medium bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-200 bg-clip-text text-transparent">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg gradient-bg flex items-center justify-center relative overflow-hidden shadow-lg border border-purple-400/20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-purple-500/15 to-pink-500/15"></div>
            <div className="text-white font-black text-xs tracking-wider transform -skew-x-3 relative z-10">
              W
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-cyan-300/15"></div>
          </div>
          <span className="text-xs text-gray-500">v1.3 • prototype</span>
        </div>
      </div>
      
      {/* Right side content area */}
      <div className="flex-1 relative">
        {/* Top bar in drawer view */}
        <div className="p-4 flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search @handle or posts..."
              className="input pl-4 pr-4 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Grid3X3 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* AI Dot */}
        <button className="ai-dot">
          AI
        </button>
        
        {/* Sample content */}
        <div className="p-4">
          <div className="text-center text-gray-500 mt-20">
            <p>🚀 — real web3</p>
            <p>v1.3 • prototype</p>
          </div>
        </div>
      </div>
    </div>
  );
};