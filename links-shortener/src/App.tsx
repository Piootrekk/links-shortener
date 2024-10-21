import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import router from "./router/router";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
