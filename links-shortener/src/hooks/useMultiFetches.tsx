import { errorSetter } from "@/lib/errorValidation";
import { useState, useCallback, useMemo } from "react";
import { ZodSchema } from "zod";

type FetchState<T> = {
  data: T | null | undefined;
  setDataManually: (data: T) => void;
  error: Error | null;
  setErrorManually: (error: Error | null) => void;
  isLoading: boolean;
};

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

type UseFetchMultiple<
  T,
  M extends Record<string, AsyncFunction<T>>
> = FetchState<T> & {
  exec: {
    [K in keyof M]: (...args: Parameters<M[K]>) => Promise<void>;
  };
};

const useMultiFetches = <
  T = unknown,
  M extends Record<string, AsyncFunction<T>> = {}
>(
  methods: M,
  validationSchema?: ZodSchema<T>
): UseFetchMultiple<T, M> => {
  const [data, setData] = useState<T | null | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (asyncFunction: AsyncFunction<T>, ...args: unknown[]) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        if (validationSchema) {
          const validatedResult = validationSchema.parse(result);
          setData(validatedResult as T);
        } else {
          setData(result);
        }
      } catch (err) {
        errorSetter(setError)(err);
      } finally {
        setIsLoading(false);
      }
    },
    [validationSchema]
  );

  const exec = useMemo(() => {
    const execMethods: Partial<UseFetchMultiple<T, M>["exec"]> = {};
    for (const [key, method] of Object.entries(methods)) {
      execMethods[key as keyof M] = (...args: unknown[]) =>
        execute(method, ...args);
    }
    return execMethods as UseFetchMultiple<T, M>["exec"];
  }, [methods, execute]);

  return {
    data,
    error,
    isLoading,
    exec,
    setDataManually: setData,
    setErrorManually: setError,
  };
};

export default useMultiFetches;
export type { UseFetchMultiple };
