import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";

const channels = [
  { initials: "W", label: "Website", number: "4,821", pct: "+18.3%", positive: true, color: "#1a1a1a" },
  { initials: "M", label: "Mobile App", number: "3,147", pct: "+12.7%", positive: true, color: "#6b6b6b" },
  { initials: "E", label: "Email", number: "1,893", pct: "-8.4%", positive: false, color: "#a3a3a3" },
  { initials: "S", label: "Social", number: "762", pct: "+31.2%", positive: true, color: "#d4d4d4" },
];

const total = channels.reduce((sum, c) => sum + parseInt(c.number.replace(",", "")), 0);

export default function D2RevenueChannels() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Revenue Channels</span>
        </div>
        <div>
          <p className="text-2xl font-bold">$98K <span className="text-sm font-normal text-muted-foreground">total revenue</span></p>
          {/* Stacked bar */}
          <div className="flex h-2 w-full rounded-full overflow-hidden gap-px mt-2">
            {channels.map((c) => (
              <div key={c.label} style={{ width: `${(parseInt(c.number.replace(",",""))/total)*100}%`, background: c.color }} />
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
            {channels.slice(0, 3).map((c) => (
              <span key={c.label} className="flex items-center gap-1">
                <span className="size-1.5 rounded-full" style={{ background: c.color }} />{c.label}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground border-b border-border pb-1.5">
          <span>Channels</span>
          <div className="flex gap-8">
            <span>Number</span>
            <span>Total</span>
          </div>
        </div>
        {channels.map((c) => (
          <div key={c.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded flex items-center justify-center text-xs font-bold" style={{ background: c.color, color: c.color === "#d4d4d4" ? "#1a1a1a" : "#fff" }}>
                {c.initials}
              </div>
              <span>{c.label}</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="font-medium tabular-nums">{c.number}</span>
              <span className={`text-xs font-medium ${c.positive ? "text-emerald-600" : "text-red-500"}`}>{c.pct}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}