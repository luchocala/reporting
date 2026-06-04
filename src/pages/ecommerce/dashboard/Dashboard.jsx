

import StatCards from "../../../components/dashboard/StatCards";
import TotalRevenueChart from "../../../components/dashboard/TotalRevenueChart";
import RevenueByChannelChart from "../../../components/dashboard/RevenueByChannelChart";
import AvgOrderValueChart from "../../../components/dashboard/AvgOrderValueChart";
import AvgSalesChart from "../../../components/dashboard/AvgSalesChart";
import ProductCategoriesChart from "../../../components/dashboard/ProductCategoriesChart";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <StatCards />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
        <TotalRevenueChart />
        <RevenueByChannelChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AvgOrderValueChart />
        <AvgSalesChart />
        <ProductCategoriesChart />
      </div>
    </div>
  );
}