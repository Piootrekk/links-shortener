import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { DbProvider } from "./context/DbContext";
import router from "./router/router";

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
