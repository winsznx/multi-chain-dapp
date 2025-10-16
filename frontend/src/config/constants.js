// App Information
export const APP_NAME = 'ChainManager';
export const APP_DESCRIPTION = 'Multi-Chain DApp Manager';
export const APP_VERSION = '1.0.0';

// Transaction Types
export const TX_TYPES = {
  SEND: 'send',
  RECEIVE: 'receive',
  SWAP: 'swap',
  DEPLOY: 'deploy',
  INTERACT: 'interact',
};

// Transaction Status
export const TX_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// Contract Verification Status
export const VERIFICATION_STATUS = {
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  PENDING: 'pending',
  FAILED: 'failed',
};

// Token Types
export const TOKEN_TYPES = {
  NATIVE: 'native',
  ERC20: 'erc20',
  ERC721: 'erc721',
  ERC1155: 'erc1155',
};

// Gas Limits
export const GAS_LIMITS = {
  TRANSFER: 21000,
  ERC20_TRANSFER: 65000,
  CONTRACT_DEPLOY: 2000000,
  COMPLEX_TX: 500000,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  WALLET: 'wallet',
  SETTINGS: 'settings',
  RECENT_TXS: 'recent_txs',
  FAVORITES: 'favorites',
};

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Pagination
export const ITEMS_PER_PAGE = 20;
export const MAX_ITEMS_PER_PAGE = 100;

// Time Constants
export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

// Request Timeouts (in ms)
export const TIMEOUTS = {
  DEFAULT: 30000,
  LONG: 60000,
  SHORT: 10000,
};

// Decimals
export const DEFAULT_DECIMALS = 18;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet',
  INVALID_ADDRESS: 'Invalid address format',
  INVALID_AMOUNT: 'Invalid amount',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  TRANSACTION_REJECTED: 'Transaction was rejected',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unknown error occurred',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  TX_SENT: 'Transaction sent successfully',
  TX_CONFIRMED: 'Transaction confirmed',
  SETTINGS_SAVED: 'Settings saved successfully',
  COPIED: 'Copied to clipboard',
};