import { useAnalyticsData } from "@/context/AnalyticsDataContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardAnalytics from "./DashboardAnalytics";
import SkeletonUniversal from "../Loading/SkeletonUniversal";
import ErrorMessage from "../Error/ErrorMessage";

const MainAnalytics = () => {
  const { id } = useParams();
  const { analytics } = useAnalyticsData();
  if (!id) return <ErrorMessage message="No ID provided" />;

  useEffect(() => {
    analytics.execute(id);
  }, [id]);

  if (analytics.error)
    return <ErrorMessage message={analytics.error.message} />;
  if (analytics.isLoading) return <SkeletonUniversal />;
  return <DashboardAnalytics />;
};

export default MainAnalytics;
