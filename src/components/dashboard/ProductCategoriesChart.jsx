import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const data = [
  { name: "Electronics", value: 38, color: "#6366f1" },
  { name: "Clothing", value: 27, color: "#8b5cf6" },
  { name: "Home & Garden", value: 21, color: "#a78bfa" },
  { name: "Sports", value: 14, color: "#c4b5fd" },
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function ProductCategoriesChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card className="shadow-none bg-muted/40">
      <CardHeader className="pb-1">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Layers className="size-4" />
          <span className="text-sm font-medium text-foreground">Product Categories</span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-36 w-36 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart style={{ outline: 'none' }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={62}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  cursor="default"
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold" style={{ color: data[activeIndex].color }}>
                {data[activeIndex].value}%
              </span>
              <span className="text-[9px] text-muted-foreground leading-tight text-center px-1 line-clamp-2">
                {data[activeIndex].name}
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-2.5">
            {data.map((item, i) => (
              <div
                key={item.name}
                className="space-y-1 cursor-pointer"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className={i === activeIndex ? "text-foreground font-medium" : "text-muted-foreground"}>
                      {item.name}
                    </span>
                  </div>
                  <span className="font-medium tabular-nums">{item.value}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${item.value}%`, background: item.color, opacity: i === activeIndex ? 1 : 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}