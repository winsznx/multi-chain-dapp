import { useBalance as useWagmiBalance, useAccount } from 'wagmi';
import { allChains } from '@/config/chains';

/**
 * Custom hook to get balance across all chains
 */
export const useMultiChainBalance = () => {
  const { address } = useAccount();
  
  const balances = allChains.map(chain => {
    const { data, isLoading, error } = useWagmiBalance({
      address,
      chainId: chain.id,
    });
    
    return {
      chainId: chain.id,
      balance: data,
      isLoading,
      error,
    };
  });

  const totalBalance = balances.reduce((sum, { balance }) => {
    if (!balance) return sum;
    return sum + parseFloat(balance.formatted);
  }, 0);

  const isLoading = balances.some(b => b.isLoading);

  return {
    balances,
    totalBalance,
    isLoading,
  };
};

export default useMultiChainBalance;