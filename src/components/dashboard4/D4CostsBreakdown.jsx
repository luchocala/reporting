import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", cogs: 90000, opex: 60000 }, { month: "Feb", cogs: 100000, opex: 65000 },
  { month: "Mar", cogs: 110000, opex: 68000 }, { month: "Apr", cogs: 115000, opex: 70000 },
  { month: "May", cogs: 120000, opex: 72000 }, { month: "Jun", cogs: 125000, opex: 75000 },
  { month: "Jul", cogs: 130000, opex: 78000 }, { month: "Aug", cogs: 140000, opex: 82000 },
  { month: "Sep", cogs: 145000, opex: 85000 }, { month: "Oct", cogs: 150000, opex: 88000 },
  { month: "Nov", cogs: 160000, opex: 92000 }, { month: "Dec", cogs: 170000, opex: 95000 },
];

export default function D4CostsBreakdown() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Costs Breakdown</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-2xl font-bold">$2,705,800.00</p>
              <span className="flex items-center gap-0.5 text-xs text-red-500 font-medium"><TrendingDown className="size-3" />-12.1%</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <button className="font-medium text-foreground">COGS</button>
            <button className="hover:text-foreground">Operating Expenses</button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barCategoryGap="20%" stackOffset="none">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} width={48} tickFormatter={(v) => `$${v/1000}K`} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v) => [`$${(v/1000).toFixed(0)}K`]} />
              <Bar dataKey="cogs" stackId="a" fill="#1a1a1a" name="COGS" />
              <Bar dataKey="opex" stackId="a" fill="#9ca3af" radius={[3, 3, 0, 0]} name="Operating Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}