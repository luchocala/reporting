import { useState } from "react";
import { Search, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const allOrders = [
  { id: "ORD-34021", total: "$1,248.50", payment: "Paid", fulfillment: "Unfulfilled", customer: "Maya Collins", cid: "CUS-812", date: "Tue 18 Mar, 2026", channel: "Online Store", new: true },
  { id: "ORD-34020", total: "$486.75", payment: "Paid", fulfillment: "Unfulfilled", customer: "Jordan Reyes", cid: "CUS-447", date: "Tue 18 Mar, 2026", channel: "Subscription", new: true },
  { id: "ORD-34019", total: "$0.00", payment: "Canceled", fulfillment: "Unfulfilled", customer: "Elaine Wu", cid: "CUS-229", date: "Mon 17 Mar, 2026", channel: "Retail Partner", new: false },
  { id: "ORD-34018", total: "$932.40", payment: "Paid", fulfillment: "Fulfilled", customer: "Noah Bennett", cid: "CUS-590", date: "Sun 16 Mar, 2026", channel: "Online Store", new: false },
  { id: "ORD-34017", total: "$211.30", payment: "Paid", fulfillment: "Unfulfilled", customer: "Priya Menon", cid: "CUS-731", date: "Sun 16 Mar, 2026", channel: "Marketplace", new: true },
  { id: "ORD-34016", total: "$3,150.20", payment: "Pending", fulfillment: "Unfulfilled", customer: "Omar Haddad", cid: "CUS-144", date: "Sat 15 Mar, 2026", channel: "Wholesale", new: true },
  { id: "ORD-34015", total: "$128.90", payment: "Paid", fulfillment: "Unfulfilled", customer: "Lena Hart", cid: "CUS-963", date: "Sat 15 Mar, 2026", channel: "Online Store", new: true },
  { id: "ORD-34014", total: "$764.20", payment: "Paid", fulfillment: "Unfulfilled", customer: "Tobias Green", cid: "CUS-308", date: "Fri 14 Mar, 2026", channel: "Retail POS", new: false },
  { id: "ORD-34013", total: "$542.10", payment: "Paid", fulfillment: "Unfulfilled", customer: "Sofia Alvarez", cid: "CUS-625", date: "Fri 14 Mar, 2026", channel: "Marketplace", new: true },
  { id: "ORD-34012", total: "$97.50", payment: "Paid", fulfillment: "Fulfilled", customer: "Nina Park", cid: "CUS-518", date: "Thu 13 Mar, 2026", channel: "Subscription", new: false },
];

const paymentStyles = { Paid: "text-emerald-700 bg-emerald-50 border-emerald-200", Pending: "text-amber-700 bg-amber-50 border-amber-200", Canceled: "text-red-700 bg-red-50 border-red-200" };
const fulfillStyles = { Fulfilled: "text-blue-700 bg-blue-50 border-blue-200", Unfulfilled: "text-gray-600 bg-gray-50 border-gray-200" };

export default function OrderList1() {
  const [tab, setTab] = useState("All Orders");
  const [search, setSearch] = useState("");
  const filtered = allOrders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders List</h1>
          <p className="text-sm text-muted-foreground">Track payments, fulfillment, and customer activity.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90"><Plus className="size-4" />Create Order</button>
      </div>

      <div className="flex gap-0 border-b border-border">
        {["All Orders", "Unfulfilled", "Paid"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search orders" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-48" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">All time ▾</button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Payment Status ▾</button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Fulfillment ▾</button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Manage Table</button>
      </div>

      <Card className="shadow-none overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Order ID ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Total ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Customer ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Order Date ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Channels ↕</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {o.new && <span className="size-2 rounded-full bg-red-500 shrink-0" />}
                    <span className="font-medium">{o.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium tabular-nums">{o.total}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${paymentStyles[o.payment]}`}>{o.payment}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${fulfillStyles[o.fulfillment]}`}>{o.fulfillment}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span>{o.customer}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{o.cid}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{o.date}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{o.channel}</td>
                <td className="px-4 py-3"><button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">1–{filtered.length} of {allOrders.length}</span>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="size-4 text-muted-foreground" /></button>
            <button className="p-1 hover:bg-muted rounded"><ChevronRight className="size-4 text-muted-foreground" /></button>
          </div>
        </div>
      </Card>
    </div>
  );
}