import ErrorMessage from "../Error/ErrorMessage";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { TLoginSchema, loginSchema } from "@/components/schemas/authSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginSchema) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader className="text-2xl">
        Login
        <CardDescription>
          <label>to your account if you have one.</label>
        </CardDescription>
        {/* <ErrorMessage message="Global error" /> */}
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
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
