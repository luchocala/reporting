import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const segments = [
  { label: "Enterprise", value: "1,074", change: "+3.2%", positive: true },
  { label: "SMB", value: "836", change: "-1.5%", positive: false },
  { label: "Individual", value: "478", change: "+5.8%", positive: true },
];

const sparkData = [
  { day: "Mon", v: 1800 }, { day: "Tue", v: 2200 }, { day: "Wed", v: 1900 },
  { day: "Thu", v: 2500 }, { day: "Fri", v: 2100 }, { day: "Sat", v: 1600 }, { day: "Sun", v: 1300 },
];

export default function D8TotalCustomers() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-3xl font-bold tracking-tight">2,388</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
              <TrendingUp className="size-3" />+2.9% <span className="text-muted-foreground font-normal">vs Sat</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{s.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium tabular-nums">{s.value}</span>
              <span className={`text-xs font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>{s.positive ? "↑" : "↓"}{s.change}</span>
            </div>
          </div>
        ))}
        <div className="h-24 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
              <Line type="monotone" dataKey="v" stroke="hsl(var(--foreground))" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}