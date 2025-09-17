import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    likes: true,
    reposts: true,
    comments: true,
    tags: true,
    newFollowers: true,
    whitelist: true
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-purple-600' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 pt-16">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="text-xl font-bold text-primary">Edit Notifications</h1>
        </div>

        <div className="px-4 pb-24">
          {/* Push Notifications */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-primary mb-4">PUSH NOTIFICATIONS</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary">
                  Get push notifications to find out what's going on when you're not on WEGRAM.
                </p>
              </div>
              <ToggleSwitch 
                enabled={settings.pushNotifications} 
                onToggle={() => handleToggle('pushNotifications')} 
              />
            </div>
          </div>

          {/* Customize Notifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-6">
              Customize who you get notifications from:
            </h3>

            <div className="space-y-6">
              {/* Likes */}
              <div>
                <h4 className="text-base font-bold text-primary mb-2">LIKES</h4>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Only from accounts I follow</span>
                  <ToggleSwitch 
                    enabled={settings.likes} 
                    onToggle={() => handleToggle('likes')} 
                  />
                </div>
              </div>

              {/* Reposts */}
              <div>
                <h4 className="text-base font-bold text-primary mb-2">REPOSTS</h4>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Only from accounts I follow</span>
                  <ToggleSwitch 
                    enabled={settings.reposts} 
                    onToggle={() => handleToggle('reposts')} 
                  />
                </div>
              </div>

              {/* Comments */}
              <div>
                <h4 className="text-base font-bold text-primary mb-2">COMMENTS</h4>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Only from accounts I follow</span>
                  <ToggleSwitch 
                    enabled={settings.comments} 
                    onToggle={() => handleToggle('comments')} 
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-base font-bold text-primary mb-2">TAGS</h4>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Only from accounts I follow</span>
                  <ToggleSwitch 
                    enabled={settings.tags} 
                    onToggle={() => handleToggle('tags')} 
                  />
                </div>
              </div>

              {/* New Followers */}
              <div>
                <h4 className="text-base font-bold text-primary mb-2">NEW FOLLOWERS</h4>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Only from accounts I follow</span>
                  <ToggleSwitch 
                    enabled={settings.newFollowers} 
                    onToggle={() => handleToggle('newFollowers')} 
                  />
                </div>
              </div>

              {/* Whitelist */}
              <div>
                <h4 className="text-base font-bold text-primary mb-2">WHITELIST</h4>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Only from accounts I follow</span>
                  <ToggleSwitch 
                    enabled={settings.whitelist} 
                    onToggle={() => handleToggle('whitelist')} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};