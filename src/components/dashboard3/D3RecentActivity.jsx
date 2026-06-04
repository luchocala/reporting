import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bell } from "lucide-react";

const activities = [
  { label: "New user registration", time: "2 minutes ago", user: "Alex Morgan" },
  { label: "New Order Placed", time: "2 minutes ago", user: "Alex Morgan" },
  { label: "Payment Received", time: "2 minutes ago", user: "Alex Morgan" },
  { label: "Invoice Sent", time: "6 minutes ago", user: "Jamie Lee" },
  { label: "Subscription Upgraded", time: "12 minutes ago", user: "Noah Roberts" },
  { label: "Refund Issued", time: "18 minutes ago", user: "Olivia White" },
  { label: "Password Reset", time: "24 minutes ago", user: "Ethan Parker" },
  { label: "New Comment", time: "32 minutes ago", user: "Sophia Davis" },
  { label: "Support Ticket Closed", time: "45 minutes ago", user: "Michael Chen" },
  { label: "Payout Processed", time: "1 hour ago", user: "Emma Wilson" },
];

export default function D3RecentActivity() {
  return (
    <Card className="shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Recent Activity</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="size-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium truncate">{a.label}</p>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{a.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{a.user}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}