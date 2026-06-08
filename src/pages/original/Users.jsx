import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  MoreHorizontal,
  RefreshCw,
  Search,
  UserCheck,
  UserPlus,
} from "lucide-react";

import { approveUser, listUsers } from "@/lib/auth-service";

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
};

const roleIcons = {
  admin: "◇",
  user: "◈",
  Superadmin: "◇",
  Admin: "◈",
  Manager: "◈",
  Cashier: "◈",
};

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getUserDisplayName(user) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return fullName || user.username || user.email || "Usuario";
}

function getUserStatus(user) {
  return user.approved === 1 ? "Active" : "Pending";
}

export default function Users() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [openMenuUserId, setOpenMenuUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approvingUserId, setApprovingUserId] = useState(null);
  const [error, setError] = useState("");

  const PER_PAGE = 10;

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await listUsers();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return users.filter((user) => {
      const name = getUserDisplayName(user).toLowerCase();
      const email = (user.email || "").toLowerCase();
      const username = (user.username || "").toLowerCase();

      return (
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        username.includes(normalizedSearch)
      );
    });
  }, [search, users]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pendingUsers = users.filter((user) => user.approved !== 1).length;
  const activeUsers = users.filter((user) => user.approved === 1).length;

  const toggleAll = () => {
    setSelected(
      selected.length === paged.length ? [] : paged.map((user) => user.id)
    );
  };

  const toggleOne = (userId) => {
    setSelected((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId]
    );
  };

  const handleApproveUser = async (userId) => {
    setApprovingUserId(userId);
    setError("");

    try {
      await approveUser(userId);

      setUsers((current) =>
        current.map((user) =>
          user.id === userId
            ? {
                ...user,
                approved: 1,
                updatedAt: new Date().toISOString(),
              }
            : user
        )
      );

      setOpenMenuUserId(null);
    } catch (err) {
      setError(err.message || "No se pudo aprobar el usuario.");
    } finally {
      setApprovingUserId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <span>Home</span>
        <span>›</span>
        <span className="text-foreground">Users</span>
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

          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted disabled:opacity-60"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            icon: "◈",
            label: "Total Users",
            value: users.length,
            sub: "Usuarios registrados",
          },
          {
            icon: "◈",
            label: "Pending Verifications",
            value: pendingUsers,
            sub: "Pendientes de aprobación",
          },
          {
            icon: "◈",
            label: "Active Users",
            value: activeUsers,
            sub: "Usuarios aprobados",
          },
          {
            icon: "◈",
            label: "Visible Results",
            value: filtered.length,
            sub: "Resultado del filtro actual",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="border border-border rounded-lg p-4 bg-card flex flex-col gap-2"
          >
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

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder="Filter users..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
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

      <div className="border border-border rounded-lg overflow-visible bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.length === paged.length && paged.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Email ↕
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Username
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Registered Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Last Update
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Role
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Cargando usuarios...
                </td>
              </tr>
            )}

            {!loading && paged.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}

            {!loading &&
              paged.map((user) => {
                const status = getUserStatus(user);
                const isPending = user.approved !== 1;

                return (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleOne(user.id)}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <button className="text-sm font-medium underline underline-offset-2 hover:text-muted-foreground">
                        {getUserDisplayName(user)}
                      </button>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {user.email || "-"}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {user.username || "-"}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {formatDate(user.updatedAt)}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{roleIcons[user.role] || "◈"}</span>
                        <span>{user.role || "user"}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuUserId((current) =>
                            current === user.id ? null : user.id
                          )
                        }
                        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>

                      {openMenuUserId === user.id && (
                        <div className="absolute right-4 top-10 z-20 w-48 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
                          {isPending ? (
                            <button
                              type="button"
                              onClick={() => handleApproveUser(user.id)}
                              disabled={approvingUserId === user.id}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted disabled:opacity-60"
                            >
                              <CheckCircle2 className="size-4" />
                              {approvingUserId === user.id
                                ? "Aprobando..."
                                : "Aprobar usuario"}
                            </button>
                          ) : (
                            <div className="px-3 py-2 text-left text-sm text-muted-foreground">
                              Usuario aprobado
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {selected.length} of {filtered.length} row(s) selected.
        </span>

        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <select className="border border-input rounded px-2 py-1 text-xs bg-background focus:outline-none">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="p-1 hover:bg-muted rounded disabled:opacity-40"
          >
            «
          </button>

          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="p-1 hover:bg-muted rounded disabled:opacity-40"
          >
            ‹
          </button>

          <button
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page >= totalPages}
            className="p-1 hover:bg-muted rounded disabled:opacity-40"
          >
            ›
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            className="p-1 hover:bg-muted rounded disabled:opacity-40"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}