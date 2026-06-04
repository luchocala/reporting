import { useState } from "react";
import { Search, Copy, Plus } from "lucide-react";

const webhooks = [
  { id: "9970f43f-dbc...", url: "https://unsteady-haircut.biz/", events: 5, type: "None", status: "Disabled" },
  { id: "f6bb8ff3-9d51...", url: "https://blond-outrun.net/", events: 5, type: "None", status: "Enabled" },
  { id: "1adde9db-ae1...", url: "https://muted-catalyst.com", events: 3, type: "Application", status: "Enabled" },
  { id: "4dcf3674-80c...", url: "https://bare-birdcage.org", events: 4, type: "Application", status: "Disabled" },
  { id: "cb1b95f0-8917...", url: "https://shoddy-lamp.info", events: 3, type: "Platform", status: "Disabled" },
  { id: "1e8f0710-1973...", url: "https://haunting-papa.com", events: 4, type: "Platform", status: "Enabled" },
  { id: "5dfc18e1-dd8b...", url: "https://superb-hubris.biz", events: 2, type: "None", status: "Disabled" },
];

export default function Webhooks() {
  const [search, setSearch] = useState("");
  const filtered = webhooks.filter(w => w.url.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Webhooks</h1>
          <p className="text-sm text-muted-foreground">Setup, integrate and monitor webhooks.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">
          <Plus className="size-4" /> Add Webhook
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <input
          placeholder="Filter URL endpoint..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full"
        />
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">URL Endpoint</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Events</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(w => (
              <tr key={w.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-0.5 hover:bg-muted rounded"><Copy className="size-3.5 text-muted-foreground" /></button>
                    <span className="text-xs font-mono text-muted-foreground">{w.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <a href={w.url} className="text-sm text-foreground underline underline-offset-2 hover:text-muted-foreground" onClick={e => e.preventDefault()}>{w.url}</a>
                </td>
                <td className="px-4 py-3 text-sm">{w.events}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{w.type}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                    w.status === "Enabled"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200"
                  }`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}