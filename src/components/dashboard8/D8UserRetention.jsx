import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// Cohort-style retention heatmap
const cohorts = [
  [100, 65, 52, 43, 38, 31, 28],
  [100, 70, 58, 50, 44, 38],
  [100, 68, 55, 47, 41],
  [100, 72, 60, 52],
  [100, 74, 62],
  [100, 71],
  [100],
];

const getOpacity = (v) => {
  if (v === 100) return 1;
  if (v >= 70) return 0.75;
  if (v >= 55) return 0.55;
  if (v >= 40) return 0.35;
  return 0.2;
};

export default function D8UserRetention() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">User Retention</p>
          <button className="text-xs text-muted-foreground hover:text-foreground">Details</button>
        </div>
        <div>
          <p className="text-3xl font-bold">24%</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-0.5">
            <TrendingUp className="size-3" />+2.0%
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {cohorts.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((v, ci) => (
                <div
                  key={ci}
                  className="h-4 flex-1 rounded-sm"
                  style={{ background: `hsl(var(--foreground))`, opacity: getOpacity(v) }}
                  title={`${v}%`}
                />
              ))}
            </div>
          ))}
          <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => <span key={n}>{n}</span>)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}