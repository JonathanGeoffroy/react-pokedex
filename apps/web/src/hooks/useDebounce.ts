import { useCallback, useRef } from 'react';

type Func = (...args: unknown[]) => unknown;

export default function useDebounce(timeout = 1000) {
  const timer = useRef<NodeJS.Timeout>();

  function clean() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }

  return useCallback(
    (func: Func) => {
      clean();

      timer.current = setTimeout(() => {
        console.log('debouncing');
        func();
      }, timeout);

      return clean;
    },
    [timeout]
  );
}
