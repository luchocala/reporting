import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", thisYear: 42000, prevYear: 35000 },
  { month: "Feb", thisYear: 38000, prevYear: 32000 },
  { month: "Mar", thisYear: 45000, prevYear: 38000 },
  { month: "Apr", thisYear: 50000, prevYear: 40000 },
  { month: "May", thisYear: 55000, prevYear: 45000 },
  { month: "Jun", thisYear: 60000, prevYear: 48000 },
  { month: "Jul", thisYear: 58000, prevYear: 50000 },
  { month: "Aug", thisYear: 65000, prevYear: 52000 },
  { month: "Sep", thisYear: 62000, prevYear: 55000 },
  { month: "Oct", thisYear: 70000, prevYear: 58000 },
  { month: "Nov", thisYear: 68000, prevYear: 60000 },
  { month: "Dec", thisYear: 75000, prevYear: 62000 },
];

const C = { a: "#6366f1", b: "#a78bfa" };
const fmt = (v) => `$${(v / 1000).toFixed(0)}K`;

export default function TotalRevenueChart() {
  return (
    <Card className="shadow-none bg-muted/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Total Revenue</CardTitle>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: C.a }} /> This Year
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: C.b }} /> Prev Year
            </span>
          </div>
        </div>
        <div className="mt-1">
          <p className="text-2xl font-semibold tracking-tight">$633,000.00</p>
          <p className="text-xs text-muted-foreground">This year vs last year</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.a} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.a} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.b} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.b} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={42} />
              <Tooltip
                formatter={(v, name) => [`$${v.toLocaleString()}`, name === "thisYear" ? "This Year" : "Prev Year"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", color: "hsl(var(--foreground))" }}
              />
              <Area type="monotone" dataKey="prevYear" stroke={C.b} strokeWidth={1.5} fill="url(#gradB)" strokeDasharray="4 4" name="prevYear" />
              <Area type="monotone" dataKey="thisYear" stroke={C.a} strokeWidth={2} fill="url(#gradA)" name="thisYear" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}