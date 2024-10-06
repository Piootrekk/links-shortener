import { useEffect } from "react";
import useFetchMultiple from "@/hooks/useFetchCallback";
import { personalLinks } from "@/Api/endpoints";
import { TUrls } from "@/schemas/dbSchema";
import DashboardMain from "@/components/Dashboard/DashboardMain";

const DashboardView = () => {
  const { data, isLoading, error, execute } = useFetchMultiple<TUrls>();

  useEffect(() => {
    execute(personalLinks);
  }, []);

  if (isLoading || error || data === undefined || data === null) {
    return <div>Loading...</div>;
  }

  return <DashboardMain links={data} />;
};

export default DashboardView;
