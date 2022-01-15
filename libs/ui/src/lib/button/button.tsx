import classes from './button.module.scss';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import { ReactChild, useRef } from 'react';
import cn from 'classnames';
import { Kind } from '../computeKind';

/* eslint-disable-next-line */
export interface ButtonProps extends AriaButtonProps<'button'> {
  children: ReactChild;
  kind?: Kind;
  size?: 'default' | 'xs' | 'sm' | 'xl';
  className?: string;
}

export function Button({
  className,
  children,
  kind = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  const kindClassnames =
    kind === 'primary'
      ? `bg-primary-500 hover:bg-primary-400 text-primary-complementary`
      : kind === 'secondary'
      ? 'bg-secondary-500 hover:bg-secondary-400  text-secondary-complementary'
      : 'border';

  return (
    <button
      className={cn(classes['btn'], kindClassnames, classes[size], className)}
      {...buttonProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

export default Button;
