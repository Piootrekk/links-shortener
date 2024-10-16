import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import HomeView from "./Pages/HomeView";
import DashboardView from "./Pages/DashboardView";
import AuthView from "./Pages/AuthView";
import RedirectView from "./Pages/RedirectView";
import RequireNotAuth from "./Guard/RequireNotAuth";
import RequireAuth from "./Guard/RequireAuth";
import LinkAnalytics from "./Pages/LinkAnalytics";
import ColorsTest from "@/components/Mock/ColorsTest";
import RouteEndpoints from "@/components/Mock/RouteEndpoints";
import { NotFound, Forbidden } from "./Pages/Error";

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
        element: <LinkAnalytics />,
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
        path: "/direct/:custom_link",
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
      {
        path: "/404",
        element: <NotFound />,
      },
      { path: "/403", element: <Forbidden /> },
    ],
  },
]);

export default router;
