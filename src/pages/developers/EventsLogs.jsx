import { useState } from "react";
import { Search, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";

const logs = [
  { ts: "2023-05-01 10:30:15", level: "INFO", msg: "Application started successfully", src: "app.js" },
  { ts: "2023-05-01 10:31:23", level: "WARN", msg: "High memory usage detected", src: "system.monitor.js" },
  { ts: "2023-05-01 10:32:46", level: "ERROR", msg: "Failed to connect to database", src: "database.js" },
  { ts: "2023-05-01 10:33:12", level: "INFO", msg: "User authentication successful", src: "auth.js" },
  { ts: "2023-05-01 10:34:57", level: "DEBUG", msg: "Cache miss for key: user_preferences", src: "cache.js" },
  { ts: "2023-05-01 10:35:30", level: "INFO", msg: "API request received: GET /api/users", src: "api.js" },
  { ts: "2023-05-01 10:36:05", level: "WARN", msg: "Deprecated function called: oldFunction()", src: "legacy.js" },
];

const pages = [
  { path: "/api-keys", visitors: 112 },
  { path: "/overview", visitors: 45 },
  { path: "/event-logs", visitors: 24 },
  { path: "/login", visitors: 134 },
  { path: "/otp", visitors: 120 },
];

const referrers = [
  { icon: "📘", name: "facebook.com", visitors: 8 },
  { icon: "🐙", name: "github.com", visitors: 6 },
  { icon: "🔍", name: "google.com", visitors: 5 },
  { icon: "💼", name: "lnkd.in", visitors: 9 },
  { icon: "△", name: "vercel.com", visitors: 2 },
];

const levelStyles = {
  INFO: "bg-blue-50 text-blue-700 border-blue-200",
  WARN: "bg-amber-50 text-amber-700 border-amber-200",
  ERROR: "bg-red-500 text-white border-red-500",
  DEBUG: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function EventsLogs() {
  const [timelineOpen, setTimelineOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [envOpen, setEnvOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [levels, setLevels] = useState({ Warning: false, Error: false });

  const filtered = logs.filter(l =>
    l.msg.toLowerCase().includes(search.toLowerCase()) || l.src.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events & Logs</h1>
          <p className="text-sm text-muted-foreground">Track, analyze, and act on application behaviors efficiently.</p>
        </div>
        <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Import</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4">
        {/* Filters sidebar */}
        <div className="border border-border rounded-lg p-3 bg-card h-fit">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Filters</span>
            <button className="text-xs text-muted-foreground hover:text-foreground">Reset</button>
          </div>

          {/* Timeline */}
          <div className="border-b border-border pb-3 mb-3">
            <button onClick={() => setTimelineOpen(!timelineOpen)} className="flex items-center justify-between w-full text-sm font-medium">
              Timeline {timelineOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
            </button>
            {timelineOpen && (
              <div className="mt-2 space-y-2">
                <select className="w-full border border-input rounded-md px-2 py-1.5 text-xs bg-background focus:outline-none">
                  <option>Custom</option><option>Last 7 days</option><option>Last 30 days</option>
                </select>
                <div className="flex items-center gap-1 border border-input rounded-md px-2 py-1.5">
                  <span className="text-xs text-muted-foreground">📅</span>
                  <span className="text-xs">03 Jun, 2026</span>
                </div>
              </div>
            )}
          </div>

          {/* Contains Level */}
          <div className="border-b border-border pb-3 mb-3">
            <button onClick={() => setLevelOpen(!levelOpen)} className="flex items-center justify-between w-full text-sm font-medium">
              Contains Level {levelOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
            </button>
            {levelOpen && (
              <div className="mt-2 space-y-1.5">
                {[["Warning", 10], ["Error", 4]].map(([label, count]) => (
                  <label key={label} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={levels[label]} onChange={() => setLevels(l => ({ ...l, [label]: !l[label] }))} />
                      <span className="text-sm">{label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Environment */}
          <div className="border-b border-border pb-3 mb-3">
            <button onClick={() => setEnvOpen(!envOpen)} className="flex items-center justify-between w-full text-sm font-medium">
              Environment {envOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
            </button>
          </div>

          {/* Types */}
          <div>
            <button onClick={() => setTypesOpen(!typesOpen)} className="flex items-center justify-between w-full text-sm font-medium">
              Types {typesOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-4">
          {/* Log table */}
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <button className="p-1 hover:bg-muted rounded text-muted-foreground">⚡</button>
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full" />
              </div>
              <button className="p-1.5 border border-input rounded-md hover:bg-muted"><RefreshCw className="size-3.5 text-muted-foreground" /></button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted text-emerald-600">● Live</button>
              <button className="p-1 hover:bg-muted rounded text-muted-foreground">⋮</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Level</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Message</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10">
                    <td className="px-4 py-2 text-xs font-mono text-muted-foreground whitespace-nowrap">{l.ts}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${levelStyles[l.level]}`}>{l.level}</span>
                    </td>
                    <td className="px-4 py-2 text-sm">{l.msg}</td>
                    <td className="px-4 py-2 text-xs text-muted-foreground">{l.src}</td>
                  </tr>
                ))}
                <tr className="border-t border-border bg-muted/10">
                  <td colSpan={3} className="px-4 py-2 text-sm font-medium">Total</td>
                  <td className="px-4 py-2 text-sm font-bold">$2,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pages & Referrers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex gap-3 border-b border-border pb-2 mb-3">
                {["Pages", "Routes", "Hostnames"].map((t, i) => (
                  <button key={t} className={`text-sm pb-0.5 border-b-2 ${i === 0 ? "border-foreground font-medium" : "border-transparent text-muted-foreground"}`}>{t}</button>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">VISITORS</span>
              </div>
              <div className="space-y-2">
                {pages.map(p => (
                  <div key={p.path} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{p.path}</span>
                    <span className="font-medium">{p.visitors}</span>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-foreground border border-border rounded-md py-1.5">View All ⤢</button>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex gap-3 border-b border-border pb-2 mb-3">
                {["Referrers", "UTM Parameters"].map((t, i) => (
                  <button key={t} className={`text-sm pb-0.5 border-b-2 ${i === 0 ? "border-foreground font-medium" : "border-transparent text-muted-foreground"}`}>{t}</button>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">VISITORS</span>
              </div>
              <div className="space-y-2">
                {referrers.map(r => (
                  <div key={r.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{r.icon}</span>
                      <span className="text-muted-foreground">{r.name}</span>
                    </div>
                    <span className="font-medium">{r.visitors}</span>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-foreground border border-border rounded-md py-1.5">View All ⤢</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}