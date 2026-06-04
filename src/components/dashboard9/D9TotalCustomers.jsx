import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const segments = [
  { label: "Enterprise", value: "1,074", change: "+3.2%", pct: 45, positive: true },
  { label: "SMB", value: "836", change: "-1.5%", pct: 35, positive: false },
  { label: "Individual", value: "478", change: "+5.8%", pct: 20, positive: true },
];

const COLORS = ["#1a1a1a", "#6b6b6b", "#d4d4d4"];

export default function D9TotalCustomers() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-3xl font-bold tracking-tight">2,388</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
              <TrendingUp className="size-3" />+4.2%
            </div>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground">Details</button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Venn-like circles representation */}
        <div className="flex items-center justify-center py-4">
          <div className="relative w-52 h-36">
            {segments.map((s, i) => {
              const sizes = [120, 100, 80];
              const positions = [
                { left: "10%", top: "10%" },
                { left: "32%", top: "22%" },
                { left: "52%", top: "14%" },
              ];
              return (
                <div
                  key={s.label}
                  className="absolute rounded-full border-2 flex items-center justify-center"
                  style={{
                    width: sizes[i],
                    height: sizes[i],
                    background: COLORS[i],
                    opacity: 0.15 + (i * 0.1),
                    ...positions[i],
                    border: `2px solid ${COLORS[i]}`,
                    opacity: 1,
                    backgroundColor: `${COLORS[i]}${i === 0 ? "22" : i === 1 ? "18" : "12"}`,
                  }}
                >
                  <span className="text-sm font-bold" style={{ color: COLORS[i] }}>{s.pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-2 mt-2">
          {segments.map((s, i) => (
            <div key={s.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{s.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium tabular-nums">{s.value}</span>
                <span className={`text-xs font-medium ${s.positive ? "text-emerald-600" : "text-red-500"}`}>
                  {s.positive ? "↑" : "↓"}{s.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}