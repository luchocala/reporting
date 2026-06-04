import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipboardList, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const allOrders = [
  { id: "ORD-2024-001", items: 2, customer: "Sarah Johnson", initials: "SJ", status: "Delivered", total: "$2,499.00", date: "Jan 28, 2024" },
  { id: "ORD-2024-002", items: 2, customer: "Michael Chen", initials: "MC", status: "Shipped", total: "$1,348.00", date: "Jan 27, 2024" },
  { id: "ORD-2024-003", items: 3, customer: "Emma Wilson", initials: "EW", status: "Processing", total: "$1,198.00", date: "Jan 27, 2024" },
  { id: "ORD-2024-004", items: 1, customer: "James Rodriguez", initials: "JR", status: "Delivered", total: "$799.00", date: "Jan 26, 2024" },
  { id: "ORD-2024-005", items: 1, customer: "Lisa Park", initials: "LP", status: "Cancelled", total: "$599.00", date: "Jan 26, 2024" },
  { id: "ORD-2024-006", items: 2, customer: "David Kim", initials: "DK", status: "Shipped", total: "$5,498.00", date: "Jan 25, 2024" },
  { id: "ORD-2024-007", items: 1, customer: "Anna Martinez", initials: "AM", status: "Delivered", total: "$1,199.00", date: "Jan 25, 2024" },
  { id: "ORD-2024-008", items: 2, customer: "Robert Taylor", initials: "RT", status: "Processing", total: "$878.00", date: "Jan 24, 2024" },
  { id: "ORD-2024-009", items: 1, customer: "Jennifer Lee", initials: "JL", status: "Shipped", total: "$549.00", date: "Jan 24, 2024" },
  { id: "ORD-2024-010", items: 2, customer: "William Brown", initials: "WB", status: "Delivered", total: "$1,648.00", date: "Jan 23, 2024" },
  { id: "ORD-2024-011", items: 3, customer: "Emily Davis", initials: "ED", status: "Processing", total: "$2,100.00", date: "Jan 23, 2024" },
  { id: "ORD-2024-012", items: 1, customer: "Chris Wilson", initials: "CW", status: "Delivered", total: "$449.00", date: "Jan 22, 2024" },
  { id: "ORD-2024-013", items: 2, customer: "Amanda Jones", initials: "AJ", status: "Shipped", total: "$3,200.00", date: "Jan 22, 2024" },
  { id: "ORD-2024-014", items: 1, customer: "Kevin Smith", initials: "KS", status: "Delivered", total: "$699.00", date: "Jan 21, 2024" },
  { id: "ORD-2024-015", items: 4, customer: "Rachel Green", initials: "RG", status: "Processing", total: "$1,999.00", date: "Jan 21, 2024" },
  { id: "ORD-2024-016", items: 2, customer: "Marcus Johnson", initials: "MJ", status: "Cancelled", total: "$899.00", date: "Jan 20, 2024" },
  { id: "ORD-2024-017", items: 1, customer: "Sophia Brown", initials: "SB", status: "Delivered", total: "$1,299.00", date: "Jan 20, 2024" },
  { id: "ORD-2024-018", items: 3, customer: "Daniel White", initials: "DW", status: "Shipped", total: "$2,750.00", date: "Jan 19, 2024" },
  { id: "ORD-2024-019", items: 2, customer: "Olivia Harris", initials: "OH", status: "Processing", total: "$1,450.00", date: "Jan 19, 2024" },
  { id: "ORD-2024-020", items: 1, customer: "Lucas Martin", initials: "LM", status: "Delivered", total: "$799.00", date: "Jan 18, 2024" },
];

const statusStyles = {
  Delivered: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Shipped: "text-blue-700 bg-blue-50 border-blue-200",
  Processing: "text-amber-700 bg-amber-50 border-amber-200",
  Cancelled: "text-red-700 bg-red-50 border-red-200",
};

export default function D2RecentOrders() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const filtered = allOrders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paged = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const start = filtered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, filtered.length);

  return (
    <Card className="shadow-none">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="size-4 text-muted-foreground" />
            <span className="font-semibold">Recent Orders</span>
            <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded-full">{allOrders.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search orders..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-52" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted transition-colors">
              <Filter className="size-3.5" />Filter
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-10">#</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Order</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Customer</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Total</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Date</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {paged.map((order, i) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3.5 text-muted-foreground text-xs">{start + i}</td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.items} {order.items === 1 ? "item" : "items"}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">{order.initials}</div>
                      <span className="whitespace-nowrap">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusStyles[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3.5 font-medium tabular-nums">{order.total}</td>
                  <td className="px-4 py-3.5 text-muted-foreground text-xs whitespace-nowrap">{order.date}</td>
                  <td className="px-4 py-3.5"><button className="p-1 rounded hover:bg-muted transition-colors"><MoreHorizontal className="size-4 text-muted-foreground" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Rows per page: {rowsPerPage}</span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{start}–{end} of {filtered.length}</span>
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