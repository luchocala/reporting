import { useState } from "react";
import { ArrowLeft, MoreHorizontal, MessageSquare, Edit } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const TABS = ["Purchases", "Reviews", "Activity"];

const orders = [
  { id: "ORD-34021", status: "Processing", date: "Placed on Mar 18, 2026", channel: "Online Store", total: "$389.00", items: [{ name: "Radiance Ritual Set", sku: "SKU-SKIN-4006", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop" }, { name: "Barrier Repair Drops", sku: "SKU-TREAT-6612", img: "https://images.unsplash.com/photo-1614159869112-5be2b12b6b7c?w=60&h=60&fit=crop" }] },
  { id: "ORD-33682", status: "Delivered", date: "Placed on Feb 27, 2026", channel: "Marketplace", total: "$168.00", items: [{ name: "Botanical Body Polish", sku: "SKU-BODY-6118", img: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=60&h=60&fit=crop" }] },
  { id: "ORD-33340", status: "Delivered", date: "Placed on Jan 19, 2026", channel: "Subscription", total: "$84.00", items: [{ name: "Barrier Repair Drops", sku: "SKU-TREAT-6612", img: "https://images.unsplash.com/photo-1614159869112-5be2b12b6b7c?w=60&h=60&fit=crop" }] },
];

const statusStyles = { Processing: "text-amber-700 bg-amber-50 border-amber-200", Delivered: "text-emerald-700 bg-emerald-50 border-emerald-200" };

export default function CustomerDetail1() {
  const [tab, setTab] = useState("Purchases");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/ecommerce/customer-list-1" className="p-1.5 hover:bg-muted rounded"><ArrowLeft className="size-4" /></Link>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&face" alt="Theo Hammond" className="size-14 rounded-full object-cover" />
          <div>
            <h1 className="text-2xl font-bold">Theo Hammond</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">Active</span>
              <span className="text-xs text-muted-foreground">• Customer ID CUS-1742</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"><MessageSquare className="size-3.5" />Send Message</button>
        </div>
      </div>

      <div className="flex gap-0 border-b border-border">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          {tab === "Purchases" && orders.map(o => (
            <Card key={o.id} className="shadow-none">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{o.id}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[o.status]}`}>{o.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{o.date} • {o.channel}</p>
                  </div>
                  <span className="font-bold text-right">ORDER TOTAL<br /><span className="text-lg">{o.total}</span></span>
                </div>
                <div className="flex gap-2 mt-3">
                  {o.items.map(item => (
                    <div key={item.sku} className="flex items-center gap-2">
                      <img src={item.img} alt={item.name} className="size-10 rounded object-cover" />
                      <div>
                        <p className="text-xs font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {tab !== "Purchases" && (
            <Card className="shadow-none p-8 text-center">
              <p className="text-muted-foreground text-sm">No {tab.toLowerCase()} yet.</p>
            </Card>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2"><p className="font-semibold text-sm">Customer details</p></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Customer source</span>
                <span className="font-medium">Online Store</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last online</span>
                <span className="font-medium">22 Mar 2026, 11:24 AM</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Shipping address</p>
                <button><Edit className="size-4 text-muted-foreground" /></button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden mb-3 h-20 bg-muted">
                <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=280&h=80&fit=crop" alt="Map" className="w-full h-full object-cover opacity-50" />
              </div>
              <p className="text-sm font-medium">Theo Hammond</p>
              <p className="text-xs text-muted-foreground">7841 Mercer Street, Suite 12</p>
              <p className="text-xs text-muted-foreground">Capitol Hill, Building North</p>
              <p className="text-xs text-muted-foreground">Seattle, WA 98102, United States</p>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Contact information</p>
                <button><Edit className="size-4 text-muted-foreground" /></button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">✉</span>
                <span>theo.hammond@caldwell.app</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">📞</span>
                <span>+1 (206) 555-0198</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2"><p className="font-semibold text-sm">Segments</p></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {["VIP", "Repeat buyer", "High value", "West Coast"].map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 border border-border rounded-full text-muted-foreground">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}