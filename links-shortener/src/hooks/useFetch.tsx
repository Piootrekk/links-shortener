import { useState, useCallback } from "react";
import { ZodSchema, ZodError } from "zod";

type FetchOptions = RequestInit;

type FetchState<T> = {
  response: T | null;
  error: Error | null;
  fetchData: () => void;
  abort: () => void;
};

const useFetch = <T = unknown,>(
  url: string,
  options?: FetchOptions,
  schema?: ZodSchema<T>
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

        if (schema) {
          try {
            const validatedData = schema.parse(json);
            setResponse(validatedData);
          } catch (err) {
            if (err instanceof ZodError) {
              throw new Error(err.message);
            }
            throw err;
          }
        } else {
          setResponse(json);
        }
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchDataInternal();
  }, [url, options, schema]);

  return { response, error, fetchData, abort };
};

export default useFetch;
