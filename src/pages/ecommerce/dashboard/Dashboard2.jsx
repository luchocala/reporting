

import D2StatCards from "@/components/dashboard2/D2StatCards";
import D2RevenueChart from "@/components/dashboard2/D2RevenueChart";
import D2RevenueChannels from "@/components/dashboard2/D2RevenueChannels";
import D2RecentOrders from "@/components/dashboard2/D2RecentOrders";

export default function Dashboard2() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Welcome Back, John!</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Today you have <span className="text-foreground font-medium">12 orders</span> to fulfill,{" "}
            <span className="text-foreground font-medium">3 returns</span> pending
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-border px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors">
            Export
          </button>
          <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity">
            + Add Product
          </button>
        </div>
      </div>
      <D2StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <D2RevenueChart />
        <D2RevenueChannels />
      </div>
      <D2RecentOrders />
    </div>
  );
}