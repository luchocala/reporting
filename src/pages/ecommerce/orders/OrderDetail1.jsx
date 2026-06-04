import { ArrowLeft, Edit } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const products = [
  { name: "Radiance Ritual Set", sku: "SKU-SKIN-4006", variant: "Soft beige", qty: 1, price: "$389.00", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop" },
  { name: "Barrier Repair Drops", sku: "SKU-TREAT-6612", variant: "Amber glass", qty: 2, price: "$168.00", note: "Reserved item", img: "https://images.unsplash.com/photo-1614159869112-5be2b12b6b7c?w=60&h=60&fit=crop" },
  { name: "Botanical Body Polish", sku: "SKU-BODY-6118", variant: "Citrus", qty: 1, price: "$52.00", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=60&h=60&fit=crop" },
];

const steps = ["Review order", "Preparing", "Packing", "Dispatch"];

export default function OrderDetail1() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/ecommerce/order-list-1" className="p-1.5 hover:bg-muted rounded"><ArrowLeft className="size-4" /></Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">ORD-34021</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Paid</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">↻ Unfulfilled</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">Order date Mar 18, 2026 · Order from <span className="text-foreground font-medium">Maya Collins</span> · Purchased via online store</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Contact customer</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Print invoice</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Share order</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          {/* Progress */}
          <Card className="shadow-none p-4">
            <div className="flex items-center justify-between text-sm mb-3">
              <div><p className="font-medium">Return to Acme Store, Seattle, US</p></div>
              <p className="text-muted-foreground">Estimated arrived at <span className="text-foreground font-medium">Mar 22 to Mar 24</span></p>
            </div>
            <div className="flex items-center gap-0 mb-3">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex-1 h-1 rounded-full overflow-hidden">
                    <div className={`h-full ${i < 2 ? "bg-foreground" : "bg-muted"}`} style={{ width: "100%" }} />
                  </div>
                  {i < steps.length - 1 && <div className={`size-3 rounded-full shrink-0 ${i < 2 ? "bg-foreground" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map((s, i) => <span key={s} className={i < 2 ? "text-foreground font-medium" : ""}>{s}</span>)}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <button className="text-sm text-muted-foreground hover:text-destructive">Cancel Order</button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">+ Create Shipping Label</button>
            </div>
          </Card>

          {/* Products */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Products</p>
                <span className="text-xs text-muted-foreground border border-border px-2 py-0.5 rounded">↻ Unfulfilled</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 divide-y divide-border">
              {products.map(p => (
                <div key={p.sku} className="flex items-start gap-3 py-3 first:pt-0">
                  <img src={p.img} alt={p.name} className="size-12 rounded object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sku}</p>
                    <p className="text-xs text-muted-foreground">{p.variant} · Quantity {p.qty}</p>
                    {p.note && <p className="text-xs font-medium mt-0.5">{p.note}</p>}
                  </div>
                  <p className="font-medium text-sm shrink-0">{p.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Payment details</p>
                <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">✓ Paid</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[["Payment method", "Visa ending in 4242"], ["Subtotal (3 items)", "$609.00"], ["Shipping", "$8.50"], ["Tax (10%)", "$61.75"], ["Total", "$679.25"]].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className={label === "Total" ? "font-semibold" : "text-muted-foreground"}>{label}</span>
                  <span className={label === "Total" ? "font-bold" : ""}>{val}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Shipping address</p>
                <button><Edit className="size-4 text-muted-foreground" /></button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden mb-3 h-24 bg-muted">
                <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=280&h=96&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60" />
              </div>
              <p className="font-medium text-sm">Maya Collins</p>
              <p className="text-xs text-muted-foreground">2149 W Fulton St, Apt 4B</p>
              <p className="text-xs text-muted-foreground">West Loop, Building C</p>
              <p className="text-xs text-muted-foreground">Chicago, IL 60612, United States</p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Maya Collins</p>
                <button><Edit className="size-4 text-muted-foreground" /></button>
              </div>
              <p className="text-xs text-muted-foreground">Total: 4 orders</p>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-xs text-muted-foreground">maya.collins@acme-demo.co</p>
              <p className="text-xs text-muted-foreground">+1 (206) 555-0174</p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Order note</p>
                <button><Edit className="size-4 text-muted-foreground" /></button>
              </div>
            </CardHeader>
            <CardContent>
              <textarea className="w-full text-xs text-muted-foreground border-0 bg-transparent resize-none focus:outline-none" rows={3} defaultValue="Add a handwritten thank-you card and use the gift sleeve for the hero set." />
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2"><p className="font-semibold text-sm">Order activity</p></CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Fulfillment updates.</p>
              <div className="space-y-2 mt-2">
                {["Order placed · Mar 18, 8:18 AM", "Payment confirmed · Mar 18, 8:19 AM", "Preparing order · Mar 18, 9:00 AM"].map(a => (
                  <div key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}