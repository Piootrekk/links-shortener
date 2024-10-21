import { AxiosError } from "axios";
import { ZodError } from "zod";

const transformErrorToDefault = (err: unknown): Error => {
  if (err instanceof AxiosError) {
    if (err.response) {
      return new Error(
        err.response.data.message || "An unknown error occurred"
      );
    }
    if (err.request) {
      return new Error("No response from server");
    }
    return new Error("An unknown error occurred");
  }
  if (err instanceof ZodError) {
    return new Error("Validation failed: " + err.message);
  }
  if (err instanceof Error) {
    return err;
  }
  if (import.meta.env.VITE_MODE === "development") {
    console.error(err);
  }
  return new Error("An unknown error occurred");
};

const errorSetter = (setError: (error: Error | null) => void) => {
  return (err: unknown) => {
    const error = transformErrorToDefault(err);
    setError(error);
  };
};
export { errorSetter, transformErrorToDefault };
