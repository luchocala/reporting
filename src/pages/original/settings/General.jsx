import { Building2, Home } from "lucide-react";

export default function SettingsGeneral() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold">General</h2>
        <p className="text-sm text-muted-foreground">Settings and options for your application.</p>
      </div>

      {/* Free plan banner */}
      <div className="flex items-center justify-between gap-4 border border-border rounded-lg px-4 py-3 bg-muted/30">
        <p className="text-sm">
          <strong>Your application is currently on the free plan</strong><br />
          <span className="text-muted-foreground text-xs">Paid plans offer higher usage limits, additional branches, and much more. Learn more <a href="#" className="underline">here</a></span>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted flex items-center gap-1.5">💬 Chat to us</button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Upgrade</button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {/* Company Logo */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium">Company Logo</p>
            <p className="text-xs text-muted-foreground">Update your company logo.</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-input rounded-md bg-background hover:bg-muted">
            Choose File <span className="text-muted-foreground">No file chosen</span>
          </button>
        </div>

        {/* System Font */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium">System Font</p>
            <p className="text-xs text-muted-foreground">Set the font you want to use in the dashboard.</p>
          </div>
          <select className="border border-input rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none w-40">
            <option>Select Font</option>
            <option>Inter</option>
            <option>Geist</option>
            <option>Roboto</option>
          </select>
        </div>

        {/* Business Tax ID */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium">Business Tax ID</p>
            <p className="text-xs text-muted-foreground">Tax ID of the company.</p>
          </div>
          <div className="flex items-center gap-1">
            <input placeholder="Business Tax ID" className="border border-input rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none w-44" />
            <button className="p-1.5 border border-input rounded-md hover:bg-muted"><Building2 className="size-4 text-muted-foreground" /></button>
          </div>
        </div>

        {/* Business Address */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium">Business Address</p>
            <p className="text-xs text-muted-foreground">Address of the company.</p>
          </div>
          <div className="flex items-center gap-1">
            <input placeholder="Business Address" className="border border-input rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none w-44" />
            <button className="p-1.5 border border-input rounded-md hover:bg-muted"><Home className="size-4 text-muted-foreground" /></button>
          </div>
        </div>
      </div>

      <button className="px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">Save Changes</button>

      {/* Remove Account */}
      <div className="flex items-center justify-between border border-border rounded-lg px-4 py-3">
        <div>
          <p className="text-sm font-medium">Remove Account</p>
          <p className="text-xs text-muted-foreground">You can do 'Disable account' to take a break from panel.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Deactivate Account</button>
          <button className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">Delete Account</button>
        </div>
      </div>
    </div>
  );
}