import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

const SECTIONS = ["Account", "Contacts", "Billing", "Shipping", "Cards", "Preferences"];

export default function AddCustomer() {
  const [section, setSection] = useState("Account");
  const [form, setForm] = useState({ firstName: "", lastName: "", customerId: "CUS-2418", company: "", status: "Active", source: "Online store", owner: "Avery Hall", marketingOptIn: true });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Add New Customer</h1>
          <p className="text-sm text-muted-foreground">Add the account, contacts, addresses, and payment methods the team needs to operate this customer.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Reset form</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Save draft</button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Create customer</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr] gap-4">
        {/* Left nav */}
        <div className="space-y-0.5">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setSection(s)} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${section === s ? "bg-foreground text-background font-medium" : "hover:bg-muted text-muted-foreground"}`}>{s}</button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {section === "Account" && (
            <Card className="shadow-none">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="font-semibold mb-0.5">Account</p>
                  <p className="text-xs text-muted-foreground">Identity, source, and internal ownership for this customer record.</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">FIRST NAME</label>
                    <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">LAST NAME</label>
                    <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">CUSTOMER ID</label>
                    <input value={form.customerId} readOnly className="w-full border border-input rounded-md px-3 py-2 text-sm bg-muted focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">COMPANY</label>
                    <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">STATUS</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                      <option>Active</option><option>Inactive</option><option>VIP</option><option>At Risk</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">SOURCE</label>
                    <select value={form.source} onChange={e => setForm({...form, source: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                      <option>Online store</option><option>Marketplace</option><option>Wholesale</option><option>Retail Partner</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1.5">ACCOUNT OWNER</label>
                    <select value={form.owner} onChange={e => setForm({...form, owner: e.target.value})} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
                      <option>Avery Hall</option><option>Riley Chen</option><option>Jordan Lee</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {section === "Contacts" && (
            <Card className="shadow-none">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="font-semibold mb-0.5">Contacts</p>
                  <p className="text-xs text-muted-foreground">Keep the real people and preferred communication path attached to the account.</p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium">Primary channel</p>
                      <p className="text-xs text-muted-foreground">Choose how the team usually reaches this customer.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">PREFERRED CHANNEL</p>
                        <select className="border border-input rounded-md px-2 py-1 text-sm bg-background focus:outline-none"><option>EMAIL</option><option>PHONE</option><option>SMS</option></select>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1">Marketing opt-in</p>
                        <p className="text-xs text-muted-foreground">Include this customer in campaign sends</p>
                        <button onClick={() => setForm({...form, marketingOptIn: !form.marketingOptIn})} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors mt-1 ${form.marketingOptIn ? "bg-foreground" : "bg-muted"}`}>
                          <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${form.marketingOptIn ? "translate-x-4" : "translate-x-0.5"}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">👤</span>
                        <div>
                          <p className="text-sm font-medium">Primary</p>
                          <p className="text-xs text-muted-foreground">Customer contact</p>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-muted rounded"><Trash2 className="size-4 text-muted-foreground" /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div><label className="text-xs text-muted-foreground block mb-1">LABEL</label><input defaultValue="Primary" className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none" /></div>
                      <div><label className="text-xs text-muted-foreground block mb-1">EMAIL</label><input type="email" placeholder="Email address" className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none" /></div>
                      <div><label className="text-xs text-muted-foreground block mb-1">PHONE</label><input type="tel" placeholder="Phone number" className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none" /></div>
                    </div>
                  </div>
                  <button className="mt-3 text-sm text-foreground font-medium hover:underline">+ Add contact person</button>
                </div>
              </CardContent>
            </Card>
          )}

          {["Billing", "Shipping", "Cards", "Preferences"].includes(section) && (
            <Card className="shadow-none">
              <CardContent className="p-6">
                <p className="font-semibold mb-0.5">{section}</p>
                <p className="text-xs text-muted-foreground mb-4">Configure {section.toLowerCase()} information for this customer.</p>
                <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center gap-2">
                  <p className="text-sm text-muted-foreground">No {section.toLowerCase()} information added yet.</p>
                  <button className="text-sm text-foreground font-medium hover:underline">+ Add {section.toLowerCase()}</button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}