import { useState, useEffect } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { Wallet, Search, Filter, RefreshCw } from 'lucide-react';
import { getChainMetadata, allChains } from '@/config/chains';
import { formatTokenAmount } from '@/utils/formatters';

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChain, setFilterChain] = useState('all');

  // Get balance for current chain - this should auto-refresh when chainId changes
  const { data: balance, isLoading, refetch } = useBalance({
    address: address,
    chainId: chainId,
  });

  const currentChain = getChainMetadata(chainId);

  // Refetch balance when chain changes
  useEffect(() => {
    if (address && chainId) {
      console.log('Chain changed to:', chainId);
      console.log('Current chain:', currentChain?.name);
      refetch();
    }
  }, [chainId, address, refetch]);

  // Debug log
  useEffect(() => {
    console.log('Balance data:', balance);
    console.log('Is loading:', isLoading);
    console.log('Address:', address);
    console.log('Chain ID:', chainId);
  }, [balance, isLoading, address, chainId]);

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Wallet size={64} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your wallet to view your portfolio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View all your tokens and balances across multiple chains
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="btn-secondary flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Summary Card */}
      <div className="card-purple">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Balance on {currentChain?.name}
            </p>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <span className="text-2xl font-bold">Loading...</span>
              </div>
            ) : balance ? (
              <p className="text-4xl font-bold">
                {formatTokenAmount(balance.formatted, 6)} {balance.symbol}
              </p>
            ) : (
              <p className="text-4xl font-bold">0.00 {currentChain?.nativeCurrency.symbol}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Network</p>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: currentChain?.color }}
              />
              <span className="font-semibold">{currentChain?.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterChain}
              onChange={(e) => setFilterChain(e.target.value)}
              className="input w-full md:w-48"
            >
              <option value="all">All Networks</option>
              {allChains.map(chain => {
                const meta = getChainMetadata(chain.id);
                return (
                  <option key={chain.id} value={chain.id}>
                    {meta.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Token Display */}
      {balance && parseFloat(balance.formatted) > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentChain.color}20` }}
                >
                  <span className="text-xl font-bold" style={{ color: currentChain.color }}>
                    {balance.symbol.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{balance.symbol}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Native Token
                  </p>
                </div>
              </div>
              <span className={`badge ${currentChain.testnet ? 'badge-warning' : 'badge-purple'}`}>
                {currentChain.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Balance
                </span>
                <span className="font-semibold">{formatTokenAmount(balance.formatted, 6)} {balance.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Decimals
                </span>
                <span className="font-semibold">{balance.decimals}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <Wallet size={48} className="mx-auto mb-4 text-gray-400 opacity-50" />
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading balance...' : `No ${currentChain?.nativeCurrency.symbol} balance on ${currentChain?.name}`}
          </p>
        </div>
      )}
    </div>
  );
}
