import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const quarters = {
  "Quarter 1": {
    orders: { value: "3,120", data: [{ m: "Jan", v: 980 }, { m: "Feb", v: 1050 }, { m: "Mar", v: 1090 }] },
    sales: { value: "$78.4K", data: [{ m: "Jan", v: 24000 }, { m: "Feb", v: 27000 }, { m: "Mar", v: 27400 }] },
  },
  "Quarter 2": {
    orders: { value: "3,450", data: [{ m: "Apr", v: 1100 }, { m: "May", v: 1150 }, { m: "Jun", v: 1200 }] },
    sales: { value: "$85.2K", data: [{ m: "Apr", v: 27500 }, { m: "May", v: 28700 }, { m: "Jun", v: 29000 }] },
  },
  "Quarter 3": {
    orders: { value: "3,980", data: [{ m: "Jul", v: 1200 }, { m: "Aug", v: 1350 }, { m: "Sep", v: 1430 }] },
    sales: { value: "$94.7K", data: [{ m: "Jul", v: 30000 }, { m: "Aug", v: 32000 }, { m: "Sep", v: 32700 }] },
  },
  "Quarter 4": {
    orders: { value: "4,210", data: [{ m: "Oct", v: 1380 }, { m: "Nov", v: 1400 }, { m: "Dec", v: 1430 }] },
    sales: { value: "$102.1K", data: [{ m: "Oct", v: 33000 }, { m: "Nov", v: 34000 }, { m: "Dec", v: 35100 }] },
  },
};

export default function D7SalesPipeline() {
  const [quarter, setQuarter] = useState("Quarter 3");
  const q = quarters[quarter];
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="size-4 text-muted-foreground" />
            <span className="font-semibold">Sales Pipeline</span>
          </div>
          <select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            className="text-xs border border-border rounded-md px-2 py-1 bg-background focus:outline-none"
          >
            {Object.keys(quarters).map((k) => <option key={k}>{k}</option>)}
          </select>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pt-0">
        {[
          { label: "Total Orders", value: q.orders.value, data: q.orders.data },
          { label: "Total Sales", value: q.sales.value, data: q.sales.data },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xl font-bold">{item.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">{item.label}</p>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${item.label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  <Area type="monotone" dataKey="v" stroke="hsl(var(--foreground))" strokeWidth={1.5} fill={`url(#grad-${item.label})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}