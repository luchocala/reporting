import { useState } from "react";
import { Search, Plus, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Total Products", value: "248", change: "+12.4%" },
  { label: "Active Listings", value: "186", change: "+4.8%" },
  { label: "Low Stock Items", value: "19", change: "-6.1%", neg: true },
  { label: "Monthly Revenue", value: "$89,440", change: "+8.2%" },
];

const products = [
  { name: "Radiance Ritual Set", category: "Skincare Set", price: "$389.00", stock: "48 units", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop" },
  { name: "Timeless Renewal Cream", category: "Cream", price: "$120.00", stock: "12 units", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop" },
  { name: "Dew Reset Essence", category: "Essence", price: "$74.00", stock: "55 units", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop" },
  { name: "Overnight Recovery Mask", category: "Mask", price: "$112.00", stock: "21 units", img: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400&h=400&fit=crop" },
  { name: "Cloud Silk Toner", category: "Toner", price: "$46.00", stock: "64 units", img: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=400&h=400&fit=crop" },
  { name: "HydraBloom Night Cream", category: "Cream", price: "$99.00", stock: "341 units", img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop" },
  { name: "Barrier Repair Drops", category: "Treatment", price: "$84.00", stock: "96 units", img: "https://images.unsplash.com/photo-1614159869112-5be2b12b6b7c?w=400&h=400&fit=crop" },
  { name: "Botanical Body Polish", category: "Body Care", price: "$52.00", stock: "47 units", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop" },
];

export default function ProductList3() {
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">📦</div>
          <div>
            <h1 className="text-xl font-bold">My Products</h1>
            <p className="text-xs text-muted-foreground">Manage and collaborate on your product listings.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          <Plus className="size-4" />New Products
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="shadow-none p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold">{s.value}</p>
              <span className={`text-xs font-medium ${s.neg ? "text-red-500" : "text-emerald-600"}`}>{s.change}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">vs last month</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full" />
        </div>
        <button className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">All time ▾</button>
        <button className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Newest ▾</button>
        <button className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted ml-auto">All stock</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <Card key={p.name} className="shadow-none overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              <button className="absolute top-2 right-2 size-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white">
                <MoreHorizontal className="size-4 text-foreground" />
              </button>
            </div>
            <div className="p-3">
              <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full flex items-center justify-between text-left">
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                {expanded === i ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
              </button>
              {expanded === i && (
                <div className="mt-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{p.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Stock</span>
                    <span className="font-medium">{p.stock}</span>
                  </div>
                </div>
              )}
              {!expanded || expanded !== i ? (
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">{p.price}</span>
                </div>
              ) : null}
              <div className="flex border border-border rounded-md overflow-hidden mt-2 text-xs">
                {["Sales", "Views", "Stock"].map(t => (
                  <button key={t} className="flex-1 py-1 hover:bg-muted transition-colors text-muted-foreground">{t}</button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}