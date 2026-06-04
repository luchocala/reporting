import { Card, CardContent, CardHeader } from "@/components/ui/card";

const genderData = [
  { label: "Men", pct: 36, color: "#1a1a1a" },
  { label: "Women", pct: 56, color: "#6b6b6b" },
  { label: "Other", pct: 8, color: "#d4d4d4" },
];

export default function D9GeographyCard() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">Geography</p>
          <button className="text-xs text-muted-foreground hover:text-foreground">Details</button>
        </div>
        <p className="text-2xl font-bold">34,700</p>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Stacked bar */}
        <div className="flex h-3 w-full rounded-full overflow-hidden gap-px mb-3">
          {genderData.map((g) => (
            <div key={g.label} style={{ width: `${g.pct}%`, background: g.color }} />
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          {genderData.map((g) => (
            <span key={g.label} className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: g.color }} />
              {g.label} {g.pct}%
            </span>
          ))}
        </div>
        {/* Dotmap representation */}
        <div className="grid grid-cols-[repeat(40,1fr)] gap-0.5 mt-2">
          {Array.from({ length: 200 }).map((_, i) => {
            const rand = (i * 37 + i * 13) % 100;
            const hasData = rand > 55;
            const size = rand > 80 ? "large" : rand > 70 ? "medium" : "small";
            return (
              <div
                key={i}
                className={`rounded-full ${hasData ? "bg-foreground" : "bg-transparent"}`}
                style={{
                  width: size === "large" ? 8 : size === "medium" ? 6 : 4,
                  height: size === "large" ? 8 : size === "medium" ? 6 : 4,
                  opacity: hasData ? (size === "large" ? 0.9 : size === "medium" ? 0.6 : 0.3) : 0,
                }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}