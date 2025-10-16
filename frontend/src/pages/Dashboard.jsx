import { useEffect } from 'react';
import { useAccount, useBalance, useChainId } from 'wagmi';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Send, 
  FileCode, 
  History, 
  ArrowRight,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { getChainMetadata } from '@/config/chains';
import { formatTokenAmount } from '@/utils/formatters';

const QuickActionCard = ({ icon: Icon, title, description, to, color }) => (
  <Link to={to} className="card-hover group">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      {description}
    </p>
    <div className="flex items-center text-purple-600 dark:text-purple-400 group-hover:gap-2 transition-all">
      <span className="text-sm font-medium">Get Started</span>
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
);

const StatCard = ({ label, value, icon: Icon, loading }) => (
  <div className="card">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
        {loading ? (
          <div className="animate-pulse h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ) : (
          <p className="text-2xl font-bold">{value}</p>
        )}
      </div>
      <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950 rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-purple-600 dark:text-purple-400" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balance, isLoading, refetch } = useBalance({ 
    address,
    chainId 
  });
  const currentChain = getChainMetadata(chainId);

  // Refetch when chain changes
  useEffect(() => {
    if (address && chainId) {
      console.log('Dashboard: Chain changed, refetching balance...');
      refetch();
    }
  }, [chainId, address, refetch]);

  const quickActions = [
    {
      icon: Wallet,
      title: 'Portfolio Overview',
      description: 'View all your tokens and balances across multiple chains',
      to: '/portfolio',
      color: 'bg-gradient-to-br from-purple-600 to-purple-700'
    },
    {
      icon: Send,
      title: 'Batch Transfer',
      description: 'Send tokens to multiple addresses in a single transaction',
      to: '/batch-transaction',
      color: 'bg-gradient-to-br from-blue-600 to-blue-700'
    },
    {
      icon: FileCode,
      title: 'Deployments',
      description: 'Manage and verify your deployed smart contracts',
      to: '/deployments',
      color: 'bg-gradient-to-br from-green-600 to-green-700'
    },
    {
      icon: History,
      title: 'Transaction History',
      description: 'Track all your on-chain activities and transactions',
      to: '/history',
      color: 'bg-gradient-to-br from-orange-600 to-orange-700'
    },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Zap size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to ChainManager</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Connect your wallet to start managing your multi-chain transactions, deployments, and more.
          </p>
          <div className="card-purple p-6">
            <h3 className="font-semibold mb-3">What you can do:</h3>
            <ul className="space-y-2 text-left text-sm">
              <li className="flex items-start gap-2">
                <Shield size={16} className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                <span>Track tokens and balances across all networks</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity size={16} className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                <span>Send batch transactions to multiple addresses</span>
              </li>
              <li className="flex items-start gap-2">
                <FileCode size={16} className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                <span>Manage and verify smart contract deployments</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const balanceDisplay = balance 
    ? `${formatTokenAmount(balance.formatted, 6)} ${balance.symbol}` 
    : '0.00';

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card-purple">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connected to {currentChain?.name || 'Unknown Network'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Balance</p>
              {isLoading ? (
                <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ) : (
                <p className="text-2xl font-bold">{balanceDisplay}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Balance" 
          value={balanceDisplay} 
          icon={Wallet} 
          loading={isLoading}
        />
        <StatCard label="Deployments" value="0" icon={FileCode} />
        <StatCard label="Transactions" value="0" icon={Activity} />
        <StatCard label="Networks" value="6" icon={Zap} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <Link to="/history" className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
            View All
          </Link>
        </div>
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <History size={48} className="mx-auto mb-4 opacity-50" />
          <p>No recent activity</p>
          <p className="text-sm mt-1">Your transactions will appear here</p>
        </div>
      </div>
    </div>
  );
}
