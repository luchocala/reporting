

import { useState } from "react";
import D4RevenueOverview from "@/components/dashboard4/D4RevenueOverview";
import D4CostsBreakdown from "@/components/dashboard4/D4CostsBreakdown";
import D4StatCards from "@/components/dashboard4/D4StatCards";
import D4TransactionsTable from "@/components/dashboard4/D4TransactionsTable";

const PERIODS = ["1 Year", "3 Months", "30 Days"];

export default function Dashboard4() {
  const [period, setPeriod] = useState("1 Year");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                period === p ? "bg-foreground text-background" : "hover:bg-muted text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-border px-3 py-1.5 rounded-md text-sm hover:bg-muted transition-colors">Export</button>
          <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">+ New Transaction</button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <D4RevenueOverview />
        <D4CostsBreakdown />
      </div>
      <D4StatCards />
      <D4TransactionsTable />
    </div>
  );
}