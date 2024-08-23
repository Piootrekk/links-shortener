import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { TLoginSchema, loginSchema } from "@/schemas/authSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetchCallback from "@/hooks/useFetchCallback";
import { login } from "@/Api/auth";
import UserAuthChecker from "./UserAuthChecker";
import LoadingSpin from "../ui/loading-spin";
import { useEffect } from "react";

const Login = () => {
  const { data, error, isLoading, execute } = useFetchCallback(login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = (formData: TLoginSchema) => {
    execute(formData.email, formData.password);
  };

  return (
    <>
      {data && <UserAuthChecker />}
      <Card>
        <CardHeader className="text-2xl">
          Login
          <CardDescription>
            <label>to your account if you have one.</label>
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
              {errors.email && <ErrorMessage message={errors.email.message!} />}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Type your password"
                {...register("password")}
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message!} />
              )}
            </div>
            <Button type="submit" className="w-full p-2">
              {isLoading ? <LoadingSpin /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
