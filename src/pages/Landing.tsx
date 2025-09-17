import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterWithX = () => {
    navigate('/auth');
  };

  const handleEmailLogin = () => {
    // For now, just navigate to main app
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
        </div>
        <div className="text-gray-300 text-sm">wegram.social</div>
        <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            {/* WEGRAM Logo with Gradient Arches */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {/* Gradient Arches */}
                <div className="relative w-48 h-32">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-24 border-8 border-transparent bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-full" 
                         style={{ 
                           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                           WebkitMaskComposite: 'xor',
                           maskComposite: 'exclude'
                         }}>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-20 border-6 border-transparent bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-full"
                         style={{ 
                           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                           WebkitMaskComposite: 'xor',
                           maskComposite: 'exclude'
                         }}>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-16 border-4 border-transparent bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-full"
                         style={{ 
                           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                           WebkitMaskComposite: 'xor',
                           maskComposite: 'exclude'
                         }}>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-12 border-3 border-transparent bg-gradient-to-r from-cyan-400 to-purple-500 rounded-t-full"
                         style={{ 
                           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                           WebkitMaskComposite: 'xor',
                           maskComposite: 'exclude'
                         }}>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* WEGRAM Text */}
              <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                WEGRAM
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-gray-300 text-lg mb-12 text-center">
          A Next Gen SocialFi Experience
        </div>

        {/* Main Text */}
        <div className="text-center mb-16">
          <div className="text-5xl font-bold text-white mb-2">Connect.</div>
          <div className="text-5xl font-bold text-white mb-2">Engage.</div>
          <div className="text-5xl font-bold text-white">Monetize.</div>
        </div>

        {/* CTA Button */}
        <div className="w-full max-w-sm mb-8">
          <button
            onClick={handleEnterWithX}
            className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-4 px-6 rounded-full text-lg transition-colors flex items-center justify-center gap-3"
          >
            Enter WEGRAM With 
            <div className="font-bold text-xl">𝕏</div>
          </button>
        </div>

        {/* Alternative Login */}
        <div className="text-center mb-8">
          <span className="text-gray-400">Can't access your X account? </span>
          <button 
            onClick={handleEmailLogin}
            className="text-white underline hover:text-gray-300 transition-colors"
          >
            Log-in using email
          </button>
          <span className="text-gray-400"> or </span>
          <button 
            onClick={() => navigate('/')}
            className="text-white underline hover:text-gray-300 transition-colors"
          >
            Enter as guest
          </button>
        </div>

        {/* Terms */}
        <div className="text-center text-sm text-gray-400 max-w-sm">
          By clicking on "Enter WEGRAM With X" you agree to our{' '}
          <span className="text-white underline">terms of use</span> and{' '}
          <span className="text-white underline">privacy policy</span>.
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="flex items-center justify-center py-4 border-t border-gray-800">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};