import { useState } from "react";
import { Filter, MoreHorizontal, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

const lanes = [
  {
    id: "arrived", label: "Arrived", icon: "⊙", count: 2, total: "$414",
    orders: [
      { id: "#235325", total: "$188", items: "Barrier Repair Drops", channel: "Online store", customer: "Maya Collins", date: "Apr 02", initials: "MC" },
      { id: "#646344", total: "$226", items: "Overnight Recovery Mask, Timeless Renewal Cream", channel: "Retail partner", customer: "Lena Hart", date: "Mar 22", initials: "LH" },
    ]
  },
  {
    id: "ready", label: "Ready for pickup", icon: "◎", count: 2, total: "$580",
    orders: [
      { id: "#823904", total: "$452", items: "Radiance Ritual Set, Cloud Silk Toner", channel: "Wholesale", customer: "Jordan Reyes", date: "Apr 01", initials: "JR" },
      { id: "#624363", total: "$128", items: "Micro Peel Serum", channel: "Subscription", customer: "Tobias Green", date: "Mar 23", initials: "TG" },
    ]
  },
  {
    id: "sent", label: "Order sent", icon: "◉", count: 1, total: "$268",
    orders: [
      { id: "#32543", total: "$268", items: "PureEssence Soap Trio, Timeless Renewal Cream, Cloud Silk Toner", channel: "Marketplace", customer: "Nina Park", date: "Mar 31", initials: "NP" },
    ]
  },
  {
    id: "packaging", label: "Packaging", icon: "◎", count: 1, total: "$612",
    orders: [
      { id: "#37646", total: "$612", items: "Timeless Renewal Cream, HydraBloom Night Cream, Botanical Body Polish", channel: "Retail partner", customer: "Priya Menon", date: "Mar 29", initials: "PM" },
    ]
  },
  {
    id: "fulfilled", label: "Fulfilled", icon: "✓", count: 2, total: "$1,190",
    orders: [
      { id: "#190931", total: "$389", items: "Radiance Ritual Set", channel: "Online store", customer: "Elaine Wu", date: "Mar 27", initials: "EW" },
      { id: "#465383", total: "$801", items: "HydraBloom Night Cream, Barrier Repair Drops", channel: "Subscription", customer: "Caleb Moore", date: "Mar 26", initials: "CM" },
    ]
  },
];

const IMG = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop";

export default function OrderList2() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Order List</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input placeholder="Search orders..." className="pl-3 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-44" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Display ▾</button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted"><Filter className="size-3.5" />Filter</button>
        <span className="text-xs text-muted-foreground ml-auto">10 orders</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {lanes.map(lane => (
          <div key={lane.id} className="w-64 shrink-0 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span className="text-muted-foreground">{lane.icon}</span>
                <span>{lane.label}</span>
                <span className="text-muted-foreground font-normal">{lane.count}</span>
              </div>
              <button className="p-1 hover:bg-muted rounded"><Plus className="size-3.5 text-muted-foreground" /></button>
            </div>
            <div className="text-xs text-muted-foreground px-1">Lane total <span className="font-medium text-foreground">{lane.total}</span></div>
            <div className="space-y-3">
              {lane.orders.map(o => (
                <Card key={o.id} className="shadow-none p-3 space-y-2 cursor-pointer hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between text-xs text-muted-foreground">
                    <span>Order: <span className="font-semibold text-foreground text-sm">{o.id}</span></span>
                    <span>Total <span className="font-semibold text-foreground">{o.total}</span></span>
                  </div>
                  <p className="text-xs text-muted-foreground">Purchased:</p>
                  <p className="text-xs font-medium leading-tight">{o.items}</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[11px] px-1.5 py-0.5 bg-muted rounded">{o.channel}</span>
                    <span className="text-[11px] px-1.5 py-0.5 bg-muted rounded">{o.customer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {o.items.split(",").slice(0, 2).map((_, i) => (
                        <img key={i} src={IMG} alt="" className="size-10 rounded object-cover" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>{o.date}</span>
                      <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">{o.initials}</div>
                    </div>
                  </div>
                </Card>
              ))}
              <button className="w-full text-xs text-muted-foreground flex items-center gap-1.5 hover:text-foreground py-1">
                <Plus className="size-3.5" />New
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}