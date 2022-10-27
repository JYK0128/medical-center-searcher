import { Dispatch, DispatchWithoutAction, SyntheticEvent, useRef } from 'react';

type HoverEvents = {
  onMouseMove?: Dispatch<SyntheticEvent>;
};

export function useHover(hoverEvents: HoverEvents, timeout = 300): HoverEvents {
  const { onMouseMove } = hoverEvents;

  // timer events
  const timer = useRef<NodeJS.Timeout>();
  const setTimer = (...func: DispatchWithoutAction[]) => {
    timer.current = setTimeout(() => func.forEach(f => f()), timeout);
  };
  const clearTimer = () => clearTimeout(timer.current as NodeJS.Timeout);

  return {
    onMouseMove: (e: SyntheticEvent) => {
      clearTimer();
      setTimer(() => {
        e.currentTarget = e.target as EventTarget & Element;
        onMouseMove?.(e);
      });
    }
  };
}
