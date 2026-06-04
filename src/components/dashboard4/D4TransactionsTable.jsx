import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingCart, Search, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const allTxns = [
  { id: "TXN-100201", customer: "Sarah Johnson", initials: "SJ", amount: "$129.99", type: "Sale", method: "Credit Card", date: "Today", status: "Completed" },
  { id: "TXN-100202", customer: "Michael Chen", initials: "MC", amount: "$84.50", type: "Sale", method: "PayPal", date: "Today", status: "Completed" },
  { id: "TXN-100203", customer: "Emma Wilson", initials: "EW", amount: "$249.00", type: "Subscription", method: "Credit Card", date: "Today", status: "Pending" },
  { id: "TXN-100204", customer: "James Rodriguez", initials: "JR", amount: "$45.99", type: "Refund", method: "Debit Card", date: "Today", status: "Refunded" },
  { id: "TXN-100205", customer: "Lisa Park", initials: "LP", amount: "$312.00", type: "Sale", method: "Bank Transfer", date: "Today", status: "Failed" },
  { id: "TXN-100206", customer: "David Kim", initials: "DK", amount: "$67.25", type: "Sale", method: "Credit Card", date: "1 day ago", status: "Completed" },
  { id: "TXN-100207", customer: "Anna Martinez", initials: "AM", amount: "$189.99", type: "Subscription", method: "PayPal", date: "1 day ago", status: "Completed" },
  { id: "TXN-100208", customer: "Robert Taylor", initials: "RT", amount: "$95.00", type: "Sale", method: "Debit Card", date: "1 day ago", status: "Pending" },
  { id: "TXN-100209", customer: "Jennifer Lee", initials: "JL", amount: "$156.50", type: "Refund", method: "Credit Card", date: "1 day ago", status: "Refunded" },
  { id: "TXN-100210", customer: "William Brown", initials: "WB", amount: "$78.99", type: "Sale", method: "PayPal", date: "2 days ago", status: "Completed" },
];

const statusStyles = {
  Completed: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Pending: "text-amber-700 bg-amber-50 border-amber-200",
  Refunded: "text-blue-700 bg-blue-50 border-blue-200",
  Failed: "text-red-700 bg-red-50 border-red-200",
};

export default function D4TransactionsTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const filtered = allTxns.filter(t => t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paged = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="size-4 text-muted-foreground" />
            <span className="font-semibold">Transactions</span>
            <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">50</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search transactions" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-48" />
            </div>
            <select className="text-xs border border-border rounded-md px-2 py-1.5 bg-background focus:outline-none">
              <option>All</option>
              <option>Sale</option>
              <option>Subscription</option>
              <option>Refund</option>
            </select>
            <button className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Status</button>
            <button className="px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">Method</button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Transaction ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Payment Method</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {paged.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-sm">{t.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">{t.initials}</div>
                      <span className="whitespace-nowrap">{t.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium tabular-nums">{t.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{t.type}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{t.method}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{t.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3"><button className="p-1 rounded hover:bg-muted"><MoreHorizontal className="size-4 text-muted-foreground" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Rows per page: {rowsPerPage}</span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>1–{paged.length} of 50</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 rounded hover:bg-muted disabled:opacity-40"><ChevronLeft className="size-4" /></button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1 rounded hover:bg-muted disabled:opacity-40"><ChevronRight className="size-4" /></button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}