import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, TrendingUp, TrendingDown } from "lucide-react";

const products = [
  { name: "MacBook Pro 14\"", category: "Electronics", units: 1243, revenue: "$2,980,557", trend: "+12.3%", positive: true },
  { name: "iPhone 15 Pro", category: "Electronics", units: 984, revenue: "$1,179,816", trend: "+8.7%", positive: true },
  { name: "Sony WH-1000XM5", category: "Audio", units: 756, revenue: "$263,844", trend: "+5.1%", positive: true },
  { name: "Nike Air Max 270", category: "Footwear", units: 621, revenue: "$79,488", trend: "-2.4%", positive: false },
  { name: "Dyson V15 Detect", category: "Home", units: 432, revenue: "$323,568", trend: "+14.6%", positive: true },
];

export default function TopProductsList() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="size-4" />
            <span className="text-sm font-medium text-foreground">Top Products</span>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all</button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Product</th>
                <th className="hidden sm:table-cell px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Units</th>
                <th className="hidden md:table-cell px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Revenue</th>
                <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium">{p.name}</td>
                  <td className="hidden sm:table-cell px-4 py-2.5 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">{p.units.toLocaleString()}</td>
                  <td className="hidden md:table-cell px-4 py-2.5 text-right font-medium tabular-nums">{p.revenue}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${p.positive ? "text-emerald-500" : "text-red-400"}`}>
                      {p.positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {p.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}