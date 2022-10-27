import React, { ComponentPropsWithoutRef, MouseEventHandler, useEffect } from 'react';
import { CSSProperties } from 'styled-components';

import { usePortal } from 'app/tools/modalHelper';

// TODO: div to dialog
/* Type for Molecules */
type PortalContents = {
  Close: typeof Close;
};
export type ModalProps = ComponentPropsWithoutRef<'div'> & { isOpen: boolean };
export type ModalCloseProps = ComponentPropsWithoutRef<'div'>;

/* List of Molecules */
export const Modal: React.FC<ModalProps> & PortalContents = props => {
  const { isOpen, children, onClick, ...rest } = props;
  const Portal = usePortal();
  const style: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  };

  const clickHandler: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    onClick?.(e);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return !isOpen ? null : (
    <Portal>
      <div {...rest} style={style} onClick={clickHandler}>
        {children}
      </div>
    </Portal>
  );
};

const Close: React.FC<ModalCloseProps> = ({ children, onClick, ...rest }) => {
  const clickHandler: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div {...rest} onClick={clickHandler}>
      {children}
    </div>
  );
};

/* Setting for Molecules */
Modal.Close = Close;
