import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const orders = [
  { id: "#ORD-8471", customer: "Alice Johnson", product: "MacBook Pro 14\"", amount: "$2,399.00", status: "Fulfilled", date: "Nov 12, 2025" },
  { id: "#ORD-8470", customer: "Bob Martinez", product: "Sony WH-1000XM5", amount: "$349.00", status: "Processing", date: "Nov 12, 2025" },
  { id: "#ORD-8469", customer: "Carol Smith", product: "iPad Air 5th Gen", amount: "$749.00", status: "Fulfilled", date: "Nov 11, 2025" },
  { id: "#ORD-8468", customer: "David Lee", product: "Nike Air Max 270", amount: "$128.00", status: "Refunded", date: "Nov 11, 2025" },
  { id: "#ORD-8467", customer: "Emma Davis", product: "Samsung Galaxy S24", amount: "$999.00", status: "Fulfilled", date: "Nov 10, 2025" },
  { id: "#ORD-8466", customer: "Frank Wilson", product: "Canon EOS R50", amount: "$679.00", status: "Processing", date: "Nov 10, 2025" },
  { id: "#ORD-8465", customer: "Grace Taylor", product: "Dyson V15 Detect", amount: "$749.00", status: "Fulfilled", date: "Nov 09, 2025" },
];

const statusStyles = {
  Fulfilled: "bg-emerald-500/10 text-emerald-500",
  Processing: "bg-amber-500/10 text-amber-500",
  Refunded: "bg-red-500/10 text-red-400",
};

export default function RecentOrdersTable() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingCart className="size-4" />
            <span className="text-sm font-medium text-foreground">Recent Orders</span>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all</button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Order</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Customer</th>
                <th className="hidden md:table-cell px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Product</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="hidden lg:table-cell px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{o.id}</td>
                  <td className="px-4 py-2.5 font-medium">{o.customer}</td>
                  <td className="hidden md:table-cell px-4 py-2.5 text-muted-foreground">{o.product}</td>
                  <td className="px-4 py-2.5 text-right font-medium tabular-nums">{o.amount}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-2.5 text-xs text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}