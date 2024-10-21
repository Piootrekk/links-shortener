import { useState, useCallback } from "react";
import { ZodSchema, ZodError } from "zod";

type AsyncFunction = (...args: any[]) => Promise<any>;

type InferAsyncFunctionArgs<T extends AsyncFunction> = T extends (
  ...args: infer A
) => Promise<any>
  ? A
  : never;

type InferAsyncFunctionResult<T extends AsyncFunction> = T extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : never;

type FetchState<TData, TFunction extends AsyncFunction> = {
  data: TData | null;
  setDataManually: (data: TData) => void;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: InferAsyncFunctionArgs<TFunction>) => Promise<void>;
};

const useFetchCallback = <TFunction extends AsyncFunction>(
  asyncFunction: TFunction,
  validationSchema?: ZodSchema<InferAsyncFunctionResult<TFunction>>
): FetchState<InferAsyncFunctionResult<TFunction>, TFunction> => {
  type TData = InferAsyncFunctionResult<TFunction>;

  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (...args: InferAsyncFunctionArgs<TFunction>) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        if (validationSchema) {
          const validatedResult = validationSchema.parse(result);
          setData(validatedResult);
        } else {
          setData(result);
        }
      } catch (err) {
        if (err instanceof ZodError) {
          setError(new Error("Validation failed: " + err.message));
        } else if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, validationSchema]
  );

  return { data, error, isLoading, execute, setDataManually: setData };
};

export default useFetchCallback;
export type { FetchState };
