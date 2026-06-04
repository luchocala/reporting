import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { day: "Mon", revenue: 2100, expenses: 1400 },
  { day: "Tue", revenue: 2400, expenses: 1600 },
  { day: "Wed", revenue: 2900, expenses: 1800 },
  { day: "Thu", revenue: 2200, expenses: 1500 },
  { day: "Fri", revenue: 2600, expenses: 1700 },
  { day: "Sat", revenue: 1800, expenses: 900 },
  { day: "Sun", revenue: 2000, expenses: 1200 },
];

export default function D7RevenueChart() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="size-4 text-muted-foreground" />
            <span className="font-semibold">Revenue</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-foreground" />Revenue</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/40" />Expenses</span>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">$8,900.00</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">This week vs last week</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={40} tickFormatter={(v) => `$${v >= 1000 ? v/1000+"K" : v}`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v) => [`$${v.toLocaleString()}`]} />
              <Bar dataKey="revenue" fill="hsl(var(--foreground))" radius={[3, 3, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="hsl(var(--muted-foreground)/40)" radius={[3, 3, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}