import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const shipments = [
  { id: "SHP-8801", arrival: "Mar 24, 2026", status: "Pending", delay: true, order: "ORD-52108", carrier: "ParcelFlow", service: "Express", color: "#a21caf", progress: [1, 1, 0, 0] },
  { id: "SHP-8800", arrival: "Mar 24, 2026", status: "Draft", delay: false, order: "ORD-52103", carrier: "FedEx", service: "Standard", color: "#7c3aed", progress: [0, 0, 0, 0] },
  { id: "SHP-8799", arrival: "Mar 23, 2026", status: "Arrived", delay: false, order: "ORD-52097", carrier: "DHL", service: "Express", color: "#ca8a04", progress: [1, 1, 1, 1] },
  { id: "SHP-8798", arrival: "Mar 23, 2026", status: "Canceled", delay: false, order: "ORD-52091", carrier: "Northline", service: "Economy", color: "#dc2626", progress: [1, -1, 0, 0] },
  { id: "SHP-8797", arrival: "Mar 22, 2026", status: "Pending", delay: false, order: "ORD-52088", carrier: "UPS", service: "Signature", color: "#ea580c", progress: [1, 1, 0, 0] },
  { id: "SHP-8796", arrival: "Mar 22, 2026", status: "Pending", delay: true, order: "ORD-52084", carrier: "TNT", service: "Express", color: "#d97706", progress: [1, 1, 0, 0] },
  { id: "SHP-8795", arrival: "Mar 21, 2026", status: "Arrived", delay: false, order: "ORD-52072", carrier: "ParcelFlow", service: "Standard", color: "#a21caf", progress: [1, 1, 1, 1] },
  { id: "SHP-8794", arrival: "Mar 21, 2026", status: "Draft", delay: false, order: "ORD-52061", carrier: "FedEx", service: "Economy", color: "#7c3aed", progress: [0, 0, 0, 0] },
  { id: "SHP-8793", arrival: "Mar 20, 2026", status: "Pending", delay: false, order: "ORD-52044", carrier: "Aramex", service: "Standard", color: "#dc2626", progress: [1, 1, 0, 0] },
  { id: "SHP-8792", arrival: "Mar 20, 2026", status: "Pending", delay: false, order: "ORD-52039", carrier: "UPS", service: "Signature", color: "#ea580c", progress: [1, 1, 0, 0] },
  { id: "SHP-8791", arrival: "Mar 19, 2026", status: "Arrived", delay: false, order: "ORD-52028", carrier: "Northline", service: "Economy", color: "#dc2626", progress: [1, 1, 1, 1] },
  { id: "SHP-8790", arrival: "Mar 18, 2026", status: "Arrived", delay: false, order: "ORD-52015", carrier: "DHL", service: "Express", color: "#ca8a04", progress: [1, 1, 1, 1] },
];

const statusStyles = { Pending: "text-amber-700 bg-amber-50 border-amber-200", Draft: "text-gray-600 bg-gray-50 border-gray-200", Arrived: "text-emerald-700 bg-emerald-50 border-emerald-200", Canceled: "text-red-700 bg-red-50 border-red-200" };

const ShipmentProgress = ({ progress }) => (
  <div className="flex items-center gap-0.5">
    {[{ icon: "⊙" }, { icon: "📋" }, { icon: "📦" }, { icon: "📍" }].map((s, i) => (
      <div key={i} className="flex items-center">
        <div className={`size-5 rounded-full flex items-center justify-center text-[10px] ${progress[i] === 1 ? "bg-foreground text-background" : progress[i] === -1 ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}>
          {s.icon}
        </div>
        {i < 3 && <div className={`w-4 h-0.5 ${progress[i] === 1 && progress[i+1] >= 1 ? "bg-foreground" : "bg-muted"}`} />}
      </div>
    ))}
  </div>
);

export default function ShipmentList1() {
  const [tab, setTab] = useState("All Shipments");
  const [search, setSearch] = useState("");
  const filtered = shipments.filter(s => s.id.toLowerCase().includes(search.toLowerCase()) || s.order.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Shipments</h1>
          <p className="text-sm text-muted-foreground">Track carrier progress, arrivals, and delivery exceptions.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90"><Plus className="size-4" />Add Shipment</button>
      </div>

      <div className="flex gap-0 border-b border-border">
        {["All Shipments", "Pending", "Arrived", "Canceled"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search shipments" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-48" />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">All time ▾</button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Advanced Filters ▾</button>
        <button className="ml-auto px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Manage Table</button>
      </div>

      <Card className="shadow-none overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Shipment ID ↕", "Expected arrival ↕", "Status ↕", "Order ↕", "Shipment Event", "Carrier ↕", ""].map(h => (
                <th key={h} className="text-left text-xs font-medium text-muted-foreground px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.filter(s => tab === "All Shipments" || s.status === tab).map(s => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {s.delay && <span className="size-2 rounded-full bg-red-500 shrink-0" />}
                    <span className="font-medium">{s.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{s.arrival}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[s.status]}`}>{s.status}</span>
                    {s.delay && <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border border-amber-200 bg-amber-50 text-amber-700">Delay</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{s.order}</td>
                <td className="px-4 py-3"><ShipmentProgress progress={s.progress} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="size-2 rounded-full shrink-0" style={{ background: s.color }} />
                    <span className="font-medium">{s.carrier}</span>
                    <span className="text-muted-foreground text-xs">{s.service}</span>
                  </div>
                </td>
                <td className="px-4 py-3"><button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}