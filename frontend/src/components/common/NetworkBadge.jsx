import { getChainMetadata } from '@/config/chains';
import { clsx } from 'clsx';

export const NetworkBadge = ({ chainId, showIcon = true, size = 'md' }) => {
  const chain = getChainMetadata(chainId);
  
  if (!chain) return null;

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <span 
      className={clsx(
        'inline-flex items-center gap-2 rounded-full font-medium',
        chain.testnet 
          ? 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
          : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
        sizes[size]
      )}
    >
      {showIcon && (
        <div 
          className={clsx('rounded-full', dotSizes[size])}
          style={{ backgroundColor: chain.color }}
        />
      )}
      {chain.name}
    </span>
  );
};

export default NetworkBadge;