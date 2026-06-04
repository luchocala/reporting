import { useState } from "react";
import { Calendar } from "lucide-react";

export default function SettingsProfile() {
  const [form, setForm] = useState({ name: "", username: "shadcn", email: "", dob: "Jan 22, 2023", language: "" });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Update your profile details.</p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Name</label>
          <input
            placeholder="Your name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">This is the name that will be displayed on your profile and in emails.</p>
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Username</label>
          <input
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">Your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.</p>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
            <option>Select a verified email to display</option>
          </select>
          <p className="text-xs text-muted-foreground">You can manage verified email addresses in your email settings.</p>
        </div>

        {/* Date of birth */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Date of birth</label>
          <div className="flex items-center gap-1 border border-input rounded-md px-3 py-2 bg-background w-fit">
            <span className="text-sm">{form.dob}</span>
            <Calendar className="size-4 text-muted-foreground ml-2" />
          </div>
          <p className="text-xs text-muted-foreground">Your date of birth is used to calculate your age.</p>
        </div>

        {/* Language */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Language</label>
          <select className="border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none w-40">
            <option>Select language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <p className="text-xs text-muted-foreground">This is the language that will be used in the dashboard.</p>
        </div>

        <button className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">Update account</button>
      </div>
    </div>
  );
}