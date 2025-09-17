import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { TrendingUp, Compass, Gamepad2, MessageCircle, Coins, Play, ShoppingCart } from 'lucide-react';

// Styles
import './styles/theme.css';

// Hooks
import { useAuth } from './hooks/useAuth';

// Layout Components
import { TopBar } from './components/Layout/TopBar';
import { BottomNav } from './components/Layout/BottomNav';
import { SideDrawer } from './components/Layout/SideDrawer';
import { AuthModal } from './components/Auth/AuthModal';
import { MessageModal } from './components/Layout/MessageModal';

// Pages
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/AuthPage';
import { Profile } from './pages/Profile';
import { Analytics } from './pages/Analytics';
import { Compose } from './pages/Compose';
import { Wallet } from './pages/Wallet';
import { Help } from './pages/Help';
import { Rewards } from './pages/Rewards';
import { Livestream } from './pages/Livestream';
import { WegramAI } from './pages/WegramAI';
import { Trending } from './pages/Trending';
import { Explore } from './pages/Explore';
import { Games } from './pages/Games';
import { UserProfile } from './pages/UserProfile';
import { Messages } from './pages/Messages';
import { Bookmarks } from './pages/Bookmarks';
import { PlaceholderPage } from './pages/PlaceholderPage';

function AppContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  // Show auth modal if not authenticated and not loading
  useEffect(() => {
    // Only show auth modal if Supabase is configured
    // if (!loading && !user) {
    //   setIsAuthOpen(true);
    // }
  }, [user, loading]);

  const handleAuth = (method: string) => {
    console.log('Auth method:', method);
    setIsAuthOpen(false);
  };

  const handleAIClick = () => {
    navigate('/ai');
  };

  const handleMessageClick = () => {
    setMessageRecipient(undefined);
    setIsMessageModalOpen(true);
  };

  const handleMessageUser = (username: string) => {
    setMessageRecipient(username);
    setIsMessageModalOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <TopBar 
        onMenuClick={() => setIsDrawerOpen(true)}
        onAIClick={handleAIClick}
        onMessageClick={handleMessageClick}
      />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/help" element={<Help />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/ai" element={<WegramAI />} />
          
          {/* Full functionality pages */}
          <Route path="/trending" element={<Trending />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/games" element={<Games />} />
          <Route path="/messages" element={<Messages />} />
          
          {/* User Profile */}
          <Route path="/user/:username" element={<UserProfile />} />
          
          {/* Pages that need to be built */}
          <Route path="/staking" element={<PlaceholderPage title="Staking" description="Stake your WEGRAM tokens to earn rewards" icon={Coins} />} />
          <Route path="/video" element={<PlaceholderPage title="Video" description="Watch and share videos on WEGRAM" icon={Play} />} />
          <Route path="/buy-wegram" element={<PlaceholderPage title="Buy WEGRAM" description="Purchase WEGRAM tokens" icon={ShoppingCart} />} />
        </Routes>
      </main>

      <BottomNav />
      
      <SideDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuth={handleAuth}
      />
      
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        recipientUsername={messageRecipient}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;