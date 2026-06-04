import { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";

const allProducts = [
  { name: "Barrier Repair Drops", category: "Treatment", catalog: "Retail catalog", stock: 96, variants: 5, retail: "$84.00", wholesale: "$52.00", stockLevel: "normal" },
  { name: "Botanical Body Polish", category: "Body Care", catalog: "Wholesale catalog", stock: 47, variants: 4, retail: "$52.00", wholesale: "$31.00", stockLevel: "normal" },
  { name: "Cloud Silk Toner", category: "Toner", catalog: "Retail catalog", stock: 64, variants: 5, retail: "$46.00", wholesale: "$28.00", stockLevel: "normal" },
  { name: "Dew Reset Essence", category: "Essence", catalog: "Retail catalog", stock: 55, variants: 4, retail: "$74.00", wholesale: "$44.00", stockLevel: "normal" },
  { name: "HydraBloom Night Cream", category: "Cream", catalog: "Wholesale catalog", stock: 341, variants: 9, retail: "$180.00", wholesale: "$100.00", stockLevel: "normal" },
  { name: "Micro Peel Serum", category: "Serum", catalog: "Wholesale catalog", stock: 29, variants: 3, retail: "$88.00", wholesale: "$54.00", stockLevel: "low" },
  { name: "Overnight Recovery Mask", category: "Mask", catalog: "Retail catalog", stock: 21, variants: 3, retail: "$112.00", wholesale: "$72.00", stockLevel: "low" },
  { name: "PureEssence Soap Trio", category: "Soap", catalog: "Retail catalog", stock: 28, variants: 2, retail: "$59.00", wholesale: "$36.00", stockLevel: "low" },
  { name: "Radiance Ritual Set", category: "Skincare Set", catalog: "Retail catalog", stock: 210, variants: 6, retail: "$389.00", wholesale: "$249.00", stockLevel: "normal" },
  { name: "Radiant Lock Mist", category: "Serum", catalog: "Retail catalog", stock: 67, variants: 4, retail: "$69.00", wholesale: "$39.00", stockLevel: "normal" },
  { name: "Timeless Renewal Cream", category: "Cream", catalog: "Retail catalog", stock: 12, variants: 3, retail: "$120.00", wholesale: "$80.00", stockLevel: "low" },
  { name: "Velvet Cleanse Balm", category: "Cleanser", catalog: "Retail catalog", stock: 38, variants: 2, retail: "$64.00", wholesale: "$36.00", stockLevel: "low" },
];

const IMG = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop";

export default function ProductList4() {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [sortBy, setSortBy] = useState("Alphabetical: A-Z");
  const [category, setCategory] = useState("All categories");

  const filtered = allProducts
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => stockFilter === "All stock" || (stockFilter === "Low stock" && p.stockLevel === "low"))
    .sort((a, b) => sortBy.includes("Z-A") ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">📦</div>
          <div>
            <h1 className="text-xl font-bold">Product List 4</h1>
            <p className="text-xs text-muted-foreground">Sidebar-driven catalog filtering with dense merchandiser rows.</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          <Plus className="size-4" />New Products
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-4">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full" />
          </div>

          <Card className="shadow-none p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Product status</p>
              <div className="flex flex-wrap gap-1.5">
                {["All", "Active", "Inactive", "Draft"].map((s, i) => (
                  <button key={s} className={`px-2.5 py-1 text-xs rounded-md border ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:bg-muted"}`}>
                    {s} {i === 0 ? filtered.length : i === 1 ? "8" : i === 2 ? "0" : "4"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Product type</p>
              <div className="flex gap-1.5">
                {["Retail", "Wholesale"].map((t, i) => (
                  <button key={t} className={`flex-1 py-1.5 text-xs rounded-md border ${i === 0 ? "bg-muted border-border font-medium" : "border-border text-muted-foreground hover:bg-muted"}`}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Sort by</p>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none">
                <option>Alphabetical: A-Z</option><option>Alphabetical: Z-A</option><option>Price: Low to High</option><option>Price: High to Low</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Stock alert</p>
              <select value={stockFilter} onChange={e => setStockFilter(e.target.value)} className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none">
                <option>All stock</option><option>Low stock</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Category</p>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none">
                <option>All categories</option><option>Cream</option><option>Serum</option><option>Toner</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Price</p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                  <input placeholder="Min" className="w-full pl-5 pr-2 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none" />
                </div>
                <span className="text-muted-foreground text-xs">–</span>
                <div className="relative flex-1">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                  <input placeholder="Max" className="w-full pl-5 pr-2 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Product list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">{filtered.length} products · <span className="text-foreground">Reusing the inventory catalog with a filter sidebar and compact row layout.</span></p>
            <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
          </div>
          <Card className="shadow-none overflow-hidden">
            <div className="divide-y divide-border">
              {filtered.map(p => (
                <div key={p.name} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors">
                  <img src={IMG} alt={p.name} className="size-12 rounded object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium">{p.variants} variants</span>
                      <span className="text-xs text-muted-foreground">{p.category}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{p.catalog}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className={`text-xs ${p.stockLevel === "low" ? "text-red-500" : "text-muted-foreground"}`}>{p.stock} in stock{p.stockLevel === "low" ? " low" : ""}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">RETAIL PRICE</p>
                    <p className="font-semibold text-sm">{p.retail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">WHOLESALE PRICE</p>
                    <p className="font-semibold text-sm">{p.wholesale}</p>
                  </div>
                  <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}