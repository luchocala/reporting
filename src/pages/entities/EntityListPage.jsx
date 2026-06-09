import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Check,
  SlidersHorizontal,
  SquareCheckBig,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const statusStyles = {
  ACTIVO:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-400/20",
  PENDIENTE:
    "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20",
  INACTIVO:
    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400/20",
  BORRADOR:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-400/20",
};

const defaultStatusStyle =
  "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20 dark:bg-slate-900/30 dark:text-slate-400 dark:ring-slate-400/20";

function getInitialView() {
  if (typeof window === "undefined") return "table";
  return window.innerWidth >= 1280 ? "table" : "lanes";
}

function getRowId(row) {
  return String(row.id || row.orderId || row.key || "");
}

function getPrimaryText(row, columns) {
  const primaryColumn = columns.find((column) => column.primary);
  if (primaryColumn && row[primaryColumn.key]) return String(row[primaryColumn.key]);
  return String(row.nombre || row.razonSocial || row.descripcion || getRowId(row));
}

function getSecondaryText(row) {
  return String(row.descripcion || row.leyenda || row.email || row.emails || row.documento || "");
}

function getStatus(row, laneField = "estado") {
  return String(row[laneField] || row.estado || "SIN ESTADO");
}

function getUniqueValues(items, key) {
  return Array.from(
    new Set(
      items
        .map((item) => item[key])
        .filter((value) => value !== null && value !== undefined && value !== "")
        .map(String)
    )
  );
}

function getOptionsForColumn(items, columnKey) {
  return getUniqueValues(items, columnKey).map((value) => ({ value, label: value }));
}

function formatAmount(value) {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function formatMoney(value, moneda = "ARS") {
  return `${moneda} ${formatAmount(value)}`;
}

function renderCell(row, column) {
  const value = row[column.key];

  if (column.type === "status") {
    return <StatusBadge value={value} />;
  }

  if (column.type === "money") {
    return formatMoney(value, row.moneda || "ARS");
  }

  if (column.type === "number") {
    return formatAmount(value);
  }

  return value === null || value === undefined || value === "" ? "-" : String(value);
}

function StatusBadge({ value }) {
  const normalized = String(value || "SIN ESTADO");

  return (
    <span
      className={`inline-block max-w-full rounded-md px-2 py-1 text-[10px] font-medium leading-tight whitespace-normal break-words text-center ${
        statusStyles[normalized] || defaultStatusStyle
      }`}
    >
      {normalized}
    </span>
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

function MultiFilterSelect({ value, onChange, options, placeholder, className = "" }) {
  const [open, setOpen] = useState(false);
  const selectedValues = Array.isArray(value) ? value.map(String) : [];
  const allOptionValues = options.map((option) => String(option.value));
  const allSelected =
    allOptionValues.length > 0 &&
    allOptionValues.every((optionValue) => selectedValues.includes(optionValue));

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
    const normalized = String(optionValue);

    if (normalized === "all") {
      onChange(allSelected ? [] : allOptionValues);
      return;
    }

    if (selectedValues.includes(normalized)) {
      onChange(selectedValues.filter((item) => item !== normalized));
      return;
    }

    onChange([...selectedValues, normalized]);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 xl:w-[180px]"
      >
        <span className="truncate">{label}</span>
        <ChevronRightIcon open={open} />
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
              const active = selectedValues.includes(String(option.value));

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
          </div>
        </>
      )}
    </div>
  );
}

function ChevronRightIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
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

function ColumnSelector({ columns, visibleColumns, onToggleColumn, compact = false }) {
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
              {columns.map((column) => {
                const active = visibleColumns.includes(column.key);

                return (
                  <button
                    key={column.key}
                    type="button"
                    disabled={column.locked}
                    onClick={() => onToggleColumn(column.key)}
                    className="flex w-full items-center justify-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-70"
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
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 ${allSelected ? "bg-muted" : ""}`}
      >
        <SquareCheckBig className="size-4" />
        {allSelected ? "Quitar selección" : "Seleccionar todos"}
      </button>
    );
  }

  return (
    <IconButton onClick={onClick} title={allSelected ? "Quitar selección" : "Seleccionar todo"}>
      <SquareCheckBig className={`size-4 ${allSelected ? "text-foreground" : "text-muted-foreground"}`} />
    </IconButton>
  );
}

function BulkChangesButton({ selectedCount, onClick, mobile = false }) {
  if (selectedCount === 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 ${mobile ? "w-full" : ""}`}
    >
      <SquareCheckBig className="size-4" />
      Cambios masivos
      <span className="rounded-full bg-background/15 px-2 py-0.5 text-xs">{selectedCount}</span>
    </button>
  );
}

function FiltersToolbar({
  section,
  rows,
  columns,
  primaryFilterColumns,
  search,
  setSearch,
  primaryFilters,
  setPrimaryFilter,
  visibleColumns,
  onToggleColumn,
  onOpenAdvancedFilters,
  onToggleSelectAll,
  allVisibleSelected,
  desktopView,
}) {
  const showColumnSelector = desktopView === "table";
  const showSelectAllButton = desktopView === "lanes" || desktopView === "cards";

  return (
    <div className="hidden sm:flex w-full flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex w-full flex-col gap-2 xl:flex-row xl:items-center">
        <div className="relative w-full xl:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder={`Buscar ${section.title.toLowerCase()}`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
          />
        </div>

        <div className="grid w-full grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-2 xl:flex xl:w-auto xl:items-center">
          {primaryFilterColumns.map((column) => (
            <MultiFilterSelect
              key={column.key}
              value={primaryFilters[column.key] || []}
              onChange={(nextValue) => setPrimaryFilter(column.key, nextValue)}
              placeholder={column.label}
              className="min-w-0"
              options={getOptionsForColumn(rows, column.key)}
            />
          ))}

          <AdvancedFiltersButton onClick={onOpenAdvancedFilters} />

          {showColumnSelector && (
            <ColumnSelector compact columns={columns} visibleColumns={visibleColumns} onToggleColumn={onToggleColumn} />
          )}

          {showSelectAllButton && (
            <SelectAllButton allSelected={allVisibleSelected} onClick={onToggleSelectAll} />
          )}
        </div>
      </div>
    </div>
  );
}

function AdvancedFiltersPanel({ columns, rows, advancedFilters, setAdvancedFilters, onClose }) {
  const advancedColumns = columns.filter((column) => column.type !== "actions" && !column.locked);

  const updateFilter = (columnKey, nextValue) => {
    setAdvancedFilters((current) => ({ ...current, [columnKey]: nextValue }));
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
        {advancedColumns.map((column) => (
          <div key={column.key} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[180px_1fr] sm:items-center">
            <span className="text-sm font-medium text-muted-foreground">{column.label}</span>
            <MultiFilterSelect
              value={advancedFilters[column.key] || []}
              onChange={(nextValue) => updateFilter(column.key, nextValue)}
              placeholder={column.label}
              className="min-w-0"
              options={getOptionsForColumn(rows, column.key)}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button type="button" onClick={onClose} className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90">
          Guardar cambios
        </button>
      </div>
    </Card>
  );
}

function BulkChangesPanel({ columns, selectedCount, bulkChanges, setBulkChanges, onClose }) {
  const editableColumns = columns.filter((column) => column.type !== "actions" && !column.locked);

  const updateChange = (columnKey, value) => {
    setBulkChanges((current) => ({ ...current, [columnKey]: value }));
  };

  return (
    <Card className="shadow-none p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Cambios masivos</h2>
          <p className="text-sm text-muted-foreground">
            Editá campos para aplicar cambios a {selectedCount} registro{selectedCount === 1 ? "" : "s"} seleccionado{selectedCount === 1 ? "" : "s"}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {editableColumns.map((column) => (
          <div key={column.key} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[180px_1fr] sm:items-center">
            <span className="text-sm font-medium text-muted-foreground">{column.label}</span>
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
        <button type="button" onClick={onClose} className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90">
          Guardar cambios
        </button>
      </div>
    </Card>
  );
}

function ActionButtons({ item, onView, onDelete, onMarkDone, compact = false, showSelectionButton = false, selected = false, onToggleSelected }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onView(item)} className="hover:bg-muted rounded" title="Ver detalle">
          <Eye className="size-3.5 text-muted-foreground" />
        </button>
        <button type="button" onClick={() => onMarkDone(item)} className="hover:bg-muted rounded" title="Confirmar">
          <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
        </button>
        <button type="button" onClick={() => onDelete(item)} className="hover:bg-muted rounded" title="Eliminar">
          <Trash2 className="size-3.5 text-red-600 dark:text-red-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button type="button" onClick={() => onView(item)} className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted">
        <Eye className="size-3.5" /> Ver
      </button>
      <button type="button" onClick={() => onMarkDone(item)} className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted">
        <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" /> Confirmar
      </button>
      <button type="button" onClick={() => onDelete(item)} className="inline-flex items-center gap-1 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted text-destructive">
        <Trash2 className="size-3.5" /> Eliminar
      </button>
      {showSelectionButton && (
        <button
          type="button"
          onClick={() => onToggleSelected(getRowId(item))}
          className={`inline-flex items-center gap-1 text-xs px-2 py-1 border rounded-md transition-colors ${selected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"}`}
        >
          <SquareCheckBig className="size-3.5" /> Seleccionar
        </button>
      )}
    </div>
  );
}

function DesktopTable({ columns, items, visibleColumns, selectedIds, onToggleSelected, onToggleSelectAll, allVisibleSelected, onView, onDelete, onMarkDone }) {
  const isVisible = (columnKey) => visibleColumns.includes(columnKey);

  return (
    <Card className="shadow-none overflow-hidden block">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left w-8">
                <input type="checkbox" checked={allVisibleSelected} onChange={onToggleSelectAll} className="size-3.5" aria-label="Seleccionar todos" />
              </th>
              {columns.filter((column) => isVisible(column.key)).map((column) => (
                <th key={column.key} className={`px-4 py-3 text-xs font-medium text-muted-foreground ${column.type === "money" || column.type === "actions" ? "text-right" : "text-left"}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const rowId = getRowId(item);
              const selected = selectedIds.includes(rowId);

              return (
                <tr key={rowId} className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${selected ? "bg-muted/40" : ""}`}>
                  <td className="px-4 py-3 align-top">
                    <input type="checkbox" checked={selected} onChange={() => onToggleSelected(rowId)} className="size-3.5" aria-label={`Seleccionar ${rowId}`} />
                  </td>
                  {columns.filter((column) => isVisible(column.key)).map((column) => (
                    <td key={column.key} className={`px-4 py-3 text-xs align-top ${column.type === "money" || column.type === "actions" ? "text-right" : "text-left"}`}>
                      {column.type === "actions" ? (
                        <ActionButtons item={item} compact onView={onView} onDelete={onDelete} onMarkDone={onMarkDone} />
                      ) : column.primary ? (
                        <div>
                          <p className="font-medium text-sm">{renderCell(item, column)}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-sm">{getSecondaryText(item)}</p>
                        </div>
                      ) : (
                        renderCell(item, column)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <span className="text-xs text-muted-foreground">1–{items.length} of {items.length}</span>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="size-4 text-muted-foreground" /></button>
          <button className="p-1 hover:bg-muted rounded"><ChevronRight className="size-4 text-muted-foreground" /></button>
        </div>
      </div>
    </Card>
  );
}

function LanesView({ section, columns, items, selectedIds, onToggleSelected, onView, onDelete, onMarkDone }) {
  const laneField = section.laneField || "estado";
  const lanes = getUniqueValues(items, laneField).map((value) => {
    const laneItems = items.filter((item) => String(item[laneField]) === String(value));
    return { id: value, label: value, count: laneItems.length, items: laneItems };
  });

  return (
    <div className="block">
      <div className="flex items-center justify-end mb-3">
        <span className="text-xs text-muted-foreground">{items.length} registros</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {lanes.map((lane) => (
          <div key={lane.id} className="space-y-3 min-w-0">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-sm font-medium min-w-0">
                <span className="text-muted-foreground">◎</span>
                <span className="truncate">{lane.label}</span>
                <span className="text-muted-foreground font-normal">{lane.count}</span>
              </div>
              <button className="p-1 hover:bg-muted rounded"><Plus className="size-3.5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              {lane.items.map((item) => {
                const rowId = getRowId(item);
                const selected = selectedIds.includes(rowId);
                return (
                  <Card key={rowId} className={`shadow-none p-3 space-y-2 cursor-pointer hover:shadow-sm transition-shadow ${selected ? "bg-muted/40 ring-1 ring-border" : ""}`}>
                    <div className="flex items-start justify-between text-xs text-muted-foreground gap-2">
                      <span>ID: <span className="font-semibold text-foreground text-sm">#{rowId}</span></span>
                      {item.total !== undefined && <span className="text-right">Total <span className="font-semibold text-foreground">{formatMoney(item.total, item.moneda)}</span></span>}
                    </div>
                    <p className="text-xs font-medium leading-tight break-words">{getPrimaryText(item, columns)}</p>
                    <p className="text-xs text-muted-foreground break-words">{getSecondaryText(item)}</p>
                    <div className="flex flex-wrap gap-1"><StatusBadge value={getStatus(item, laneField)} /></div>
                    <ActionButtons item={item} onView={onView} onDelete={onDelete} onMarkDone={onMarkDone} showSelectionButton selected={selected} onToggleSelected={onToggleSelected} />
                  </Card>
                );
              })}
              <button className="w-full text-xs text-muted-foreground flex items-center gap-1.5 hover:text-foreground py-1"><Plus className="size-3.5" /> New</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCards({ section, columns, items, selectedIds, onToggleSelected, onView, onDelete, onMarkDone }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{items.length} registros</span>
      </div>
      {items.map((item) => {
        const rowId = getRowId(item);
        const selected = selectedIds.includes(rowId);
        return (
          <Card key={rowId} className={`shadow-none p-4 hover:shadow-sm transition-shadow cursor-pointer ${selected ? "bg-muted/40 ring-1 ring-border" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">#{rowId}</span>
                  <StatusBadge value={getStatus(item, section.laneField)} />
                </div>
                <p className="text-base font-semibold mt-1 break-words">{getPrimaryText(item, columns)}</p>
                <p className="text-xs text-muted-foreground break-words">{getSecondaryText(item)}</p>
                <div className="mt-3"><ActionButtons item={item} onView={onView} onDelete={onDelete} onMarkDone={onMarkDone} showSelectionButton selected={selected} onToggleSelected={onToggleSelected} /></div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {item.total !== undefined && <span className="text-lg font-bold text-right">{formatMoney(item.total, item.moneda)}</span>}
                <button className="p-1 hover:bg-muted rounded"><MoreHorizontal className="size-4 text-muted-foreground" /></button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default function EntityListPage({ section }) {
  const rows = section.rows || [];
  const columns = section.columns || [];
  const previousIsDesktopRef = useRef(typeof window !== "undefined" ? window.innerWidth >= 1280 : true);
  const userSelectedViewRef = useRef(false);

  const [search, setSearch] = useState("");
  const [desktopView, setDesktopView] = useState(getInitialView);
  const [primaryFilters, setPrimaryFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(section.defaultVisibleColumns || columns.map((column) => column.key));
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const primaryFilterColumns = (section.primaryFilters || []).map((key) => columns.find((column) => column.key === key)).filter(Boolean).slice(0, 3);
  const searchableColumns = columns.filter((column) => column.type !== "actions");

  const setPrimaryFilter = (columnKey, nextValue) => {
    setPrimaryFilters((current) => ({ ...current, [columnKey]: nextValue }));
  };

  const toggleColumn = (columnKey) => {
    const column = columns.find((item) => item.key === columnKey);
    if (column?.locked) return;
    setVisibleColumns((current) => {
      const next = current.includes(columnKey) ? current.filter((key) => key !== columnKey) : [...current, columnKey];
      return columns.map((item) => item.key).filter((key) => next.includes(key));
    });
  };

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedAdvancedFilters = Object.fromEntries(Object.entries(advancedFilters).filter(([, values]) => Array.isArray(values) && values.length > 0));

    return rows.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        searchableColumns.some((column) => String(item[column.key] || "").toLowerCase().includes(normalizedSearch));

      const matchesPrimaryFilters = Object.entries(primaryFilters).every(([columnKey, values]) => !Array.isArray(values) || values.length === 0 || values.includes(String(item[columnKey])));

      const matchesAdvancedFilters = Object.entries(normalizedAdvancedFilters).every(([columnKey, selectedValues]) => selectedValues.includes(String(item[columnKey])));

      return matchesSearch && matchesPrimaryFilters && matchesAdvancedFilters;
    });
  }, [rows, search, searchableColumns, primaryFilters, advancedFilters]);

  const visibleIds = useMemo(() => filtered.map((item) => getRowId(item)), [filtered]);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const toggleSelected = (rowId) => {
    setSelectedIds((current) => current.includes(rowId) ? current.filter((id) => id !== rowId) : [...current, rowId]);
  };

  const toggleSelectAllVisible = () => {
    setSelectedIds((current) => allVisibleSelected ? current.filter((id) => !visibleIds.includes(id)) : Array.from(new Set([...current, ...visibleIds])));
  };

  const handleViewChange = (nextView) => {
    userSelectedViewRef.current = true;
    setDesktopView(nextView);
  };

  const handleView = (item) => console.log("Ver detalle", item);
  const handleDelete = (item) => console.log("Eliminar", item);
  const handleMarkDone = (item) => console.log("Confirmar", item);
  const selectedCount = selectedIds.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{section.title}</h1>
          <p className="text-sm text-muted-foreground">{section.subtitle}</p>
        </div>
        {section.createPath && (
          <Link to={section.createPath} className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 rounded-md text-sm hover:opacity-90">
            <Plus className="size-4" /> Nuevo {section.title.toLowerCase()}
          </Link>
        )}
      </div>

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="hidden sm:flex items-center gap-2"><ViewSwitcher value={desktopView} onChange={handleViewChange} /></div>
          <div className="flex sm:hidden items-center gap-2 w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input placeholder={`Buscar ${section.title.toLowerCase()}...`} value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-base focus:outline-none" />
            </div>
          </div>
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <div className="sm:hidden space-y-2">
          <AdvancedFiltersButton mobile onClick={() => setAdvancedFiltersOpen(true)} />
          <div className={`grid gap-2 ${selectedCount > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
            <SelectAllButton mobile allSelected={allVisibleSelected} onClick={toggleSelectAllVisible} />
            {selectedCount > 0 && <BulkChangesButton mobile selectedCount={selectedCount} onClick={() => setBulkChangesOpen(true)} />}
          </div>
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <FiltersToolbar
          section={section}
          rows={rows}
          columns={columns}
          primaryFilterColumns={primaryFilterColumns}
          search={search}
          setSearch={setSearch}
          primaryFilters={primaryFilters}
          setPrimaryFilter={setPrimaryFilter}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumn}
          onOpenAdvancedFilters={() => setAdvancedFiltersOpen(true)}
          onToggleSelectAll={toggleSelectAllVisible}
          allVisibleSelected={allVisibleSelected}
          desktopView={desktopView}
        />
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && selectedCount > 0 && (
        <div className="hidden sm:block"><BulkChangesButton selectedCount={selectedCount} onClick={() => setBulkChangesOpen(true)} /></div>
      )}

      {advancedFiltersOpen && <AdvancedFiltersPanel columns={columns} rows={rows} advancedFilters={advancedFilters} setAdvancedFilters={setAdvancedFilters} onClose={() => setAdvancedFiltersOpen(false)} />}
      {bulkChangesOpen && <BulkChangesPanel columns={columns} selectedCount={selectedCount} bulkChanges={bulkChanges} setBulkChanges={setBulkChanges} onClose={() => setBulkChangesOpen(false)} />}

      {!advancedFiltersOpen && !bulkChangesOpen && (
        <>
          <div className="hidden sm:block">
            {desktopView === "table" && <DesktopTable columns={columns} items={filtered} visibleColumns={visibleColumns} selectedIds={selectedIds} onToggleSelected={toggleSelected} onToggleSelectAll={toggleSelectAllVisible} allVisibleSelected={allVisibleSelected} onView={handleView} onDelete={handleDelete} onMarkDone={handleMarkDone} />}
            {desktopView === "lanes" && <LanesView section={section} columns={columns} items={filtered} selectedIds={selectedIds} onToggleSelected={toggleSelected} onView={handleView} onDelete={handleDelete} onMarkDone={handleMarkDone} />}
            {desktopView === "cards" && <MobileCards section={section} columns={columns} items={filtered} selectedIds={selectedIds} onToggleSelected={toggleSelected} onView={handleView} onDelete={handleDelete} onMarkDone={handleMarkDone} />}
          </div>
          <div className="sm:hidden"><MobileCards section={section} columns={columns} items={filtered} selectedIds={selectedIds} onToggleSelected={toggleSelected} onView={handleView} onDelete={handleDelete} onMarkDone={handleMarkDone} /></div>
        </>
      )}
    </div>
  );
}
