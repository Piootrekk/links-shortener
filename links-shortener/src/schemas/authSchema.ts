import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
type TLoginSchema = z.infer<typeof loginSchema>;

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

type TError = {
  message: string;
};

type TLogout = null;

type TUserCredentials = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
};

export { loginSchema, signUpSchema };
export type { TLoginSchema, TSignUpSchema, TLogout, TError, TUserCredentials };
