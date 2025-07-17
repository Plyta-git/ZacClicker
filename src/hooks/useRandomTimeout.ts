import { useCallback, useEffect, useRef } from "react";

export const useRandomTimeout = (
  callback: () => void,
  minDelay: number,
  maxDelay: number
) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const run = useCallback(() => {
    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      savedCallback.current();
    }, delay);
  }, [minDelay, maxDelay]);

  const clear = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => {
    return clear;
  }, [clear]);

  return { run, clear };
};
