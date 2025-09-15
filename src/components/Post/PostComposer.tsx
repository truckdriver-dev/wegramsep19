import React, { useState } from 'react';

interface PostComposerProps {
  onPost: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export const PostComposer: React.FC<PostComposerProps> = ({ 
  onPost, 
  onCancel,
  placeholder = "What's happening? (text only)"
}) => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="card mb-6">
      <h3 className="text-primary font-semibold mb-4">Create Post</h3>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full h-24 bg-transparent text-primary placeholder-gray-400 resize-none outline-none mb-4"
        style={{ fontFamily: 'var(--font-base)' }}
      />
      
      <div className="flex gap-3">
        <button
          onClick={handlePost}
          className="btn-primary flex-1"
          disabled={!content.trim()}
        >
          Post
        </button>
        <button
          onClick={onCancel}
          className="btn-secondary px-6"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};