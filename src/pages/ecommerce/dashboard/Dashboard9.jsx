import { useState } from "react";
import D9StatCards from "@/components/dashboard9/D9StatCards";
import D9SalesRevenueChart from "@/components/dashboard9/D9SalesRevenueChart";
import D9TotalCustomers from "@/components/dashboard9/D9TotalCustomers";
import D9GeographyCard from "@/components/dashboard9/D9GeographyCard";
import D9RecentOrders from "@/components/dashboard9/D9RecentOrders";

const TABS = ["Overview", "Orders", "Products", "Customers", "Analytics"];

export default function Dashboard9() {
  const [tab, setTab] = useState("Overview");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-0 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">
          <span className="text-foreground font-medium">Acme Store</span> / Overview
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">Ecommerce analytics and performance metrics</p>
      </div>
      <D9StatCards />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
        <D9SalesRevenueChart />
        <D9TotalCustomers />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4">
        <D9GeographyCard />
        <D9RecentOrders />
      </div>
    </div>
  );
}