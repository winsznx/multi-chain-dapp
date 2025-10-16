import { useState } from 'react';
import { useAccount } from 'wagmi';
import { 
  FileCode, 
  ExternalLink, 
  Copy, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { getChainMetadata, allChains } from '@/config/chains';
import toast from 'react-hot-toast';

const DeploymentCard = ({ deployment }) => {
  const chainMeta = getChainMetadata(deployment.chainId);
  
  const copyAddress = () => {
    navigator.clipboard.writeText(deployment.address);
    toast.success('Address copied to clipboard');
  };

  const getStatusIcon = () => {
    switch (deployment.verificationStatus) {
      case 'verified':
        return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />;
      case 'failed':
        return <XCircle size={16} className="text-red-600 dark:text-red-400" />;
      default:
        return <Clock size={16} className="text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    switch (deployment.verificationStatus) {
      case 'verified':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'failed':
        return 'badge-error';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
            <FileCode size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold">{deployment.name}</h3>
            <p className="text-sm text-light-secondary dark:text-dark-secondary">
              {deployment.type}
            </p>
          </div>
        </div>
        <span className={`badge ${
          chainMeta.testnet ? 'badge-warning' : 'badge-purple'
        }`}>
          {chainMeta.name}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-light-secondary dark:text-dark-secondary">
            Status
          </span>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`badge ${getStatusBadge()}`}>
              {deployment.verificationStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-light-secondary dark:text-dark-secondary">
            Deployed
          </span>
          <span className="text-sm font-medium">
            {new Date(deployment.deployedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="pt-3 border-t border-light dark:border-dark">
          <p className="text-xs text-light-secondary dark:text-dark-secondary mb-2">
            Contract Address
          </p>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono bg-light-secondary dark:bg-dark-secondary px-2 py-1 rounded flex-1 truncate">
              {deployment.address}
            </code>
            <button
              onClick={copyAddress}
              className="p-1.5 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded transition-colors"
            >
              <Copy size={14} />
            </button>
            <a
              href={`${chainMeta.explorer}/address/${deployment.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {deployment.verificationStatus === 'unverified' && (
          <button className="btn-outline w-full text-sm">
            Verify Contract
          </button>
        )}
      </div>
    </div>
  );
};

export default function Deployments() {
  const { isConnected } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChain, setFilterChain] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with real data
  const mockDeployments = [
    {
      id: 1,
      name: 'MyToken',
      type: 'ERC20',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      chainId: 1,
      verificationStatus: 'verified',
      deployedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'NFTCollection',
      type: 'ERC721',
      address: '0x123d35Cc6634C0532925a3b844Bc9e7595f0abc',
      chainId: 137,
      verificationStatus: 'pending',
      deployedAt: '2024-01-20T14:20:00Z'
    },
    {
      id: 3,
      name: 'TestToken',
      type: 'ERC20',
      address: '0x456d35Cc6634C0532925a3b844Bc9e7595f0def',
      chainId: 11155111,
      verificationStatus: 'unverified',
      deployedAt: '2024-01-25T09:15:00Z'
    },
  ];

  const filteredDeployments = mockDeployments.filter(deployment => {
    const matchesSearch = deployment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deployment.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = filterChain === 'all' || deployment.chainId === parseInt(filterChain);
    const matchesStatus = filterStatus === 'all' || deployment.verificationStatus === filterStatus;
    return matchesSearch && matchesChain && matchesStatus;
  });

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FileCode size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to view your deployments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contract Deployments</h1>
          <p className="text-light-secondary dark:text-dark-secondary">
            Manage and verify your deployed smart contracts
          </p>
        </div>
        <button className="btn-primary">
          Deploy New Contract
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Total Deployments
          </p>
          <p className="text-2xl font-bold">{mockDeployments.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Verified
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {mockDeployments.filter(d => d.verificationStatus === 'verified').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Pending
          </p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {mockDeployments.filter(d => d.verificationStatus === 'pending').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-light-secondary dark:text-dark-secondary mb-1">
            Unverified
          </p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {mockDeployments.filter(d => d.verificationStatus === 'unverified').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-dark-secondary" />
            <input
              type="text"
              placeholder="Search deployments..."
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="unverified">Unverified</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Deployments Grid */}
      {filteredDeployments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeployments.map(deployment => (
            <DeploymentCard key={deployment.id} deployment={deployment} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <FileCode size={48} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary opacity-50" />
          <p className="text-light-secondary dark:text-dark-secondary">
            No deployments found
          </p>
        </div>
      )}
    </div>
  );
}