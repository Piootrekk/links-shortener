import { useEffect, useState } from "react";
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

type FetchState<T> = {
  data: T | null | undefined;
  setDataManually: (data: T) => void;
  error: Error | null;
  isLoading: boolean;
};

const useInstantFetch = <TFunction extends AsyncFunction>(
  asyncFunction: TFunction,
  args: InferAsyncFunctionArgs<TFunction>,
  validationSchema?: ZodSchema<InferAsyncFunctionResult<TFunction>>
): FetchState<InferAsyncFunctionResult<TFunction>> => {
  type TData = InferAsyncFunctionResult<TFunction>;

  const [data, setData] = useState<TData | null | undefined>(undefined);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        if (validationSchema) {
          const validatedResult = validationSchema.parse(result);
          setData(validatedResult as TData);
        } else {
          setData(result as TData);
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
    };
    fetchData();
  }, []);

  return { data, error, isLoading, setDataManually: setData };
};

export default useInstantFetch;
