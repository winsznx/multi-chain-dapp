import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

/**
 * Custom hook for contract interactions
 */
export const useContract = (address, abi, chainId) => {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const read = (functionName, args = []) => {
    return useReadContract({
      address,
      abi,
      functionName,
      args,
      chainId,
    });
  };

  const write = async (functionName, args = [], value) => {
    try {
      return await writeContract({
        address,
        abi,
        functionName,
        args,
        chainId,
        value,
      });
    } catch (err) {
      console.error('Contract write error:', err);
      throw err;
    }
  };

  return {
    read,
    write,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
};

export default useContract;