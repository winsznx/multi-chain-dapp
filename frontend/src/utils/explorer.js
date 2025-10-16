import { getChainMetadata } from '@/config/chains';

/**
 * Get explorer URL for transaction
 * @param {number} chainId - Chain ID
 * @param {string} txHash - Transaction hash
 * @returns {string} Explorer URL
 */
export const getTransactionUrl = (chainId, txHash) => {
  const chain = getChainMetadata(chainId);
  if (!chain) return '#';
  return `${chain.explorer}/tx/${txHash}`;
};

/**
 * Get explorer URL for address
 * @param {number} chainId - Chain ID
 * @param {string} address - Wallet/Contract address
 * @returns {string} Explorer URL
 */
export const getAddressUrl = (chainId, address) => {
  const chain = getChainMetadata(chainId);
  if (!chain) return '#';
  return `${chain.explorer}/address/${address}`;
};

/**
 * Get explorer URL for token
 * @param {number} chainId - Chain ID
 * @param {string} tokenAddress - Token contract address
 * @returns {string} Explorer URL
 */
export const getTokenUrl = (chainId, tokenAddress) => {
  const chain = getChainMetadata(chainId);
  if (!chain) return '#';
  return `${chain.explorer}/token/${tokenAddress}`;
};

/**
 * Get explorer URL for block
 * @param {number} chainId - Chain ID
 * @param {number|string} blockNumber - Block number
 * @returns {string} Explorer URL
 */
export const getBlockUrl = (chainId, blockNumber) => {
  const chain = getChainMetadata(chainId);
  if (!chain) return '#';
  return `${chain.explorer}/block/${blockNumber}`;
};

/**
 * Get explorer API URL
 * @param {number} chainId - Chain ID
 * @returns {string} Explorer API base URL
 */
export const getExplorerApiUrl = (chainId) => {
  const explorers = {
    1: 'https://api.etherscan.io/api',
    137: 'https://api.polygonscan.com/api',
    56: 'https://api.bscscan.com/api',
    42161: 'https://api.arbiscan.io/api',
    10: 'https://api-optimistic.etherscan.io/api',
    8453: 'https://api.basescan.org/api',
    11155111: 'https://api-sepolia.etherscan.io/api',
  };
  
  return explorers[chainId] || '';
};

/**
 * Get explorer API key for chain
 * @param {number} chainId - Chain ID
 * @returns {string} API key
 */
export const getExplorerApiKey = (chainId) => {
  const keys = {
    1: import.meta.env.VITE_ETHERSCAN_API_KEY,
    137: import.meta.env.VITE_POLYGONSCAN_API_KEY,
    56: import.meta.env.VITE_BSCSCAN_API_KEY,
    42161: import.meta.env.VITE_ARBISCAN_API_KEY,
    10: import.meta.env.VITE_OPTIMISM_API_KEY,
    8453: import.meta.env.VITE_BASESCAN_API_KEY,
    11155111: import.meta.env.VITE_ETHERSCAN_API_KEY,
  };
  
  return keys[chainId] || '';
};