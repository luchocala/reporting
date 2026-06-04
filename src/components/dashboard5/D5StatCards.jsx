import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$1,800,000.00", change: "+12.0%", positive: true },
  { label: "Avg. Fulfillment", value: "2.4 days", change: "-5.0%", positive: false },
  { label: "Orders", value: "9,420", change: "+18.0%", positive: true },
  { label: "Conversion Rate", value: "4.2%", change: "+1.2%", positive: true },
  { label: "Return Rate", value: "3.1%", change: "-11.0%", positive: false },
  { label: "Page Views", value: "184K", change: "+22.0%", positive: true },
];

export default function D5StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <Card key={s.label} className="shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <button className="p-0.5 hover:bg-muted rounded"><MoreHorizontal className="size-3.5 text-muted-foreground" /></button>
            </div>
            <p className="text-lg font-bold tracking-tight mt-1">{s.value}</p>
            <p className={`text-xs mt-1 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
              {s.change} <span className="text-muted-foreground font-normal">vs last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}