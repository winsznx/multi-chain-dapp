import { useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showClose = true 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="modal-overlay animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={clsx(
          'relative bg-white dark:bg-dark-card rounded-xl shadow-xl',
          'border border-light dark:border-dark',
          'w-full animate-slide-in z-10',
          sizes[size]
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 border-b border-light dark:border-dark">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-light-secondary dark:hover:bg-dark-secondary rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;