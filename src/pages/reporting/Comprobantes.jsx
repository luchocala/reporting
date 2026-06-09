import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  CheckCircle2,
  Trash2,
  Check,
  SlidersHorizontal,
  SquareCheckBig,
  TableProperties,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const comprobantes = [
  {
    orderId: "2111",
    fecha: "01/06/2026",
    estado: "ESPERANDO PAGO",
    tc: "C",
    provincia: "CABA",
    documento: "23148603464",
    razonSocial: "CUK INGRID LILIAN",
    tipo: "Consumidor Final",
    leyenda: "Honorarios profesionales Junio 2026",
    importeNeto: 20576,
    porcentajeIva: 0,
    iva: 0,
    importeTotal: 20576,
    moneda: "ARS",
    emisora: "CALABRESE LUCIANO JAVIER",
    emails: "info@ingridcuk.com.ar",
  },
  {
    orderId: "2112",
    fecha: "01/06/2026",
    estado: "PAGADO",
    tc: "A",
    provincia: "Buenos Aires",
    documento: "30711222334",
    razonSocial: "EJEMPLO S.A.",
    tipo: "Responsable Inscripto",
    leyenda: "Servicios profesionales Junio 2026",
    importeNeto: 100000,
    porcentajeIva: 21,
    iva: 21000,
    importeTotal: 121000,
    moneda: "ARS",
    emisora: "CALABRESE LUCIANO JAVIER",
    emails: "administracion@ejemplo.com",
  },
  {
    orderId: "2113",
    fecha: "02/06/2026",
    estado: "BORRADOR",
    tc: "B",
    provincia: "Córdoba",
    documento: "20333444556",
    razonSocial: "JUAN PEREZ",
    tipo: "Monotributista",
    leyenda: "Abono mensual Junio 2026",
    importeNeto: 45000,
    porcentajeIva: 0,
    iva: 0,
    importeTotal: 45000,
    moneda: "ARS",
    emisora: "CALABRESE LUCIANO JAVIER",
    emails: "juan.perez@example.com",
  },
  {
    orderId: "2114",
    fecha: "03/06/2026",
    estado: "ANULADO",
    tc: "C",
    provincia: "Santa Fe",
    documento: "20222111222",
    razonSocial: "CLIENTE ANULADO",
    tipo: "Consumidor Final",
    leyenda: "Comprobante anulado",
    importeNeto: 30000,
    porcentajeIva: 0,
    iva: 0,
    importeTotal: 30000,
    moneda: "ARS",
    emisora: "CALABRESE LUCIANO JAVIER",
    emails: "cliente@example.com",
  },
];

const estadoStyles = {
  PAGADO:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-400/20",

  "ESPERANDO PAGO":
    "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20",

  BORRADOR:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-400/20",

  ANULADO:
    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400/20",
};

const defaultEstadoStyle =
  "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20 dark:bg-slate-900/30 dark:text-slate-400 dark:ring-slate-400/20";

const laneMeta = {
  "ESPERANDO PAGO": { label: "Esperando pago", icon: "◎" },
  PAGADO: { label: "Pagado", icon: "✓" },
  BORRADOR: { label: "Borrador", icon: "⊙" },
  ANULADO: { label: "Anulado", icon: "×" },
};

const tableColumns = [
  { key: "orderId", label: "Order ID" },
  { key: "fecha", label: "Fecha" },
  { key: "estado", label: "Estado" },
  { key: "tc", label: "T/C" },
  { key: "provincia", label: "Provincia" },
  { key: "documento", label: "Documento" },
  { key: "razonSocial", label: "Razón Social" },
  { key: "tipo", label: "Tipo" },
  { key: "leyenda", label: "Leyenda" },
  { key: "importeNeto", label: "Importe Neto" },
  { key: "porcentajeIva", label: "%" },
  { key: "iva", label: "Iva" },
  { key: "importeTotal", label: "Importe Total" },
  { key: "moneda", label: "Moneda" },
  { key: "emisora", label: "Emisora" },
  { key: "emails", label: "Emails" },
  { key: "acciones", label: "Acciones", locked: true },
];

const editableColumns = tableColumns.filter(
  (column) => !["acciones"].includes(column.key)
);

const advancedFilterColumns = tableColumns.filter(
  (column) => !["acciones"].includes(column.key)
);

const defaultVisibleColumns = tableColumns.map((column) => column.key);

function getInitialView() {
  if (typeof window === "undefined") return "table";

  return window.innerWidth >= 1280 ? "table" : "lanes";
}

function EstadoBadge({ estado }) {
  return (
    <span
      className={`inline-block max-w-full rounded-md px-2 py-1 text-[10px] font-medium leading-tight whitespace-normal break-words text-center ${
        estadoStyles[estado] || defaultEstadoStyle
      }`}
    >
      {estado}
    </span>
  );
}

function formatAmount(value) {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatMoney(value, moneda = "ARS") {
  return `${moneda} ${formatAmount(value)}`;
}

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function parseInputDate(dateString) {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getCurrentMonthRange() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return { start, end };
}

function getPreviousMonthRange() {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const end = new Date(today.getFullYear(), today.getMonth(), 0);

  return { start, end };
}

function isDateInRange(date, range) {
  if (!range) return true;

  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const normalizedStart = new Date(range.start.getFullYear(), range.start.getMonth(), range.start.getDate());
  const normalizedEnd = new Date(range.end.getFullYear(), range.end.getMonth(), range.end.getDate());

  return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
}

function getUniqueValues(items, key) {
  return Array.from(new Set(items.map((item) => item[key]).filter(Boolean)));
}

function getOptionsForColumn(items, columnKey) {
  return Array.from(
    new Set(
      items
        .map((item) => {
          const value = item[columnKey];

          if (value === null || value === undefined || value === "") {
            return null;
          }

          return String(value);
        })
        .filter(Boolean)
    )
  ).map((value) => ({
    value,
    label: value,
  }));
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function groupByEstado(items) {
  const order = ["ESPERANDO PAGO", "PAGADO", "BORRADOR", "ANULADO"];

  return order
    .map((estado) => {
      const orders = items.filter((item) => item.estado === estado);

      return {
        id: estado,
        label: laneMeta[estado]?.label || estado,
        icon: laneMeta[estado]?.icon || "•",
        count: orders.length,
        total: orders.reduce((sum, item) => sum + item.importeTotal, 0),
        orders,
      };
    })
    .filter((lane) => lane.orders.length > 0);
}

function SelectionButton({ selected, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 border rounded-md transition-colors ${
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:bg-muted"
      } ${compact ? "px-1.5" : ""}`}
    >
      <SquareCheckBig className="size-3.5" />
      {!compact && "Seleccionar"}
    </button>
  );
}

function ActionButtons({
  item,
  compact = false,
  onView,
  onMarkPaid,
  onDelete,
  onToggleSelected,
  selected = false,
  showSelectionButton = false,
}) {
  const isPaid = item.estado === "PAGADO";

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onView(item)}
          className="hover:bg-muted rounded"
          title="Ver detalle"
        >
          <Eye className="size-3.5 text-muted-foreground" />
        </button>

        {!isPaid && (
          <button
            type="button"
            onClick={() => onMarkPaid(item)}
            className="hover:bg-muted rounded"
            title="Marcar como pagada"
          >
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(item)}
          className="hover:bg-muted rounded"
          title="Eliminar"
        >
          <Trash2 className="size-3.5 text-red-600 dark:text-red-400" />
        </button>
      </div>
    );
  }

  return null;
}

export default function Comprobantes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Órdenes de Facturación</h1>
          <p className="text-sm text-muted-foreground">
            Seguimiento de órdenes de facturación, estado de pago y datos fiscales.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          <Plus className="size-4" />
          Nueva orden de facturación
        </button>
      </div>

      <Card className="shadow-none p-4">
        <p className="text-sm text-muted-foreground">
          La vista de órdenes de facturación está pendiente de reconectar con la tabla completa.
        </p>
      </Card>
    </div>
  );
}
