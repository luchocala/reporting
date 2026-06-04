import { useState } from "react";
import { Edit, Copy, MoreHorizontal, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TABS = ["General Information", "History", "Reviews"];
const imgs = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=100&h=100&fit=crop",
];

export default function ProductDetail1() {
  const [tab, setTab] = useState("General Information");
  const [active, setActive] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Radiance Ritual Set</h1>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-md font-medium">Active</span>
            <span className="text-xs text-muted-foreground">• SKU-SKIN-4006</span>
            <span className="text-xs text-muted-foreground">• Wellness</span>
            <span className="text-xs text-muted-foreground">• Stocked product</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActive(!active)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${active ? "bg-foreground" : "bg-muted"}`}>
            <span className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${active ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className="text-sm font-medium">{active ? "Active" : "Inactive"}</span>
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

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-6">
          {/* Gallery */}
          <div>
            <img src={imgs[imgIdx]} alt="Product" className="w-full max-h-96 object-cover rounded-lg" />
            <div className="flex items-center gap-2 mt-2">
              {imgs.slice(1).map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i + 1)} className={`size-16 rounded overflow-hidden border-2 ${imgIdx === i + 1 ? "border-foreground" : "border-transparent"}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              <button onClick={() => setImgIdx(0)} className={`size-16 rounded overflow-hidden border-2 ${imgIdx === 0 ? "border-foreground" : "border-transparent"}`}>
                <img src={imgs[0]} alt="" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Basic information</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["SKU", "SKU-SKIN-4006"], ["BARCODE", "0123456789001"],
                ["CATEGORY", "Wellness"], ["SUBCATEGORY", "Bundles"],
                ["CREATED BY", "Avery Hall"], ["DESCRIPTION", "A bestselling ritual bundle with cleanser, serum, and moisturizer for daily glow maintenance."],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p className="text-sm mt-0.5">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold text-sm">Stock</p>
              <p className="text-xs text-muted-foreground">Current stock availability by warehouse.</p>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg p-4 text-center mb-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">QUANTITY AT HAND</p>
                <p className="text-4xl font-bold mt-1">66</p>
                <button className="mt-2 flex items-center gap-1.5 text-xs text-foreground border border-border rounded-md px-3 py-1.5 hover:bg-muted mx-auto">Adjust stock</button>
              </div>
              {[["Seattle", "SEA", 148, false], ["Austin", "AUS", 76, false], ["Chicago", "CHI", 54, false], ["Miami", "MIA", 21, true]].map(([city, code, qty, low]) => (
                <div key={city} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="size-4 rounded bg-muted flex items-center justify-center text-[10px]">🏢</span>
                    <span>{city}</span>
                    <span className="text-xs text-muted-foreground">{code}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm">{qty}</span>
                    {low && <span className="text-xs text-red-500">low</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold text-sm">Reorder points</p>
              <p className="text-xs text-muted-foreground">Current replenishment rules by warehouse.</p>
            </CardHeader>
            <CardContent>
              {[["Seattle", "SEA", "Purchase order", "Acme Retail"]].map(([city, code, method, vendor]) => (
                <div key={city} className="border border-border rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-sm mb-2">
                    <span className="size-4 rounded bg-muted flex items-center justify-center text-[10px]">🏢</span>
                    <span className="font-medium">{city}</span>
                    <span className="text-xs text-muted-foreground">• {code}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><p className="text-muted-foreground uppercase tracking-wide">REORDER METHOD</p><p className="font-medium mt-0.5">{method}</p></div>
                    <div><p className="text-muted-foreground uppercase tracking-wide">VENDOR</p><p className="font-medium mt-0.5">{vendor}</p></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}