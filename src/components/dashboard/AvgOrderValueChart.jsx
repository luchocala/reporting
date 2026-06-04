import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingBag, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

const data = [
  { month: "Jul", value: 780 },
  { month: "Aug", value: 840 },
  { month: "Sep", value: 920 },
  { month: "Oct", value: 860 },
  { month: "Nov", value: 1050 },
  { month: "Dec", value: 959 },
];

const MAX_IDX = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "hsl(var(--foreground))", boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}>
      <p className="font-medium">{payload[0].payload.month}</p>
      <p className="text-muted-foreground">${payload[0].value}</p>
    </div>
  );
};

export default function AvgOrderValueChart() {
  return (
    <Card className="shadow-none bg-muted/40">
      <CardHeader className="pb-1 space-y-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShoppingBag className="size-4" />
          <span className="text-sm">Average Order Value</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight">$959.00</span>
          <span className="flex items-center gap-0.5 text-xs text-emerald-500 font-medium">
            <TrendingUp className="size-3" /> 2.4%
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </CardHeader>
      <CardContent className="pt-1 pb-3 px-2">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }} barCategoryGap="30%">
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, Math.max(...data.map(d => d.value)) * 1.25]} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={i === MAX_IDX ? "#6366f1" : "#cbd5e1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}