import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Grid2X2, Users, Clock, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState } from "react";

const radarData = [
  { category: "Electronics", value: 85 },
  { category: "Clothing", value: 65 },
  { category: "Home & Garden", value: 72 },
  { category: "Sports", value: 55 },
  { category: "Beauty", value: 48 },
];

const trafficData = [
  { week: "Week 1", high: 3200, medium: 2100, low: 900 },
  { week: "Week 2", high: 4800, medium: 3100, low: 1200 },
  { week: "Week 3", high: 3500, medium: 2800, low: 800 },
  { week: "Week 4", high: 4200, medium: 3500, low: 1100 },
];

const donutData = [
  { name: "Fulfilled", value: 72, color: "#1a1a1a" },
  { name: "Pending", value: 28, color: "#d4d4d4" },
];

const invoices = [
  { customer: "James Brown", initials: "JB", id: "INV-00001", date: "Jan 4, 2025", amount: "$1,250.00", priority: "High", status: "Paid" },
  { customer: "Sarah Miller", initials: "SM", id: "INV-00002", date: "Jan 7, 2025", amount: "$3,420.50", priority: "Medium", status: "Pending" },
  { customer: "Michael Chen", initials: "MC", id: "INV-00003", date: "Jan 11, 2025", amount: "$890.00", priority: "Low", status: "Paid" },
  { customer: "Emily Davis", initials: "ED", id: "INV-00004", date: "Jan 14, 2025", amount: "$4,750.00", priority: "High", status: "Overdue" },
  { customer: "Robert Wilson", initials: "RW", id: "INV-00005", date: "Jan 17, 2025", amount: "$567.25", priority: "Low", status: "Draft" },
];

const statusColors = {
  Paid: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Pending: "text-amber-700 bg-amber-50 border-amber-200",
  Overdue: "text-red-700 bg-red-50 border-red-200",
  Draft: "text-gray-600 bg-gray-50 border-gray-200",
};

const priorityColors = { High: "text-red-600", Medium: "text-amber-600", Low: "text-gray-500" };

export default function D7BottomRow() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sales by Category */}
        <Card className="shadow-none">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2">
              <Grid2X2 className="size-4 text-muted-foreground" />
              <span className="font-semibold text-sm">Sales by Category</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Radar dataKey="value" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground))" fillOpacity={0.2} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="shadow-none">
          <CardHeader className="pb-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <span className="font-semibold text-sm">Traffic Sources</span>
                <span className="text-xs font-medium text-emerald-600">+30%</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-foreground" />High</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted-foreground/60" />Medium</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-muted" />Low</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-1.5">
            {trafficData.map((row) => {
              const total = row.high + row.medium + row.low;
              return (
                <div key={row.week} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-12 shrink-0">{Math.round(total/1000)}k</span>
                  <div className="flex-1 flex h-4 rounded overflow-hidden gap-px">
                    <div style={{ width: `${(row.high/total)*100}%` }} className="bg-foreground rounded-l" />
                    <div style={{ width: `${(row.medium/total)*100}%` }} className="bg-muted-foreground/50" />
                    <div style={{ width: `${(row.low/total)*100}%` }} className="bg-muted rounded-r" />
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between text-[10px] text-muted-foreground pt-1 pl-14">
              {trafficData.map((r) => <span key={r.week}>{r.week}</span>)}
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="shadow-none">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <span className="font-semibold text-sm">Order Status</span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-0">
            <div className="relative h-36 w-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart style={{ outline: "none" }}>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={44} outerRadius={62} paddingAngle={2} dataKey="value" strokeWidth={0}>
                    {donutData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-muted-foreground">ORDERS</span>
                <span className="text-xl font-bold">4,050</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              {donutData.map((d) => (
                <span key={d.name} className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: d.color }} />{d.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders / Invoices */}
      <Card className="shadow-none">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold">Recent Orders</span>
              <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">18</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted transition-colors">
                <Filter className="size-3.5" />Filter
              </button>
              <button className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted transition-colors">See All</button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Customer</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Invoice ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Amount</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Priority</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">{inv.initials}</div>
                      <span className="whitespace-nowrap text-sm">{inv.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{inv.date}</td>
                  <td className="px-4 py-3 font-medium tabular-nums">{inv.amount}</td>
                  <td className={`px-4 py-3 text-xs font-medium ${priorityColors[inv.priority]}`}>{inv.priority}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusColors[inv.status]}`}>{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Rows per page: 5</span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>1–5 of 18</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((p) => (
                  <button key={p} className={`size-6 rounded text-xs ${p === 1 ? "bg-foreground text-background" : "hover:bg-muted"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}