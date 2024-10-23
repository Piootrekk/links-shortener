import { createBrowserRouter } from "react-router-dom";
import DefaultSkeletonLayout from "./Layout/DefaultSkeletonLayout";
import SkeletonHome from "@/components/Loading/SkeletonHome";
import SkeletonAuth from "@/components/Loading/SkeletonAuth";
import SkeletonDashboard from "@/components/Loading/SkeletonDashboard";
import SkeletonUniversal from "@/components/Loading/SkeletonUniversal";

const routerSkeleton = createBrowserRouter([
  {
    element: <DefaultSkeletonLayout />,
    children: [
      {
        path: "/",
        element: <SkeletonHome />,
      },
      {
        path: "link/:id",
        element: <SkeletonUniversal />,
      },
      {
        path: "/public/:id",
        element: <SkeletonUniversal />,
      },
      {
        path: "/dashboard",
        element: <SkeletonDashboard />,
      },
      {
        path: "/auth",
        element: <SkeletonAuth />,
      },
      {
        path: "/direct/:custom_link",
        element: <SkeletonUniversal />,
      },
      {
        path: "*",
        element: <SkeletonUniversal />,
      },
      {
        path: "/404",
        element: <SkeletonUniversal />,
      },
    ],
  },
]);

export default routerSkeleton;
