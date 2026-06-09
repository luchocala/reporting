import { useState } from "react";
import { Search, Pencil } from "lucide-react";

const tasks = [
  { id: "TASK-8782", type: "Documentation", title: "You can't compress the program without quantifying the open-source S...", status: "In Progress", priority: "Medium" },
  { id: "TASK-7878", type: "Documentation", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "Medium" },
  { id: "TASK-7839", type: "Bug", title: "We need to bypass the neural TCP card!", status: "Todo", priority: "High" },
  { id: "TASK-5562", type: "Feature", title: "The SAS interface is down, bypass the open-source pixel so we can bac...", status: "Backlog", priority: "Medium" },
  { id: "TASK-8686", type: "Feature", title: "I'll parse the wireless SSL protocol, that should driver the API panel!", status: "Canceled", priority: "Medium" },
  { id: "TASK-1280", type: "Bug", title: "Use the digital TLS panel, then you can transmit the haptic system!", status: "Done", priority: "High" },
  { id: "TASK-7262", type: "Feature", title: "The UTF8 application is down, parse the neural bandwidth so we can ba...", status: "Done", priority: "High" },
  { id: "TASK-1138", type: "Feature", title: "Generating the driver won't do anything, we need to quantify the 1080p ...", status: "In Progress", priority: "Medium" },
  { id: "TASK-7184", type: "Feature", title: "We need to program the back-end THX pixel!", status: "Todo", priority: "Low" },
  { id: "TASK-5160", type: "Documentation", title: "Calculating the bus won't do anything, we need to navigate the back-en...", status: "In Progress", priority: "High" },
];

const statusConfig = {
  "In Progress": { icon: "◎", color: "text-blue-500" },
  "Backlog": { icon: "◎", color: "text-muted-foreground" },
  "Todo": { icon: "○", color: "text-muted-foreground" },
  "Canceled": { icon: "◎", color: "text-muted-foreground" },
  "Done": { icon: "◎", color: "text-emerald-500" },
};

const priorityConfig = {
  High: { icon: "↑", color: "text-foreground" },
  Medium: { icon: "→", color: "text-muted-foreground" },
  Low: { icon: "↓", color: "text-muted-foreground" },
};

const typeColors = {
  Documentation: "bg-blue-50 text-blue-700 border-blue-200",
  Bug: "bg-red-50 text-red-700 border-red-200",
  Feature: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function Tasks() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = tasks.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleAll = () => setSelected(selected.length === paged.length ? [] : paged.map(t => t.id));
  const toggleOne = (id) => setSelected(s => s.includes(id) ? s.filter(e => e !== id) : [...s, id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-muted-foreground">Here's a list of your tasks for this month!</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted">Import</button>
          <button className="px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90">Create Task</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder="Filter tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-48"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          ◎ Status
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          ⊕ Priority
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
              <th className="px-4 py-3 text-left w-8">
                <input type="checkbox" checked={selected.length === paged.length && paged.length > 0} onChange={toggleAll} />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Task</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Title ↕</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status ↕</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Priority ↕</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {paged.map(t => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(t.id)} onChange={() => toggleOne(t.id)} />
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs font-medium underline underline-offset-2 text-muted-foreground hover:text-foreground whitespace-nowrap">{t.id}</button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border ${typeColors[t.type]}`}>{t.type}</span>
                    <span className="text-sm text-muted-foreground">{t.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1.5 text-sm ${statusConfig[t.status]?.color}`}>
                    <span>{statusConfig[t.status]?.icon}</span>
                    <span>{t.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1.5 text-sm ${priorityConfig[t.priority]?.color}`}>
                    <span>{priorityConfig[t.priority]?.icon}</span>
                    <span>{t.priority}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-muted rounded"><Pencil className="size-3.5 text-muted-foreground" /></button>
                    <button className="p-1 hover:bg-muted rounded text-muted-foreground">···</button>
                  </div>
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