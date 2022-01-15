import './card.module.scss';
import cn from 'classnames';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'border-4 p-4 bg-white rounded-xl hover:shadow',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
