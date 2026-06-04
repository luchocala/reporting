import { useState } from "react";

export default function SettingsNotifications() {
  const [notify, setNotify] = useState("all");
  const [emails, setEmails] = useState({
    communication: false,
    marketing: false,
    social: true,
    security: false,
  });
  const [mobileDifferent, setMobileDifferent] = useState(false);

  const toggleEmail = (key) => setEmails(e => ({ ...e, [key]: !e[key] }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Manage and connect different applications.</p>
      </div>

      {/* Notify me about */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Notify me about...</p>
        {[
          { value: "all", label: "All new messages" },
          { value: "direct", label: "Direct messages and mentions" },
          { value: "nothing", label: "Nothing" },
        ].map(opt => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="notify"
              value={opt.value}
              checked={notify === opt.value}
              onChange={() => setNotify(opt.value)}
              className="accent-foreground"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Email Notifications */}
      <div className="space-y-3">
        <p className="text-sm font-semibold">Email Notifications</p>
        {[
          { key: "communication", label: "Communication emails", desc: "Receive emails about your account activity." },
          { key: "marketing", label: "Marketing emails", desc: "Receive emails about new products, features, and more." },
          { key: "social", label: "Social emails", desc: "Receive emails for friend requests, follows, and more." },
          { key: "security", label: "Security emails", desc: "Receive emails about your account activity and security." },
        ].map(item => (
          <div key={item.key} className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <button
              onClick={() => toggleEmail(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emails[item.key] ? "bg-foreground" : "bg-muted border border-border"}`}
            >
              <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${emails[item.key] ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        ))}
      </div>

      {/* Mobile different settings */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={mobileDifferent}
          onChange={() => setMobileDifferent(!mobileDifferent)}
          className="mt-0.5 accent-foreground"
        />
        <div>
          <p className="text-sm font-medium">Use different settings for my mobile devices</p>
          <p className="text-xs text-muted-foreground">You can manage your mobile notifications in the <span className="underline">mobile settings</span> page.</p>
        </div>
      </label>

      <button className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">Update notifications</button>
    </div>
  );
}