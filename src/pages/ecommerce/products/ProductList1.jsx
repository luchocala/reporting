import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const products = [
  { name: "Barrier Repair Drops", sku: "SKU-TREAT-6612", category: "Treatment", supplier: "Retail - Subscription", stock: 96, stockLevel: "High", price: "$84" },
  { name: "Botanical Body Polish", sku: "SKU-BODY-6118", category: "Body Care", supplier: "Retail - +1", stock: 47, stockLevel: "High", price: "$52" },
  { name: "Cloud Silk Toner", sku: "SKU-TONER-7723", category: "Toner", supplier: "Retail - +2 · Dropship", stock: 64, stockLevel: "High", price: "$46" },
  { name: "Dew Reset Essence", sku: "SKU-ESSN-2084", category: "Essence", supplier: "Retail - Subscription", stock: 55, stockLevel: "High", price: "$74" },
  { name: "HydraBloom Night Cream", sku: "SKU-BALM-8928", category: "Cream", supplier: "Retail - +2 · Dropship", stock: 341, stockLevel: "High", price: "$99" },
  { name: "Micro Peel Serum", sku: "SKU-SERUM-4412", category: "Serum", supplier: "Premium - Inventory", stock: 29, stockLevel: "Low", price: "$88" },
  { name: "Overnight Recovery Mask", sku: "SKU-MASK-5501", category: "Mask", supplier: "Premium - Inventory", stock: 21, stockLevel: "Low", price: "$112" },
  { name: "PureEssence Soap Trio", sku: "SKU-SOAP-5214", category: "Soap", supplier: "Bundles - +1", stock: 28, stockLevel: "Low", price: "$59" },
  { name: "Radiance Ritual Set", sku: "SKU-SKIN-4006", category: "Skincare Set", supplier: "Retail - +2 · Dropship", stock: 210, stockLevel: "High", price: "$389" },
  { name: "Radiant Lock Mist", sku: "SKU-SERUM-7811", category: "Serum", supplier: "Retail - Inventory", stock: 67, stockLevel: "High", price: "$69" },
  { name: "Timeless Renewal Cream", sku: "SKU-CREAM-9902", category: "Cream", supplier: "Premium - Inventory", stock: 12, stockLevel: "Low", price: "$199" },
  { name: "Velvet Cleanse Balm", sku: "SKU-CLEAN-1148", category: "Cleanser", supplier: "Bundle - +1", stock: 38, stockLevel: "Low", price: "$64" },
];

const IMG = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=40&h=40&fit=crop";

export default function ProductList1() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">Browse, filter, and manage your product catalog.</p>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          <Plus className="size-4" />Add Products
        </button>
      </div>

      <div className="border-b border-border pb-2">
        <button className="text-sm font-medium text-foreground border-b-2 border-foreground pb-2 -mb-[9px]">All products</button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input placeholder="Search products" value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-48" />
        </div>
        {["Category", "Supplier", "Stock level"].map(f => (
          <button key={f} className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">{f} ▾</button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Manage Table</button>
      </div>

      <Card className="shadow-none overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Product name ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">SKU ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Category ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Supplier ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Current Stock ↕</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Unit Price ↕</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.sku} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={IMG} alt={p.name} className="size-8 rounded object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{p.sku}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-muted rounded text-xs">{p.category}</span></td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.supplier}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{p.stock} units · <span className={p.stockLevel === "High" ? "text-emerald-600" : "text-red-500"}>{p.stockLevel}</span></span>
                  </div>
                  <div className="w-28 h-1 bg-muted rounded-full mt-1 overflow-hidden">
                    <div className={`h-full rounded-full ${p.stockLevel === "High" ? "bg-emerald-500" : "bg-red-500"}`} style={{ width: `${Math.min(100, (p.stock / 350) * 100)}%` }} />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{p.price}</td>
                <td className="px-4 py-3"><button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}