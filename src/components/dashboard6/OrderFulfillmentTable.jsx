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
  { id: "ORD-4794", shipped: "Jan 19, 2025", delivery: 100 },
  { id: "ORD-4790", shipped: "Jan 18, 2025", delivery: 71 },
  { id: "ORD-4786", shipped: "Jan 17, 2025", delivery: 35 },
  { id: "ORD-4782", shipped: "Jan 16, 2025", delivery: 96 },
];

const SegmentBar = ({ value }) => {
  const segments = 16;
  const filled = Math.round((value / 100) * segments);
  return (
    <div className="flex items-center gap-px">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-2.5 rounded-sm"
          style={{ background: i < filled ? "hsl(var(--foreground))" : "hsl(var(--muted))" }}
        />
      ))}
    </div>
  );
};

export default function OrderFulfillmentTable() {
  return (
    <Card className="shadow-none overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Order Fulfillment</CardTitle>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-muted transition-colors">
              <RefreshCw className="size-3.5 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-muted transition-colors">
              <MoreHorizontal className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-y-auto max-h-[340px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Order</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Shipped</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Del[%]</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-sm">{order.id}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{order.shipped}</td>
                  <td className="px-4 py-2.5">
                    <SegmentBar value={order.delivery} />
                  </td>
                  <td className="px-4 py-2.5 text-right font-medium tabular-nums">{order.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}