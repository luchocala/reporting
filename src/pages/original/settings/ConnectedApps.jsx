import { useState } from "react";
import { ChevronDown } from "lucide-react";

const apps = [
  { name: "Telegram", icon: "✈️", connected: false },
  { name: "Notion", icon: "📝", connected: true },
  { name: "Figma", icon: "🎨", connected: true },
  { name: "Trello", icon: "📋", connected: false },
  { name: "Slack", icon: "💬", connected: false },
  { name: "Zoom", icon: "📹", connected: true },
  { name: "Stripe", icon: "💳", connected: false },
  { name: "Gmail", icon: "📧", connected: true },
  { name: "GitHub", icon: "⬛", connected: false },
  { name: "Dropbox", icon: "📦", connected: false },
];

export default function SettingsConnectedApps() {
  const [connections, setConnections] = useState(
    Object.fromEntries(apps.map(a => [a.name, a.connected]))
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold">Connected Apps</h2>
        <p className="text-sm text-muted-foreground">Manage and connect different applications.</p>
      </div>

      <p className="text-sm text-muted-foreground">
        To get the best experience, we recommend setting up at least one integration.<br />
        This is necessary for us to have a source to generate reports for you.
      </p>

      <div className="space-y-2">
        {apps.map(app => (
          <div key={app.name} className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{app.icon}</span>
              <span className="text-sm font-medium">{app.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {connections[app.name] ? (
                <button
                  onClick={() => setConnections(c => ({ ...c, [app.name]: false }))}
                  className="px-3 py-1 text-xs font-medium border border-border rounded-md bg-muted hover:bg-muted/70"
                >
                  Connected
                </button>
              ) : (
                <button
                  onClick={() => setConnections(c => ({ ...c, [app.name]: true }))}
                  className="px-3 py-1 text-xs font-medium border border-border rounded-md hover:bg-muted"
                >
                  Connect
                </button>
              )}
              <button className="flex items-center gap-1 px-2 py-1 text-xs border border-border rounded-md hover:bg-muted">
                Learn More <ChevronDown className="size-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}