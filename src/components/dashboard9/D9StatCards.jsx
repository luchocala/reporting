import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$485,000", change: "-12.5%", positive: false, sub: "vs Last Month" },
  { label: "Conversion Rate", value: "18.5%", change: "-12.5%", positive: false, sub: "vs Last Month" },
  { label: "Total Orders", value: "92", change: "+25%", positive: true, sub: "vs Last Month" },
  { label: "Active Customers", value: "38", change: "+25%", positive: true, sub: "vs Last Month" },
];

export default function D9StatCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="shadow-none">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold tracking-tight mt-1">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs mt-1.5 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
              {s.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {s.change} <span className="text-muted-foreground font-normal">{s.sub}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}