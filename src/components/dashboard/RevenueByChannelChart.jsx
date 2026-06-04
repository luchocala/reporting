import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { channel: "Online", value: 62000 },
  { channel: "In-Store", value: 38000 },
  { channel: "Wholesale", value: 25000 },
  { channel: "Marketplace", value: 16000 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "hsl(var(--foreground))", boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}>
      <p className="font-medium">{payload[0].payload.channel}</p>
      <p className="text-muted-foreground">${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

export default function RevenueByChannelChart() {
  return (
    <Card className="shadow-none bg-muted/40">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-4 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">Revenue by Channel</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              barCategoryGap="30%"
            >
              <XAxis
                type="number"
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="channel"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={72}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }} />
              <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}