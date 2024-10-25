import { useState } from "react";
import { z, ZodError } from "zod";

type UseLocalStorageReturn<T> = {
  value: T | null;
  setValue: (value: T) => void;
  error: string | null;
};

const useLocalStorage = <T,>(
  key: string,
  schema: z.ZodSchema<T>,
  initialValue: T
): UseLocalStorageReturn<T> => {
  const [value, setValueState] = useState<T | null>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return schema.parse(JSON.parse(storedValue));
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });

  const [error, setError] = useState<string | null>(null);

  const setValue = (newValue: T) => {
    try {
      const parsedValue = schema.parse(newValue);
      setValueState(parsedValue);
      localStorage.setItem(key, JSON.stringify(parsedValue));
      setError(null);
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.errors.map((err) => err.message).join(", "));
      }
    }
  };

  return { value, setValue, error };
};

export default useLocalStorage;
