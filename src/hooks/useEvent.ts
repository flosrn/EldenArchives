/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

type EventCallback = (...args: any[]) => void;

export const useEvent = (callback: EventCallback): EventCallback => {
  const ref = useRef<EventCallback | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const triggerEvent = useCallback((...args: any[]) => {
    ref.current?.(...args);
  }, []);

  return triggerEvent;
};
