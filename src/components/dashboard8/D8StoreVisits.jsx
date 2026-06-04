import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { month: "Jan", v: 420 }, { month: "Feb", v: 380 }, { month: "Mar", v: 450 },
  { month: "Apr", v: 390 }, { month: "May", v: 480 }, { month: "Jun", v: 520 },
  { month: "Jul", v: 610 }, { month: "Aug", v: 580 }, { month: "Sep", v: 650 },
  { month: "Oct", v: 720 }, { month: "Nov", v: 680 }, { month: "Dec", v: 198 },
];

const PERIODS = [
  { label: "3m", change: "+25%", positive: true },
  { label: "6m", change: "+25%", positive: true },
  { label: "1y", change: "-12.5%", positive: false },
];

export default function D8StoreVisits() {
  const [period, setPeriod] = useState("6m");
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Store Visits</p>
            <p className="text-3xl font-bold tracking-tight" style={{ fontFamily: "monospace" }}>701.34M</p>
            <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium mt-1">
              <TrendingDown className="size-3" />-12.5% <span className="text-muted-foreground font-normal">vs Last month</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {PERIODS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPeriod(p.label)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${period === p.label ? "bg-muted" : "hover:bg-muted/50"}`}
              >
                <span className="text-muted-foreground">{p.label}</span>
                <span className={p.positive ? "text-emerald-600" : "text-red-500"}>{p.change}</span>
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="storeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Area type="monotone" dataKey="v" stroke="hsl(var(--foreground))" strokeWidth={1.5} fill="url(#storeGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}