import { useState, useCallback } from "react";
import { ZodSchema, ZodError } from "zod";

interface FetchState<T> {
  data: T | null | undefined;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<void>;
}

const useFetchCallback = <T = unknown,>(
  asyncFunction: (...args: any[]) => Promise<T>,
  validationSchema?: ZodSchema<T>
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
    [asyncFunction, validationSchema]
  );

  return { data, error, isLoading, execute };
};

export default useFetchCallback;
