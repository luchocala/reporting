
import D5RevenueChart from "@/components/dashboard5/D5RevenueChart";
import D5StatCards from "@/components/dashboard5/D5StatCards";
import D5CategoryPerformance from "@/components/dashboard5/D5CategoryPerformance";
import D5OrderFulfillment from "@/components/dashboard5/D5OrderFulfillment";

export default function Dashboard5() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <D5RevenueChart />
        <D5StatCards />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <D5CategoryPerformance />
        <D5OrderFulfillment />
      </div>
    </div>
  );
}