import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import AuthProvider from "./context/AuthContext";
import { DbProvider } from "./context/DbContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <DbProvider>
          <RouterProvider router={router} />
        </DbProvider>
      </AuthProvider>
    </>
  );
};

export default App;
