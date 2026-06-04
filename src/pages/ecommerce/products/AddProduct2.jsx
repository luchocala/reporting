import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Package, CreditCard, Layers, Ruler } from "lucide-react";

const STEPS = [
  { num: 1, label: "Product Basics", icon: Package },
  { num: 2, label: "Pricing Model", icon: CreditCard },
  { num: 3, label: "Inventory Rules", icon: Layers },
  { num: 4, label: "Dimensions & Units", icon: Ruler },
];

export default function AddProduct2() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", type: "", category: "", sku: "", barcode: "", description: "", returnable: true, hasVariants: false });
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Add Product</h1>
          <p className="text-sm text-muted-foreground">Move through the product setup in order so identity, pricing, inventory, and unit data stay aligned before launch.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted flex items-center gap-1.5">Test data ▾</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Save draft</button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Save Product</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-6">
        <div>
          {/* Step header */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {step === 1 && "Product Basics"}
              {step === 2 && "Pricing Model"}
              {step === 3 && "Inventory Rules"}
              {step === 4 && "Dimensions & Units"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === 1 && "Start with the product identity and the media your catalog team will rely on every day."}
              {step === 2 && "Set retail and wholesale prices, apply tax rules, and configure discount settings."}
              {step === 3 && "Define reorder points, safety stock levels, and supplier information."}
              {step === 4 && "Set package dimensions, weight, and unit of measure for shipping and inventory."}
            </p>
          </div>

          <Card className="shadow-none">
            <CardContent className="p-6 space-y-5">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer">
                      <button onClick={() => setForm({...form, returnable: !form.returnable})} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors mt-0.5 ${form.returnable ? "bg-foreground" : "bg-muted"}`}>
                        <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${form.returnable ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <div>
                        <p className="text-sm font-medium">Returnable product</p>
                        <p className="text-xs text-muted-foreground">Keep this enabled when post-purchase returns are allowed for the SKU family.</p>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer">
                      <button onClick={() => setForm({...form, hasVariants: !form.hasVariants})} className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors mt-0.5 ${form.hasVariants ? "bg-foreground" : "bg-muted"}`}>
                        <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${form.hasVariants ? "translate-x-4" : "translate-x-0.5"}`} />
                      </button>
                      <div>
                        <p className="text-sm font-medium">Has variants</p>
                        <p className="text-xs text-muted-foreground">Turn this on when sizes, packs, or colorways will branch off later.</p>
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Product name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Radiance Ritual Set" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Product type</label>
                      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                        <option value="">Select product type</option>
                        <option>Bundle product</option><option>Physical</option><option>Digital</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Product category</label>
                      <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                        <option value="">Select product category</option>
                        <option>Wellness</option><option>Electronics</option><option>Clothing</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Product SKU</label>
                      <input value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="SKU-RITUAL-1006" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Barcode</label>
                      <input value={form.barcode} onChange={e => setForm({...form, barcode: e.target.value})} placeholder="0123456789001" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Description</label>
                    <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the item in a way that helps catalog, merchandising, and support teams identify it quickly." rows={4} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {["Retail price", "Wholesale price", "Cost of goods", "MSRP"].map(f => (
                      <div key={f}>
                        <label className="text-sm font-medium block mb-1.5">{f}</label>
                        <div className="flex items-center border border-input rounded-md overflow-hidden">
                          <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-r border-input">$</span>
                          <input placeholder="0.00" className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Apply tax to this product</span>
                  </label>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  {["Reorder point", "Safety stock", "Max stock level"].map(f => (
                    <div key={f}>
                      <label className="text-sm font-medium block mb-1.5">{f}</label>
                      <input placeholder="0" type="number" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Supplier</label>
                    <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                      <option>Select supplier</option><option>Acme Retail</option><option>Premium Supply</option>
                    </select>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {["Length (cm)", "Width (cm)", "Height (cm)"].map(f => (
                      <div key={f}>
                        <label className="text-sm font-medium block mb-1.5">{f}</label>
                        <input placeholder="0" type="number" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Weight (kg)</label>
                      <input placeholder="0.00" type="number" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Unit of measure</label>
                      <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                        <option>Each</option><option>Box</option><option>Pack</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer nav */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Step {step}</span>
              <span>·</span>
              <span>{STEPS[step - 1]?.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="px-4 py-1.5 text-sm border border-border rounded-md hover:bg-muted disabled:opacity-40">Previous</button>
              <button onClick={() => setStep(s => Math.min(4, s + 1))} className="px-4 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Next</button>
            </div>
          </div>
        </div>

        {/* Progress sidebar */}
        <div>
          <div className="border border-border rounded-lg p-4 sticky top-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
              <div className="h-full bg-foreground rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{step - 1} of {STEPS.length} steps complete · {step === 1 ? "Not saved yet" : "Auto-saved"}</p>
            <div className="space-y-3">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const done = step > s.num;
                const current = step === s.num;
                return (
                  <button key={s.num} onClick={() => setStep(s.num)} className="flex items-center gap-3 w-full text-left">
                    <div className={`size-7 rounded-full flex items-center justify-center shrink-0 border-2 ${done ? "bg-foreground border-foreground" : current ? "border-foreground bg-foreground" : "border-muted-foreground/30 bg-transparent"}`}>
                      {done ? <Check className="size-3.5 text-background" /> : <Icon className={`size-3.5 ${current ? "text-background" : "text-muted-foreground"}`} />}
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase tracking-wide ${current ? "text-muted-foreground" : "text-muted-foreground/50"}`}>STEP {s.num}</p>
                      <p className={`text-sm font-medium ${current ? "text-foreground" : done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <button className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground border border-border rounded-md py-1.5">Reset draft</button>
          </div>
        </div>
      </div>
    </div>
  );
}