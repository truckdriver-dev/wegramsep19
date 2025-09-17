import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Staking: React.FC = () => {
  const navigate = useNavigate();
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(null);
  
  // Mock user data
  const userBalance = 10000; // WGM balance
  const currentStaked = 42.5;
  const earnedRewards = 42.5;
  const portfolioValue = 23850;
  const portfolioGain = 12.14;
  const dpr = 10.000; // Daily Percentage Rate
  const apr = 8.540; // Annual Percentage Rate
  const exchangeRate = 5.30; // WGM to SOL rate

  // Mock transaction data
  const recentTransactions = [
    { amount: 5000, price: 5.30, type: 'Stake' },
    { amount: 3000, price: 5.28, type: 'Unstake' }
  ];

  const percentageOptions = [25, 50, 75, 10];

  const handlePercentageClick = (percentage: number) => {
    const amount = (userBalance * percentage / 100).toString();
    setStakeAmount(amount);
    setSelectedPercentage(percentage);
  };

  const handleCustomPercentage = () => {
    setSelectedPercentage(null);
  };

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid amount to stake');
      return;
    }
    if (parseFloat(stakeAmount) > userBalance) {
      alert('Insufficient balance');
      return;
    }
    alert(`Staking ${stakeAmount} WGM tokens!`);
  };

  const handleUnstake = () => {
    if (currentStaked <= 0) {
      alert('No tokens currently staked');
      return;
    }
    alert(`Unstaking ${currentStaked} WGM tokens!`);
  };

  const handleClaimStaking = () => {
    if (currentStaked <= 0) {
      alert('No staking rewards to claim');
      return;
    }
    alert(`Claiming staking rewards!`);
  };

  const handleClaimRewards = () => {
    if (earnedRewards <= 0) {
      alert('No rewards to claim');
      return;
    }
    alert(`Claiming ${earnedRewards} WGM rewards!`);
  };

  const handleRefreshRate = () => {
    alert('Exchange rate refreshed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950 text-white">
      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div className="text-2xl font-bold">$WGM</div>
          </div>
          
          <div></div> {/* Spacer for center alignment */}
        </div>

        {/* Main Staking Card */}
        <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white border-opacity-10">
          <h2 className="text-xl font-semibold mb-6">How much $WGM do you want to stake?</h2>
          
          {/* Token Input Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-xl font-semibold">$WGM</div>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => {
                setStakeAmount(e.target.value);
                handleCustomPercentage();
              }}
              placeholder="Enter amount"
              className="flex-1 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Percentage Buttons */}
          <div className="flex gap-3 mb-6">
            {percentageOptions.map((percentage) => (
              <button
                key={percentage}
                onClick={() => handlePercentageClick(percentage)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedPercentage === percentage
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-white border-opacity-20 hover:border-purple-400'
                }`}
              >
                {percentage}%
              </button>
            ))}
            <button
              onClick={handleCustomPercentage}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedPercentage === null && stakeAmount
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-white border-opacity-20 hover:border-purple-400'
              }`}
            >
              %
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-gray-400 text-sm">DPR:</div>
              <div className="text-gray-400 text-sm">APR:</div>
              <div className="text-gray-400 text-sm">staked:</div>
            </div>
            <div className="text-right">
              <div className="text-white">{dpr.toFixed(3)} WGM</div>
              <div className="text-white">{apr.toFixed(3)} so</div>
              <div className="text-white">{currentStaked} WGM</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleStake}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg py-3 font-semibold transition-colors"
            >
              STAKE
            </button>
            <button
              onClick={handleUnstake}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg py-3 font-semibold transition-colors"
            >
              UNSTAKE
            </button>
            <button
              onClick={handleClaimStaking}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg py-3 font-semibold transition-colors"
            >
              CLAIM
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Exchange Rate */}
          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">CURRENT EXCHANGE RATE</h3>
              <button
                onClick={handleRefreshRate}
                className="p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold">
                  W
                </div>
                <span>WGM</span>
              </div>
              <span>→</span>
              <span>SOL</span>
              <div className="ml-auto text-lg font-semibold">{exchangeRate}</div>
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-10">
            <h3 className="font-semibold mb-3">REWARDS</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400">Earned:</span>
              <span className="text-xl font-semibold">{earnedRewards} WGM</span>
            </div>
            <button
              onClick={handleClaimRewards}
              className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg py-3 font-semibold transition-colors"
            >
              CLAIM
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-10">
            <h3 className="font-semibold mb-4">Recent transactions</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-400 mb-2">
                <span>Amount</span>
                <span>Price</span>
                <span>Type</span>
              </div>
              {recentTransactions.map((tx, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                  <span>{tx.amount.toLocaleString()}</span>
                  <span>{tx.price}</span>
                  <span className={tx.type === 'Stake' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-10">
            <h3 className="font-semibold mb-4">Recent transactions</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-400 mb-2">
                <span>Pair</span>
                <span>Price</span>
                <span>Type</span>
              </div>
              {recentTransactions.map((tx, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                  <span>{tx.amount.toLocaleString()}</span>
                  <span>{tx.price}</span>
                  <span className={tx.type === 'Stake' ? 'text-green-400' : 'text-red-400'}>
                    {tx.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="mt-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-10">
          <h3 className="font-semibold mb-2">your portfolio</h3>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">${portfolioValue.toLocaleString()}</div>
            <div className="text-green-400 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +{portfolioGain}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};