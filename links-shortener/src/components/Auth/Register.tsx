import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { signUpSchema, TSignUpSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpin from "../ui/loading-spin";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const { user, handleRegister } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (formData: TSignUpSchema) => {
    handleRegister(formData.email, formData.password, formData.confirmPassword);
  };

  return (
    <>
      <Card>
        <CardHeader className="text-2xl">
          Register
          <CardDescription className="text-sm">
            <label>to create an account.</label>
          </CardDescription>
          {user.error && <ErrorMessage message={user.error.message} />}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Type your email"
                {...register("email")}
                autoComplete="email"
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Type your password"
                {...register("password")}
                autoComplete="new-password"
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
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <ErrorMessage message={errors.confirmPassword.message} />
              )}
            </div>
            <Button type="submit" className="w-full p-2" variant={"secondary"}>
              {user.isLoading ? <LoadingSpin /> : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Register;
