import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { signUpSchema, TSignUpSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/supabase/auth";
import useFetchCallback from "@/hooks/useFetchCallback";

const Register = () => {
  const { error, isLoading, execute } = useFetchCallback(signUp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (formData: TSignUpSchema) => {
    execute(formData.email, formData.password);
  };

  return (
    <>
      <Card>
        <CardHeader className="text-2xl">
          Register
          <CardDescription className="text-sm">
            <label>to create an account.</label>
          </CardDescription>
          {error && <ErrorMessage message={error.message} />}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Type your email"
                {...register("email")}
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Type your password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
            <div className="mb-4"></div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <ErrorMessage message={errors.confirmPassword.message} />
              )}
            </div>
            <Button type="submit" className="w-full p-2">
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
