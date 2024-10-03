import { ZodIssue } from "zod";

const getZodErrors = (errors: ZodIssue[]) => {
  const errorObject: Record<string, string> = {};

  errors.forEach((error) => {
    errorObject[error.path[0]] = error.message;
  });

  return errorObject;
};

export { getZodErrors };
