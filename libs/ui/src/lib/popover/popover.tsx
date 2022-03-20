import { MutableRefObject, ReactNode, useRef } from 'react';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import './popover.module.scss';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  popoverRef?: MutableRefObject<HTMLDivElement>;
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
        className="absolute w-full border bg-gray-300 mt-1"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}

export default Popover;
