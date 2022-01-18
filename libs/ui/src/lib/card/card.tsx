import './card.module.scss';
import cn from 'classnames';
import { CSSProperties } from 'react';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ className, children, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn('border-4 p-4 bg-white rounded-xl hover:shadow', className)}
    >
      {children}
    </div>
  );
}

export default Card;
