import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { TLoginSchema, loginSchema } from "@/schemas/authSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpin from "../ui/loading-spin";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const { handleLogin, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (formData: TLoginSchema) => {
    handleLogin(formData.email, formData.password);
  };

  return (
    <>
      <Card>
        <CardHeader className="text-2xl">
          Login
          <CardDescription>
            <label>to your account if you have one.</label>
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
                autoComplete="current-password"
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
            <Button type="submit" className="w-full p-2" variant={"secondary"}>
              {user.isLoading ? <LoadingSpin /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
