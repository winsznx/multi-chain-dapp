import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      // You can add a toast notification here
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={() => open()}
        className="btn-primary flex items-center gap-2"
      >
        <Wallet size={20} />
        <span className="hidden sm:inline">Connect Wallet</span>
        <span className="sm:hidden">Connect</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="btn-secondary flex items-center gap-2"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-mono">{formatAddress(address)}</span>
        <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 card shadow-lg z-50 animate-fade-in">
          <div className="p-4 border-b border-light dark:border-dark">
            <p className="text-xs text-light-secondary dark:text-dark-secondary mb-1">
              Connected Wallet
            </p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>

          <div className="p-2">
            <button
              onClick={copyAddress}
              className="w-full text-left px-4 py-2 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-lg transition-colors"
            >
              Copy Address
            </button>
            <button
              onClick={() => {
                open();
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-lg transition-colors"
            >
              View Account
            </button>
            <button
              onClick={() => {
                disconnect();
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;