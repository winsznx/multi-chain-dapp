import { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  History as HistoryIcon, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownLeft,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { getChainMetadata, allChains } from '@/config/chains';

const TransactionRow = ({ transaction }) => {
  const chainMeta = getChainMetadata(transaction.chainId);
  
  const getTypeIcon = () => {
    return transaction.type === 'send' ? (
      <ArrowUpRight size={16} className="text-red-600 dark:text-red-400" />
    ) : (
      <ArrowDownLeft size={16} className="text-green-600 dark:text-green-400" />
    );
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600 dark:text-red-400" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'success':
        return 'badge-success';
      case 'failed':
        return 'badge-error';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="card-hover">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center flex-shrink-0">
            {getTypeIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold capitalize">{transaction.type}</span>
              <span className={`badge ${
                chainMeta.testnet ? 'badge-warning' : 'badge-purple'
              }`}>
                {chainMeta.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-light-secondary dark:text-dark-secondary">
              <span className="truncate">{transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}</span>
              <a
                href={`${chainMeta.explorer}/tx/${transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 dark:hover:text-purple-400"
              >
                <ExternalLink size={14} />
              </a>
            </div>
            
            <p className="text-xs text-light-secondary dark:text-dark-secondary mt-1">
              {new Date(transaction.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8">
          <div className="text-right">
            <p className="font-semibold">
              {transaction.value} {transaction.symbol}
            </p>
            <p className="text-sm text-light-secondary dark:text-dark-secondary">
              ${transaction.valueUSD}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`badge ${getStatusBadge()}`}>
              {transaction.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function History() {
  const { isConnected } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChain, setFilterChain] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const mockTransactions = [
    {
      id: 1,
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      type: 'send',
      chainId: 1,
      value: '0.5',
      symbol: 'ETH',
      valueUSD: '1250.00',
      status: 'success',
      timestamp: '2024-01-25T10:30:00Z'
    },
    {
      id: 2,
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      type: 'receive',
      chainId: 137,
      value: '100',
      symbol: 'MATIC',
      valueUSD: '70.00',
      status: 'success',
      timestamp: '2024-01-24T15:20:00Z'
    },
    {
      id: 3,
      hash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
      type: 'send',
      chainId: 56,
      value: '0.1',
      symbol: 'BNB',
      valueUSD: '30.00',
      status: 'pending',
      timestamp: '2024-01-26T09:15:00Z'
    },
  ];

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = filterChain === 'all' || tx.chainId === parseInt(filterChain);
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesChain && matchesType && matchesStatus;
  });

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <HistoryIcon size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to view transaction history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-light-secondary dark:text-dark-secondary">
          View all your on-chain transactions across multiple networks
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Total Transactions
          </p>
          <p className="text-2xl font-bold">{mockTransactions.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Successful
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {mockTransactions.filter(tx => tx.status === 'success').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Pending
          </p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mockTransactions.filter(tx => tx.status === 'pending').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Failed
          </p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {mockTransactions.filter(tx => tx.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
            <input
              type="text"
              placeholder="Search by hash..."
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
              className="input"
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
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input"
          >
            <option value="all">All Types</option>
            <option value="send">Send</option>
            <option value="receive">Receive</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        <div className="space-y-3">
          {filteredTransactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <HistoryIcon size={48} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary opacity-50" />
          <p className="text-light-secondary dark:text-dark-secondary">
            No transactions found
          </p>
        </div>
      )}
    </div>
  );
}