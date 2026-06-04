import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";

const plans = [
  { key: "monthly", label: "Monthly", price: "$49.99 / month", sub: "Billed monthly" },
  { key: "annual", label: "Annual", badge: "Save %100", price: "$41.40 / month", sub: "$499.99 yearly" },
  { key: "lifetime", label: "Lifetimes", price: "$899.99", sub: "1x Billed" },
];

const features = ["Dedicated Account Manager", "Community Access & Forum Participation", "Customizable Settings & Preferences", "Regular Performance Reports"];
const additional = ["Mentorship Program", "Community Tutorials", "Access to Knowledge Base"];

export default function SettingsPlans() {
  const [selected, setSelected] = useState("monthly");

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold">Plans</h2>
        <p className="text-sm text-muted-foreground">Your subscriptions will begin today with a free 14-day trial.</p>
      </div>

      {/* Plan selector */}
      <div className="grid grid-cols-3 gap-3">
        {plans.map(p => (
          <button
            key={p.key}
            onClick={() => setSelected(p.key)}
            className={`flex flex-col items-start p-4 border rounded-lg text-left transition-colors ${
              selected === p.key ? "border-foreground" : "border-border hover:border-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`size-4 rounded-full border-2 flex items-center justify-center ${selected === p.key ? "border-blue-600" : "border-muted-foreground"}`}>
                {selected === p.key && <div className="size-2 rounded-full bg-blue-600" />}
              </div>
              <span className="text-sm font-medium">{p.label}</span>
              {p.badge && <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{p.badge}</span>}
            </div>
            <p className="text-sm font-bold">{p.price}</p>
            <p className="text-xs text-muted-foreground">{p.sub}</p>
          </button>
        ))}
      </div>

      {/* Overview */}
      <div>
        <p className="font-semibold mb-1">Overview</p>
        <p className="text-sm text-muted-foreground">Experience all the core features with the flexibility of a monthly subscription. Stay up-to-date with the latest tools, receive ongoing support, and enjoy uninterrupted access to key functionalities designed to enhance your productivity.</p>
      </div>

      {/* Features */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Features</p>
          <button className="text-sm text-blue-600 flex items-center gap-1 hover:underline">Learn More <ExternalLink className="size-3" /></button>
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {features.map(f => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <Check className="size-3.5 text-foreground shrink-0" />{f}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Additional Resources</p>
          <button className="text-sm text-blue-600 flex items-center gap-1 hover:underline">Learn More <ExternalLink className="size-3" /></button>
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {additional.map(f => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <Check className="size-3.5 text-foreground shrink-0" />{f}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-5 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">Start Subscribe</button>
      </div>
    </div>
  );
}