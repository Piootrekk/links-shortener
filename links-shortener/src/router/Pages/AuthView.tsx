import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

type TAuthVariant = "Login" | "Register";
const AuthView = () => {
  const [variant, setVariant] = useState<TAuthVariant>("Login");
  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <h1 className="sm:text-5xl text-4xl font-extrabold">{variant}</h1>
      <Tabs defaultValue="Login" className="w-[400px] py-12">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="Login" onClick={() => setVariant("Login")}>
            Login
          </TabsTrigger>
          <TabsTrigger value="Register" onClick={() => setVariant("Register")}>
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="Register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthView;
