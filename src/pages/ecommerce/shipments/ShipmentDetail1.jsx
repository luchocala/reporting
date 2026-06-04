import { ArrowLeft, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const steps = [
  { label: "Created", icon: "📦", done: true },
  { label: "Confirmed", icon: "📋", done: true },
  { label: "Transit", icon: "🚚", done: true, partial: true },
  { label: "Delivered", icon: "📍", done: false },
];

const activities = [
  { label: "Order placed", time: "Mar 18, 8:18 AM", desc: "Shipment record was generated from the customer order in the online store.", location: "Seattle, WA", done: true },
  { label: "Preparing to ship", time: "Mar 18, 8:54 AM", desc: "Warehouse team packed the hero set, scanned the label, and sealed the carton.", location: "Mercer Fulfillment Hub", done: true },
  { label: "Picked up by carrier", time: "Mar 18, 11:42 AM", desc: "ParcelFlow collected the shipment and moved it onto the regional linehaul route.", location: "Seattle, WA", done: true },
  { label: "Cross-country transfer", time: "Today, 9:12 AM", desc: "Shipment is currently moving through the Salt Lake hub before the final Midwest handoff.", location: "Salt Lake City, UT", done: true },
  { label: "Out for delivery", time: "Expected tomorrow", desc: "Last-mile dispatch will begin once the local sort is completed.", location: "", done: false },
  { label: "Delivered", time: "", desc: "Estimated: Mar 21", location: "", done: false },
];

export default function ShipmentDetail1() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/ecommerce/shipment-list-1" className="p-1.5 hover:bg-muted rounded"><ArrowLeft className="size-4" /></Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">SHP-8801</h1>
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">In transit</span>
              <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-medium">Delay</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Shipping date Mar 18, 2026 · Order ID <span className="text-foreground font-medium">ORD-52108</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted text-muted-foreground">Cancel shipment</button>
          <button className="p-1.5 border border-border rounded-md hover:bg-muted"><MessageSquare className="size-4 text-muted-foreground" /></button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Notify Customer</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          {/* Route card */}
          <Card className="shadow-none p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs border border-border px-2 py-0.5 rounded">ParcelFlow Express</span>
                <span className="text-xs border border-border px-2 py-0.5 rounded">Priority air</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">ETA</p>
                <p className="text-sm font-semibold">21 Mar 2026 · 10:30 PM</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Route</p>
            <p className="text-xl font-bold">Seattle to Chicago</p>
            <p className="text-xs text-muted-foreground mt-0.5">Mercer Hub → Salt Lake City Hub → Chicago Sort Hub</p>

            {/* Progress steps */}
            <div className="flex items-center gap-0 mt-5 mb-2">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-center flex-1">
                  <div className={`size-8 rounded-full flex items-center justify-center text-xs shrink-0 ${s.done ? "bg-foreground text-background" : "bg-muted text-muted-foreground border-2 border-muted-foreground/20"}`}>{s.icon}</div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-0.5 rounded overflow-hidden">
                      <div className={`h-full rounded ${s.done && steps[i+1].done ? "bg-foreground" : s.partial ? "bg-gradient-to-r from-foreground to-muted" : "bg-muted"}`} style={{ width: s.partial ? "60%" : "100%" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              {steps.map(s => <span key={s.label} className={s.done ? "text-foreground font-medium" : ""}>{s.label}</span>)}
            </div>
          </Card>

          {/* Details grid */}
          <Card className="shadow-none p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[["Carrier", "ParcelFlow Express"], ["Current hub", "Salt Lake City Hub"], ["Last scan", "Today, 9:12 AM"], ["ETA window", "21 Mar 2026, 10:30 PM"]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium mt-0.5">{val}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity */}
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Activity</p>
              <p className="text-xs text-muted-foreground">Shipment updates from creation through delivery.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`size-3 rounded-full mt-1 shrink-0 ${a.done ? "bg-foreground" : "bg-muted border-2 border-muted-foreground/30"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-medium ${!a.done ? "text-muted-foreground" : ""}`}>{a.label}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
                      </div>
                      {a.desc && <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>}
                      {a.location && (
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <span>📍</span>{a.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right map placeholder */}
        <div>
          <Card className="shadow-none overflow-hidden aspect-square">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=400&fit=crop" alt="Map" className="w-full h-full object-cover opacity-60" />
          </Card>
        </div>
      </div>
    </div>
  );
}