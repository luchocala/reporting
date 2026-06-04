import StatCards6 from "@/components/dashboard6/StatCards6";
import CategoryPerformanceChart from "@/components/dashboard6/CategoryPerformanceChart";
import OrderFulfillmentTable from "@/components/dashboard6/OrderFulfillmentTable";
import RecentOrdersTable6 from "@/components/dashboard6/RecentOrdersTable6";

export default function Dashboard6() {
  return (
    <div className="space-y-4">
      <StatCards6 />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <CategoryPerformanceChart />
        <OrderFulfillmentTable />
      </div>
      <RecentOrdersTable6 />
    </div>
  );
}