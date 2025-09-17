import React from 'react';
import { Search, MessageCircle, Gift } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
  onGiftClick: () => void;
  onMessageClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick, onGiftClick, onMessageClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Menu"
        >
          <div className="w-5 h-5 flex flex-col justify-center gap-1">
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
            <div className="w-full h-0.5 bg-white"></div>
          </div>
        </button>

        {/* Search Field */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search @handle or posts…"
            className="input pl-10 pr-4"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
            {/* Notification bell icon matching the Arena.social style with WEGRAM colors */}
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7C16.86 7.5 20 10.9 20 15V18L22 20V21H2V20L4 18V15C4 10.9 7.14 7.5 11 7V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM7.5 22C7.5 23.11 8.39 24 9.5 24H14.5C15.61 24 16.5 23.11 16.5 22H7.5Z"/>
            </svg>
            <div className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          </button>
          <button 
            onClick={onMessageClick}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Gift Button */}
        <button onClick={onGiftClick} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Gift className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
};