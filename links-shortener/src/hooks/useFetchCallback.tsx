import { useState, useCallback } from "react";

interface FetchState<T> {
  data: T | null | undefined;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<void>;
}

const useFetchCallback = <T = unknown,>(
  asyncFunction: (...args: any[]) => Promise<T>
): FetchState<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction]
  );

  return { data, error, isLoading, execute };
};

export default useFetchCallback;
