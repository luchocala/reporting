import { getUserStatusValue, USER_STATUS } from "@/lib/entityActionHandlers.jsx";

export function getEntityStatsCards(statsKey, rows = []) {
  if (statsKey === "users") {
    const pendingUsers = rows.filter(
      (user) => getUserStatusValue(user) === USER_STATUS.PENDING
    ).length;

    const activeUsers = rows.filter(
      (user) => getUserStatusValue(user) === USER_STATUS.APPROVED
    ).length;

    const suspendedUsers = rows.filter(
      (user) => getUserStatusValue(user) === USER_STATUS.SUSPENDED
    ).length;

    return [
      {
        key: "total-users",
        icon: "◈",
        label: "Total Users",
        value: rows.length,
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
    ];
  }

  return [];
}
