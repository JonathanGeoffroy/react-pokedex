import { MutableRefObject, ReactNode, useRef } from 'react';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import './popover.module.scss';
import classNames from 'classnames';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  popoverRef?: MutableRefObject<HTMLDivElement>;
  className?: string;
}

function Popover(props: PopoverProps) {
  const ref = useRef(null);
  const { popoverRef = ref, isOpen, onClose, children } = props;

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    popoverRef
  );

  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={popoverRef}
        className={classNames(
          'absolute border bg-gray-300 mt-1',
          props.className
        )}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}

export default Popover;
