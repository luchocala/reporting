import { Edit, MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ProgressBar = ({ value }) => (
  <div className="flex items-center gap-1 mt-3 mb-1">
    <div className="size-7 rounded border border-foreground bg-foreground flex items-center justify-center text-xs text-background">📄</div>
    <div className="flex-1 h-1.5 bg-foreground rounded-full" />
    <div className="size-7 rounded border border-muted-foreground/30 flex items-center justify-center text-xs">📦</div>
    <div className="flex-1 h-1.5 bg-muted rounded-full" />
    <div className="size-7 rounded border border-muted-foreground/30 flex items-center justify-center text-xs">🚚</div>
    <div className="flex-1 h-1.5 bg-muted rounded-full" />
    <div className="size-7 rounded border border-muted-foreground/30 flex items-center justify-center text-xs">⏰</div>
  </div>
);

export default function OrderDetail2() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/ecommerce/order-list-3" className="p-1.5 hover:bg-muted rounded"><ArrowLeft className="size-4" /></Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Order Number: SO-654</h1>
              <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-medium">Unpaid</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Sales-order detail view for the new pipeline flow, with invoice, customer, and shipment context in one place.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Quote</button>
          <button className="p-1.5 border border-border rounded-md hover:bg-muted"><ArrowLeft className="size-4 text-muted-foreground" /></button>
          <button className="p-1.5 border border-border rounded-md hover:bg-muted"><ArrowRight className="size-4 text-muted-foreground" /></button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90"><Edit className="size-3.5" />Edit</button>
          <button className="p-1.5 border border-border rounded-md hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          {/* Pipeline status */}
          <Card className="shadow-none p-4">
            <p className="font-semibold">New quote</p>
            <p className="text-xs text-muted-foreground">New quote waiting for approval</p>
            <ProgressBar />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>Quote</span><span>Pack</span><span>Ship</span><span>Done</span>
            </div>
          </Card>

          {/* Order details */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Order details</p>
              <p className="text-xs text-muted-foreground">Core assignment, source, and settlement details for this order.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[["SOURCE", "Marketplace"], ["ORDER DATE", "Mar 28, 2026"], ["DUE DATE", "Apr 10, 2026"], ["ASSIGN TO", "Avery Hall"], ["PAYMENT TERM", "Due on receipt"], ["LOCATION", "Brooklyn, NY"]].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-medium mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Products ordered */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Product ordered</p>
              <p className="text-xs text-muted-foreground">Line-item summary and totals for the current sales order.</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 py-2">
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop" alt="" className="size-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Radiance Ritual Set / Ocean Blue / S</p>
                  <p className="text-xs text-muted-foreground">SKU SKU-SKIN-4006</p>
                </div>
                <div className="grid grid-cols-4 gap-4 text-right">
                  {[["QTY", "1 pcs"], ["RATE", "$210"], ["TAX", "10%"], ["SUBTOTAL", "$210"]].map(([l, v]) => (
                    <div key={l}><p className="text-[10px] text-muted-foreground">{l}</p><p className="text-sm font-medium">{v}</p></div>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-3 mt-2 space-y-1.5">
                {[["Subtotal", "$189"], ["Tax", "$21"], ["Discount", "–"], ["Total", "$210"]].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className={label === "Total" ? "font-semibold" : "text-muted-foreground"}>{label}</span>
                    <span className={label === "Total" ? "font-bold" : ""}>{val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2"><p className="font-semibold text-sm">Invoices</p></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">INVOICE</p>
                  <p className="font-semibold">#INV-00654</p>
                </div>
                <button className="text-xs text-foreground underline">View invoice</button>
              </div>
              {[["Received", "$0"], ["Total payment", "$210"]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <button className="w-full mt-1 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Record payment</button>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2"><p className="font-semibold text-sm">Customer</p></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b4e56dab?w=40&h=40&fit=crop&face" alt="" className="size-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium">Brooklyn Simmons</p>
                  <p className="text-xs text-muted-foreground">Marketplace</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">+1 (718) 555-0136</p>
              <p className="text-xs text-muted-foreground">brooklyn.simmons@acme-demo.co</p>
              <p className="text-xs text-muted-foreground">acme-demo.co</p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2"><p className="font-semibold text-sm">Address</p></CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Billing address</p>
                <p className="text-xs text-muted-foreground mt-0.5">Brooklyn Simmons<br />45 Water St, Apt 3B<br />Brooklyn, NY 11201<br />United States</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}