import cn from 'classnames';
import { Kind } from '../computeKind';
import classes from './top-bar.module.scss';

/* eslint-disable-next-line */
export interface TopBarProps {
  children?: React.ReactNode;
  className?: string;
  kind?: Kind;
}

export function TopBar({ kind, children, className }: TopBarProps) {
  const kindClassnames =
    kind === 'primary'
      ? `bg-primary-500 text-primary-complementary`
      : kind === 'secondary'
      ? 'bg-secondary-500 text-secondary-complementary'
      : 'border';

  return (
    <div className={cn(classes['top-bar'], kindClassnames, className)}>{children}</div>
  );
}

export default TopBar;
