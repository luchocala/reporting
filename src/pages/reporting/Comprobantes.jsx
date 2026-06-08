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

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={() => onView(item)}
        className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted"
      >
        <Eye className="size-3.5" />
        Ver
      </button>

      {!isPaid && (
        <button
          type="button"
          onClick={() => onMarkPaid(item)}
          className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted"
        >
          <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
          Marcar pagada
        </button>
      )}

      <button
        type="button"
        onClick={() => onDelete(item)}
        className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted text-destructive"
      >
        <Trash2 className="size-3.5" />
        Eliminar
      </button>

      {showSelectionButton && (
        <SelectionButton
          selected={selected}
          onClick={() => onToggleSelected(item.orderId)}
        />
      )}
    </div>
  );
}

function ViewSwitcher({ value, onChange }) {
  const views = [
    { value: "table", label: "Tabla" },
    { value: "lanes", label: "Lanes" },
    { value: "cards", label: "Cards" },
  ];

  return (
    <div className="inline-flex rounded-md border border-input bg-background p-0.5">
      {views.map((view) => (
        <button
          key={view.value}
          type="button"
          onClick={() => onChange(view.value)}
          className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
            value === view.value
              ? "bg-muted text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

function MultiFilterSelect({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon = null,
  customDateRange,
  onCustomDateRangeChange,
  className = "",
}) {
  const [open, setOpen] = useState(false);

  const selectedValues = Array.isArray(value) ? value.map(String) : [];
  const allOptionValues = options.map((option) => String(option.value));
  const allValuesExceptCustom = allOptionValues.filter((item) => item !== "custom");
  const allSelected =
    allValuesExceptCustom.length > 0 &&
    allValuesExceptCustom.every((optionValue) =>
      selectedValues.includes(optionValue)
    );

  const selectedLabels = options
    .filter((option) => selectedValues.includes(String(option.value)))
    .map((option) => option.label);

  const label =
    selectedLabels.length === 0 || allSelected
      ? placeholder
      : selectedLabels.length === 1
        ? selectedLabels[0]
        : `${selectedLabels.length} seleccionados`;

  const toggleOption = (optionValue) => {
    const normalizedOptionValue = String(optionValue);

    if (normalizedOptionValue === "all") {
      if (allSelected) {
        onChange([]);
        return;
      }

      onChange(allValuesExceptCustom);
      return;
    }

    if (normalizedOptionValue === "custom") {
      onChange(selectedValues.includes("custom") ? [] : ["custom"]);
      return;
    }

    const valuesWithoutCustom = selectedValues.filter((item) => item !== "custom");

    if (valuesWithoutCustom.includes(normalizedOptionValue)) {
      onChange(valuesWithoutCustom.filter((item) => item !== normalizedOptionValue));
      return;
    }

    onChange([...valuesWithoutCustom, normalizedOptionValue]);
  };

  const isActive = (optionValue) => {
    const normalizedOptionValue = String(optionValue);

    if (normalizedOptionValue === "all") return allSelected;
    return selectedValues.includes(normalizedOptionValue);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 xl:w-[180px]"
      >
        <span className="flex min-w-0 items-center gap-2">
          {Icon && <Icon className="size-4 shrink-0 text-foreground" />}
          <span className="truncate">{label}</span>
        </span>

        <ChevronRight
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpen(false)}
            tabIndex={-1}
            aria-label="Cerrar menú"
          />

          <div className="absolute left-0 top-full z-30 mt-1.5 w-full min-w-[230px] overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg">
            <button
              type="button"
              onClick={() => toggleOption("all")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted/70"
            >
              <span className="truncate">Todos</span>
              <span className="flex size-4 items-center justify-center">
                {allSelected && <Check className="size-4 stroke-[2]" />}
              </span>
            </button>

            {options.map((option) => {
              const active = isActive(option.value);

              return (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => toggleOption(option.value)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted/70"
                >
                  <span className="truncate">{option.label}</span>

                  <span className="flex size-4 items-center justify-center">
                    {active && <Check className="size-4 stroke-[2]" />}
                  </span>
                </button>
              );
            })}

            {selectedValues.includes("custom") && onCustomDateRangeChange && (
              <div className="mt-1 border-t border-border p-3 space-y-2">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Desde</label>
                  <input
                    type="date"
                    value={customDateRange?.from || ""}
                    onChange={(event) =>
                      onCustomDateRangeChange({
                        ...customDateRange,
                        from: event.target.value,
                      })
                    }
                    className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Hasta</label>
                  <input
                    type="date"
                    value={customDateRange?.to || ""}
                    onChange={(event) =>
                      onCustomDateRangeChange({
                        ...customDateRange,
                        to: event.target.value,
                      })
                    }
                    className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring/30"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function IconButton({ onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
      title={title}
    >
      {children}
    </button>
  );
}

function AdvancedFiltersButton({ onClick, mobile = false }) {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
      >
        <SlidersHorizontal className="size-4" />
        Filtros avanzados
      </button>
    );
  }

  return (
    <IconButton onClick={onClick} title="Filtros avanzados">
      <SlidersHorizontal className="size-4" />
    </IconButton>
  );
}

function ColumnSelector({ visibleColumns, onToggleColumn, compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={
          compact
            ? "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
            : "inline-flex h-10 w-full items-center justify-center gap-3 rounded-xl border border-input bg-background px-4 text-sm font-semibold shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 xl:w-[160px]"
        }
        title="Columnas"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 4v16" />
          <path d="M15 4v16" />
        </svg>

        {!compact && <span>Columnas</span>}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setOpen(false)}
            tabIndex={-1}
            aria-label="Cerrar menú"
          />

          <div className="absolute right-0 top-full z-30 mt-1.5 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-lg">
            <div className="grid grid-cols-2 gap-1">
              {tableColumns.map((column) => {
                const active = visibleColumns.includes(column.key);

                return (
                  <button
                    key={column.key}
                    type="button"
                    disabled={column.locked}
                    onClick={() => onToggleColumn(column.key)}
                    className={`flex w-full items-center justify-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted/70 ${
                      column.locked
                        ? "cursor-not-allowed text-foreground"
                        : "text-foreground"
                    }`}
                  >
                    <span className="flex size-4 shrink-0 items-center justify-center">
                      {active && <Check className="size-4 stroke-[2]" />}
                    </span>
                    <span className="truncate">{column.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SelectAllButton({ allSelected, onClick, mobile = false }) {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 ${
          allSelected ? "bg-muted" : ""
        }`}
      >
        <SquareCheckBig className="size-4" />
        {allSelected ? "Quitar selección" : "Seleccionar todos"}
      </button>
    );
  }

  return (
    <IconButton
      onClick={onClick}
      title={allSelected ? "Quitar selección" : "Seleccionar todo"}
    >
      <SquareCheckBig
        className={`size-4 ${allSelected ? "text-foreground" : "text-muted-foreground"}`}
      />
    </IconButton>
  );
}

function BulkChangesButton({ selectedCount, onClick, mobile = false }) {
  if (selectedCount === 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 ${
        mobile ? "w-full" : ""
      }`}
    >
      <SquareCheckBig className="size-4" />
      Cambios masivos
      <span className="rounded-full bg-background/15 px-2 py-0.5 text-xs">
        {selectedCount}
      </span>
    </button>
  );
}

function FiltersToolbar({
  search,
  setSearch,
  periodFilter,
  setPeriodFilter,
  customDateRange,
  setCustomDateRange,
  emisoraFilter,
  setEmisoraFilter,
  estadoFilter,
  setEstadoFilter,
  emisoras,
  estados,
  desktopView,
  visibleColumns,
  onToggleColumn,
  onOpenAdvancedFilters,
  onToggleSelectAll,
  allVisibleSelected,
}) {
  const showColumnSelector = desktopView === "table";
  const showSelectAllButton = desktopView === "lanes" || desktopView === "cards";

  return (
    <div className="hidden sm:flex w-full flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex w-full flex-col gap-2 xl:flex-row xl:items-center">
        <div className="relative w-full xl:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder="Buscar comprobantes"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
          />
        </div>

        <div className="grid w-full grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-2 xl:flex xl:w-auto xl:items-center">
          <MultiFilterSelect
            value={periodFilter}
            onChange={setPeriodFilter}
            icon={Calendar}
            placeholder="Período"
            className="min-w-0"
            options={[
              { value: "lastMonth", label: "Último mes" },
              { value: "previousMonth", label: "Mes anterior" },
              { value: "custom", label: "Personalizado" },
            ]}
            customDateRange={customDateRange}
            onCustomDateRangeChange={setCustomDateRange}
          />

          <MultiFilterSelect
            value={emisoraFilter}
            onChange={setEmisoraFilter}
            placeholder="Emisora"
            className="min-w-0"
            options={emisoras.map((emisora) => ({
              value: emisora,
              label: emisora,
            }))}
          />

          <MultiFilterSelect
            value={estadoFilter}
            onChange={setEstadoFilter}
            placeholder="Estado"
            className="min-w-0"
            options={estados.map((estado) => ({
              value: estado,
              label: estado,
            }))}
          />

          <AdvancedFiltersButton onClick={onOpenAdvancedFilters} />

          {showColumnSelector && (
            <ColumnSelector
              compact
              visibleColumns={visibleColumns}
              onToggleColumn={onToggleColumn}
            />
          )}

          {showSelectAllButton && (
            <SelectAllButton
              allSelected={allVisibleSelected}
              onClick={onToggleSelectAll}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AdvancedFiltersPanel({
  items,
  advancedFilters,
  setAdvancedFilters,
  onClose,
}) {
  const updateFilter = (columnKey, nextValue) => {
    setAdvancedFilters((current) => ({
      ...current,
      [columnKey]: nextValue,
    }));
  };

  return (
    <Card className="shadow-none p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Filtros avanzados</h2>
          <p className="text-sm text-muted-foreground">
            Ajustá los filtros por columna y guardá los cambios para volver a la vista normal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {advancedFilterColumns.map((column) => {
          const options = getOptionsForColumn(items, column.key);

          return (
            <div
              key={column.key}
              className="grid grid-cols-1 gap-1.5 sm:grid-cols-[180px_1fr] sm:items-center"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {column.label}
              </span>

              <MultiFilterSelect
                value={advancedFilters[column.key] || []}
                onChange={(nextValue) => updateFilter(column.key, nextValue)}
                placeholder={column.label}
                className="min-w-0"
                options={options}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Guardar cambios
        </button>
      </div>
    </Card>
  );
}

function BulkChangesPanel({
  selectedCount,
  bulkChanges,
  setBulkChanges,
  onClose,
}) {
  const updateChange = (columnKey, value) => {
    setBulkChanges((current) => ({
      ...current,
      [columnKey]: value,
    }));
  };

  return (
    <Card className="shadow-none p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Cambios masivos</h2>
          <p className="text-sm text-muted-foreground">
            Editá campos para aplicar cambios a {selectedCount} comprobante{selectedCount === 1 ? "" : "s"} seleccionado{selectedCount === 1 ? "" : "s"}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {editableColumns.map((column) => (
          <div
            key={column.key}
            className="grid grid-cols-1 gap-1.5 sm:grid-cols-[180px_1fr] sm:items-center"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {column.label}
            </span>

            <input
              value={bulkChanges[column.key] || ""}
              onChange={(event) => updateChange(column.key, event.target.value)}
              placeholder={`Nuevo valor para ${column.label}`}
              className="h-10 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Guardar cambios
        </button>
      </div>
    </Card>
  );
}

function DesktopTable({
  items,
  onView,
  onMarkPaid,
  onDelete,
  visibleColumns,
  selectedIds,
  onToggleSelected,
  onToggleSelectAll,
  allVisibleSelected,
  forceVisible = false,
}) {
  const isVisible = (columnKey) => visibleColumns.includes(columnKey);

  return (
    <Card className={`shadow-none overflow-hidden ${forceVisible ? "block" : "hidden xl:block"}`}>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-[11px] leading-tight">
          <colgroup>
            <col className="w-[32px]" />
            {isVisible("orderId") && <col className="w-[40px]" />}
            {isVisible("fecha") && <col className="w-[80px]" />}
            {isVisible("estado") && <col className="w-[90px]" />}
            {isVisible("tc") && <col className="w-[25px]" />}
            {isVisible("provincia") && <col className="w-[65px]" />}
            {isVisible("documento") && <col className="w-[95px]" />}
            {isVisible("razonSocial") && <col className="w-[85px]" />}
            {isVisible("tipo") && <col className="w-[90px]" />}
            {isVisible("leyenda") && <col className="w-[90px]" />}
            {isVisible("importeNeto") && <col className="w-[90px]" />}
            {isVisible("porcentajeIva") && <col className="w-[30px]" />}
            {isVisible("iva") && <col className="w-[90px]" />}
            {isVisible("importeTotal") && <col className="w-[90px]" />}
            {isVisible("moneda") && <col className="w-[40px]" />}
            {isVisible("emisora") && <col className="w-[80px]" />}
            {isVisible("emails") && <col className="w-[90px]" />}
            {isVisible("acciones") && <col className="w-[40px]" />}
          </colgroup>

          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-2 py-2 align-top">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={onToggleSelectAll}
                  className="size-3.5"
                  aria-label="Seleccionar todos"
                />
              </th>
              {isVisible("orderId") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Order ID</th>}
              {isVisible("fecha") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Fecha</th>}
              {isVisible("estado") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Estado</th>}
              {isVisible("tc") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">T/C</th>}
              {isVisible("provincia") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Provincia</th>}
              {isVisible("documento") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Documento</th>}
              {isVisible("razonSocial") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Razón Social</th>}
              {isVisible("tipo") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Tipo</th>}
              {isVisible("leyenda") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Leyenda</th>}
              {isVisible("importeNeto") && <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">Importe Neto</th>}
              {isVisible("porcentajeIva") && <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">%</th>}
              {isVisible("iva") && <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">Iva</th>}
              {isVisible("importeTotal") && <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">Importe Total</th>}
              {isVisible("moneda") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Moneda</th>}
              {isVisible("emisora") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Emisora</th>}
              {isVisible("emails") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Emails</th>}
              {isVisible("acciones") && <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const selected = selectedIds.includes(item.orderId);

              return (
                <tr
                  key={item.orderId}
                  className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${
                    selected ? "bg-muted/40" : ""
                  }`}
                >
                  <td className="px-2 py-2 align-top">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onToggleSelected(item.orderId)}
                      className="size-3.5"
                      aria-label={`Seleccionar ${item.orderId}`}
                    />
                  </td>

                  {isVisible("orderId") && (
                    <td className="px-2 py-2 align-top font-medium break-words">{item.orderId}</td>
                  )}

                  {isVisible("fecha") && (
                    <td className="px-2 py-2 align-top text-muted-foreground tabular-nums whitespace-nowrap">{item.fecha}</td>
                  )}

                  {isVisible("estado") && (
                    <td className="px-1 py-1 align-top whitespace-normal break-words">
                      <EstadoBadge estado={item.estado} />
                    </td>
                  )}

                  {isVisible("tc") && (
                    <td className="px-2 py-2 align-top font-medium">{item.tc}</td>
                  )}

                  {isVisible("provincia") && (
                    <td className="px-2 py-2 align-top break-words">{item.provincia}</td>
                  )}

                  {isVisible("documento") && (
                    <td className="px-2 py-2 align-top tabular-nums break-words">{item.documento}</td>
                  )}

                  {isVisible("razonSocial") && (
                    <td className="px-2 py-2 align-top break-words">{item.razonSocial}</td>
                  )}

                  {isVisible("tipo") && (
                    <td className="px-2 py-2 align-top break-words">{item.tipo}</td>
                  )}

                  {isVisible("leyenda") && (
                    <td className="px-2 py-2 align-top break-words">{item.leyenda}</td>
                  )}

                  {isVisible("importeNeto") && (
                    <td className="px-2 py-2 align-top text-right font-medium tabular-nums whitespace-nowrap">
                      {formatAmount(item.importeNeto)}
                    </td>
                  )}

                  {isVisible("porcentajeIva") && (
                    <td className="px-2 py-2 align-top text-right tabular-nums whitespace-nowrap">
                      {formatAmount(item.porcentajeIva)}
                    </td>
                  )}

                  {isVisible("iva") && (
                    <td className="px-2 py-2 align-top text-right tabular-nums whitespace-nowrap">
                      {formatAmount(item.iva)}
                    </td>
                  )}

                  {isVisible("importeTotal") && (
                    <td className="px-2 py-2 align-top text-right font-medium tabular-nums whitespace-nowrap">
                      {formatAmount(item.importeTotal)}
                    </td>
                  )}

                  {isVisible("moneda") && (
                    <td className="px-2 py-2 align-top break-words">{item.moneda}</td>
                  )}

                  {isVisible("emisora") && (
                    <td className="px-2 py-2 align-top break-words">{item.emisora}</td>
                  )}

                  {isVisible("emails") && (
                    <td className="px-2 py-2 align-top break-all">{item.emails}</td>
                  )}

                  {isVisible("acciones") && (
                    <td className="px-1 py-2 align-top">
                      <ActionButtons
                        item={item}
                        compact
                        onView={onView}
                        onMarkPaid={onMarkPaid}
                        onDelete={onDelete}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          1–{items.length} of {items.length}
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-muted rounded">
            <ChevronLeft className="size-4 text-muted-foreground" />
          </button>
          <button className="p-1 hover:bg-muted rounded">
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </Card>
  );
}

function LanesView({
  items,
  onView,
  onMarkPaid,
  onDelete,
  selectedIds,
  onToggleSelected,
  forceVisible = false,
}) {
  const lanes = groupByEstado(items);

  return (
    <div className={forceVisible ? "block" : "hidden sm:block xl:hidden"}>
      <div className="flex items-center justify-end mb-3">
        <span className="text-xs text-muted-foreground">
          {items.length} comprobantes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {lanes.map((lane) => (
          <div key={lane.id} className="space-y-3 min-w-0">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-sm font-medium min-w-0">
                <span className="text-muted-foreground">{lane.icon}</span>
                <span className="truncate">{lane.label}</span>
                <span className="text-muted-foreground font-normal">{lane.count}</span>
              </div>
              <button className="p-1 hover:bg-muted rounded">
                <Plus className="size-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="text-xs text-muted-foreground px-1">
              Lane total{" "}
              <span className="font-medium text-foreground">
                {formatMoney(lane.total, "ARS")}
              </span>
            </div>

            <div className="space-y-3">
              {lane.orders.map((item) => {
                const selected = selectedIds.includes(item.orderId);

                return (
                  <Card
                    key={item.orderId}
                    className={`shadow-none p-3 space-y-2 cursor-pointer hover:shadow-sm transition-shadow ${
                      selected ? "bg-muted/40 ring-1 ring-border" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between text-xs text-muted-foreground gap-2">
                      <span>
                        Order:{" "}
                        <span className="font-semibold text-foreground text-sm">
                          #{item.orderId}
                        </span>
                      </span>
                      <span className="text-right">
                        Total{" "}
                        <span className="font-semibold text-foreground">
                          {formatMoney(item.importeTotal, item.moneda)}
                        </span>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground">Detalle:</p>
                    <p className="text-xs font-medium leading-tight break-words">
                      {item.leyenda}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      <EstadoBadge estado={item.estado} />
                      <span className="text-[11px] px-1.5 py-0.5 bg-muted rounded">
                        Factura {item.tc}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 bg-muted rounded">
                        {item.tipo}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 bg-muted rounded">
                        {item.provincia}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-xs font-medium leading-tight break-words">
                        {item.razonSocial}
                      </p>
                      <p className="text-[11px] text-muted-foreground break-words">
                        Doc. {item.documento}
                      </p>
                      <p className="text-[11px] text-muted-foreground break-all">
                        {item.emails}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                      <div>
                        <p>Neto</p>
                        <p className="font-medium text-foreground">
                          {formatMoney(item.importeNeto, item.moneda)}
                        </p>
                      </div>
                      <div>
                        <p>IVA</p>
                        <p className="font-medium text-foreground">
                          {formatAmount(item.porcentajeIva)}% · {formatMoney(item.iva, item.moneda)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] text-muted-foreground break-words pr-2 min-w-0">
                        {item.emisora}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                        <span>{item.fecha}</span>
                        <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                          {getInitials(item.razonSocial)}
                        </div>
                      </div>
                    </div>

                    <ActionButtons
                      item={item}
                      onView={onView}
                      onMarkPaid={onMarkPaid}
                      onDelete={onDelete}
                      showSelectionButton
                      selected={selected}
                      onToggleSelected={onToggleSelected}
                    />
                  </Card>
                );
              })}

              <button className="w-full text-xs text-muted-foreground flex items-center gap-1.5 hover:text-foreground py-1">
                <Plus className="size-3.5" />
                New
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCards({
  items,
  onView,
  onMarkPaid,
  onDelete,
  selectedIds,
  onToggleSelected,
  forceVisible = false,
}) {
  return (
    <div className={forceVisible ? "space-y-3" : "space-y-3 sm:hidden"}>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{items.length} comprobantes</span>
        <span className="font-medium text-foreground">
          ARS {formatAmount(items.reduce((sum, item) => sum + item.importeTotal, 0))} total
        </span>
      </div>

      {items.map((item) => {
        const selected = selectedIds.includes(item.orderId);

        return (
          <Card
            key={item.orderId}
            className={`shadow-none p-4 hover:shadow-sm transition-shadow cursor-pointer ${
              selected ? "bg-muted/40 ring-1 ring-border" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">#{item.orderId}</span>
                  <EstadoBadge estado={item.estado} />
                  <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                    Factura {item.tc}
                  </span>
                </div>

                <p className="text-base font-semibold mt-1 break-words">
                  {item.razonSocial}
                </p>

                <p className="text-xs text-muted-foreground break-words">
                  {item.documento} · {item.tipo} · {item.provincia}
                </p>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="font-medium text-foreground break-words">
                      {item.leyenda}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground break-all">
                    {item.emails}
                  </p>
                </div>

                <div className="mt-3">
                  <ActionButtons
                    item={item}
                    onView={onView}
                    onMarkPaid={onMarkPaid}
                    onDelete={onDelete}
                    showSelectionButton
                    selected={selected}
                    onToggleSelected={onToggleSelected}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-lg font-bold text-right">
                  {formatMoney(item.importeTotal, item.moneda)}
                </span>
                <span className="text-xs text-muted-foreground">{item.fecha}</span>
                <button className="p-1 hover:bg-muted rounded">
                  <MoreHorizontal className="size-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default function Comprobantes() {
  const [tab, setTab] = useState("Todos");
  const [search, setSearch] = useState("");
  const [desktopView, setDesktopView] = useState(getInitialView);
  const previousIsDesktopRef = useRef(
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true
  );
  const userSelectedViewRef = useRef(false);

  const [periodFilter, setPeriodFilter] = useState([]);
  const [emisoraFilter, setEmisoraFilter] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState([]);
  const [customDateRange, setCustomDateRange] = useState({
    from: "",
    to: "",
  });
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [bulkChangesOpen, setBulkChangesOpen] = useState(false);
  const [bulkChanges, setBulkChanges] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1280;
      const wasDesktop = previousIsDesktopRef.current;

      if (wasDesktop && !isDesktop) {
        setDesktopView("lanes");
        userSelectedViewRef.current = false;
      }

      if (!wasDesktop && isDesktop && !userSelectedViewRef.current) {
        setDesktopView("table");
      }

      previousIsDesktopRef.current = isDesktop;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const emisoras = useMemo(() => getUniqueValues(comprobantes, "emisora"), []);
  const estados = useMemo(() => getUniqueValues(comprobantes, "estado"), []);

  const toggleColumn = (columnKey) => {
    const column = tableColumns.find((item) => item.key === columnKey);

    if (column?.locked) return;

    setVisibleColumns((current) => {
      if (current.includes(columnKey)) {
        return current.filter((key) => key !== columnKey);
      }

      const next = [...current, columnKey];

      return tableColumns
        .map((item) => item.key)
        .filter((key) => next.includes(key));
    });
  };

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const selectedPeriodRanges = [];

    if (periodFilter.includes("lastMonth")) {
      selectedPeriodRanges.push(getCurrentMonthRange());
    }

    if (periodFilter.includes("previousMonth")) {
      selectedPeriodRanges.push(getPreviousMonthRange());
    }

    if (periodFilter.includes("custom") && customDateRange.from && customDateRange.to) {
      selectedPeriodRanges.push({
        start: parseInputDate(customDateRange.from),
        end: parseInputDate(customDateRange.to),
      });
    }

    const normalizedAdvancedFilters = Object.fromEntries(
      Object.entries(advancedFilters).filter(
        ([, values]) => Array.isArray(values) && values.length > 0
      )
    );

    return comprobantes.filter((item) => {
      const itemDate = parseDate(item.fecha);

      const matchesTab =
        tab === "Todos" ||
        item.estado.toLowerCase() === tab.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        item.orderId.toLowerCase().includes(normalizedSearch) ||
        item.documento.toLowerCase().includes(normalizedSearch) ||
        item.razonSocial.toLowerCase().includes(normalizedSearch) ||
        item.leyenda.toLowerCase().includes(normalizedSearch) ||
        item.emails.toLowerCase().includes(normalizedSearch);

      const matchesPeriod =
        periodFilter.length === 0 ||
        selectedPeriodRanges.length === 0 ||
        selectedPeriodRanges.some((range) => isDateInRange(itemDate, range));

      const matchesEmisora =
        emisoraFilter.length === 0 || emisoraFilter.includes(item.emisora);

      const matchesEstado =
        estadoFilter.length === 0 || estadoFilter.includes(item.estado);

      const matchesAdvancedFilters = Object.entries(normalizedAdvancedFilters).every(
        ([columnKey, selectedValues]) => selectedValues.includes(String(item[columnKey]))
      );

      return (
        matchesTab &&
        matchesSearch &&
        matchesPeriod &&
        matchesEmisora &&
        matchesEstado &&
        matchesAdvancedFilters
      );
    });
  }, [
    tab,
    search,
    periodFilter,
    emisoraFilter,
    estadoFilter,
    customDateRange,
    advancedFilters,
  ]);

  const visibleIds = useMemo(() => filtered.map((item) => item.orderId), [filtered]);

  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const toggleSelected = (orderId) => {
    setSelectedIds((current) => {
      if (current.includes(orderId)) {
        return current.filter((id) => id !== orderId);
      }

      return [...current, orderId];
    });
  };

  const toggleSelectAllVisible = () => {
    setSelectedIds((current) => {
      if (allVisibleSelected) {
        return current.filter((id) => !visibleIds.includes(id));
      }

      return Array.from(new Set([...current, ...visibleIds]));
    });
  };

  const handleView = (item) => {
    console.log("Ver detalle", item);
  };

  const handleMarkPaid = (item) => {
    console.log("Marcar como pagada", item);
  };

  const handleDelete = (item) => {
    console.log("Eliminar", item);
  };

  const handleViewChange = (nextView) => {
    userSelectedViewRef.current = true;
    setDesktopView(nextView);
  };

  const shouldShowSharedFilters =
    desktopView === "table" || desktopView === "lanes" || desktopView === "cards";

  const selectedCount = selectedIds.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Comprobantes</h1>
          <p className="text-sm text-muted-foreground">
            Seguimiento de comprobantes emitidos, estado de pago y datos fiscales.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
          <Plus className="size-4" />
          Nuevo comprobante
        </button>
      </div>

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="hidden sm:flex items-center gap-2">
            <ViewSwitcher value={desktopView} onChange={handleViewChange} />
          </div>

          <div className="flex sm:hidden items-center gap-2 w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                placeholder="Buscar comprobantes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-base focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <div className="flex sm:hidden flex-wrap gap-0 border-b border-border overflow-visible">
          {["Todos", "ESPERANDO PAGO", "PAGADO", "BORRADOR", "ANULADO"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setTab(item);

                if (item === "Todos") {
                  setEstadoFilter([]);
                } else {
                  setEstadoFilter([item]);
                }
              }}
              className={`px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                tab === item
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <div className="sm:hidden space-y-2">
          <AdvancedFiltersButton
            mobile
            onClick={() => setAdvancedFiltersOpen(true)}
          />

          <div
            className={`grid gap-2 ${
              selectedCount > 0 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            <SelectAllButton
              mobile
              allSelected={allVisibleSelected}
              onClick={toggleSelectAllVisible}
            />

            {selectedCount > 0 && (
              <BulkChangesButton
                mobile
                selectedCount={selectedCount}
                onClick={() => setBulkChangesOpen(true)}
              />
            )}
          </div>
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && shouldShowSharedFilters && (
        <FiltersToolbar
          search={search}
          setSearch={setSearch}
          periodFilter={periodFilter}
          setPeriodFilter={setPeriodFilter}
          customDateRange={customDateRange}
          setCustomDateRange={setCustomDateRange}
          emisoraFilter={emisoraFilter}
          setEmisoraFilter={setEmisoraFilter}
          estadoFilter={estadoFilter}
          setEstadoFilter={setEstadoFilter}
          emisoras={emisoras}
          estados={estados}
          desktopView={desktopView}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumn}
          onOpenAdvancedFilters={() => setAdvancedFiltersOpen(true)}
          onToggleSelectAll={toggleSelectAllVisible}
          allVisibleSelected={allVisibleSelected}
        />
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && selectedCount > 0 && (
        <div className="hidden sm:block">
          <BulkChangesButton
            selectedCount={selectedCount}
            onClick={() => setBulkChangesOpen(true)}
          />
        </div>
      )}

      {advancedFiltersOpen && (
        <AdvancedFiltersPanel
          items={comprobantes}
          advancedFilters={advancedFilters}
          setAdvancedFilters={setAdvancedFilters}
          onClose={() => setAdvancedFiltersOpen(false)}
        />
      )}

      {bulkChangesOpen && (
        <BulkChangesPanel
          selectedCount={selectedCount}
          bulkChanges={bulkChanges}
          setBulkChanges={setBulkChanges}
          onClose={() => setBulkChangesOpen(false)}
        />
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <>
          <div className="hidden sm:block">
            {desktopView === "table" && (
              <DesktopTable
                items={filtered}
                forceVisible
                visibleColumns={visibleColumns}
                selectedIds={selectedIds}
                onToggleSelected={toggleSelected}
                onToggleSelectAll={toggleSelectAllVisible}
                allVisibleSelected={allVisibleSelected}
                onView={handleView}
                onMarkPaid={handleMarkPaid}
                onDelete={handleDelete}
              />
            )}

            {desktopView === "lanes" && (
              <LanesView
                items={filtered}
                forceVisible
                selectedIds={selectedIds}
                onToggleSelected={toggleSelected}
                onView={handleView}
                onMarkPaid={handleMarkPaid}
                onDelete={handleDelete}
              />
            )}

            {desktopView === "cards" && (
              <MobileCards
                items={filtered}
                forceVisible
                selectedIds={selectedIds}
                onToggleSelected={toggleSelected}
                onView={handleView}
                onMarkPaid={handleMarkPaid}
                onDelete={handleDelete}
              />
            )}
          </div>

          <div className="sm:hidden">
            <MobileCards
              items={filtered}
              forceVisible
              selectedIds={selectedIds}
              onToggleSelected={toggleSelected}
              onView={handleView}
              onMarkPaid={handleMarkPaid}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}