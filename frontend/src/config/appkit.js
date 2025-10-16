import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { allChains } from './chains';

// Get project ID from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('VITE_WALLETCONNECT_PROJECT_ID is not set');
}

// App metadata
export const metadata = {
  name: import.meta.env.VITE_APP_NAME || 'Multi-Chain DApp Manager',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Manage all your on-chain transactions in one place',
  url: import.meta.env.VITE_APP_URL || 'https://localhost:3000',
  icons: [import.meta.env.VITE_APP_ICON || 'https://localhost:3000/logo.png']
};

// Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: allChains
});

// Create AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: allChains,
  metadata,
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'github', 'apple'],
    emailShowWallets: true,
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#9333ea',
    '--w3m-border-radius-master': '8px',
  }
});

export { projectId };