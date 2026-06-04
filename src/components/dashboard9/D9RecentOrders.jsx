import { Card, CardContent, CardHeader } from "@/components/ui/card";

const orders = [
  { initials: "SC", customer: "Sarah Chen", order: "#ORD-7821", status: "Delivered", amount: "$129.99", time: "23 min ago" },
  { initials: "MJ", customer: "Marcus Johnson", order: "#ORD-7820", status: "Processing", amount: "$89.95", time: "1 hour ago" },
  { initials: "ER", customer: "Emily Rodriguez", order: "#ORD-7819", status: "Delivered", amount: "$34.50", time: "2 hours ago" },
  { initials: "DK", customer: "David Kim", order: "#ORD-7818", status: "Cancelled", amount: "$199.00", time: "3 hours ago" },
  { initials: "AP", customer: "Aisha Patel", order: "#ORD-7817", status: "Delivered", amount: "$45.00", time: "5 hours ago" },
];

const statusStyles = {
  Delivered: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Processing: "text-amber-700 bg-amber-50 border-amber-200",
  Cancelled: "text-red-700 bg-red-50 border-red-200",
};

export default function D9RecentOrders() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <p className="font-semibold text-sm">Recent Orders</p>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Customer</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Order</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Status</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Amount</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-2.5">Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">{o.initials}</div>
                    <span className="text-sm whitespace-nowrap">{o.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{o.order}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[o.status]}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">{o.amount}</td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground whitespace-nowrap">{o.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}