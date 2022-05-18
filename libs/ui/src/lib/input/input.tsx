import { useRef, useState } from 'react';
import { useTextField } from 'react-aria';
import {
  DefaultElementType,
  AriaTextFieldOptions,
} from '@react-aria/textfield';
import classNames from 'classnames';
import classes from './input.module.scss';

export type InputProps = AriaTextFieldOptions<DefaultElementType> &
  React.HTMLAttributes<HTMLInputElement> & {
    value: string;
    onValueChange: (value: string) => void;
    inputClassName?: string;
    labelClassName?: string;
    wrapperClassName?: string;
    descriptionClassName?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
  };

export function Input(props: InputProps) {
  const {
    label,
    className,
    value,
    onValueChange,
    inputClassName,
    labelClassName,
    wrapperClassName,
    descriptionClassName,
    left: Left,
    right,
  } = props;
  const ref = useRef(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onValueChange(e.currentTarget.value);

  return (
    <div className={classNames('flex flex-col', className)}>
      <label
        {...labelProps}
        className={classNames(classes['label'], 'pb-1', labelClassName)}
      >
        {label}
      </label>

      <div
        className={classNames(
          'flex flex-row bg-gray-100 p-2 border border-gray-300 rounded',
          wrapperClassName
        )}
      >
        {Left || null}
        <input
          {...inputProps}
          value={value}
          onChange={handleChange}
          ref={ref}
          className={classNames('w-full grow-0 bg-gray-100', inputClassName)}
        />
        {right || null}
      </div>
      {props.description && (
        <div
          {...descriptionProps}
          className={classNames(classes['label'], 'pt-1', descriptionClassName)}
        >
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div
          {...errorMessageProps}
          className={classNames(
            classes['label'],
            'pt-1',
            classes['error-label']
          )}
        >
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}

export default Input;
