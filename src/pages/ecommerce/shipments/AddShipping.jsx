import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AddShipping() {
  const [form, setForm] = useState({ carrier: "", service: "", protection: "No coverage", packageName: "Retail carton", packageType: "", length: "45", width: "35", height: "15", itemWeight: "2.5", totalWeight: "0.45", sendNow: false, handoffDate: "" });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Create Shipping Label</h1>
          <p className="text-sm text-muted-foreground">Start a new label draft with carrier, package, and dispatch details.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Reset</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Save draft</button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Create Label</button>
        </div>
      </div>

      <Card className="shadow-none p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-semibold">New shipping draft</p>
            <p className="text-xs text-muted-foreground">Start without a linked order and lock carrier, package, and dispatch details as they become available.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-border rounded-md text-muted-foreground hover:bg-muted">No order linked yet</button>
            <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Choose a carrier</button>
            <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Set package specs</button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Delivery Setup</p>
              <p className="text-xs text-muted-foreground">Pick the lane, speed, and protection level for this parcel.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Carrier Lane</label>
                  <select value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                    <option value="">Select carrier</option>
                    <option>UPS</option><option>FedEx</option><option>DHL</option><option>ParcelFlow</option><option>USPS</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Service Speed</label>
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                    <option value="">Select service</option>
                    <option>Ground Advantage</option><option>Express</option><option>Standard</option><option>Priority air</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Protection Plan</label>
                <select value={form.protection} onChange={e => setForm({...form, protection: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                  <option>No coverage</option><option>Basic ($50)</option><option>Standard ($100)</option><option>Premium ($250)</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Add parcel protection only when the order needs coverage.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold">Package Details</p>
              <p className="text-xs text-muted-foreground">Set the packed weight, carton choice, and outer dimensions for this shipment.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Package Name</label>
                  <input value={form.packageName} onChange={e => setForm({...form, packageName: e.target.value})} placeholder="Retail carton" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Item Weight</label>
                  <div className="flex items-center border border-input rounded-md overflow-hidden">
                    <input value={form.itemWeight} onChange={e => setForm({...form, itemWeight: e.target.value})} className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none" />
                    <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-l border-input">kg</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Package Type</label>
                  <select value={form.packageType} onChange={e => setForm({...form, packageType: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                    <option value="">Select package type</option>
                    <option>Box</option><option>Envelope</option><option>Tube</option><option>Pallet</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Total Weight</label>
                  <div className="flex items-center border border-input rounded-md overflow-hidden">
                    <input value={form.totalWeight} onChange={e => setForm({...form, totalWeight: e.target.value})} className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none" />
                    <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-l border-input">kg</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[["Length", "length", "L"], ["Width", "width", "W"], ["Height", "height", "H"]].map(([label, key, prefix]) => (
                  <div key={key}>
                    <label className="text-sm font-medium block mb-1.5">{label}</label>
                    <div className="flex items-center border border-input rounded-md overflow-hidden">
                      <span className="px-2 py-2 text-xs text-muted-foreground bg-muted border-r border-input">{prefix}</span>
                      <input value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} className="flex-1 px-2 py-2 text-sm bg-background focus:outline-none" />
                      <span className="px-2 py-2 text-xs text-muted-foreground bg-muted border-l border-input">cm</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold text-sm">Rate Snapshot</p>
              <p className="text-xs text-muted-foreground">A quick look at how the label total is building.</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {[["Subtotal", "$0.00"], ["Insurance", "$0.00"], ["Packaging", "$0.00"], ["Discount", "$0.00"]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{l}</span><span>{v}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex items-center justify-between">
                <span className="font-semibold">Label Total</span>
                <span className="text-xl font-bold">$0.00</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="pb-2">
              <p className="font-semibold text-sm">Dispatch Plan</p>
              <p className="text-xs text-muted-foreground">Decide when this parcel leaves and how quickly the customer hears about it.</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Planned handoff date</label>
                <div className="flex items-center border border-input rounded-md overflow-hidden">
                  <input type="date" value={form.handoffDate} onChange={e => setForm({...form, handoffDate: e.target.value})} placeholder="Choose shipping date" className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none" />
                  <span className="px-3 py-2 text-muted-foreground"><Calendar className="size-4" /></span>
                </div>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="radio" checked={form.sendNow} onChange={() => setForm({...form, sendNow: !form.sendNow})} className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Send shipping info to customer now</p>
                  <p className="text-xs text-muted-foreground">Customers receive the carrier and tracking summary as soon as the label is purchased.</p>
                </div>
              </label>
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground">Current plan</p>
                <p className="text-xs text-muted-foreground mt-1">No dispatch timing has been locked yet. Once you choose a handoff date, the plan will activate.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}