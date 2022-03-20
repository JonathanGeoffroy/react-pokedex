import { useRef } from 'react';
import { useListBox, AriaListBoxOptions } from '@react-aria/listbox';
import { ListState } from '@react-stately/list';
import Option from './option';
import './list-box.module.scss';

export interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  listBoxRef?: React.MutableRefObject<HTMLUListElement>;
  state: ListState<T>;
}

export function ListBox<T>(props: ListBoxProps<T>) {
  const ref = useRef(null);
  const { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="m-0 p-0 list-none max-h-32"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

export default ListBox;
