import { 
  mainnet, 
  polygon, 
  bsc, 
  arbitrum, 
  optimism, 
  base,
  sepolia,
  polygonMumbai,
  bscTestnet,
  arbitrumSepolia,
  optimismSepolia,
  baseSepolia
} from 'viem/chains';

// Custom RPC URLs with fallbacks
const getAlchemyRpc = (network) => {
  const key = import.meta.env.VITE_ALCHEMY_API_KEY;
  if (!key) return null;
  
  const networks = {
    'eth-mainnet': `https://eth-mainnet.g.alchemy.com/v2/${key}`,
    'polygon-mainnet': `https://polygon-mainnet.g.alchemy.com/v2/${key}`,
    'arb-mainnet': `https://arb-mainnet.g.alchemy.com/v2/${key}`,
    'opt-mainnet': `https://opt-mainnet.g.alchemy.com/v2/${key}`,
    'base-mainnet': `https://base-mainnet.g.alchemy.com/v2/${key}`,
    'eth-sepolia': `https://eth-sepolia.g.alchemy.com/v2/${key}`,
    'polygon-mumbai': `https://polygon-mumbai.g.alchemy.com/v2/${key}`,
    'arb-sepolia': `https://arb-sepolia.g.alchemy.com/v2/${key}`,
    'opt-sepolia': `https://opt-sepolia.g.alchemy.com/v2/${key}`,
    'base-sepolia': `https://base-sepolia.g.alchemy.com/v2/${key}`,
  };
  
  return networks[network];
};

// Mainnet Chains
export const ethereumMainnet = {
  ...mainnet,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('eth-mainnet'),
        'https://eth.llamarpc.com',
        'https://ethereum.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://ethereum.publicnode.com']
    }
  }
};

export const polygonMainnet = {
  ...polygon,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('polygon-mainnet'),
        'https://polygon.llamarpc.com',
        'https://polygon-bor.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://polygon-bor.publicnode.com']
    }
  }
};

export const bscMainnet = {
  ...bsc,
  rpcUrls: {
    default: {
      http: [
        'https://bsc.publicnode.com',
        'https://bsc-dataseed.binance.org'
      ]
    },
    public: {
      http: ['https://bsc.publicnode.com']
    }
  }
};

export const arbitrumMainnet = {
  ...arbitrum,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('arb-mainnet'),
        'https://arbitrum.llamarpc.com',
        'https://arbitrum-one.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://arbitrum-one.publicnode.com']
    }
  }
};

export const optimismMainnet = {
  ...optimism,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('opt-mainnet'),
        'https://optimism.llamarpc.com',
        'https://optimism.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://optimism.publicnode.com']
    }
  }
};

export const baseMainnet = {
  ...base,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('base-mainnet'),
        'https://base.llamarpc.com',
        'https://base.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://base.publicnode.com']
    }
  }
};

// Testnet Chains
export const sepoliaTestnet = {
  ...sepolia,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('eth-sepolia'),
        'https://ethereum-sepolia.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://ethereum-sepolia.publicnode.com']
    }
  }
};

export const polygonMumbaiTestnet = {
  ...polygonMumbai,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('polygon-mumbai'),
        'https://polygon-mumbai-bor.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://polygon-mumbai-bor.publicnode.com']
    }
  }
};

export const bscTestnetChain = {
  ...bscTestnet,
  rpcUrls: {
    default: {
      http: ['https://bsc-testnet.publicnode.com']
    },
    public: {
      http: ['https://bsc-testnet.publicnode.com']
    }
  }
};

export const arbitrumSepoliaTestnet = {
  ...arbitrumSepolia,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('arb-sepolia'),
        'https://arbitrum-sepolia.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://arbitrum-sepolia.publicnode.com']
    }
  }
};

export const optimismSepoliaTestnet = {
  ...optimismSepolia,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('opt-sepolia'),
        'https://optimism-sepolia.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://optimism-sepolia.publicnode.com']
    }
  }
};

export const baseSepoliaTestnet = {
  ...baseSepolia,
  rpcUrls: {
    default: {
      http: [
        getAlchemyRpc('base-sepolia'),
        'https://base-sepolia.publicnode.com'
      ].filter(Boolean)
    },
    public: {
      http: ['https://base-sepolia.publicnode.com']
    }
  }
};

// Mainnet chains array
export const mainnetChains = [
  ethereumMainnet,
  polygonMainnet,
  bscMainnet,
  arbitrumMainnet,
  optimismMainnet,
  baseMainnet
];

// Testnet chains array
export const testnetChains = [
  sepoliaTestnet,
  polygonMumbaiTestnet,
  bscTestnetChain,
  arbitrumSepoliaTestnet,
  optimismSepoliaTestnet,
  baseSepoliaTestnet
];

// All chains combined
export const allChains = [
  ...mainnetChains,
  ...(import.meta.env.VITE_ENABLE_TESTNET === 'true' ? testnetChains : [])
];

// Chain metadata for UI
export const chainMetadata = {
  [mainnet.id]: {
    name: 'Ethereum',
    icon: '/networks/ethereum.svg',
    color: '#627EEA',
    explorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  },
  [polygon.id]: {
    name: 'Polygon',
    icon: '/networks/polygon.svg',
    color: '#8247E5',
    explorer: 'https://polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 }
  },
  [bsc.id]: {
    name: 'BNB Chain',
    icon: '/networks/bsc.svg',
    color: '#F3BA2F',
    explorer: 'https://bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 }
  },
  [arbitrum.id]: {
    name: 'Arbitrum',
    icon: '/networks/arbitrum.svg',
    color: '#28A0F0',
    explorer: 'https://arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  },
  [optimism.id]: {
    name: 'Optimism',
    icon: '/networks/optimism.svg',
    color: '#FF0420',
    explorer: 'https://optimistic.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  },
  [base.id]: {
    name: 'Base',
    icon: '/networks/base.svg',
    color: '#0052FF',
    explorer: 'https://basescan.org',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  },
  // Testnets
  [sepolia.id]: {
    name: 'Sepolia',
    icon: '/networks/ethereum.svg',
    color: '#627EEA',
    explorer: 'https://sepolia.etherscan.io',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    testnet: true
  },
  [polygonMumbai.id]: {
    name: 'Mumbai',
    icon: '/networks/polygon.svg',
    color: '#8247E5',
    explorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    testnet: true
  },
  [bscTestnet.id]: {
    name: 'BSC Testnet',
    icon: '/networks/bsc.svg',
    color: '#F3BA2F',
    explorer: 'https://testnet.bscscan.com',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    testnet: true
  },
  [arbitrumSepolia.id]: {
    name: 'Arbitrum Sepolia',
    icon: '/networks/arbitrum.svg',
    color: '#28A0F0',
    explorer: 'https://sepolia.arbiscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    testnet: true
  },
  [optimismSepolia.id]: {
    name: 'Optimism Sepolia',
    icon: '/networks/optimism.svg',
    color: '#FF0420',
    explorer: 'https://sepolia-optimism.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    testnet: true
  },
  [baseSepolia.id]: {
    name: 'Base Sepolia',
    icon: '/networks/base.svg',
    color: '#0052FF',
    explorer: 'https://sepolia.basescan.org',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    testnet: true
  }
};

// Helper function to get chain by ID
export const getChainById = (chainId) => {
  return allChains.find(chain => chain.id === chainId);
};

// Helper function to get chain metadata
export const getChainMetadata = (chainId) => {
  return chainMetadata[chainId] || null;
};

// Helper to check if chain is testnet
export const isTestnet = (chainId) => {
  return chainMetadata[chainId]?.testnet || false;
};

export default allChains;