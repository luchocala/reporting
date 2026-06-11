import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

import {
  approveUser,
  deleteUser,
  suspendUser,
} from "@/lib/auth-service";
import { useLocalAuth } from "@/lib/LocalAuthContext";

export const USER_STATUS = {
  PENDING: 0,
  APPROVED: 1,
  SUSPENDED: 2,
};

export const userStatusLabels = {
  [USER_STATUS.PENDING]: "Pending",
  [USER_STATUS.APPROVED]: "Approved",
  [USER_STATUS.SUSPENDED]: "Suspended",
};

export function getUserDisplayName(user) {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return fullName || user.username || user.email || "Usuario";
}

export function getUserStatusValue(user) {
  const value = Number(user.approved);

  if ([0, 1, 2].includes(value)) {
    return value;
  }

  return USER_STATUS.PENDING;
}

export function getUserStatusLabel(user) {
  return userStatusLabels[getUserStatusValue(user)] || "Pending";
}

export function mapAuthUserToEntityRow(user) {
  return {
    ...user,
    id: user.id,
    name: getUserDisplayName(user),
    email: user.email || "-",
    username: user.username || "-",
    status: getUserStatusLabel(user),
    role: user.role || "user",
  };
}

function DeleteUserModal({ user, processing, onCancel, onConfirm }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700">
            <Trash2 className="size-5" />
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">Eliminar usuario</h2>
            <p className="text-sm text-muted-foreground">
              ¿Seguro que querés eliminar a{" "}
              <span className="font-medium text-foreground">
                {getUserDisplayName(user)}
              </span>
              ? Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={processing}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={processing}
            className="inline-flex h-9 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {processing ? (
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
  );
}

function useUsersEntityActions({ rows, setRows, setError }) {
  const { user: currentUser } = useLocalAuth();
  const [processingAction, setProcessingAction] = useState(null);
  const [deleteModalUser, setDeleteModalUser] = useState(null);

  const isProcessing = (userId, type) =>
    processingAction?.userId === userId && processingAction?.type === type;

  const isAnyActionProcessingForUser = (userId) =>
    processingAction?.userId === userId;

  const isCurrentLoggedUser = (candidateUser) =>
    String(candidateUser.id) === String(currentUser?.id);

  const updateUserStatusLocally = (userId, approved) => {
    setRows((current) =>
      current.map((user) =>
        String(user.id) === String(userId)
          ? {
              ...user,
              approved,
              status: userStatusLabels[approved] || user.status,
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
    if (!deleteModalUser) return;

    const userId = deleteModalUser.id;
    setProcessingAction({ userId, type: "delete" });
    setError("");

    try {
      await deleteUser(userId);
      setRows((current) =>
        current.filter((user) => String(user.id) !== String(userId))
      );
      setDeleteModalUser(null);
    } catch (err) {
      setError(err.message || "No se pudo eliminar el usuario.");
    } finally {
      setProcessingAction(null);
    }
  };

  return {
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
    extraContent: (
      <DeleteUserModal
        user={deleteModalUser}
        processing={isProcessing(deleteModalUser?.id, "delete")}
        onCancel={() => setDeleteModalUser(null)}
        onConfirm={handleDeleteUser}
      />
    ),
  };
}

export function useEntityActionHandlers(actionKey, context) {
  const usersActions = useUsersEntityActions(context);

  if (actionKey === "users") {
    return usersActions;
  }

  return {
    rowActions: [],
    extraContent: null,
  };
}
