import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Wallet, ExternalLink, Copy, Filter, Search } from 'lucide-react';
import { getChainMetadata, allChains } from '@/config/chains';
import toast from 'react-hot-toast';

const TokenCard = ({ token, chain }) => {
  const chainMeta = getChainMetadata(chain.id);
  
  const copyAddress = (address) => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  return (
    <div className="card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${chainMeta.color}20` }}
          >
            <span className="text-xl font-bold" style={{ color: chainMeta.color }}>
              {token.symbol.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{token.symbol}</h3>
            <p className="text-sm text-light-secondary dark:text-dark-secondary">
              {token.name}
            </p>
          </div>
        </div>
        <span className={`badge ${
          chainMeta.testnet ? 'badge-warning' : 'badge-purple'
        }`}>
          {chainMeta.name}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-light-secondary dark:text-dark-secondary">
            Balance
          </span>
          <span className="font-semibold">{token.balance} {token.symbol}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-light-secondary dark:text-dark-secondary">
            Value
          </span>
          <span className="font-semibold">${token.value}</span>
        </div>
        {token.contractAddress && (
          <div className="pt-2 border-t border-light dark:border-dark">
            <p className="text-xs text-light-secondary dark:text-dark-secondary mb-1">
              Contract Address
            </p>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono bg-light-secondary dark:bg-dark-secondary px-2 py-1 rounded flex-1 truncate">
                {token.contractAddress}
              </code>
              <button
                onClick={() => copyAddress(token.contractAddress)}
                className="p-1 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded transition-colors"
              >
                <Copy size={14} />
              </button>
              <a
                href={`${chainMeta.explorer}/token/${token.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Portfolio() {
  const { address, isConnected } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChain, setFilterChain] = useState('all');

  // Mock data - replace with real data from hooks
  const mockTokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '1.5',
      value: '3750.00',
      contractAddress: null,
      chainId: 1
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      balance: '250.0',
      value: '175.00',
      contractAddress: null,
      chainId: 137
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '1000.0',
      value: '1000.00',
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      chainId: 1
    },
  ];

  const filteredTokens = mockTokens.filter(token => {
    const matchesSearch = token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = filterChain === 'all' || token.chainId === parseInt(filterChain);
    return matchesSearch && matchesChain;
  });

  const totalValue = filteredTokens.reduce((sum, token) => sum + parseFloat(token.value), 0);

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Wallet size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to view your portfolio
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
        <p className="text-light-secondary dark:text-dark-secondary">
          View all your tokens and balances across multiple chains
        </p>
      </div>

      {/* Summary Card */}
      <div className="card-purple">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
              Total Portfolio Value
            </p>
            <p className="text-4xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
                Tokens
              </p>
              <p className="text-xl font-semibold">{filteredTokens.length}</p>
            </div>
            <div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
                Networks
              </p>
              <p className="text-xl font-semibold">
                {new Set(filteredTokens.map(t => t.chainId)).size}
              </p>
            </div>
            <div>
              <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
                24h Change
              </p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                +0%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-light-secondary dark:text-dark-secondary" />
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

      {/* Token Grid */}
      {filteredTokens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token, index) => (
            <TokenCard
              key={`${token.chainId}-${token.contractAddress || token.symbol}-${index}`}
              token={token}
              chain={allChains.find(c => c.id === token.chainId)}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Wallet size={48} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary opacity-50" />
          <p className="text-light-secondary dark:text-dark-secondary">
            No tokens found
          </p>
        </div>
      )}
    </div>
  );
}