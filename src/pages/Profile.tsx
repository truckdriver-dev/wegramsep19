import React, { useState } from 'react';
import { User, Settings, Calendar, Edit3, Share, Grid3X3, Play, Camera, MessageCircle, UserPlus, MoreHorizontal } from 'lucide-react';
import { mockUser, mockPosts } from '../data/mockData';
import { MessageModal } from '../components/Layout/MessageModal';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'tagged'>('posts');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [profileCompletion] = useState({
    total: 4,
    completed: 2,
    tasks: [
      { id: 'bio', title: 'Add a bio', description: 'Tell your followers a little bit about yourself.', completed: false },
      { id: 'photo', title: 'Add profile photo', description: 'Upload a profile picture to personalize your account.', completed: true },
      { id: 'follow', title: 'Find people to follow', description: 'Follow five or more accounts to get started.', completed: false },
      { id: 'post', title: 'Create your first post', description: 'Share something with the community.', completed: true }
    ]
  });

  const userPosts = mockPosts.filter(post => post.userId === mockUser.id);

  const handleEditProfile = () => {
    // Navigate to edit profile or show edit modal
    console.log('Edit profile clicked');
  };

  const handleShareProfile = () => {
    const profileUrl = `https://wegram.com/user/${mockUser.username}`;
    if (navigator.share) {
      navigator.share({
        title: `${mockUser.username} on WEGRAM`,
        url: profileUrl
      }).catch(() => {
        // Fallback to clipboard if share fails
        navigator.clipboard?.writeText(profileUrl);
        alert('Profile link copied to clipboard!');
      });
    } else {
      navigator.clipboard?.writeText(profileUrl);
      alert('Profile link copied to clipboard!');
    }
  };

  const handleAddBio = () => {
    // Show bio input or navigate to bio edit
    console.log('Add bio clicked');
  };

  const handleFindPeople = () => {
    // Navigate to discover people page
    console.log('Find people clicked');
  };

  const handleTaskComplete = (taskId: string) => {
    if (taskId === 'bio') {
      handleAddBio();
    } else if (taskId === 'follow') {
      handleFindPeople();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-primary">{mockUser.username.replace('@', '')}</h1>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <UserPlus className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mb-8">
        {/* Avatar and Username */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center text-3xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Edit3 className="w-4 h-4 text-gray-800" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary mb-1">{mockUser.username}</h2>
            <div className="flex items-center gap-2 text-secondary text-sm">
              <span>✨ Verified</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={handleEditProfile}
            className="btn-secondary py-3 text-sm font-medium"
          >
            Edit profile
          </button>
          <button
            onClick={handleShareProfile}
            className="btn-secondary py-3 text-sm font-medium"
          >
            Share profile
          </button>
          <button 
            onClick={() => setIsMessageModalOpen(true)}
            className="btn-secondary py-3 text-sm font-medium flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center mb-6">
          <div>
            <div className="text-2xl font-bold text-primary">{userPosts.length}</div>
            <div className="text-secondary text-sm">Posts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">1.2K</div>
            <div className="text-secondary text-sm">Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">834</div>
            <div className="text-secondary text-sm">Following</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 text-center transition-colors relative ${
            activeTab === 'posts' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Grid3X3 className="w-5 h-5 mx-auto mb-1" />
          <span className="text-sm">Posts</span>
          {activeTab === 'posts' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-3 text-center transition-colors relative ${
            activeTab === 'media' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Play className="w-5 h-5 mx-auto mb-1" />
          <span className="text-sm">Media</span>
          {activeTab === 'media' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('tagged')}
          className={`flex-1 py-3 text-center transition-colors relative ${
            activeTab === 'tagged' ? 'text-primary' : 'text-secondary'
          }`}
        >
          <Camera className="w-5 h-5 mx-auto mb-1" />
          <span className="text-sm">Tagged</span>
          {activeTab === 'tagged' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>
          )}
        </button>
      </div>

      {/* Profile Completion Section */}
      <div className="card mb-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-primary mb-2">Complete your profile</h3>
          <p className="text-secondary text-sm">
            {profileCompletion.completed} of {profileCompletion.total} complete
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {profileCompletion.tasks.filter(task => !task.completed).slice(0, 2).map((task) => (
            <div key={task.id} className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center mx-auto mb-3">
                {task.id === 'bio' && <Edit3 className="w-8 h-8 text-gray-400" />}
                {task.id === 'follow' && <UserPlus className="w-8 h-8 text-gray-400" />}
              </div>
              <h4 className="text-primary font-semibold mb-2">{task.title}</h4>
              <p className="text-secondary text-sm mb-4 leading-relaxed">{task.description}</p>
              <button
                onClick={() => handleTaskComplete(task.id)}
                className="btn-primary px-6 py-2 text-sm"
              >
                {task.id === 'bio' ? 'Add Bio' : 'Find People'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'posts' && (
        <div>
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map(post => (
                <div key={post.id} className="card">
                  <p className="text-primary mb-3 leading-relaxed">{post.content}</p>
                  <div className="flex items-center justify-between text-secondary text-sm">
                    <span>{post.timestamp}</span>
                    <div className="flex gap-4">
                      <span>{post.likes} likes</span>
                      <span>{post.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Grid3X3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-primary font-semibold mb-2">No posts yet</h3>
              <p className="text-secondary text-sm mb-4">Share your first post to get started</p>
              <button className="btn-primary px-6 py-2">Create Post</button>
            </div>
          )}
        </div>
      )}
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientUsername={mockUser.username}
      />

      {activeTab === 'media' && (
        <div className="text-center py-12">
          <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-primary font-semibold mb-2">No media yet</h3>
          <p className="text-secondary text-sm">Your photos and videos will appear here</p>
        </div>
      )}

      {activeTab === 'tagged' && (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-primary font-semibold mb-2">No tagged posts</h3>
          <p className="text-secondary text-sm">Posts you're tagged in will appear here</p>
        </div>
      )}
    </div>
  );
};