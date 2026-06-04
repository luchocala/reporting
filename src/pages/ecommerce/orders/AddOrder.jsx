import { useState } from "react";
import { Search, Plus, Minus, X, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const available = [
  { name: "Overnight Recovery Mask", category: "Mask", sku: "SKU-MASK-5501", stock: 21, price: "$72.00", img: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=60&h=60&fit=crop" },
  { name: "PureEssence Soap Trio", category: "Soap", sku: "SKU-SOAP-5214", stock: 28, price: "$36.00", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=60&h=60&fit=crop" },
  { name: "Micro Peel Serum", category: "Serum", sku: "SKU-SERUM-4412", stock: 29, price: "$54.00", img: "https://images.unsplash.com/photo-1614159869112-5be2b12b6b7c?w=60&h=60&fit=crop" },
  { name: "Timeless Renewal Cream", category: "Cream", sku: "SKU-CREAM-9902", stock: 12, price: "$80.00", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=60&h=60&fit=crop" },
  { name: "Velvet Cleanse Balm", category: "Cleanser", sku: "SKU-CLEAN-1148", stock: 38, price: "$36.00", img: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=60&h=60&fit=crop" },
];

export default function AddOrder() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([{ ...available[1], qty: 120 }]);
  const [search, setSearch] = useState("");
  const filtered = available.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  const STEPS = [{ num: 1, label: "Select product", sub: "Low-stock inventory to replenish" }, { num: 2, label: "Order details", sub: "Routing, source, and receiving" }, { num: 3, label: "Review", sub: "Cost, lead time, and submit" }];

  const addProduct = (p) => {
    if (!selected.find(s => s.sku === p.sku)) setSelected([...selected, { ...p, qty: 80 }]);
  };
  const removeProduct = (sku) => setSelected(selected.filter(s => s.sku !== sku));
  const setQty = (sku, qty) => setSelected(selected.map(s => s.sku === sku ? { ...s, qty: Math.max(1, qty) } : s));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/ecommerce/order-list-1" className="p-1.5 hover:bg-muted rounded"><ArrowLeft className="size-4" /></Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{step === 1 ? "Add New Order" : "Edit Order"}</h1>
              <span className="text-sm text-amber-600 border border-amber-200 bg-amber-50 px-2 py-0.5 rounded">Draft</span>
            </div>
            <p className="text-sm text-muted-foreground">Build a replenishment request for low-stock SKUs, then hand off one clear purchase brief to procurement.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Reset order</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Save draft</button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="grid grid-cols-3 gap-2">
        {STEPS.map((s) => (
          <button key={s.num} onClick={() => setStep(s.num)} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${step === s.num ? "border-foreground bg-muted/30" : "border-border hover:bg-muted/20"}`}>
            <div className={`size-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${step === s.num ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>{s.num}</div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium truncate">{s.label}</p>
              <p className="text-xs text-muted-foreground truncate">{s.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {step === 1 && (
        <Card className="shadow-none p-4 space-y-4">
          {selected.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Selected products</p>
                <span className="text-xs text-muted-foreground">{selected.length} selected</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Keep the current order visible while you browse for more items.</p>
              {selected.map(p => (
                <div key={p.sku} className="flex items-center gap-3 p-2 border border-border rounded-lg mb-2">
                  <img src={p.img} alt={p.name} className="size-10 rounded object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name.substring(0, 20)}...</p>
                    <p className="text-xs text-muted-foreground">{p.qty} units selected</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setQty(p.sku, p.qty - 1)} className="p-1 hover:bg-muted rounded"><Minus className="size-3" /></button>
                    <span className="w-8 text-center text-sm font-medium">{p.qty}</span>
                    <button onClick={() => setQty(p.sku, p.qty + 1)} className="p-1 hover:bg-muted rounded"><Plus className="size-3" /></button>
                  </div>
                  <button onClick={() => removeProduct(p.sku)} className="p-1 hover:bg-muted rounded"><X className="size-3.5 text-muted-foreground" /></button>
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold">Available products</p>
              <span className="text-xs text-muted-foreground">{filtered.length} available</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Search the remaining low-stock products and add more lines.</p>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input placeholder="Search available products or SKU..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full" />
            </div>
            <div className="space-y-2">
              {filtered.filter(p => !selected.find(s => s.sku === p.sku)).map(p => (
                <div key={p.sku} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <img src={p.img} alt={p.name} className="size-10 rounded object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{p.name}</p>
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{p.category}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.sku} · {p.stock} in stock · wholesale {p.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">Low stock</span>
                      <span className="text-xs text-muted-foreground">Suggested reorder: 80 units</span>
                    </div>
                  </div>
                  <button onClick={() => addProduct(p)} className="px-3 py-1.5 text-xs bg-foreground text-background rounded-md hover:opacity-90 shrink-0">Add</button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="shadow-none p-6 space-y-4">
          <p className="font-semibold">Order details</p>
          {["Supplier", "Warehouse destination", "Expected delivery date", "Payment terms"].map(f => (
            <div key={f}>
              <label className="text-sm font-medium block mb-1.5">{f}</label>
              <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                <option>Select {f.toLowerCase()}</option>
              </select>
            </div>
          ))}
        </Card>
      )}

      {step === 3 && (
        <Card className="shadow-none p-6 space-y-4">
          <p className="font-semibold">Order Review</p>
          <div className="space-y-2">
            {selected.map(p => (
              <div key={p.sku} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={p.img} alt="" className="size-8 rounded object-cover" />
                  <span className="text-sm">{p.name}</span>
                </div>
                <span className="text-sm font-medium">×{p.qty}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between font-semibold">
              <span>Estimated Total</span>
              <span>${selected.reduce((s, p) => s + (parseFloat(p.price.replace("$", "")) * p.qty), 0).toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full bg-foreground text-background py-2 rounded-md text-sm font-medium hover:opacity-90">Submit Order</button>
        </Card>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-muted-foreground">Step {step} of 3 · {STEPS[step - 1].label}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setStep(s => Math.max(1, s - 1))} className="px-4 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Back</button>
          <button onClick={() => setStep(s => Math.min(3, s + 1))} className="px-4 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Continue →</button>
        </div>
      </div>
    </div>
  );
}