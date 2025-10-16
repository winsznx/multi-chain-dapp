import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export const Loader = ({ size = 'md', text, fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 
        className={clsx(
          'animate-spin text-purple-600 dark:text-purple-400',
          sizes[size]
        )} 
      />
      {text && (
        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-dark/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;