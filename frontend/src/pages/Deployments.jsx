import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { FileCode } from 'lucide-react';
import { getChainMetadata } from '@/config/chains';

export default function Deployments() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const currentChain = getChainMetadata(chainId);

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FileCode size={64} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-600 dark:text-gray-400">
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
          <p className="text-gray-600 dark:text-gray-400">
            Manage and verify your deployed smart contracts on {currentChain?.name}
          </p>
        </div>
        <button className="btn-primary">
          Deploy New Contract
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Deployments
          </p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Verified
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">0</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Pending
          </p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">0</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Unverified
          </p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">0</p>
        </div>
      </div>

      {/* Empty State */}
      <div className="card text-center py-12">
        <FileCode size={48} className="mx-auto mb-4 text-gray-400 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">No Deployments Yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Deploy your first smart contract to get started
        </p>
        <button className="btn-primary">
          Deploy Contract
        </button>
      </div>
    </div>
  );
}
