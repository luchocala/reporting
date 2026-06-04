import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingCart, MoreHorizontal } from "lucide-react";

const segments = [
  { label: "Processing", pct: 12.5, color: "#1a1a1a" },
  { label: "Shipped", pct: 33.9, color: "#6b6b6b" },
  { label: "Delivered", pct: 53.6, color: "#d4d4d4" },
];

export default function D3OrderStatus() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Order Status</span>
          </div>
          <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
        </div>
        <p className="text-xs text-muted-foreground">1,247 Orders This Month</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex h-3 w-full rounded-full overflow-hidden gap-px mb-3">
          {segments.map((s) => <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />)}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          {segments.map((s) => <span key={s.label}>{s.pct}%</span>)}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {segments.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: s.color }} />{s.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}