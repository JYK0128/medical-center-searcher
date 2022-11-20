import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export function usePortal(id = 'modal-root'): React.FC<PropsWithChildren> {
  const root = document.getElementById(id);
  if (root) {
    return ({ children }) => createPortal(children, root);
  } else {
    const el = document.createElement('div');
    el.setAttribute('id', id);
    document.body.appendChild(el);
    return ({ children }) => createPortal(children, el);
  }
}
