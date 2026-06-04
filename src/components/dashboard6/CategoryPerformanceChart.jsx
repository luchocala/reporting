import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weekData = [
  { day: "Mon", electronics: 320, clothing: 580, homeGarden: 480, sports: 210 },
  { day: "Tue", electronics: 520, clothing: 420, homeGarden: 360, sports: 310 },
  { day: "Wed", electronics: 680, clothing: 310, homeGarden: 590, sports: 250 },
  { day: "Thu", electronics: 420, clothing: 740, homeGarden: 310, sports: 480 },
  { day: "Fri", electronics: 870, clothing: 560, homeGarden: 420, sports: 380 },
  { day: "Sat", electronics: 650, clothing: 820, homeGarden: 680, sports: 540 },
  { day: "Sun", electronics: 810, clothing: 640, homeGarden: 510, sports: 620 },
];

const monthData = [
  { day: "W1", electronics: 2200, clothing: 3100, homeGarden: 2800, sports: 1500 },
  { day: "W2", electronics: 3100, clothing: 2600, homeGarden: 3200, sports: 2100 },
  { day: "W3", electronics: 3800, clothing: 3500, homeGarden: 2500, sports: 2700 },
  { day: "W4", electronics: 2900, clothing: 4100, homeGarden: 3100, sports: 3200 },
];

const LINES = [
  { key: "electronics", label: "Electronics", color: "#1a1a1a" },
  { key: "clothing", label: "Clothing", color: "#6b6b6b" },
  { key: "homeGarden", label: "Home & Garden", color: "#a3a3a3" },
  { key: "sports", label: "Sports", color: "#d4d4d4" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "hsl(var(--foreground))", boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}>
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full shrink-0" style={{ background: p.stroke }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-medium tabular-nums">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function CategoryPerformanceChart() {
  const [view, setView] = useState("week");
  const data = view === "week" ? weekData : monthData;

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Category Performance</p>
            <p className="text-2xl font-semibold tracking-tight mt-0.5">11,308</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {LINES.map((l) => (
                <span key={l.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-2 rounded-full shrink-0" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center border rounded-md overflow-hidden shrink-0">
            {["week", "month"].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  view === v ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {v === "week" ? "Week" : "Month"}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              {LINES.map((l) => (
                <Line
                  key={l.key}
                  type="monotone"
                  dataKey={l.key}
                  stroke={l.color}
                  strokeWidth={1.5}
                  dot={false}
                  name={l.label}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}