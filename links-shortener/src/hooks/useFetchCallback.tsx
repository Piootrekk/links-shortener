import { useState, useCallback } from "react";
import { ZodSchema, ZodError } from "zod";

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

type UseFetchMultiple<T> = FetchState<T> & {
  execute: (
    asyncFunction: (...args: any[]) => Promise<T | null>,
    ...args: any[]
  ) => Promise<void>;
};

const useFetchMultiple = <T = unknown,>(
  validationSchema?: ZodSchema<T>
): UseFetchMultiple<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (
      asyncFunction: (...args: unknown[]) => Promise<T | null>,
      ...args: unknown[]
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        if (validationSchema) {
          const validatedResult = validationSchema.parse(result);
          setData(validatedResult as Awaited<T>);
        } else {
          setData(result);
        }
      } catch (err) {
        if (err instanceof ZodError) {
          setError(new Error("Validation failed: " + err.message));
        } else {
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [validationSchema]
  );

  return { data, error, isLoading, execute };
};

export default useFetchMultiple;
