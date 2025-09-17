import React, { useState } from 'react';
import { ArrowLeft, Bell, Heart, MessageCircle, Share, UserPlus, Hash, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    likes: true,
    comments: true,
    shares: true,
    newFollowers: true,
    mentions: true,
    directMessages: true
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const notificationTypes = [
    {
      id: 'likes' as keyof typeof settings,
      title: 'Likes',
      description: 'When someone likes your posts',
      icon: Heart,
      color: 'text-red-400'
    },
    {
      id: 'comments' as keyof typeof settings,
      title: 'Comments',
      description: 'When someone comments on your posts',
      icon: MessageCircle,
      color: 'text-blue-400'
    },
    {
      id: 'shares' as keyof typeof settings,
      title: 'Shares',
      description: 'When someone shares your content',
      icon: Share,
      color: 'text-green-400'
    },
    {
      id: 'newFollowers' as keyof typeof settings,
      title: 'New Followers',
      description: 'When someone follows you',
      icon: UserPlus,
      color: 'text-purple-400'
    },
    {
      id: 'mentions' as keyof typeof settings,
      title: 'Mentions',
      description: 'When someone mentions you in a post',
      icon: Hash,
      color: 'text-orange-400'
    },
    {
      id: 'directMessages' as keyof typeof settings,
      title: 'Direct Messages',
      description: 'When you receive a new message',
      icon: MessageCircle,
      color: 'text-cyan-400'
    }
  ];

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">Notifications</h1>
          <p className="text-secondary text-sm">Manage your notification preferences</p>
        </div>
      </div>

      {/* Push Notifications Master Toggle */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 bg-opacity-20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-primary font-semibold">Push Notifications</h3>
              <p className="text-secondary text-sm">Enable all notifications</p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('pushNotifications')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.pushNotifications ? 'bg-purple-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notification Types */}
      <div className="space-y-4">
        {notificationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div key={type.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-opacity-20 flex items-center justify-center ${type.color.replace('text-', 'bg-').replace('-400', '-600')}`}>
                    <Icon className={`w-5 h-5 ${type.color}`} />
                  </div>
                  <div>
                    <h3 className="text-primary font-medium">{type.title}</h3>
                    <p className="text-secondary text-sm">{type.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(type.id)}
                  disabled={!settings.pushNotifications}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[type.id] && settings.pushNotifications 
                      ? 'bg-purple-600' 
                      : 'bg-gray-600'
                  } ${!settings.pushNotifications ? 'opacity-50' : ''}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[type.id] && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy Notice */}
      <div className="mt-8 card bg-purple-600 bg-opacity-10 border-purple-600">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">Privacy & Control</h4>
            <p className="text-purple-200 text-sm">
              You have full control over your notifications. Changes take effect immediately and you can modify these settings anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};