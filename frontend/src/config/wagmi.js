import { createConfig, http } from 'wagmi';
import { allChains } from './chains';

// Create transports for each chain
const transports = {};
allChains.forEach(chain => {
  transports[chain.id] = http();
});

export const wagmiConfig = createConfig({
  chains: allChains,
  transports,
  ssr: false,
});

export default wagmiConfig;