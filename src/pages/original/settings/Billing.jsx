import { useState } from "react";
import { CreditCard, Apple } from "lucide-react";

export default function SettingsBilling() {
  const [payment, setPayment] = useState("card");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold">Billing</h2>
        <p className="text-sm text-muted-foreground">Update your payment plan details.</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Username</label>
            <input placeholder="Enter username" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
            <p className="text-xs text-muted-foreground">This is your username.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">City</label>
            <input placeholder="Enter City" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
            <p className="text-xs text-muted-foreground">This is your city name.</p>
          </div>
        </div>

        {/* Payment method */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Payment</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "card", label: "Card", icon: <CreditCard className="size-6" /> },
              { key: "paypal", label: "Paypal", icon: <span className="text-xl font-bold text-blue-600">P</span> },
              { key: "apple", label: "Apple", icon: <Apple className="size-6" /> },
            ].map(m => (
              <button
                key={m.key}
                onClick={() => setPayment(m.key)}
                className={`flex flex-col items-center justify-center gap-1 py-4 border rounded-lg text-sm transition-colors ${
                  payment === m.key ? "border-foreground bg-muted/50 font-medium" : "border-border hover:bg-muted/30"
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Card Number</label>
          <input placeholder="Enter Card No." className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
          <p className="text-xs text-muted-foreground">This is number of your card No.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Expires</label>
            <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
              <option>Month</option>
              {[...Array(12)].map((_, i) => <option key={i}>{String(i + 1).padStart(2, "0")}</option>)}
            </select>
            <p className="text-xs text-muted-foreground">This is your card expire date.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Year</label>
            <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
              <option>Year</option>
              {[2024, 2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
            </select>
            <p className="text-xs text-muted-foreground">This is your card expire year.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">CV</label>
            <input placeholder="CVC" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none" />
            <p className="text-xs text-muted-foreground">This is your CV No.</p>
          </div>
        </div>

        <button className="w-full py-2.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Continue</button>
      </div>
    </div>
  );
}