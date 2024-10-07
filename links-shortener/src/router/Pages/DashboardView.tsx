import DashboardMain from "@/components/Dashboard/DashboardMain";
import { RefreshDataProvider } from "@/context/RefreshDataContext";

const DashboardView = () => {
  return (
    <RefreshDataProvider>
      <DashboardMain />
    </RefreshDataProvider>
  );
};

export default DashboardView;
