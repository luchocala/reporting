import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Monthly revenue",
    prev: "$148,230.00 previous month",
    value: "$189,540.75",
    change: "+27.9%",
    positive: true,
  },
  {
    label: "Orders fulfilled",
    prev: "18,452 previous month",
    value: "21,847",
    change: "+18.4%",
    positive: true,
  },
  {
    label: "New customers",
    prev: "4,120 previous month",
    value: "4,975",
    change: "+20.8%",
    positive: true,
  },
  {
    label: "Refunds issued",
    prev: "$9,821.00 previous month",
    value: "$8,473.00",
    change: "-13.7%",
    positive: false,
  },
];

export default function StatCards() {
  return (
    <Card className="shadow-none bg-muted/40">
      <CardContent className="p-0">
        <div className="grid grid-cols-2 xl:grid-cols-4 divide-x divide-y xl:divide-y-0 divide-border">
          {stats.map((s) => (
            <div key={s.label} className="p-5 space-y-1.5">
              <p className="text-xs text-muted-foreground">{s.prev}</p>
              <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
              <div className="flex items-center gap-1 text-xs">
                {s.positive ? (
                  <TrendingUp className="size-3 text-emerald-600" />
                ) : (
                  <TrendingDown className="size-3 text-red-500" />
                )}
                <span className={s.positive ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
                  {s.change}
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground pt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}