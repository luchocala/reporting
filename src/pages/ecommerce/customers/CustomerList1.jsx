import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const customers = [
  { id: "CUS-1742", name: "Theo Hammond", email: "theo.hammond@caldwell.app", orders: 96, spend: "$18,410", avg: "$192", status: "VIP", lastOrder: "Mar 21, 2026" },
  { id: "CUS-7102", name: "Avery Brooks", email: "avery.brooks@northmail.co", orders: 42, spend: "$6,124", avg: "$146", status: "Active", lastOrder: "Mar 20, 2026" },
  { id: "CUS-2465", name: "Sienna Blair", email: "sienna.blair@meridianhq.co", orders: 74, spend: "$11,130", avg: "$150", status: "VIP", lastOrder: "Mar 20, 2026" },
  { id: "CUS-8431", name: "Camila Hart", email: "camila.hart@northmail.co", orders: 13, spend: "$2,148", avg: "$165", status: "Active", lastOrder: "Mar 19, 2026" },
  { id: "CUS-2844", name: "Miles Yoon", email: "miles.yoon@brightlane.co", orders: 67, spend: "$12,480", avg: "$186", status: "VIP", lastOrder: "Mar 18, 2026" },
  { id: "CUS-3378", name: "Leila Forde", email: "leila.forde@commoner.co", orders: 58, spend: "$9,040", avg: "$156", status: "VIP", lastOrder: "Mar 17, 2026" },
  { id: "CUS-6619", name: "Zara Quinn", email: "zara.quinn@caldwell.app", orders: 21, spend: "$3,822", avg: "$182", status: "Active", lastOrder: "Mar 14, 2026" },
  { id: "CUS-1287", name: "Imani Rhodes", email: "imani.rhodes@waxwing.io", orders: 31, spend: "$5,180", avg: "$167", status: "Active", lastOrder: "Mar 08, 2026" },
  { id: "CUS-4926", name: "Rory Bennett", email: "rory.bennett@waxwing.io", orders: 17, spend: "$2,895", avg: "$170", status: "Active", lastOrder: "Feb 27, 2026" },
  { id: "CUS-5290", name: "Nora Castillo", email: "nora.castillo@brightlane.co", orders: 8, spend: "$1,386", avg: "$173", status: "At Risk", lastOrder: "Jan 26, 2026" },
];

const statusStyles = {
  VIP: "text-amber-700 bg-amber-50 border-amber-200",
  Active: "text-emerald-700 bg-emerald-50 border-emerald-200",
  "At Risk": "text-red-700 bg-red-50 border-red-200",
};

const sparkline = [0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 0.95];

export default function CustomerList1() {
  const [tab, setTab] = useState("All Customers");
  const [search, setSearch] = useState("");

  const stats = [
    { label: "Customers", value: "1,864", change: "+4.8%" },
    { label: "New customers", value: "214", change: "+11.2%" },
    { label: "Repeat rate", value: "63.8%", change: "+2.1%" },
    { label: "Lifetime value", value: "$1,184", change: "+6.4%" },
  ];

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-sm text-muted-foreground">Track retention, value, and recent purchase activity.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90"><Plus className="size-4" />Create Customer</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="shadow-none p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <span className="text-xs">{s.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{s.value}</p>
                <span className="text-xs font-medium text-emerald-600">{s.change}</span>
              </div>
            </div>
            <svg viewBox="0 0 60 30" className="w-14 h-7 text-foreground">
              <polyline points={sparkline.map((v, i) => `${i * 10},${30 - v * 25}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Card>
        ))}
      </div>

      <div className="flex gap-0 border-b border-border">
        {["All Customers", "Active", "VIP"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search customers" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-48" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Last 90 days ▾</button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">All values ▾</button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Manage Table</button>
      </div>

      <Card className="shadow-none overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Customer ID ↕", "Name ↕", "Orders ↕", "Total spend ↕", "Avg. order value ↕", "Status ↕", "Last order ↕", ""].map(h => (
                <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-muted-foreground text-xs">{c.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">{c.name.split(" ").map(n => n[0]).join("")}</div>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium tabular-nums">{c.orders}</td>
                <td className="px-4 py-3 font-medium tabular-nums">{c.spend}</td>
                <td className="px-4 py-3 tabular-nums">{c.avg}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[c.status]}`}>
                    {c.status === "VIP" ? "⭐ " : ""}{c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{c.lastOrder}</td>
                <td className="px-4 py-3"><button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}