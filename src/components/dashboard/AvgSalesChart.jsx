import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { month: "Jul", thisMonth: 740, lastMonth: 640 },
  { month: "Aug", thisMonth: 810, lastMonth: 690 },
  { month: "Sep", thisMonth: 780, lastMonth: 720 },
  { month: "Oct", thisMonth: 860, lastMonth: 750 },
  { month: "Nov", thisMonth: 830, lastMonth: 770 },
  { month: "Dec", thisMonth: 837, lastMonth: 720 },
];

export default function AvgSalesChart() {
  return (
    <Card className="shadow-none bg-muted/40">
      <CardHeader className="pb-1 space-y-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="size-4" />
          <span className="text-sm">Average Sales</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight">837</span>
          <span className="flex items-center gap-0.5 text-xs text-emerald-500 font-medium">
            <TrendingUp className="size-3" /> 1.3%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full" style={{ background: "#6366f1" }} /> This month
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full" style={{ background: "#a78bfa" }} /> Last month
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-1 pb-3 px-2">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" hide />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", color: "hsl(var(--foreground))" }}
                formatter={(v, key) => [v, key === "thisMonth" ? "This month" : "Last month"]}
              />
              <Line type="monotone" dataKey="lastMonth" stroke="#a78bfa" strokeWidth={1.5} dot={false} name="lastMonth" />
              <Line type="monotone" dataKey="thisMonth" stroke="#6366f1" strokeWidth={2} dot={false} name="thisMonth" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground px-1 mt-0.5">
          <span>Jul</span><span>Dec</span>
        </div>
      </CardContent>
    </Card>
  );
}