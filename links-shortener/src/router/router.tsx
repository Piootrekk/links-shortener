import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";

import RequireNotAuth from "./Guard/RequireNotAuth";
import RequireAuth from "./Guard/RequireAuth";

import SkeletonAuth from "@/components/Loading/SkeletonAuth";
import SkeletonDashboard from "@/components/Loading/SkeletonDashboard";
import SkeletonHome from "@/components/Loading/SkeletonHome";
import SkeletonUniversal from "@/components/Loading/SkeletonUniversal";

import { NotFound } from "./Pages/Error";
import { Forbidden } from "./Pages/Error";

const HomeView = lazy(() => import("./Pages/HomeView"));
const DashboardView = lazy(() => import("./Pages/DashboardView"));
const AuthView = lazy(() => import("./Pages/AuthView"));
const RedirectView = lazy(() => import("./Pages/RedirectView"));
const LinkAnalytics = lazy(() => import("./Pages/LinkAnalytics"));
const ColorsTest = lazy(() => import("@/components/Mock/ColorsTest"));
const RouteEndpoints = lazy(() => import("@/components/Mock/RouteEndpoints"));
const LinkPublicAnalytics = lazy(() => import("./Pages/LinkPublicAnalytics"));

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<SkeletonHome />}>
            <HomeView />
          </Suspense>
        ),
      },
      {
        path: "link/:id",
        element: (
          <RequireAuth>
            <Suspense fallback={<SkeletonUniversal />}>
              <LinkAnalytics />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/p/:id",
        element: (
          <Suspense fallback={<SkeletonUniversal />}>
            <LinkPublicAnalytics />
          </Suspense>
        ),
      },
      {
        path: "/auth",
        element: (
          <RequireNotAuth>
            <Suspense fallback={<SkeletonAuth />}>
              <AuthView />
            </Suspense>
          </RequireNotAuth>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Suspense fallback={<SkeletonDashboard />}>
              <DashboardView />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: "/direct/:custom_link",
        element: (
          <Suspense fallback={<SkeletonUniversal />}>
            <RedirectView />
          </Suspense>
        ),
      },
      {
        path: "/test",
        element: (
          <Suspense fallback={<SkeletonUniversal />}>
            <ColorsTest />
          </Suspense>
        ),
      },
      {
        path: "/routes-test",
        element: (
          <Suspense fallback={<SkeletonUniversal />}>
            <RouteEndpoints />
          </Suspense>
        ),
      },
      {
        path: "/*",
        element: <NotFound />,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
      {
        path: "/403",
        element: <Forbidden />,
      },
    ],
  },
]);

export default router;
