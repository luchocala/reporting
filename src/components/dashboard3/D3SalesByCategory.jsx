import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const categories = [
  { label: "Electronics", value: 145, pct: "58%", color: "#1a1a1a" },
  { label: "Accessories", value: 62, pct: "25%", color: "#6b6b6b" },
  { label: "Software", value: 33, pct: "13%", color: "#a3a3a3" },
  { label: "Other", value: 10, pct: "4%", color: "#d4d4d4" },
];

export default function D3SalesByCategory() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Sales by Category</span>
          </div>
          <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
        </div>
        <p className="text-xs text-emerald-600 font-medium">↑ +8.4% vs last month</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 h-24 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart style={{ outline: "none" }}>
                <Pie data={categories} cx="50%" cy="50%" innerRadius={28} outerRadius={44} paddingAngle={2} dataKey="value" strokeWidth={0}>
                  {categories.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold">$250K</span>
              <span className="text-[9px] text-muted-foreground">Total</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            {categories.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-muted-foreground">{c.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${c.value}K</span>
                  <span className="text-muted-foreground">{c.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}