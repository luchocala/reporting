import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Total Revenue", value: "$1,800,000.00", change: "+12.0%", positive: true },
  { label: "Avg. Fulfillment", value: "2.4 days", change: "-5.0%", positive: false },
  { label: "Orders", value: "9,420", change: "+18.0%", positive: true },
  { label: "Conversion Rate", value: "4.2%", change: "+1.2%", positive: true },
  { label: "Return Rate", value: "3.1%", change: "-11.0%", positive: false },
  { label: "Page Views", value: "184K", change: "+22.0%", positive: true },
];

export default function StatCards6() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-none">
          <CardContent className="p-6">
            <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <span className={`text-xs font-medium ${stat.positive ? "text-emerald-600" : "text-red-500"}`}>
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}