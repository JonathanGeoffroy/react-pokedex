import './card.module.scss';
import cn from 'classnames';
import { CSSProperties } from 'react';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export function Card({ className, children, ...passThrough }: CardProps) {
  return (
    <div
      {...passThrough}
      className={cn('border-4 p-1 rounded-xl hover:shadow', className)}
    >
      {children}
    </div>
  );
}

export default Card;
