import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import LandingView from "./Pages/LandingView";
import DashboardView from "./Pages/DashboardView";
import AuthView from "./Pages/AuthView";
import RedirectView from "./Pages/RedirectView";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <LandingView />,
      },
      {
        path: "/dashboard",
        element: <DashboardView />,
      },
      {
        path: "link/:id",
        element: <LandingView />,
      },
      {
        path: "auth",
        element: <AuthView />,
      },
      {
        path: "/:id",
        element: <RedirectView />,
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;
