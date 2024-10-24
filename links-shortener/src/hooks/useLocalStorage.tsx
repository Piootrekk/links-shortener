import { useState } from "react";
import { ZodSchema } from "zod";

const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
  schema?: ZodSchema<T>
) => {
  const [error, setError] = useState<Error | null>(null);

  const getSavedValue = (): T | undefined => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      try {
        const parsedValue = JSON.parse(savedValue);
        if (schema) {
          const result = schema.safeParse(parsedValue);
          if (!result.success) {
            setError(new Error("Validation failed: " + result.error.message));
            return;
          }
          return result.data;
        }
        return parsedValue as T;
      } catch (error) {
        setError(new Error("Error with getting values in localStorage"));
      }
    }
    return initialValue;
  };
  const [value, setValueState] = useState<T | undefined>(getSavedValue);

  const setLocalStorageValue = (newValue: T) => {
    if (schema) {
      const validationResult = schema.safeParse(newValue);
      if (!validationResult.success) {
        setError(new Error(validationResult.error.message));
        return;
      }
    }
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValueState(newValue);
      setError(null);
    } catch (error) {
      setError(new Error("Error with saving data"));
    }
  };

  return { value, setValue: setLocalStorageValue, error };
};

export default useLocalStorage;
