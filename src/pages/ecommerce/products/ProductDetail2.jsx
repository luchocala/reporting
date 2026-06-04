import { useState } from "react";
import { Plus, Edit, Copy, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TABS = ["Overview", "Variants", "Inventory", "Activity"];

const variants = [
  { name: "Ocean / 3-piece set", sku: "SKU-SKIN-4006-OCN", stock: 48, retail: "$389", wholesale: "$249", primary: true, low: false },
  { name: "Sand / 3-piece set", sku: "SKU-SKIN-4006-SND", stock: 22, retail: "$389", wholesale: "$249", primary: false, low: false },
  { name: "Stone / Travel trio", sku: "SKU-SKIN-4006-STN", stock: 18, retail: "$179", wholesale: "$116", primary: false, low: true },
  { name: "Rose / Travel trio", sku: "SKU-SKIN-4006-RSE", stock: 10, retail: "$179", wholesale: "$116", primary: false, low: true },
  { name: "Slate / Duo set", sku: "SKU-SKIN-4006-SLT", stock: 14, retail: "$259", wholesale: "$168", primary: false, low: true },
  { name: "Cloud / Gift set", sku: "SKU-SKIN-4006-CLD", stock: 8, retail: "$429", wholesale: "$279", primary: false, low: true },
];

const imgs = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=80&h=80&fit=crop",
];

export default function ProductDetail2() {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Radiance Ritual Set</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-md font-medium">Active</span>
            <span className="text-xs text-muted-foreground">• 6 variants</span>
            <span className="text-xs text-muted-foreground">• Wellness</span>
            <span className="text-xs text-muted-foreground">• Stocked Product</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90"><Plus className="size-3.5" />Add Variant</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"><Edit className="size-3.5" />Edit</button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"><Copy className="size-3.5" />Clone</button>
          <button className="p-1.5 border border-border rounded-md hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
        </div>
      </div>

      <div className="flex gap-0 border-b border-border">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
        {/* Left: Image + profile */}
        <div className="space-y-4">
          <div>
            <img src={imgs[0]} alt="Primary" className="w-full aspect-square object-cover rounded-lg" />
            <div className="flex items-center gap-1.5 mt-2">
              {imgs.slice(1).map((src, i) => (
                <img key={i} src={src} alt="" className="size-12 rounded object-cover" />
              ))}
            </div>
          </div>
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold text-sm">Product family profile</p>
              <p className="text-xs text-muted-foreground">A compact read on the assortment behind this variant-led product.</p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[["PRIMARY VARIANT", "Ocean / 3-piece set"], ["RETAIL PRICE BAND", "$179 – $429"], ["ACTIVE VARIANTS", "6"], ["TOTAL STOCK", "120 units"]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium mt-0.5">{val}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: stats + variant table */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[["TOTAL STOCK", "120", "Across 6 active variants"], ["LOW STOCK", "4", "Variants below the 20-unit threshold"], ["AVERAGE STOCK", "20", "Average units held per variant"]].map(([label, val, sub]) => (
              <Card key={label} className="shadow-none p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
                <p className="text-3xl font-bold mt-1">{val}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </Card>
            ))}
          </div>

          <div>
            <p className="font-semibold mb-1">Variant lineup</p>
            <p className="text-xs text-muted-foreground mb-3">Click any row to update the media focus and selected context.</p>
            <div className="border border-border rounded-lg overflow-hidden">
              {variants.map((v, i) => (
                <div key={v.sku} className={`flex items-center justify-between gap-4 px-4 py-3 ${i === 0 ? "border-2 border-foreground rounded-lg" : "border-b border-border last:border-0"} hover:bg-muted/20 transition-colors cursor-pointer`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={imgs[0]} alt="" className="size-10 rounded object-cover shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{v.name}</p>
                        {v.primary && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-medium">Primary</span>}
                      </div>
                      <p className="text-xs text-muted-foreground">{v.sku} · <span className={v.low ? "text-red-500" : "text-muted-foreground"}>Stock: {v.stock}{v.low ? " low" : ""}</span></p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">RETAIL</p>
                    <p className="font-semibold text-sm">{v.retail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">WHOLESALE</p>
                    <p className="font-semibold text-sm">{v.wholesale}</p>
                  </div>
                  <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}