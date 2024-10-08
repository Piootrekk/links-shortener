import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import HomeView from "./Pages/HomeView";
import DashboardView from "./Pages/DashboardView";
import AuthView from "./Pages/AuthView";
import RedirectView from "./Pages/RedirectView";
import RequireNotAuth from "./Guard/RequireNotAuth";
import RequireAuth from "./Guard/RequireAuth";
import LinkView from "./Pages/LinkView";
import ColorsTest from "@/components/Mock/ColorsTest";
import RouteEndpoints from "@/components/Mock/RouteEndpoints";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "link/:id",
        element: <LinkView />,
      },
      {
        path: "/auth",
        element: (
          <RequireNotAuth>
            <AuthView />
          </RequireNotAuth>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <DashboardView />
          </RequireAuth>
        ),
      },
      {
        path: "/:custom_link",
        element: <RedirectView />,
      },
      {
        path: "/test",
        element: <ColorsTest />,
      },
      {
        path: "/routes-test",
        element: <RouteEndpoints />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
