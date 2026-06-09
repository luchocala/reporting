import { useState } from "react";
import { Calendar } from "lucide-react";

export default function Profile({ mode = "own" }) {
  const [form, setForm] = useState({
    name: "",
    username: "shadcn",
    email: "",
    dob: "Jan 22, 2023",
    language: "",
  });

  const isEditingOtherUser = mode === "user";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
          <span>Home</span>
          <span>›</span>
          <span className="text-foreground">
            {isEditingOtherUser ? "User Profile" : "Profile"}
          </span>
        </div>

        <h1 className="text-2xl font-bold">
          {isEditingOtherUser ? "Edit User Profile" : "Profile"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isEditingOtherUser
            ? "Update this user's profile details."
            : "Update your profile details."}
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Name</label>
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            This is the name that will be displayed on the profile and in emails.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Username</label>
          <input
            value={form.username}
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Public display name. It can be a real name or a pseudonym.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
            <option>Select a verified email to display</option>
          </select>
          <p className="text-xs text-muted-foreground">
            You can manage verified email addresses in email settings.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Date of birth</label>
          <div className="flex items-center gap-1 border border-input rounded-md px-3 py-2 bg-background w-fit">
            <span className="text-sm">{form.dob}</span>
            <Calendar className="size-4 text-muted-foreground ml-2" />
          </div>
          <p className="text-xs text-muted-foreground">
            The date of birth is used to calculate age.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Language</label>
          <select className="border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none w-40">
            <option>Select language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
          <p className="text-xs text-muted-foreground">
            This is the language that will be used in the dashboard.
          </p>
        </div>

        <button className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">
          {isEditingOtherUser ? "Update user" : "Update account"}
        </button>
      </div>
    </div>
  );
}