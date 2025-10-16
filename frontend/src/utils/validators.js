/**
 * Validate Ethereum address
 * @param {string} address - Address to validate
 * @returns {boolean} Is valid address
 */
export const isValidAddress = (address) => {
  if (!address) return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Validate transaction hash
 * @param {string} hash - Transaction hash to validate
 * @returns {boolean} Is valid hash
 */
export const isValidTxHash = (hash) => {
  if (!hash) return false;
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
};

/**
 * Validate amount (number greater than 0)
 * @param {string|number} amount - Amount to validate
 * @returns {boolean} Is valid amount
 */
export const isValidAmount = (amount) => {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate private key format
 * @param {string} key - Private key to validate
 * @returns {boolean} Is valid private key
 */
export const isValidPrivateKey = (key) => {
  if (!key) return false;
  // With or without 0x prefix
  return /^(0x)?[a-fA-F0-9]{64}$/.test(key);
};

/**
 * Validate gas limit
 * @param {string|number} gasLimit - Gas limit to validate
 * @returns {boolean} Is valid gas limit
 */
export const isValidGasLimit = (gasLimit) => {
  if (!gasLimit) return false;
  const num = parseInt(gasLimit);
  return !isNaN(num) && num >= 21000 && num <= 10000000;
};

/**
 * Validate chain ID
 * @param {number} chainId - Chain ID to validate
 * @returns {boolean} Is valid chain ID
 */
export const isValidChainId = (chainId) => {
  return typeof chainId === 'number' && chainId > 0;
};