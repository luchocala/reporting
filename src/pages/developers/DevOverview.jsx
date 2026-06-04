import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const apiRequestData = [
  { w: "W1", v: 180 }, { w: "W2", v: 130 }, { w: "W3", v: 200 }, { w: "W4", v: 240 },
  { w: "W5", v: 350 }, { w: "W6", v: 600 },
];

const responseTimeData = [
  { w: "W1", v: 350 }, { w: "W2", v: 190 }, { w: "W3", v: 460 }, { w: "W4", v: 142 },
  { w: "W5", v: 220 }, { w: "W6", v: 200 },
];

const visitorData = Array.from({ length: 90 }, (_, i) => ({ d: i, v: 30 + Math.sin(i / 5) * 20 + Math.random() * 30 }));

const activities = [
  { title: "Update user authentication", desc: "Improved security measures and fixed login bugs", user: "John Doe", initials: "JD", time: "2 hours ago", status: "open", statusColor: "text-blue-600 bg-blue-50 border-blue-200" },
  { title: "Fix responsive layout on mobile", desc: "Resolved layout issues for small screen devices", user: "Jane Smith", initials: "JS", time: "5 hours ago", status: "closed", statusColor: "text-gray-600 bg-gray-50 border-gray-200" },
  { title: "Refactor API endpoints", desc: "Improved performance and reduced redundancy", user: "Mike Johnson", initials: "MJ", time: "1 day ago", status: "merged", statusColor: "text-purple-600 bg-purple-50 border-purple-200" },
  { title: "Performance optimization needed", desc: "Identified areas for improving application speed", user: "Alex Lee", initials: "AL", time: "3 days ago", status: "open", statusColor: "text-blue-600 bg-blue-50 border-blue-200" },
];

export default function DevOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Web Overview</h1>
          <p className="text-sm text-muted-foreground">Build, manage, and optimize developer workflows seamlessly.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="border border-input rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none">
            <option>Server</option><option>Client</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
            📅 1 Jan 2023 – 31 Dec 2023 ▾
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          {/* API charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* API Requests */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <p className="font-semibold text-sm">API requests</p>
              <div className="flex items-center gap-4 mt-1 mb-3">
                <div><span className="text-xs text-muted-foreground">Successful </span><span className="text-sm font-bold">270</span></div>
                <div><span className="text-xs text-muted-foreground">Failed </span><span className="text-sm font-bold">6</span></div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiRequestData}>
                    <XAxis dataKey="w" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">↗ Requests increased by 8.7% this week</p>
              <p className="text-xs text-muted-foreground">Displaying total API requests for the past 6 weeks</p>
            </div>

            {/* API Response Time */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <p className="font-semibold text-sm">API response time</p>
              <div className="flex items-center gap-4 mt-1 mb-3">
                <div><span className="text-xs text-muted-foreground">Min </span><span className="text-sm font-bold">142ms</span></div>
                <div><span className="text-xs text-muted-foreground">Avg </span><span className="text-sm font-bold">260ms</span></div>
                <div><span className="text-xs text-muted-foreground">Max </span><span className="text-sm font-bold">460ms</span></div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeData}>
                    <XAxis dataKey="w" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: "#6366f1" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">↘ Response time decreased by 20ms this week</p>
              <p className="text-xs text-muted-foreground">Average API response time for the past 6 weeks in milliseconds</p>
            </div>
          </div>

          {/* Total Visitors */}
          <div className="border border-border rounded-lg p-4 bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-sm">Total visitors</p>
                <p className="text-xs text-muted-foreground">Showing total visitors for the last 3 months</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Desktop <span className="font-bold text-foreground text-sm">24,828</span></p>
                <p className="text-xs text-muted-foreground">Mobile <span className="font-bold text-foreground text-sm">25,010</span></p>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <XAxis dataKey="d" hide />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                  <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
              <span>Apr 1</span><span>Apr 7</span><span>May 14</span><span>May 21</span><span>Jun 3</span><span>Jun 29</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="border border-border rounded-lg p-4 bg-card">
          <p className="font-semibold text-sm mb-3">Recent activities</p>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-tight">{a.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{a.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{a.initials}</div>
                    <span className="text-xs text-muted-foreground">{a.user}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${a.statusColor}`}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}