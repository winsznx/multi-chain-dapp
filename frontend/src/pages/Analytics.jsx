import { useAccount } from 'wagmi';
import { TrendingUp } from 'lucide-react';

export default function Analytics() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <TrendingUp size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to view analytics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
        <p className="text-light-secondary dark:text-dark-secondary">
          Track your on-chain activity and performance metrics
        </p>
      </div>

      <div className="card text-center py-12">
        <TrendingUp size={64} className="mx-auto mb-4 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-light-secondary dark:text-dark-secondary">
          Analytics and reporting features are under development
        </p>
      </div>
    </div>
  );
}