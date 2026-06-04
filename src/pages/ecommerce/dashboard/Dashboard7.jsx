

import D7StatCards from "@/components/dashboard7/D7StatsCards";
import D7RevenueChart from "@/components/dashboard7/D7RevenueChart";
import D7SalesPipeline from "@/components/dashboard7/D7SalesPipeline";
import D7BottomRow from "@/components/dashboard7/D7BottomRow";

export default function Dashboard7() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">A summary for all the purchases, sales etc.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Jan 1 – 31, 2025</span>
          <button className="border border-border rounded-md px-3 py-1.5 text-xs font-medium hover:bg-muted">All Platforms</button>
          <button className="border border-border rounded-md px-3 py-1.5 text-xs font-medium hover:bg-muted">All Products</button>
          <button className="border border-border rounded-md px-3 py-1.5 text-xs font-medium hover:bg-muted">Export</button>
        </div>
      </div>
      <D7StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-4">
        <D7RevenueChart />
        <D7SalesPipeline />
      </div>
      <D7BottomRow />
    </div>
  );
}