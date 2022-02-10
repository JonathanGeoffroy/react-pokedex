import { useRef } from 'react';
import { useTab, useTabList, useTabPanel } from '@react-aria/tabs';
import { useTabListState, TabListState } from '@react-stately/tabs';
import { Node } from '@react-types/shared';
import { TabListProps } from '@react-types/tabs';
import classNames from 'classnames';
import './tabs.module.scss';

/* eslint-disable-next-line */
export interface TabsProps extends TabListProps<TabProps> {
  className?: string;
}

export function Tabs(props: TabsProps) {
  const ref = useRef(null);

  const state = useTabListState(props);
  const { tabListProps } = useTabList(props, state, ref);

  return (
    <div className="w-full" {...props}>
      <div
        {...tabListProps}
        ref={ref}
        className="relative flex justify-between border-b border-gray-200"
      >
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

interface TabProps {
  item: Node<TabProps>;
  state: TabListState<TabProps>;
}
function Tab({ item, state }: TabProps) {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);
  const isSelected = state.selectedKey === key;
  const isDisabled = state.disabledKeys.has(key);
  return (
    <div
      {...tabProps}
      ref={ref}
      className={classNames(
        'px-4 py-2',
        isSelected ? 'font-bold border-b-2 border-green-700' : '',
        isDisabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer'
      )}
    >
      {rendered}
    </div>
  );
}

interface TabPanelProps {
  state: TabListState<TabProps>;
  className?: string;
}

function TabPanel({ state, className, ...props }: TabPanelProps) {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div {...tabPanelProps} ref={ref} className={classNames('p-4', className)}>
      {state.selectedItem?.props.children}
    </div>
  );
}
export default Tabs;
