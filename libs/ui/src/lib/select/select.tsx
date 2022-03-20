import { useRef } from 'react';
import { HiddenSelect, useSelect } from '@react-aria/select';
import { Item } from '@react-stately/collections';
import { useButton } from '@react-aria/button';
import { useSelectState } from '@react-stately/select';
import { SelectProps as AriaSelectProps } from '@react-types/select';
import './select.module.scss';
import classNames from 'classnames';
import Popover from '../popover/popover';
import ListBox from '../list-box/list-box';

export interface SelectProps<T> extends AriaSelectProps<T> {
  name?: string;
  className?: string;
  'data-testid'?: string;
}

export function Select<T extends object>(props: SelectProps<T>) {
  // Create state based on the incoming props
  const state = useSelectState(props);

  // Get props for child elements from useSelect
  const ref = useRef<HTMLButtonElement>(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <div
      data-testid={props['data-testid']}
      className={classNames(props.className)}
    >
      <div {...labelProps}>{props.label}</div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <button
        {...buttonProps}
        className="rounded-xl px-2 bg-white w-full flex justify-between gap-2"
        ref={ref}
      >
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </span>
        <span aria-hidden="true">▼</span>
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}

export default Select;
