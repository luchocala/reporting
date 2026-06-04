import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

const KEY_VALUE = "Live_08234153847256";

function KeyRow({ label }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(KEY_VALUE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="py-3">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-between border border-input rounded-md px-3 py-1.5 bg-background flex-1 max-w-xs">
          <span className="text-sm font-mono text-muted-foreground">{KEY_VALUE}</span>
          <button onClick={copy} className="ml-2 p-0.5 hover:text-foreground text-muted-foreground">
            <Copy className="size-3.5" />
          </button>
        </div>
      </div>
      <button className="flex items-center gap-1 text-xs text-emerald-600 hover:underline mt-1.5">
        <RefreshCw className="size-3" /> Refresh
      </button>
    </div>
  );
}

export default function ApiKeys() {
  const [tab, setTab] = useState("api-keys");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-sm text-muted-foreground">Secure, manage, and monitor your API keys with ease.</p>
        </div>
        <select className="border border-input rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none">
          <option>Server</option><option>Client</option>
        </select>
      </div>

      <div className="flex gap-0 border-b border-border">
        {["api-keys", "account"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors capitalize ${tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t === "api-keys" ? "API Keys" : "Account"}
          </button>
        ))}
      </div>

      <div className="max-w-2xl space-y-8">
        {/* API Version */}
        <div>
          <p className="font-semibold mb-3">API Version</p>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-sm font-medium">Global Version</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">04-Jun-2026</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded border border-border">Latest Version</span>
            </div>
          </div>
        </div>

        {/* Secret API Keys */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold">Secret API Keys</p>
            <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Create API Key</button>
          </div>
          <div className="border border-border rounded-lg p-3 mb-3 bg-muted/30 flex items-center gap-2">
            <span className="text-muted-foreground">▶</span>
            <p className="text-xs text-muted-foreground">
              <strong>Reminder!</strong> Live API keys can only be used for the v1/api-end point. See the <a href="#" className="underline">documentation</a> for more details.
            </p>
          </div>
          <div className="divide-y divide-border">
            <KeyRow label="Live Environment" />
            <KeyRow label="Test Environment" />
          </div>
        </div>

        {/* Publishable API Keys */}
        <div>
          <p className="font-semibold mb-3">Publishable API Keys</p>
          <div className="border border-border rounded-lg p-3 mb-3 bg-muted/30 flex items-center gap-2">
            <span className="text-muted-foreground">▶</span>
            <p className="text-xs text-muted-foreground">Live API keys can only be used for the v1/api-end point. See the <a href="#" className="underline">documentation</a> for more details.</p>
          </div>
          <div className="divide-y divide-border">
            <KeyRow label="Live Environment" />
            <KeyRow label="Test Environment" />
          </div>
        </div>
      </div>
    </div>
  );
}