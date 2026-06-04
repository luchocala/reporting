import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", sku: "", barcode: "", description: "", basePrice: "45.00", discountedPrice: "39.00", currency: "USD", chargeTax: false, inStock: false, status: "Draft" });

  return (
    <div className="space-y-1">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <h1 className="text-2xl font-bold">Add Product</h1>
          <p className="text-sm text-muted-foreground">Build a polished product record with pricing, media, availability, and variant data.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Reset</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Save draft</button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Save Product</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-4">
          {/* Product Info */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Product Info</p>
              <p className="text-xs text-muted-foreground">Set the essentials customers need to identify and trust this item.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Thumbnail</label>
                <div className="flex items-center gap-3">
                  <div className="size-16 rounded-md bg-muted flex items-center justify-center border border-dashed border-border">
                    <span className="text-xs text-muted-foreground">IMG</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Product thumbnail</p>
                    <p className="text-xs text-muted-foreground">JPG or PNG. Keep it square and at least 1000 by 1000 pixels.</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="text-xs text-foreground underline">Upload image</button>
                      <button className="text-xs text-muted-foreground">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Shirt, t-shirts, etc." className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1.5">SKU</label>
                  <input value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="eg. 348121032" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Barcode</label>
                  <input value={form.barcode} onChange={e => setForm({...form, barcode: e.target.value})} placeholder="0123456789012" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Set a description to the product for better visibility." rows={4} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
                <p className="text-xs text-muted-foreground mt-1">A concise summary helps merchants and customers scan the catalog faster.</p>
              </div>
            </CardContent>
          </Card>

          {/* Media */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Media</p>
              <p className="text-xs text-muted-foreground">Showcase the product from multiple angles before publishing.</p>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center gap-2">
                <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">+</span>
                </div>
                <p className="text-sm font-medium">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                <button className="mt-1 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Browse files</button>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Variants</p>
              <p className="text-xs text-muted-foreground">Add size, color, or material options to create product variants.</p>
            </CardHeader>
            <CardContent>
              <button className="flex items-center gap-2 text-sm text-foreground font-medium px-3 py-2 border border-dashed border-border rounded-md w-full justify-center hover:bg-muted">
                + Add variant option
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Pricing</p>
              <p className="text-xs text-muted-foreground">Set pricing, taxes, and live availability for this listing.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Base price</label>
                <div className="flex items-center border border-input rounded-md overflow-hidden">
                  <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-r border-input">USD</span>
                  <input value={form.basePrice} onChange={e => setForm({...form, basePrice: e.target.value})} className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Discounted price</label>
                <div className="flex items-center border border-input rounded-md overflow-hidden">
                  <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-r border-input">USD</span>
                  <input value={form.discountedPrice} onChange={e => setForm({...form, discountedPrice: e.target.value})} className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Leave empty to sell at the base price.</p>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Currency</label>
                <select value={form.currency} onChange={e => setForm({...form, currency: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                  <option>USD</option><option>EUR</option><option>GBP</option>
                </select>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.chargeTax} onChange={e => setForm({...form, chargeTax: e.target.checked})} className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Charge tax on this product</p>
                  <p className="text-xs text-muted-foreground">Apply the default checkout tax rules automatically.</p>
                </div>
              </label>
              <div className="flex items-start gap-3">
                <button onClick={() => setForm({...form, inStock: !form.inStock})} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors mt-0.5 ${form.inStock ? "bg-foreground" : "bg-muted-foreground/30"}`}>
                  <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${form.inStock ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
                <div>
                  <p className="text-sm font-medium">In stock</p>
                  <p className="text-xs text-muted-foreground">Turn this off to keep the product visible but unavailable.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Status</p>
              <p className="text-xs text-muted-foreground">Choose when the new product should appear in the storefront.</p>
            </CardHeader>
            <CardContent>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                <option>Draft</option><option>Active</option><option>Archived</option>
              </select>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Organization</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Category", "Subcategory", "Tags", "Supplier"].map(f => (
                <div key={f}>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">{f}</label>
                  <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                    <option>Select {f.toLowerCase()}</option>
                  </select>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}