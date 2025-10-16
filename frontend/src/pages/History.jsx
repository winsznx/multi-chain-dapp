import { useAccount } from 'wagmi';
import { History as HistoryIcon } from 'lucide-react';

export default function History() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <HistoryIcon size={64} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your wallet to view transaction history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all your on-chain transactions
        </p>
      </div>

      <div className="card text-center py-12">
        <HistoryIcon size={48} className="mx-auto mb-4 text-gray-400 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your transaction history will appear here
        </p>
      </div>
    </div>
  );
}
