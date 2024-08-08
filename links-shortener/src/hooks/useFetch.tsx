import { useState, useCallback } from "react";

type FetchOptions = RequestInit;

type FetchState<T> = {
  response: T | null;
  error: Error | null;
  fetchData: () => void;
  abort: () => void;
};

const useFetch = <T = unknown,>(
  url: string,
  options?: FetchOptions
): FetchState<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [abort, setAbort] = useState<() => void>(() => () => {});

  const fetchData = useCallback(() => {
    const fetchDataInternal = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(() => abortController.abort);

        const res = await fetch(url, { ...options, signal });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = (await res.json()) as T;
        setResponse(json);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchDataInternal();
  }, [url, options]);

  return { response, error, fetchData, abort };
};

export default useFetch;
