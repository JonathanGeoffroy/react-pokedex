import { useRef } from 'react';
import { useOption } from '@react-aria/listbox';
import { ListState } from '@react-stately/list';
import { Node } from '@react-types/shared';
import './option.module.scss';

export interface OptionProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

export function Option<T>({ item, state }: OptionProps<T>) {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref
  );

  let backgroundColor;
  let color = 'black';

  if (isSelected) {
    backgroundColor = 'blueviolet';
    color = 'white';
  } else if (isFocused) {
    backgroundColor = 'gray';
  } else if (isDisabled) {
    backgroundColor = 'transparent';
    color = 'gray';
  }

  return (
    <li
      {...optionProps}
      ref={ref}
      className="cursor-pointer px-2 py-1 outline-none"
      style={{
        background: backgroundColor,
      }}
    >
      {item.rendered}
    </li>
  );
}

export default Option;
