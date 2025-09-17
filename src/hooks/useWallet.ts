import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { SolanaWallet, WalletData } from '../utils/solanaWallet';

export interface WalletBalance {
  id: string;
  user_id: string;
  token_symbol: string;
  token_name: string;
  balance: number;
  usd_value: number;
  created_at: string;
  updated_at: string;
}

export interface UserWallet {
  id: string;
  user_id: string;
  public_key: string;
  private_key_encrypted: string;
  mnemonic_encrypted?: string;
  created_at: string;
}

export const useWallet = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<UserWallet | null>(null);
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsdValue, setTotalUsdValue] = useState(0);

  const solanaWallet = new SolanaWallet();

  useEffect(() => {
    if (user) {
      initializeWallet();
    } else {
      // Demo mode - create local wallet
      initializeDemoWallet();
    }
  }, [user]);

  const initializeWallet = async () => {
    if (!user || !supabase) {
      initializeDemoWallet();
      return;
    }

    try {
      // Check if user already has a wallet
      const { data: existingWallet, error: walletError } = await supabase
        .from('user_wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (walletError && walletError.code !== 'PGRST116') {
        console.error('Error fetching wallet:', walletError);
        initializeDemoWallet();
        return;
      }

      if (existingWallet) {
        // User has existing wallet
        setWallet(existingWallet);
        await fetchBalances(user.id);
      } else {
        // Create new wallet for user
        await createWalletForUser();
      }
    } catch (error) {
      console.error('Error initializing wallet:', error);
      initializeDemoWallet();
    } finally {
      setLoading(false);
    }
  };

  const createWalletForUser = async () => {
    if (!user || !supabase) return;

    try {
      // Generate new wallet
      const walletData = solanaWallet.generateWallet();
      
      // In production, you'd encrypt these properly
      const { data: newWallet, error: walletError } = await supabase
        .from('user_wallets')
        .insert({
          user_id: user.id,
          public_key: walletData.publicKey,
          private_key_encrypted: walletData.privateKey, // Should be encrypted in production
          mnemonic_encrypted: walletData.mnemonic // Should be encrypted in production
        })
        .select()
        .single();

      if (walletError) {
        console.error('Error creating wallet:', walletError);
        return;
      }

      setWallet(newWallet);

      // Create initial token balances
      await createInitialBalances(user.id);
      await fetchBalances(user.id);
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  const createInitialBalances = async (userId: string) => {
    if (!supabase) return;

    const initialTokens = [
      { symbol: 'WGR', name: 'Wegram', balance: 0, usd_value: 0 },
      { symbol: 'SOL', name: 'Solana', balance: 0, usd_value: 0 },
      { symbol: 'USDC', name: 'USD Coin', balance: 0, usd_value: 0 }
    ];

    try {
      const { error } = await supabase
        .from('wallet_balances')
        .insert(
          initialTokens.map(token => ({
            user_id: userId,
            token_symbol: token.symbol,
            token_name: token.name,
            balance: token.balance,
            usd_value: token.usd_value
          }))
        );

      if (error) {
        console.error('Error creating initial balances:', error);
      }
    } catch (error) {
      console.error('Error in createInitialBalances:', error);
    }
  };

  const fetchBalances = async (userId: string) => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('wallet_balances')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching balances:', error);
        return;
      }

      setBalances(data || []);
      
      // Calculate total USD value
      const total = (data || []).reduce((sum, balance) => sum + balance.usd_value, 0);
      setTotalUsdValue(total);
    } catch (error) {
      console.error('Error in fetchBalances:', error);
    }
  };

  const initializeDemoWallet = () => {
    // Demo mode - use localStorage
    const storedWallet = localStorage.getItem('wegram_demo_wallet');
    const storedBalances = localStorage.getItem('wegram_demo_balances');

    if (storedWallet) {
      try {
        const walletData = JSON.parse(storedWallet);
        setWallet({
          id: 'demo',
          user_id: 'demo',
          public_key: walletData.publicKey,
          private_key_encrypted: walletData.privateKey,
          mnemonic_encrypted: walletData.mnemonic,
          created_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error loading demo wallet:', error);
        createDemoWallet();
      }
    } else {
      createDemoWallet();
    }

    if (storedBalances) {
      try {
        const balanceData = JSON.parse(storedBalances);
        setBalances(balanceData);
        const total = balanceData.reduce((sum: number, balance: WalletBalance) => sum + balance.usd_value, 0);
        setTotalUsdValue(total);
      } catch (error) {
        console.error('Error loading demo balances:', error);
        createDemoBalances();
      }
    } else {
      createDemoBalances();
    }

    setLoading(false);
  };

  const createDemoWallet = () => {
    const walletData = solanaWallet.generateWallet();
    const demoWallet = {
      id: 'demo',
      user_id: 'demo',
      public_key: walletData.publicKey,
      private_key_encrypted: walletData.privateKey,
      mnemonic_encrypted: walletData.mnemonic,
      created_at: new Date().toISOString()
    };

    setWallet(demoWallet);
    localStorage.setItem('wegram_demo_wallet', JSON.stringify(walletData));
  };

  const createDemoBalances = () => {
    const demoBalances: WalletBalance[] = [
      {
        id: 'demo-wgr',
        user_id: 'demo',
        token_symbol: 'WGR',
        token_name: 'Wegram',
        balance: 1247.89,
        usd_value: 623.95,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'demo-sol',
        user_id: 'demo',
        token_symbol: 'SOL',
        token_name: 'Solana',
        balance: 2.45,
        usd_value: 367.50,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'demo-usdc',
        user_id: 'demo',
        token_symbol: 'USDC',
        token_name: 'USD Coin',
        balance: 150.00,
        usd_value: 150.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    setBalances(demoBalances);
    setTotalUsdValue(demoBalances.reduce((sum, balance) => sum + balance.usd_value, 0));
    localStorage.setItem('wegram_demo_balances', JSON.stringify(demoBalances));
  };

  const updateBalance = async (tokenSymbol: string, newBalance: number, newUsdValue: number) => {
    if (!user || !supabase) {
      // Demo mode - update localStorage
      const updatedBalances = balances.map(balance =>
        balance.token_symbol === tokenSymbol
          ? { ...balance, balance: newBalance, usd_value: newUsdValue }
          : balance
      );
      setBalances(updatedBalances);
      localStorage.setItem('wegram_demo_balances', JSON.stringify(updatedBalances));
      return;
    }

    try {
      const { error } = await supabase
        .from('wallet_balances')
        .update({
          balance: newBalance,
          usd_value: newUsdValue,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('token_symbol', tokenSymbol);

      if (error) {
        console.error('Error updating balance:', error);
        return;
      }

      // Update local state
      const updatedBalances = balances.map(balance =>
        balance.token_symbol === tokenSymbol
          ? { ...balance, balance: newBalance, usd_value: newUsdValue }
          : balance
      );
      setBalances(updatedBalances);
      
      // Recalculate total
      const total = updatedBalances.reduce((sum, balance) => sum + balance.usd_value, 0);
      setTotalUsdValue(total);
    } catch (error) {
      console.error('Error in updateBalance:', error);
    }
  };

  const addReward = async (amount: number, tokenSymbol: string = 'WGR') => {
    const currentBalance = balances.find(b => b.token_symbol === tokenSymbol);
    if (currentBalance) {
      const newBalance = currentBalance.balance + amount;
      // For WGR, assume $0.50 per token for demo
      const tokenPrice = tokenSymbol === 'WGR' ? 0.50 : 1;
      const newUsdValue = newBalance * tokenPrice;
      
      await updateBalance(tokenSymbol, newBalance, newUsdValue);
    }
  };

  return {
    wallet,
    balances,
    totalUsdValue,
    loading,
    updateBalance,
    addReward,
    refetch: () => user ? fetchBalances(user.id) : initializeDemoWallet()
  };
};