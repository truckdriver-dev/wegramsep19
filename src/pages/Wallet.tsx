import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet as WalletIcon, 
  Copy, 
  Check,
  ArrowLeft,
  X,
  Loader,
  Send,
  Download,
  Eye,
  EyeOff,
  Plus
} from 'lucide-react';
import { SolanaWallet, WalletData } from '../utils/solanaWallet';

export const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const [hasWallet, setHasWallet] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<WalletData | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [balance] = useState(0);
  const [showWalletSetup, setShowWalletSetup] = useState(false);
  const [setupStep, setSetupStep] = useState<'choose' | 'create' | 'import'>('choose');
  const [importKey, setImportKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const solanaWallet = new SolanaWallet();

  // Initialize wallet state - start with no wallet
  useEffect(() => {
    const storedWallet = localStorage.getItem('solana_wallet');
    if (storedWallet) {
      try {
        const wallet = JSON.parse(storedWallet);
        setCurrentWallet(wallet);
        setHasWallet(true);
      } catch (error) {
        console.error('Failed to load stored wallet:', error);
        localStorage.removeItem('solana_wallet');
        setHasWallet(false);
        setCurrentWallet(null);
      }
    } else {
      setHasWallet(false);
      setCurrentWallet(null);
    }
  }, []);

  const generateWallet = () => {
    setIsLoading(true);
    const wallet = solanaWallet.generateWallet();
    setCurrentWallet(wallet);
    setSetupStep('create');
    setIsLoading(false);
  };

  const importWallet = () => {
    if (!importKey.trim()) {
      alert('Please enter your private key or recovery phrase');
      return;
    }
    
    setIsLoading(true);
    
    // Try importing as private key first, then as mnemonic
    let wallet = solanaWallet.importFromPrivateKey(importKey.trim());
    if (!wallet) {
      wallet = solanaWallet.importFromMnemonic(importKey.trim());
    }
    
    if (wallet) {
      setCurrentWallet(wallet);
      localStorage.setItem('solana_wallet', JSON.stringify(wallet));
      setHasWallet(true);
      setShowWalletSetup(false);
      setImportKey('');
    } else {
      alert('Invalid private key or recovery phrase. Please check and try again.');
    }
    
    setIsLoading(false);
  };

  const finishWalletSetup = () => {
    if (currentWallet) {
      localStorage.setItem('solana_wallet', JSON.stringify(currentWallet));
      setHasWallet(true);
      setShowWalletSetup(false);
      setSetupStep('choose');
    }
  };

  const handleCopy = (text: string, item: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSend = () => {
    alert('Send feature requires blockchain integration');
  };

  const handleReceive = () => {
    if (currentWallet) {
      handleCopy(currentWallet.publicKey, 'receive');
      alert('Wallet address copied! Share this to receive SOL');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-20 pb-32 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <WalletIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">Solana Wallet</h1>
        </div>
      </div>

      {/* No Wallet State */}
      {!hasWallet && (
        <div className="card text-center">
          <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
            <WalletIcon className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-primary mb-2">Solana Wallet</h2>
          <p className="text-secondary mb-8">Create or import your Solana wallet to get started</p>

          <div className="space-y-4">
            <button
              onClick={() => setShowWalletSetup(true)}
              className="btn-primary w-full py-4 text-lg font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Wallet Dashboard */}
      {hasWallet && currentWallet && (
        <div className="space-y-6">
          {/* Clear Wallet Button */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-primary font-semibold">Reset Wallet</h3>
                <p className="text-secondary text-sm">Create a new wallet or import a different one</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('solana_wallet');
                  setHasWallet(false);
                  setCurrentWallet(null);
                }}
                className="btn-secondary px-4 py-2"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Balance Card */}
          <div className="card text-center">
            <div className="mb-4">
              <div className="text-4xl font-bold text-primary mb-2">{balance} SOL</div>
              <div className="text-secondary text-sm">≈ $0.00 USD</div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSend}
                className="btn-primary py-3 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
              <button
                onClick={handleReceive}
                className="btn-secondary py-3 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Receive
              </button>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-primary font-semibold">Wallet Address</h3>
              <button
                onClick={() => handleCopy(currentWallet.publicKey, 'address')}
                className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copiedItem === 'address' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-3 bg-black bg-opacity-30 rounded-lg font-mono text-sm text-primary break-all">
              {currentWallet.publicKey}
            </div>
          </div>

          {/* Private Key */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-primary font-semibold">Private Key</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleCopy(currentWallet.privateKey, 'privateKey')}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {copiedItem === 'privateKey' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="p-3 bg-black bg-opacity-30 rounded-lg font-mono text-sm text-primary break-all">
              {showPrivateKey ? currentWallet.privateKey : '•'.repeat(88)}
            </div>
          </div>

          {/* Recovery Phrase */}
          {currentWallet.mnemonic && (
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-primary font-semibold">Recovery Phrase</h3>
                <button
                  onClick={() => handleCopy(currentWallet.mnemonic!, 'mnemonic')}
                  className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {copiedItem === 'mnemonic' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-3 bg-black bg-opacity-30 rounded-lg text-sm text-primary">
                {currentWallet.mnemonic}
              </div>
            </div>
          )}

          {/* Tokens */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-primary font-semibold">Tokens</h3>
              <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center py-8 text-secondary">
              <div className="text-4xl mb-2">🪙</div>
              <p>No tokens found</p>
              <p className="text-sm">Tokens will appear here when you receive them</p>
            </div>
          </div>

          {/* Transactions */}
          <div className="card">
            <h3 className="text-primary font-semibold mb-4">Recent Transactions</h3>
            <div className="text-center py-8 text-secondary">
              <div className="text-4xl mb-2">📝</div>
              <p>No transactions yet</p>
              <p className="text-sm">Your transaction history will appear here</p>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Setup Modal */}
      {showWalletSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 overflow-y-auto">
          <div className="card max-w-sm w-full my-8 max-h-[90vh] overflow-y-auto">
            {setupStep === 'choose' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Setup Wallet</h2>
                  <button
                    onClick={() => setShowWalletSetup(false)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                    <WalletIcon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-secondary">Choose how to set up your Solana wallet</p>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={generateWallet}
                    className="btn-primary w-full py-4 text-lg font-semibold"
                  >
                    Create New Wallet
                  </button>
                  <button
                    onClick={() => setSetupStep('import')}
                    className="btn-secondary w-full py-4 text-lg font-semibold"
                  >
                    Import Existing Wallet
                  </button>
                </div>
              </>
            )}
            
            {setupStep === 'create' && currentWallet && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setSetupStep('choose')}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-bold text-primary">Wallet Created</h2>
                  <button
                    onClick={() => setShowWalletSetup(false)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-secondary text-sm">Save these details securely</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-black bg-opacity-30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-secondary text-sm">Address</span>
                      <button
                        onClick={() => handleCopy(currentWallet.publicKey, 'address')}
                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                      >
                        {copiedItem === 'address' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="text-primary font-mono text-xs break-all">{currentWallet.publicKey}</div>
                  </div>
                  
                  <div className="p-3 bg-black bg-opacity-30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-secondary text-sm">Private Key</span>
                      <button
                        onClick={() => handleCopy(currentWallet.privateKey, 'privateKey')}
                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                      >
                        {copiedItem === 'privateKey' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="text-primary font-mono text-xs break-all">{currentWallet.privateKey}</div>
                  </div>
                  
                  {currentWallet.mnemonic && (
                    <div className="p-3 bg-black bg-opacity-30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-secondary text-sm">Recovery Phrase</span>
                        <button
                          onClick={() => handleCopy(currentWallet.mnemonic!, 'mnemonic')}
                          className="p-1 hover:bg-gray-600 rounded transition-colors"
                        >
                          {copiedItem === 'mnemonic' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="text-primary text-xs">{currentWallet.mnemonic}</div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={finishWalletSetup}
                  className="btn-primary w-full py-4 text-lg font-semibold"
                >
                  Continue to Wallet
                </button>
              </>
            )}
            
            {setupStep === 'import' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setSetupStep('choose')}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-bold text-primary">Import Wallet</h2>
                  <button
                    onClick={() => setShowWalletSetup(false)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-secondary text-sm">Enter your private key or 12-word recovery phrase</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <textarea
                    value={importKey}
                    onChange={(e) => setImportKey(e.target.value)}
                    placeholder="Enter private key or recovery phrase..."
                    className="input h-32 resize-none font-mono text-sm"
                  />
                </div>
                
                <button
                  onClick={importWallet}
                  className="btn-primary w-full py-4"
                  disabled={!importKey.trim() || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Importing...
                    </div>
                  ) : (
                    'Import Wallet'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};