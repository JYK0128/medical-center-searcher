import { Dispatch, SyntheticEvent } from 'react';

type SortableEvents = {
  onDragStart?: Dispatch<SyntheticEvent>;
  onDragOver?: Dispatch<SyntheticEvent>;
  onDragEnd?: Dispatch<SyntheticEvent>;
};

export function useSortable(dragEvents: SortableEvents): SortableEvents {
  let draggingElement: HTMLElement | undefined;
  let position: 'beforebegin' | 'afterend' | undefined;
  let opacity: string;

  const { onDragStart, onDragOver, onDragEnd } = dragEvents;

  // effect handling
  const setMoveEffect = (ev: SyntheticEvent) => {
    const dragEvent = ev as unknown as DragEvent;

    if (!dragEvent.dataTransfer) return;
    else dragEvent.dataTransfer.effectAllowed = 'move';
  };
  const setDropEffect = (ev: SyntheticEvent) => {
    const dragEvent = ev as unknown as DragEvent;

    if (!dragEvent.dataTransfer) return;
    else dragEvent.dataTransfer.dropEffect = 'move';
  };
  const setPositionEffect = (ev: SyntheticEvent) => {
    const dragEvent = ev as unknown as DragEvent;
    const rect = ev.currentTarget.getBoundingClientRect();
    const center = (rect.top + rect.bottom) / 2;
    const coord = dragEvent.clientY;

    position = center > coord ? 'beforebegin' : 'afterend';
  };

  // event handling
  const dragEvent = (ev: SyntheticEvent) => {
    draggingElement = ev.currentTarget as HTMLElement;
    opacity = draggingElement.style.opacity;
    draggingElement.style.opacity = '0.4';
  };
  const dropEvent = (ev: SyntheticEvent) => {
    const list = ev.currentTarget.parentElement;
    const droppedElement = ev.currentTarget;

    if (position === 'beforebegin') {
      if (!(list && draggingElement)) return;
      else list.insertBefore(draggingElement, droppedElement);
    } else if (position === 'afterend') {
      if (!(list && draggingElement)) return;
      else list.insertBefore(draggingElement, droppedElement.nextSibling);
    }
  };
  const clearEvent = () => {
    if (draggingElement) draggingElement.style.opacity = opacity;
    position = undefined;
    draggingElement = undefined;
  };

  return {
    ...dragEvents,
    onDragStart: (ev: SyntheticEvent) => {
      ev.preventDefault();
      setMoveEffect(ev);
      dragEvent(ev);
      onDragStart?.(ev);
    },
    onDragOver: (ev: SyntheticEvent) => {
      ev.preventDefault();
      setDropEffect(ev);
      setPositionEffect(ev);
      dropEvent(ev);
      onDragOver?.(ev);
    },
    onDragEnd: (ev: SyntheticEvent) => {
      ev.preventDefault();
      clearEvent();
      onDragEnd?.(ev);
    }
  };
}
