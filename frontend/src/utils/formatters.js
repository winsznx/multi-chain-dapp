/**
 * Format wallet address to shortened version
 * @param {string} address - Full wallet address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} Formatted address
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format number with commas
 * @param {number|string} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format currency value
 * @param {number|string} value - Currency value
 * @param {string} currency - Currency symbol (default: USD)
 * @returns {string} Formatted currency
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (!value) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(value);
};

/**
 * Format token amount with decimals
 * @param {string|number} amount - Token amount
 * @param {number} decimals - Number of decimals to show
 * @returns {string} Formatted amount
 */
export const formatTokenAmount = (amount, decimals = 4) => {
  if (!amount) return '0';
  const num = parseFloat(amount);
  if (num === 0) return '0';
  if (num < 0.0001) return '< 0.0001';
  return num.toFixed(decimals);
};

/**
 * Format timestamp to relative time
 * @param {string|Date} timestamp - Timestamp to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

/**
 * Format gas price to Gwei
 * @param {string|number} gasPrice - Gas price in wei
 * @returns {string} Gas price in Gwei
 */
export const formatGasPrice = (gasPrice) => {
  if (!gasPrice) return '0';
  const gwei = parseFloat(gasPrice) / 1e9;
  return `${gwei.toFixed(2)} Gwei`;
};

/**
 * Format transaction hash
 * @param {string} hash - Transaction hash
 * @returns {string} Formatted hash
 */
export const formatTxHash = (hash) => {
  return formatAddress(hash, 10, 8);
};

/**
 * Parse and format large numbers with K, M, B suffixes
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatCompactNumber = (num) => {
  if (!num) return '0';
  if (num < 1000) return num.toString();
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
  if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
  return `${(num / 1000000000).toFixed(1)}B`;
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimals
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 2) => {
  if (!value) return '0%';
  return `${value.toFixed(decimals)}%`;
};