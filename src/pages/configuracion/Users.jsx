import { useEffect, useMemo, useState } from "react";
import { Check, Loader2, Trash2, X } from "lucide-react";

import EntityListPage from "@/pages/entities/EntityListPage";
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

function getUserStatusLabel(user) {
  return statusLabels[getUserStatusValue(user)] || "Pending";
}

function getRoleLabel(user) {
  return user.role || "user";
}

function mapUserToRow(user) {
  return {
    ...user,
    id: user.id,
    name: getUserDisplayName(user),
    email: user.email || "-",
    username: user.username || "-",
    status: getUserStatusLabel(user),
    role: getRoleLabel(user),
  };
}

const usersColumns = [
  { key: "id", label: "ID", type: "text", locked: true },
  { key: "name", label: "Name", type: "text", primary: true, cellLayout: "stacked" },
  { key: "email", label: "Email", type: "text" },
  { key: "username", label: "Username", type: "text" },
  { key: "status", label: "Status", type: "status" },
  { key: "role", label: "Role", type: "badge" },
  { key: "acciones", label: "Actions", type: "actions", locked: true },
];

const usersBadgeStyles = {
  status: {
    Pending: "yellow",
    Approved: "green",
    Suspended: "red",
  },
  role: {
    admin: "blue",
    user: "slate",
    Superadmin: "blue",
    Admin: "blue",
    Manager: "yellow",
    Cashier: "slate",
  },
};

export default function Users() {
  const { user: currentUser } = useLocalAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingAction, setProcessingAction] = useState(null);
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [error, setError] = useState("");

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

  const rows = useMemo(() => users.map(mapUserToRow), [users]);

  const pendingUsers = useMemo(
    () =>
      users.filter(
        (user) => getUserStatusValue(user) === USER_STATUS.PENDING
      ).length,
    [users]
  );

  const activeUsers = useMemo(
    () =>
      users.filter(
        (user) => getUserStatusValue(user) === USER_STATUS.APPROVED
      ).length,
    [users]
  );

  const suspendedUsers = useMemo(
    () =>
      users.filter(
        (user) => getUserStatusValue(user) === USER_STATUS.SUSPENDED
      ).length,
    [users]
  );

  const updateUserStatusLocally = (userId, approved) => {
    setUsers((current) =>
      current.map((user) =>
        String(user.id) === String(userId)
          ? {
              ...user,
              approved,
            }
          : user
      )
    );
  };

  const handleApproveUser = async (listedUser) => {
    setProcessingAction({ userId: listedUser.id, type: "approve" });
    setError("");

    try {
      await approveUser(listedUser.id);
      updateUserStatusLocally(listedUser.id, USER_STATUS.APPROVED);
    } catch (err) {
      setError(err.message || "No se pudo aprobar el usuario.");
    } finally {
      setProcessingAction(null);
    }
  };

  const handleSuspendUser = async (listedUser) => {
    setProcessingAction({ userId: listedUser.id, type: "suspend" });
    setError("");

    try {
      await suspendUser(listedUser.id);
      updateUserStatusLocally(listedUser.id, USER_STATUS.SUSPENDED);
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
      setUsers((current) =>
        current.filter((user) => String(user.id) !== String(userId))
      );
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

  const usersSection = {
    key: "configuracion-users",
    group: "Configuración",
    title: "User List",
    subtitle: "Gestión de usuarios del sistema.",
    path: "/configuracion/users",
    createPath: null,
    endpoint: "/api/configuracion/users",
    columns: usersColumns,
    rows,
    loading,
    error,
    emptyMessage: "No hay usuarios para mostrar.",
    primaryFilters: ["status", "role"],
    laneField: "status",
    badgeStyles: usersBadgeStyles,
    onRefresh: fetchUsers,
    headerActions: [
      {
        key: "invite-user",
        label: "Invite User",
        icon: "userPlus",
        variant: "secondary",
        onClick: () => console.log("Invite User"),
      },
      {
        key: "add-user",
        label: "Add User",
        icon: "userCheck",
        variant: "primary",
        onClick: () => console.log("Add User"),
      },
    ],
    statsCards: [
      {
        key: "total-users",
        icon: "◈",
        label: "Total Users",
        value: users.length,
        sub: "Usuarios registrados",
      },
      {
        key: "pending-users",
        icon: "◈",
        label: "Pending Verifications",
        value: pendingUsers,
        sub: "Pendientes de aprobación",
      },
      {
        key: "active-users",
        icon: "◈",
        label: "Active Users",
        value: activeUsers,
        sub: "Usuarios aprobados",
      },
      {
        key: "suspended-users",
        icon: "◈",
        label: "Suspended Users",
        value: suspendedUsers,
        sub: "Usuarios suspendidos",
      },
    ],
    rowActions: [
      {
        key: "approve",
        label: "Aprobar",
        title: "Aprobar usuario",
        icon: "check",
        variant: "success",
        visible: (listedUser) => {
          const statusValue = getUserStatusValue(listedUser);
          return (
            !isCurrentLoggedUser(listedUser) &&
            (statusValue === USER_STATUS.PENDING ||
              statusValue === USER_STATUS.SUSPENDED)
          );
        },
        disabled: (listedUser) => isAnyActionProcessingForUser(listedUser.id),
        loading: (listedUser) => isProcessing(listedUser.id, "approve"),
        onClick: handleApproveUser,
      },
      {
        key: "suspend",
        label: "Suspender",
        title: "No aprobar / suspender usuario",
        icon: "x",
        variant: "warning",
        visible: (listedUser) => {
          const statusValue = getUserStatusValue(listedUser);
          return (
            !isCurrentLoggedUser(listedUser) &&
            (statusValue === USER_STATUS.PENDING ||
              statusValue === USER_STATUS.APPROVED)
          );
        },
        disabled: (listedUser) => isAnyActionProcessingForUser(listedUser.id),
        loading: (listedUser) => isProcessing(listedUser.id, "suspend"),
        onClick: handleSuspendUser,
      },
      {
        key: "delete",
        label: "Eliminar",
        title: "Eliminar usuario",
        icon: "trash",
        variant: "danger",
        visible: (listedUser) => !isCurrentLoggedUser(listedUser),
        disabled: (listedUser) => isAnyActionProcessingForUser(listedUser.id),
        loading: (listedUser) => isProcessing(listedUser.id, "delete"),
        onClick: (listedUser) => setDeleteModalUser(listedUser),
      },
    ],
  };

  return (
    <>
      <EntityListPage section={usersSection} />

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
    </>
  );
}