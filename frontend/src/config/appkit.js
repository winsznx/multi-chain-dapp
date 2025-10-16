import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, polygon, bsc, arbitrum, optimism, base } from 'viem/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('VITE_WALLETCONNECT_PROJECT_ID is not set');
}

const metadata = {
  name: import.meta.env.VITE_APP_NAME || 'Multi-Chain DApp Manager',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Manage all your on-chain transactions',
  url: import.meta.env.VITE_APP_URL || 'https://localhost:3000',
  icons: [import.meta.env.VITE_APP_ICON || 'https://localhost:3000/logo.png']
};

const chains = [mainnet, polygon, bsc, arbitrum, optimism, base];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: chains
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  metadata,
  features: {
    analytics: false
  },
  themeMode: 'light'
});

export { projectId };
