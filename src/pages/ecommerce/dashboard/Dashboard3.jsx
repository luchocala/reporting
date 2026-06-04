

import D3StatCards from "@/components/dashboard3/D3StatCards";
import D3RevenueChart from "@/components/dashboard3/D3RevenueChart";
import D3OrderStatus from "@/components/dashboard3/D3OrderStatus";
import D3SalesByCategory from "@/components/dashboard3/D3SalesByCategory";
import D3RecentTransactions from "@/components/dashboard3/D3RecentTransactions";
import D3RecentActivity from "@/components/dashboard3/D3RecentActivity";

export default function Dashboard3() {
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
          <button className="flex items-center gap-1.5 border border-border px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors">Export</button>
          <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90 transition-opacity">+ Add Product</button>
        </div>
      </div>
      <D3StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
        <D3RevenueChart />
        <div className="space-y-4">
          <D3OrderStatus />
          <D3SalesByCategory />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <D3RecentTransactions />
        <D3RecentActivity />
      </div>
    </div>
  );
}