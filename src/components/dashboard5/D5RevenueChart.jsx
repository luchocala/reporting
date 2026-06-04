import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { month: "Jan", thisYear: 32000, prevYear: 28000 },
  { month: "Feb", thisYear: 28000, prevYear: 32000 },
  { month: "Mar", thisYear: 45000, prevYear: 38000 },
  { month: "Apr", thisYear: 38000, prevYear: 42000 },
  { month: "May", thisYear: 52000, prevYear: 40000 },
  { month: "Jun", thisYear: 48000, prevYear: 44000 },
];

export default function D5RevenueChart() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">$276,000.00</p>
            <p className="text-xs text-muted-foreground">Total Revenue (Last 6 Months)</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-foreground" />This Year</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/40" />Prev Year</span>
            </div>
            <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={40} tickFormatter={(v) => `$${v/1000}K`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v) => [`$${v.toLocaleString()}`]} />
              <Bar dataKey="thisYear" fill="hsl(var(--foreground))" radius={[3, 3, 0, 0]} name="This Year" />
              <Bar dataKey="prevYear" fill="hsl(var(--muted-foreground)/40)" radius={[3, 3, 0, 0]} name="Prev Year" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}