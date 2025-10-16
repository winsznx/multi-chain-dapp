import { clsx } from 'clsx';

export const Card = ({ 
  children, 
  className = '', 
  hover = false,
  purple = false,
  ...props 
}) => {
  return (
    <div
      className={clsx(
        'card',
        hover && 'card-hover',
        purple && 'card-purple',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;