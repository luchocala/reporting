import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipboardList, Filter } from "lucide-react";

const transactions = [
  { ref: "ORD-2024-001", buyer: "Sarah Johnson", total: "$2,499.00", status: "Delivered" },
  { ref: "ORD-2024-002", buyer: "Michael Chen", total: "$1,348.00", status: "Shipped" },
  { ref: "ORD-2024-003", buyer: "Emma Wilson", total: "$1,198.00", status: "Processing" },
  { ref: "ORD-2024-004", buyer: "James Rodriguez", total: "$799.00", status: "Delivered" },
  { ref: "ORD-2024-005", buyer: "Lisa Park", total: "$599.00", status: "Cancelled" },
  { ref: "ORD-2024-006", buyer: "David Kim", total: "$5,498.00", status: "Shipped" },
];

const statusStyles = {
  Delivered: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Shipped: "text-blue-700 bg-blue-50 border-blue-200",
  Processing: "text-amber-700 bg-amber-50 border-amber-200",
  Cancelled: "text-red-700 bg-red-50 border-red-200",
};

export default function D3RecentTransactions() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="size-4 text-muted-foreground" />
            <span className="font-semibold">Recent Transactions</span>
            <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">20</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted transition-colors">
            <Filter className="size-3.5" />Filter
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Order Ref</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Buyer</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Total</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.ref} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">{t.ref}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.buyer}</td>
                <td className="px-4 py-3 font-medium tabular-nums">{t.total}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[t.status]}`}>{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground">1–6 of 20</div>
      </CardContent>
    </Card>
  );
}