import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, MoreHorizontal } from "lucide-react";

const orders = [
  { id: "ORD-4821", shipped: "Jan 27, 2025", delivery: 92 },
  { id: "ORD-4819", shipped: "Jan 26, 2025", delivery: 78 },
  { id: "ORD-4815", shipped: "Jan 25, 2025", delivery: 100 },
  { id: "ORD-4812", shipped: "Jan 24, 2025", delivery: 65 },
  { id: "ORD-4808", shipped: "Jan 23, 2025", delivery: 43 },
  { id: "ORD-4805", shipped: "Jan 22, 2025", delivery: 100 },
  { id: "ORD-4801", shipped: "Jan 21, 2025", delivery: 88 },
  { id: "ORD-4798", shipped: "Jan 20, 2025", delivery: 55 },
];

const SegmentBar = ({ value }) => {
  const segments = 14;
  const filled = Math.round((value / 100) * segments);
  return (
    <div className="flex items-center gap-px">
      {Array.from({ length: segments }).map((_, i) => (
        <div key={i} className="h-1.5 w-2 rounded-sm" style={{ background: i < filled ? "hsl(var(--foreground))" : "hsl(var(--muted))" }} />
      ))}
    </div>
  );
};

export default function D5OrderFulfillment() {
  return (
    <Card className="shadow-none overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Order Fulfillment</CardTitle>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-muted transition-colors"><RefreshCw className="size-3.5 text-muted-foreground" /></button>
            <button className="p-1.5 rounded hover:bg-muted transition-colors"><MoreHorizontal className="size-3.5 text-muted-foreground" /></button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2">Order</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2">Shipped</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2">Del[%]</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2.5 font-medium text-sm">{o.id}</td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{o.shipped}</td>
                <td className="px-4 py-2.5"><SegmentBar value={o.delivery} /></td>
                <td className="px-4 py-2.5 text-right font-medium tabular-nums">{o.delivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}