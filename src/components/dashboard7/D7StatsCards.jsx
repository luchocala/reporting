import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { label: "In-store Sales", value: "$7,820.75", change: "+$322.50 vs last month", positive: true, sub: "Based on 5,000 orders" },
  { label: "Website Sales", value: "$985,937.45", change: "+$109,500.00 vs last month", positive: true, sub: "Based on 21,000 orders" },
  { label: "Wholesale", value: "$124,650.00", change: "+$7,935.00 vs last month", positive: true, sub: "Based on 890 orders" },
  { label: "Returns", value: "$15,503.00", change: "-$498.00 vs last month", positive: false, sub: "Based on 6,000 orders" },
];

export default function D7StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="shadow-none">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
            <p className="text-2xl font-bold tracking-tight">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs mt-1.5 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
              {s.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {s.change}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}