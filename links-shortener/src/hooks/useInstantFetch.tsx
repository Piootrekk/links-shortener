import { useEffect, useState } from "react";
import { ZodSchema } from "zod";

type FetchState<T> = {
  data: T | null | undefined;
  error: Error | null;
  isLoading: boolean;
};

const useInstantFetch = <T = unknown,>(
  asyncFunction: (...args: unknown[]) => Promise<any>,
  validationSchema?: ZodSchema<T>
): FetchState<T> => {
  const [data, setData] = useState<T | null | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction();
        if (validationSchema) {
          const validatedResult = validationSchema.parse(result);
          setData(validatedResult as T);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [asyncFunction, validationSchema]);

  return { data, error, isLoading };
};

export default useInstantFetch;
