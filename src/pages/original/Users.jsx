import { useState } from "react";
import { Search, UserPlus, UserCheck } from "lucide-react";

const users = [
  { name: "Blair Little", email: "blair_rodriguez37@hotmail.com", phone: "+15144624855", registered: "14 Jan, 2026", lastLogin: "19 Apr, 2026", status: "Inactive", role: "Superadmin" },
  { name: "Emilie Prohaska", email: "emilie_harvey48@hotmail.com", phone: "+13497705067", registered: "26 Dec, 2025", lastLogin: "05 Apr, 2026", status: "Suspended", role: "Cashier" },
  { name: "Gwen Hackett", email: "gwen44@hotmail.com", phone: "+12433733725", registered: "18 Nov, 2025", lastLogin: "20 Dec, 2025", status: "Active", role: "Superadmin" },
  { name: "Carlos Adams", email: "carlos_bahringer18@hotmail.com", phone: "+14252594864", registered: "16 Feb, 2026", lastLogin: "10 Apr, 2026", status: "Suspended", role: "Admin" },
  { name: "Duane Predovic", email: "duane69@yahoo.com", phone: "+18798404269", registered: "30 Jul, 2025", lastLogin: "20 Aug, 2025", status: "Inactive", role: "Manager" },
  { name: "Reta Smitham", email: "reta.hickle@gmail.com", phone: "+12406486079", registered: "23 Aug, 2025", lastLogin: "05 Sep, 2025", status: "Invited", role: "Manager" },
  { name: "Edmund Schamberger", email: "edmund21@hotmail.com", phone: "+16107795048", registered: "19 Mar, 2026", lastLogin: "08 May, 2026", status: "Inactive", role: "Cashier" },
  { name: "Shelley Zulauf", email: "shelley98@hotmail.com", phone: "+16988422467", registered: "12 Jun, 2025", lastLogin: "08 Oct, 2025", status: "Suspended", role: "Cashier" },
  { name: "Sandy Denesik", email: "sandy.kulas58@hotmail.com", phone: "+12363927957", registered: "18 Jul, 2025", lastLogin: "25 Aug, 2025", status: "Inactive", role: "Admin" },
  { name: "Mona Nicolas", email: "mona72@gmail.com", phone: "+15189551512", registered: "04 Jan, 2026", lastLogin: "18 Apr, 2026", status: "Inactive", role: "Cashier" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Inactive: "bg-gray-100 text-gray-600 border border-gray-200",
  Suspended: "bg-red-50 text-red-700 border border-red-200",
  Invited: "bg-blue-50 text-blue-700 border border-blue-200",
};

const roleIcons = {
  Superadmin: "◇",
  Admin: "◈",
  Manager: "◈",
  Cashier: "◈",
};

export default function Users() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleAll = () => setSelected(selected.length === paged.length ? [] : paged.map(u => u.email));
  const toggleOne = (email) => setSelected(s => s.includes(email) ? s.filter(e => e !== email) : [...s, email]);

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <span>Home</span><span>›</span><span className="text-foreground">Users</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">User List</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">
            <UserPlus className="size-4" /> Invite User
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">
            <UserCheck className="size-4" /> Add User
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: "◈", label: "Total Users", value: "12,000", sub: "+5% than last month" },
          { icon: "◈", label: "New Users", value: "+350", sub: "+10% vs last month" },
          { icon: "◈", label: "Pending Verifications", value: "42", sub: "2% of users" },
          { icon: "◈", label: "Active Users", value: "7800", sub: "65% of all users" },
        ].map(card => (
          <div key={card.label} className="border border-border rounded-lg p-4 bg-card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">{card.icon}</span>
                <span className="text-sm">{card.label}</span>
              </div>
              <span className="text-muted-foreground text-xs">ℹ</span>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder="Filter tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          ◎ Status
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          ⊕ Role
        </button>
        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted text-muted-foreground">
          ☰ View
        </button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <input type="checkbox" checked={selected.length === paged.length && paged.length > 0} onChange={toggleAll} />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Email ↕</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Phone Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Registered Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Last Login Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paged.map((u) => (
              <tr key={u.email} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(u.email)} onChange={() => toggleOne(u.email)} />
                </td>
                <td className="px-4 py-3">
                  <button className="text-sm font-medium underline underline-offset-2 hover:text-muted-foreground">{u.name}</button>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{u.email}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">{u.phone}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{u.registered}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{u.lastLogin}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[u.status]}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{roleIcons[u.role]}</span>
                    <span>{u.role}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-muted-foreground hover:text-foreground">···</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{selected.length} of {filtered.length} row(s) selected.</span>
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select className="border border-input rounded px-2 py-1 text-xs bg-background focus:outline-none">
            <option>10</option><option>25</option><option>50</option>
          </select>
          <span>Page {page} of {Math.max(1, totalPages)}</span>
          <button onClick={() => setPage(1)} disabled={page === 1} className="p-1 hover:bg-muted rounded disabled:opacity-40">«</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 hover:bg-muted rounded disabled:opacity-40">‹</button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-1 hover:bg-muted rounded disabled:opacity-40">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page >= totalPages} className="p-1 hover:bg-muted rounded disabled:opacity-40">»</button>
        </div>
      </div>
    </div>
  );
}