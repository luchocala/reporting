import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const products = [
  { name: "Radiance Ritual Set", sku: "SKU-SKIN-4006", status: "Active", tags: ["Set", "Retail", "+2", "Dropship"], retail: "$180.00–$220.00", wholesale: "$100.00–$170.00", stock: 210, stockLevel: "High", variants: 6 },
  { name: "Timeless Renewal Cream", sku: "SKU-CREAM-9902", status: "Active", tags: ["Cream", "Premium", "Inventory"], retail: "$120.00", wholesale: "$80.00", stock: 12, stockLevel: "Low", variants: 3 },
  { name: "HydraBloom Night Cream", sku: "SKU-BALM-8928", status: "Draft", tags: ["Cream", "Retail", "+2", "Dropship"], retail: "$180.00", wholesale: "$100.00", stock: 341, stockLevel: "High", variants: 9 },
  { name: "Radiant Lock Mist", sku: "SKU-SERUM-7811", status: "Active", tags: ["Serum", "Retail", "Inventory"], retail: "$69.00", wholesale: "$39.00", stock: 67, stockLevel: "High", variants: 4 },
  { name: "PureEssence Soap Trio", sku: "SKU-SOAP-5214", status: "Draft", tags: ["Soap", "Bundles", "+1"], retail: "$59.00", wholesale: "$36.00", stock: 28, stockLevel: "Low", variants: 2 },
  { name: "Barrier Repair Drops", sku: "SKU-TREAT-6612", status: "Active", tags: ["Treatment", "Retail", "Subscription"], retail: "$84.00", wholesale: "$52.00", stock: 96, stockLevel: "High", variants: 5 },
  { name: "Dew Reset Essence", sku: "SKU-ESSN-2084", status: "Active", tags: ["Essence", "Retail", "Subscription"], retail: "$74.00", wholesale: "$44.00", stock: 55, stockLevel: "High", variants: 4 },
  { name: "Velvet Cleanse Balm", sku: "SKU-CLEAN-1148", status: "Draft", tags: ["Cleanser", "Bundle", "+1"], retail: "$64.00", wholesale: "$36.00", stock: 38, stockLevel: "Low", variants: 2 },
  { name: "Overnight Recovery Mask", sku: "SKU-MASK-5501", status: "Active", tags: ["Mask", "Premium", "Inventory"], retail: "$112.00", wholesale: "$72.00", stock: 21, stockLevel: "Low", variants: 3 },
];

const IMG = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop";

export default function ProductList2() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">📦</div>
          <div>
            <h1 className="text-xl font-bold">Product List 2</h1>
            <p className="text-xs text-muted-foreground">Inventory-first product cards with pricing, stock, and channel tags.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          <Plus className="size-4" />New Products
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search products." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">All products ▾</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">All stock</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => (
          <Card key={p.sku} className="shadow-none p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <img src={IMG} alt={p.name} className="size-12 rounded object-cover" />
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-tight">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sku}</p>
                  <span className={`inline-block text-xs px-1.5 py-0.5 rounded mt-0.5 ${p.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{p.status}</span>
                </div>
              </div>
              <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
            </div>
            <div className="flex flex-wrap gap-1">
              {p.tags.map(t => <span key={t} className="text-[11px] px-1.5 py-0.5 border border-border rounded text-muted-foreground">{t}</span>)}
            </div>
            <div className="flex items-center justify-between text-xs">
              <div><p className="text-muted-foreground">Retail</p><p className="font-semibold text-sm">{p.retail}</p></div>
              <div className="text-right"><p className="text-muted-foreground">Wholesale</p><p className="font-semibold text-sm">{p.wholesale}</p></div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-medium ${p.stockLevel === "High" ? "text-foreground" : "text-muted-foreground"}`}>{p.stock} stock · <span className={p.stockLevel === "High" ? "text-emerald-600" : "text-red-500"}>{p.stockLevel}</span></span>
                <span className="text-muted-foreground">Variants ({p.variants})</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${p.stockLevel === "High" ? "bg-emerald-500" : "bg-red-400"}`} style={{ width: `${Math.min(100, (p.stock / 350) * 100)}%` }} />
              </div>
            </div>
            <button className="w-full text-center text-sm border border-border rounded-md py-1.5 hover:bg-muted transition-colors">Edit</button>
          </Card>
        ))}
      </div>
    </div>
  );
}