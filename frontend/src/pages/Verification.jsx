import { useAccount } from 'wagmi';
import { Shield } from 'lucide-react';

export default function Verification() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Shield size={64} className="mx-auto mb-4 text-light-secondary dark:text-dark-secondary" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-light-secondary dark:text-dark-secondary">
            Connect your wallet to verify contracts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Contract Verification</h1>
        <p className="text-light-secondary dark:text-dark-secondary">
          Verify your smart contracts on block explorers
        </p>
      </div>

      <div className="card text-center py-12">
        <Shield size={64} className="mx-auto mb-4 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-light-secondary dark:text-dark-secondary">
          Contract verification feature is under development
        </p>
      </div>
    </div>
  );
}