import { DispatchWithoutAction, MouseEventHandler, SyntheticEvent, useRef } from 'react';

type ClickEvents = { onClick?: MouseEventHandler; onDoubleClick?: MouseEventHandler };

export function useClick(clickEvents: ClickEvents, timeout = 300): ClickEvents {
  const { onClick, onDoubleClick } = clickEvents;

  // timer events
  const timer = useRef<NodeJS.Timeout>();
  const setTimer = (...func: DispatchWithoutAction[]) => {
    timer.current = setTimeout(() => func.forEach(f => f()), timeout);
  };
  const clearTimer = () => clearTimeout(timer.current as NodeJS.Timeout);

  // element events
  const storedElement = useRef<EventTarget & Element>();
  const storeElement = (eventElement: EventTarget & Element) => {
    storedElement.current = eventElement;
  };
  const saveElement = (ev: SyntheticEvent, currentTarget: EventTarget & Element) => {
    ev.target = currentTarget;
  };
  const restoreElement = (ev: SyntheticEvent) => {
    ev.currentTarget = ev.target as EventTarget & Element;
  };
  const disposeElement = () => {
    storedElement.current = undefined;
  };

  return {
    onClick: ev => {
      const pointerEvent = ev.nativeEvent as PointerEvent;
      const eventElement = ev.currentTarget;
      if (storedElement.current !== eventElement && pointerEvent.detail === 1) {
        storeElement(eventElement);
        saveElement(ev, eventElement);
        setTimer(() => {
          restoreElement(ev);
          disposeElement();
          onClick?.(ev);
        });
      }
    },
    onDoubleClick: ev => {
      if (storedElement.current === ev.currentTarget) {
        disposeElement();
        clearTimer();
        onDoubleClick?.(ev);
      }
    }
  };
}
