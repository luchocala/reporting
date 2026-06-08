import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";

import {
  approveUser,
  deleteUser,
  listUsers,
  suspendUser,
} from "@/lib/auth-service";
import { useLocalAuth } from "@/lib/LocalAuthContext";

const USER_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  SUSPENDED: 2,
};

const statusLabels = {
  [USER_STATUS.PENDING]: "Pending",
  [USER_STATUS.APPROVED]: "Approved",
  [USER_STATUS.SUSPENDED]: "Suspended",
};

const statusStyles = {
  [USER_STATUS.PENDING]: "bg-amber-50 text-amber-700 border border-amber-200",
  [USER_STATUS.APPROVED]:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",
  [USER_STATUS.SUSPENDED]: "bg-red-50 text-red-700 border border-red-200",
};

const roleIcons = {
  admin: "◇",
  user: "◈",
  Superadmin: "◇",
  Admin: "◈",
  Manager: "◈",
  Cashier: "◈",
};

function getUserDisplayName(user) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  return fullName || user.username || user.email || "Usuario";
}

function getUserStatusValue(user) {
  const value = Number(user.approved);

  if ([0, 1, 2].includes(value)) {
    return value;
  }

  return USER_STATUS.PENDING;
}

export default function Users() {
  const { user: currentUser } = useLocalAuth();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(null);
  const [deleteModalUser, setDeleteModalUser] = useState(null);
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

  const pendingUsers = users.filter(
    (user) => getUserStatusValue(user) === USER_STATUS.PENDING
  ).length;

  const activeUsers = users.filter(
    (user) => getUserStatusValue(user) === USER_STATUS.APPROVED
  ).length;

  const suspendedUsers = users.filter(
    (user) => getUserStatusValue(user) === USER_STATUS.SUSPENDED
  ).length;

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

  const updateUserStatusLocally = (userId, approved) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? {
              ...user,
              approved,
            }
          : user
      )
    );
  };

  const handleApproveUser = async (userId) => {
    setProcessingAction({ userId, type: "approve" });
    setError("");

    try {
      await approveUser(userId);
      updateUserStatusLocally(userId, USER_STATUS.APPROVED);
    } catch (err) {
      setError(err.message || "No se pudo aprobar el usuario.");
    } finally {
      setProcessingAction(null);
    }
  };

  const handleSuspendUser = async (userId) => {
    setProcessingAction({ userId, type: "suspend" });
    setError("");

    try {
      await suspendUser(userId);
      updateUserStatusLocally(userId, USER_STATUS.SUSPENDED);
    } catch (err) {
      setError(err.message || "No se pudo suspender el usuario.");
    } finally {
      setProcessingAction(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModalUser) {
      return;
    }

    const userId = deleteModalUser.id;

    setProcessingAction({ userId, type: "delete" });
    setError("");

    try {
      await deleteUser(userId);

      setUsers((current) => current.filter((user) => user.id !== userId));
      setSelected((current) => current.filter((id) => id !== userId));
      setDeleteModalUser(null);
    } catch (err) {
      setError(err.message || "No se pudo eliminar el usuario.");
    } finally {
      setProcessingAction(null);
    }
  };

  const isProcessing = (userId, type) =>
    processingAction?.userId === userId && processingAction?.type === type;

  const isAnyActionProcessingForUser = (userId) =>
    processingAction?.userId === userId;

  const isCurrentLoggedUser = (candidateUser) =>
    String(candidateUser.id) === String(currentUser?.id);

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
            label: "Suspended Users",
            value: suspendedUsers,
            sub: "Usuarios suspendidos",
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

      <div className="border border-border rounded-lg overflow-hidden bg-card">
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
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Role
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Cargando usuarios...
                </td>
              </tr>
            )}

            {!loading && paged.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}

            {!loading &&
              paged.map((listedUser) => {
  const statusValue = getUserStatusValue(listedUser);
  const statusLabel = statusLabels[statusValue];
  const isPending = statusValue === USER_STATUS.PENDING;
  const isSuspended = statusValue === USER_STATUS.SUSPENDED;
  const isCurrentUser = isCurrentLoggedUser(listedUser);

  const canApprove = !isCurrentUser && (isPending || isSuspended);
  const canSuspend =
    !isCurrentUser &&
    (statusValue === USER_STATUS.PENDING ||
      statusValue === USER_STATUS.APPROVED);
  const canDelete = !isCurrentUser;

  return (
    <tr
      key={listedUser.id}
      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
    >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(listedUser.id)}
                        onChange={() => toggleOne(listedUser.id)}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <button className="text-sm font-medium underline underline-offset-2 hover:text-muted-foreground">
                        {getUserDisplayName(listedUser)}
                      </button>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {listedUser.email || "-"}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {listedUser.username || "-"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${statusStyles[statusValue]}`}
                      >
                        {statusLabel}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>{roleIcons[listedUser.role] || "◈"}</span>
                        <span>{listedUser.role || "user"}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {canApprove && (
                          <button
                            type="button"
                            onClick={() => handleApproveUser(listedUser.id)}
                            disabled={isAnyActionProcessingForUser(listedUser.id)}
                            title="Aprobar usuario"
                            className="inline-flex size-8 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isProcessing(listedUser.id, "approve") ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Check className="size-4" />
                            )}
                          </button>
                        )}

                        {canSuspend && (
                          <button
                            type="button"
                            onClick={() => handleSuspendUser(listedUser.id)}
                            disabled={isAnyActionProcessingForUser(listedUser.id)}
                            title="No aprobar / suspender usuario"
                            className="inline-flex size-8 items-center justify-center rounded-md border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isProcessing(listedUser.id, "suspend") ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <X className="size-4" />
                            )}
                          </button>
                        )}

                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => setDeleteModalUser(listedUser)}
                            disabled={isAnyActionProcessingForUser(listedUser.id)}
                            title="Eliminar usuario"
                            className="inline-flex size-8 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isProcessing(listedUser.id, "delete") ? (
                              <Loader2 className="size-4 animate-spin" />
                            ) : (
                              <Trash2 className="size-4" />
                            )}
                          </button>
                        )}
                      </div>
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

      {deleteModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700">
                <Trash2 className="size-5" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">
                  Eliminar usuario
                </h2>
                <p className="text-sm text-muted-foreground">
                  ¿Seguro que querés eliminar a{" "}
                  <span className="font-medium text-foreground">
                    {getUserDisplayName(deleteModalUser)}
                  </span>
                  ? Esta acción no se puede deshacer.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteModalUser(null)}
                disabled={isProcessing(deleteModalUser.id, "delete")}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={isProcessing(deleteModalUser.id, "delete")}
                className="inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing(deleteModalUser.id, "delete") ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}