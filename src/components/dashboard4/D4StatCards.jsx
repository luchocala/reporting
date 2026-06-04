import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, TrendingUp, RefreshCw, CreditCard } from "lucide-react";

const stats = [
  { icon: CircleDollarSign, label: "Gross Revenue", sub: "$426,800.00 previous month", value: "$487,500.00", change: "+14.2%", positive: true },
  { icon: TrendingUp, label: "Net Profit", sub: "$168,200.00 previous month", value: "$213,100.00", change: "+26.7%", positive: true },
  { icon: RefreshCw, label: "Refund Rate", sub: "4.2% previous month", value: "3.1%", change: "+26.2%", positive: true },
  { icon: CreditCard, label: "Avg Transaction", sub: "$68.40 previous month", value: "$74.20", change: "+8.5%", positive: true },
];

export default function D4StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label} className="shadow-none">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Icon className="size-4" />
                <span className="text-xs">{s.label}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.sub}</p>
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className={`text-xs mt-1.5 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
                {s.change} vs last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}