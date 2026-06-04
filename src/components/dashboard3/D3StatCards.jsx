import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, ShoppingBag, Users, CreditCard } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { icon: CircleDollarSign, label: "Monthly revenue", value: "$189,540.75", change: "+27.9%", delta: "($41,310.75)", positive: true },
  { icon: ShoppingBag, label: "Orders fulfilled", value: "21,847", change: "+18.4%", delta: "(3,395)", positive: true },
  { icon: Users, label: "New customers", value: "4,975", change: "+20.8%", delta: "(855)", positive: true },
  { icon: CreditCard, label: "Refunds issued", value: "$8,473.00", change: "-13.7%", delta: "($1,348.00)", positive: false },
];

export default function D3StatCards() {
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
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <div className={`flex items-center gap-1 text-xs mt-1.5 font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
                {s.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {s.change}{s.delta} <span className="text-muted-foreground font-normal">vs Last Month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}