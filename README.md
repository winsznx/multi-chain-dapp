# 🚀 Multi-Chain DApp Manager

A comprehensive decentralized application for managing multi-chain transactions, deployments, and on-chain activities across multiple blockchain networks.

## ✨ Features

- 🔗 **Multi-Chain Support** - Ethereum, Polygon, BSC, Arbitrum, Optimism, Base (Mainnet & Testnet)
- 💼 **Portfolio Management** - Track tokens and balances across all networks
- 📤 **Batch Transactions** - Send tokens to multiple addresses in one transaction
- 📜 **Contract Deployments** - Manage and verify your smart contracts
- 📊 **Transaction History** - Complete transaction tracking with filters
- 🎨 **Light/Dark Mode** - Beautiful purple-themed UI with theme switching
- 📱 **Responsive Design** - Fully optimized for mobile and desktop
- 🔐 **Wallet Integration** - Powered by Reown AppKit (WalletConnect)

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Web3**: Wagmi v2 + Viem v2
- **Wallet**: Reown AppKit (WalletConnect)
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State**: Zustand
- **Notifications**: React Hot Toast
- **Charts**: Recharts

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- A WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd multi-chain-dapp
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the `frontend` directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Required
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional but recommended
VITE_ALCHEMY_API_KEY=your_alchemy_key
VITE_ETHERSCAN_API_KEY=your_etherscan_key
VITE_POLYGONSCAN_API_KEY=your_polygonscan_key
VITE_BSCSCAN_API_KEY=your_bscscan_key
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Buttons, Cards, Modals, etc.
│   │   ├── layout/       # Header, Footer, Layout
│   │   └── wallet/       # Wallet connection components
│   ├── pages/            # Page components
│   ├── config/           # Configuration files
│   │   ├── appkit.js     # AppKit configuration
│   │   ├── chains.js     # Chain configurations
│   │   └── wagmi.js      # Wagmi setup
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── services/         # API and blockchain services
│   ├── contracts/        # ABIs and contract addresses
│   └── styles/           # Global styles
├── public/               # Static assets
└── package.json
```

## 🎨 Theme Configuration

The app uses a purple color scheme with light/dark mode support:

- **Primary Color**: Purple (#9333ea)
- **Background Light**: White (#ffffff)
- **Background Dark**: Dark Blue (#0f172a)

Customize colors in `tailwind.config.js`

## 🔧 Configuration

### Adding New Chains

Edit `src/config/chains.js`:

```javascript
import { newChain } from 'viem/chains';

export const customChain = {
  ...newChain,
  rpcUrls: {
    default: { http: ['https://rpc.example.com'] }
  }
};

// Add to allChains array
export const allChains = [...mainnetChains, customChain];
```

### Customizing AppKit

Edit `src/config/appkit.js` to customize wallet options and features.

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Supported Networks

### Mainnet
- Ethereum
- Polygon
- BNB Chain
- Arbitrum
- Optimism
- Base

### Testnet
- Sepolia
- Mumbai
- BSC Testnet
- Arbitrum Sepolia
- Optimism Sepolia
- Base Sepolia

## 🔐 Security

- Never commit `.env.local` file
- Keep your private keys and API keys secure
- Always verify transaction details before signing
- Use testnet for development and testing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Contact the development team

## 🎯 Roadmap

- [ ] Contract verification integration
- [ ] Cross-chain bridge functionality
- [ ] Advanced analytics dashboard
- [ ] Token swap integration
- [ ] Multi-signature wallet support
- [ ] NFT management
- [ ] DeFi protocol integrations

## 🙏 Acknowledgments

- [Reown (WalletConnect)](https://reown.com)
- [Wagmi](https://wagmi.sh)
- [Viem](https://viem.sh)
- [TailwindCSS](https://tailwindcss.com)

---
