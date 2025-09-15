import React from 'react';
import { Camera } from 'lucide-react';

interface Message {
  id: string;
  username: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  hasCamera?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    username: 'Araceli',
    avatar: '👩🏽',
    preview: '2 new messages',
    time: '1h',
    unread: true,
    hasCamera: true
  },
  {
    id: '2',
    username: 'user_1',
    avatar: '👨🏻',
    preview: 'Mentioned you in their story',
    time: '2h',
    unread: true,
    hasCamera: true
  },
  {
    id: '3',
    username: 'user_2',
    avatar: '👩🏼',
    preview: '2 new messages',
    time: '3h',
    unread: true,
    hasCamera: true
  },
  {
    id: '4',
    username: 'Araceli',
    avatar: '👩🏽',
    preview: 'Mentioned you in their story',
    time: '4h',
    unread: true,
    hasCamera: true
  }
];

export const Messages: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Messages</h1>
      </div>

      <div className="space-y-1">
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-800 hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-xl">
                {message.avatar}
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-primary truncate">{message.username}</h3>
                <span className="text-xs text-secondary">{message.time}</span>
              </div>
              <p className="text-sm text-secondary truncate">{message.preview}</p>
            </div>

            {/* Right side indicators */}
            <div className="flex items-center gap-2">
              {message.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
              {message.hasCamera && (
                <Camera className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};