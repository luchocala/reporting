import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { month: "Jan", v: 280000 }, { month: "Feb", v: 300000 }, { month: "Mar", v: 310000 },
  { month: "Apr", v: 340000 }, { month: "May", v: 370000 }, { month: "Jun", v: 390000 },
  { month: "Jul", v: 430000 }, { month: "Aug", v: 480000 }, { month: "Sep", v: 510000 },
  { month: "Oct", v: 560000 }, { month: "Nov", v: 600000 }, { month: "Dec", v: 640000 },
];

export default function D4RevenueOverview() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div>
          <p className="text-xs text-muted-foreground">Revenue Overview</p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-2xl font-bold">$4,702,000.00</p>
            <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-medium"><TrendingUp className="size-3" />+18.5%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={48} tickFormatter={(v) => `$${v/1000}K`} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v) => [`$${(v/1000).toFixed(0)}K`]} />
              <Line type="monotone" dataKey="v" stroke="hsl(var(--foreground))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}