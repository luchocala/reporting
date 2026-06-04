import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, MoreHorizontal } from "lucide-react";

const data = [
  { month: "JAN", value: 320000 }, { month: "FEB", value: 340000 }, { month: "MAR", value: 330000 },
  { month: "APR", value: 350000 }, { month: "MAY", value: 480000 }, { month: "JUN", value: 510000 },
  { month: "JUL", value: 580000 }, { month: "AUG", value: 640000 }, { month: "SEP", value: 590000 },
  { month: "OCT", value: 520000 }, { month: "NOV", value: 430000 }, { month: "DEC", value: 490000 },
];

const MAX_IDX = data.reduce((b, d, i) => (d.value > data[b].value ? i : b), 0);

const PERIODS = [
  { label: "4w", change: "+11.6%" },
  { label: "13w", change: "+7.9%" },
  { label: "12m", change: "-3.4%", negative: true },
];

export default function D9SalesRevenueChart() {
  const [period, setPeriod] = useState("4w");
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Sales Revenue</p>
            <p className="text-3xl font-bold tracking-tight" style={{ fontFamily: "monospace" }}>$640,000</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
              <TrendingUp className="size-3" />+8.2% <span className="text-muted-foreground font-normal">vs Last month</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {PERIODS.map((p) => (
              <button key={p.label} onClick={() => setPeriod(p.label)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${period === p.label ? "bg-muted" : "hover:bg-muted/50"}`}>
                <span className="text-muted-foreground">{p.label}</span>
                <span className={p.negative ? "text-red-500" : "text-emerald-600"}>{p.change}</span>
              </button>
            ))}
            <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} formatter={(v) => [`$${(v/1000).toFixed(0)}K`]} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {data.map((_, i) => <Cell key={i} fill={i === MAX_IDX ? "#1a1a1a" : "#e5e7eb"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}