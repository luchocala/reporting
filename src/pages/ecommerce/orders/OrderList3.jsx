import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const orders = [
  { id: "SO-654", status: "Unpaid", type: "New quote", description: "New quote waiting for approval", product: "Radiance Ritual Set / Ocean Blue / S x1", city: "Brooklyn, NY", customer: "Brooklyn Simmons", channel: "Marketplace", rep: "Avery Hall", date: "Mar 28, 2026", amount: "$210", progress: 0 },
  { id: "SO-653", status: "Paid", type: "Order is on shipping", description: "Packed and waiting for carrier pickup", product: "Timeless Renewal Cream / Army / L x2", city: "Austin, TX", customer: "Cameron Ford", channel: "Online store", rep: "Riley Chen", date: "Mar 27, 2026", amount: "$680", progress: 60 },
  { id: "SO-652", status: "Partial", type: "Product in packaging", description: "Items are being packed at the warehouse", product: "Cloud Silk Toner / Army / XL x1", city: "Chicago, IL", customer: "Savannah Nguyen", channel: "Wholesale", rep: "Jordan Lee", date: "Mar 24, 2026", amount: "$480", progress: 40 },
  { id: "SO-651", status: "Paid", type: "Order fulfilled", description: "Delivered to customer", product: "HydraBloom Night Cream / Rose / M x3", city: "Seattle, WA", customer: "Marcus Webb", channel: "Online store", rep: "Avery Hall", date: "Mar 22, 2026", amount: "$297", progress: 100 },
  { id: "SO-650", status: "Paid", type: "Order fulfilled", description: "Delivered to customer", product: "Barrier Repair Drops / Clear / S x2", city: "Miami, FL", customer: "Emily Torres", channel: "Subscription", rep: "Riley Chen", date: "Mar 20, 2026", amount: "$168", progress: 100 },
  { id: "SO-649", status: "Unpaid", type: "New quote", description: "New quote waiting for approval", product: "Dew Reset Essence / Natural / M x1", city: "Denver, CO", customer: "Nathan Cole", channel: "Marketplace", rep: "Jordan Lee", date: "Mar 18, 2026", amount: "$74", progress: 0 },
  { id: "SO-648", status: "Partial", type: "Order is on shipping", description: "Packed and waiting for carrier pickup", product: "Overnight Recovery Mask / Lavender / L x2", city: "Boston, MA", customer: "Priya Singh", channel: "Retail Partner", rep: "Avery Hall", date: "Mar 16, 2026", amount: "$224", progress: 60 },
];

const statusStyles = { Paid: "bg-emerald-50 text-emerald-700 border-emerald-200", Unpaid: "bg-red-50 text-red-600 border-red-200", Partial: "bg-amber-50 text-amber-700 border-amber-200", Invoice: "bg-blue-50 text-blue-700 border-blue-200" };

const ProgressBar = ({ value }) => (
  <div className="flex items-center gap-2 mt-2">
    <div className="size-6 rounded border border-border flex items-center justify-center text-xs">📄</div>
    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-foreground rounded-full" style={{ width: `${value}%` }} />
    </div>
    <div className="size-6 rounded border border-border flex items-center justify-center text-xs">📦</div>
    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-foreground rounded-full" style={{ width: `${Math.max(0, value - 33) * 3}%` }} />
    </div>
    <div className="size-6 rounded border border-border flex items-center justify-center text-xs">🚚</div>
    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-foreground rounded-full" style={{ width: `${Math.max(0, value - 66) * 3}%` }} />
    </div>
    <div className="size-6 rounded border border-border flex items-center justify-center text-xs">⏰</div>
  </div>
);

export default function OrderList3() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const filtered = orders.filter(o =>
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.product.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "All" || o.status === statusFilter)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">🛒</div>
          <div>
            <h1 className="text-xl font-bold">Sales Orders</h1>
            <p className="text-xs text-muted-foreground">Sidebar-driven sales pipeline filtering with dense order rows.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90"><Plus className="size-4" />New sales order</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input placeholder="Search sales orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full" />
          </div>
          <Card className="shadow-none p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Order status</p>
              {[["All", 7], ["Quote", 2], ["Started", 2], ["Shipment", 2], ["Fulfilled", 1]].map(([s, count]) => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm ${statusFilter === s ? "bg-muted font-medium" : "hover:bg-muted/50 text-muted-foreground"}`}>
                  <div className="flex items-center gap-2">
                    {statusFilter === s && <span className="size-2 rounded-full bg-foreground" />}
                    {statusFilter !== s && <span className="size-2 rounded-full border border-muted-foreground" />}
                    {s}
                  </div>
                  <span className="text-muted-foreground">{count}</span>
                </button>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Order source</p>
              <select className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none"><option>All sources</option></select>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Order date</p>
              <select className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none"><option>All dates</option></select>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Location</p>
              <select className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none"><option>All locations</option></select>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Amount</p>
              <div className="flex gap-2">
                <input placeholder="Min" className="flex-1 px-2 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none" />
                <input placeholder="Max" className="flex-1 px-2 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none" />
              </div>
            </div>
          </Card>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filtered.length} orders · <span className="font-medium text-foreground">${filtered.reduce((s, o) => s + parseFloat(o.amount.replace("$", "")), 0).toLocaleString()} total</span></span>
            <select className="text-sm border border-input rounded-md px-2 py-1 bg-background focus:outline-none"><option>Most recent</option></select>
          </div>
          {filtered.map(o => (
            <Card key={o.id} className="shadow-none p-4 hover:shadow-sm transition-shadow cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold">{o.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusStyles[o.status]}`}>{o.status}</span>
                    {o.status !== "Unpaid" && <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded">Invoice</span>}
                  </div>
                  <p className="text-base font-semibold mt-1">{o.product}</p>
                  <p className="text-xs text-muted-foreground">{o.city} · {o.customer} · {o.channel} · {o.rep}</p>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">{o.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{o.description}</p>
                    <ProgressBar value={o.progress} />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5 px-0.5">
                      <span>Quote</span><span>Pack</span><span>Ship</span><span>Done</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-lg font-bold">{o.amount}</span>
                  <span className="text-xs text-muted-foreground">{o.date}</span>
                  {o.status === "Unpaid" && <button className="text-xs px-2.5 py-1 bg-foreground text-background rounded-md hover:opacity-90">Review quote</button>}
                  {o.status !== "Unpaid" && <button className="text-xs px-2.5 py-1 border border-border rounded-md hover:bg-muted">Track shipment</button>}
                  <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}