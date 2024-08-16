import { createBrowserRouter } from "react-router-dom";
import DefaultSkeletonLayout from "./Layout/DefaultSkeletonLayout";
import SkeletonHome from "@/components/Loading/SkeletonHome";
import SkeletonAuth from "@/components/Loading/SkeletonAuth";

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
        element: <SkeletonHome />,
      },
      {
        path: "/dashboard",
        element: <SkeletonHome />,
      },
      {
        path: "/auth",
        element: <SkeletonAuth />,
      },
      {
        path: "/:custom_link",
        element: <SkeletonHome />,
      },
      {
        path: "*",
        element: <SkeletonHome />,
      },
    ],
  },
]);

export default routerSkeleton;
