import { useState, useRef, useEffect } from 'react';
import { useAccount, useSwitchChain, useChainId } from 'wagmi';
import { ChevronDown, Check } from 'lucide-react';
import { allChains, getChainMetadata, mainnetChains, testnetChains } from '@/config/chains';

export const NetworkSwitcher = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'mainnet', 'testnet'
  const dropdownRef = useRef(null);

  const currentChain = getChainMetadata(chainId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFilteredChains = () => {
    if (filter === 'mainnet') return mainnetChains;
    if (filter === 'testnet') return testnetChains;
    return allChains;
  };

  const handleSwitchChain = (chain) => {
    switchChain({ chainId: chain.id });
    setShowDropdown(false);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="btn-secondary flex items-center gap-2"
      >
        {currentChain && (
          <>
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: currentChain.color }}
            />
            <span className="hidden md:inline">{currentChain.name}</span>
            <span className="md:hidden">{currentChain.nativeCurrency.symbol}</span>
          </>
        )}
        <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-72 card shadow-lg z-50 animate-fade-in max-h-96 overflow-y-auto">
          {/* Filter Tabs */}
          <div className="flex border-b border-light dark:border-dark">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                  : 'text-light-secondary dark:text-dark-secondary hover:text-light dark:hover:text-dark'
              }`}
            >
              All Networks
            </button>
            <button
              onClick={() => setFilter('mainnet')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === 'mainnet'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                  : 'text-light-secondary dark:text-dark-secondary hover:text-light dark:hover:text-dark'
              }`}
            >
              Mainnet
            </button>
            <button
              onClick={() => setFilter('testnet')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                filter === 'testnet'
                  ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                  : 'text-light-secondary dark:text-dark-secondary hover:text-light dark:hover:text-dark'
              }`}
            >
              Testnet
            </button>
          </div>

          {/* Network List */}
          <div className="p-2">
            {getFilteredChains().map((chain) => {
              const metadata = getChainMetadata(chain.id);
              const isActive = chain.id === chainId;

              return (
                <button
                  key={chain.id}
                  onClick={() => handleSwitchChain(chain)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-50 dark:bg-purple-950'
                      : 'hover:bg-light-secondary dark:hover:bg-dark-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${metadata.color}20` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: metadata.color }}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{metadata.name}</p>
                      <p className="text-xs text-light-secondary dark:text-dark-secondary">
                        {metadata.nativeCurrency.symbol}
                        {metadata.testnet && ' • Testnet'}
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <Check size={20} className="text-purple-600 dark:text-purple-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher;