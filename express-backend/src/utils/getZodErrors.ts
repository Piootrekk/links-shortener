import { ZodIssue } from "zod";

const getZodErrors = (errors: ZodIssue[]) => {
  const errorMessages: string[] = [];

  errors.forEach((error) => {
    errorMessages.push(error.message);
  });

  return {
    message: `Errors from server: ${errorMessages.join(", ")}.`,
  };
};

export { getZodErrors };
