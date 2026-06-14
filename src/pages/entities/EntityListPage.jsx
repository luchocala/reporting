import { useEntityTable } from "@/hooks/useEntityTable";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Check,
  SlidersHorizontal,
  SquareCheckBig,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
  UserPlus,
  UserCheck,
  X,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import PageBreadcrumb from "@/components/PageBreadcrumb";

const badgeColorStyles = {
  green:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-400/20",
  blue:
    "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20",
  yellow:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-400/20",
  red:
    "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-400/20",
  slate:
    "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20 dark:bg-slate-900/30 dark:text-slate-400 dark:ring-slate-400/20",
};

const rowActionStyles = {
  default:
    "border-border bg-background text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-400/20 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-amber-400/20 dark:bg-amber-900/30 dark:text-amber-400",
  danger:
    "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-400/20 dark:bg-red-900/30 dark:text-red-400",
};

const iconMap = {
  plus: Plus,
  userPlus: UserPlus,
  userCheck: UserCheck,
  refresh: RefreshCw,
  check: Check,
  x: X,
  trash: Trash2,
  pencil: Pencil,
  confirm: CheckCircle2,
};

function getInitialView() {
  if (typeof window === "undefined") return "table";
  return window.innerWidth >= 1280 ? "table" : "lanes";
}

function getAllColumnKeys(columns) {
  return columns.map((column) => column.key);
}

function getRowId(row) {
  return String(row.id || row.orderId || row.key || "");
}

function getPrimaryText(row, columns) {
  const primaryColumn = columns.find((column) => column.primary);
  if (primaryColumn && row[primaryColumn.key]) return String(row[primaryColumn.key]);
  return String(row.nombre || row.name || row.razonSocial || row.descripcion || row.leyenda || getRowId(row));
}

function getSecondaryText(row) {
  return String(row.descripcion || row.leyenda || row.email || row.emails || row.documento || row.username || "");
}

function getStatus(row, laneField = "estado") {
  return String(row[laneField] || row.estado || row.status || "SIN ESTADO");
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

function getDisplayValue(row, column, section) {
  const value = row[column.key];

  if (typeof column.getDisplayValue === "function") {
    return column.getDisplayValue(value, row, section);
  }

  if (typeof column.render === "function") {
    const rendered = column.render(value, row, section);

    if (
      typeof rendered === "string" ||
      typeof rendered === "number" ||
      typeof rendered === "boolean"
    ) {
      return String(rendered);
    }

    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return String(value);
  }

  if (column.lookup) {
    const lookupValue = section.lookupMaps?.[column.key]?.[String(value)];

    if (lookupValue !== null && lookupValue !== undefined && lookupValue !== "") {
      return String(lookupValue);
    }
  }

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

function getRawValue(row, columnKey) {
  const value = row?.[columnKey];

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}


function getOptionsForColumn(items, column, section) {
  if (!column) return [];

  const optionsMap = new Map();

  (items || []).forEach((item) => {
    const rawValue = getRawValue(item, column.key);

    if (rawValue === "") return;

    if (!optionsMap.has(rawValue)) {
      optionsMap.set(rawValue, {
        value: rawValue,
        label: getDisplayValue(item, column, section),
      });
    }
  });

  return Array.from(optionsMap.values()).sort((a, b) =>
    String(a.label).localeCompare(String(b.label), "es", {
      sensitivity: "base",
      numeric: true,
    })
  );
}

function getUniqueColumnValues(rows, key) {
  return Array.from(
    new Set(
      (rows || [])
        .map((row) => row?.[key])
        .filter((value) => value !== null && value !== undefined && value !== "")
        .map(String)
    )
  );
}

function getOptionsFromSection(section, column) {
  if (!column) return [];

  if (column.lookup) {
    const lookupMap = section.lookupMaps?.[column.key] || {};

    return Object.entries(lookupMap).map(([value, label]) => ({
      value: String(value),
      label: String(label),
    }));
  }

  if (Array.isArray(column.formOptions)) {
    return column.formOptions.map((option) =>
      typeof option === "string"
        ? { value: option, label: option }
        : {
            value: String(option.value),
            label: String(option.label ?? option.value),
          }
    );
  }

  if (Array.isArray(column.options)) {
    return column.options.map((option) =>
      typeof option === "string"
        ? { value: option, label: option }
        : {
            value: String(option.value),
            label: String(option.label ?? option.value),
          }
    );
  }

  const sectionFormOptions = section.formOptions?.[column.key];

  if (Array.isArray(sectionFormOptions)) {
    return sectionFormOptions.map((option) =>
      typeof option === "string"
        ? { value: option, label: option }
        : {
            value: String(option.value),
            label: String(option.label ?? option.value),
          }
    );
  }

  const badgeOptions = section.badgeStyles?.[column.key];

  if (badgeOptions && typeof badgeOptions === "object") {
    return Object.keys(badgeOptions).map((value) => ({
      value: String(value),
      label: String(value),
    }));
  }

  const rowValues = getUniqueColumnValues(section.rows || [], column.key);

  if (
    column.type === "status" ||
    column.type === "badge" ||
    column.formType === "select" ||
    column.formType === "combobox"
  ) {
    return rowValues.map((value) => ({
      value: String(value),
      label: String(value),
    }));
  }

  return [];
}

function compareValues(a, b, type = "text") {
  if (type === "date") {
    const dateA = parseDate(a);
    const dateB = parseDate(b);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA.getTime() - dateB.getTime();
  }

  if (type === "number") {
    const numberA = Number(a);
    const numberB = Number(b);

    if (Number.isNaN(numberA) && Number.isNaN(numberB)) return 0;
    if (Number.isNaN(numberA)) return 1;
    if (Number.isNaN(numberB)) return -1;

    return numberA - numberB;
  }

  return String(a ?? "").localeCompare(String(b ?? ""), "es", {
    sensitivity: "base",
    numeric: true,
  });
}

function sortRows(rows, sortConfig = [], columns = [], section) {
  if (!Array.isArray(sortConfig) || sortConfig.length === 0) {
    return rows;
  }

  return [...rows].sort((rowA, rowB) => {
    for (const sortRule of sortConfig) {
      const column = columns.find((item) => item.key === sortRule.key);

      if (!column) continue;

      const valueA = sortRule.useDisplayValue
        ? getDisplayValue(rowA, column, section)
        : rowA?.[sortRule.key];

      const valueB = sortRule.useDisplayValue
        ? getDisplayValue(rowB, column, section)
        : rowB?.[sortRule.key];

      const result = compareValues(valueA, valueB, sortRule.type);

      if (result !== 0) {
        return sortRule.direction === "desc" ? -result : result;
      }
    }

    return 0;
  });
}

function formatDateForInput(value) {
  const date = parseDate(value);

  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateForStorage(value) {
  if (!value) return null;

  const [year, month, day] = String(value).split("-").map(Number);

  if (!year || !month || !day) {
    return value;
  }

  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return Math.floor(date.getTime() / 1000);
}

function parseDate(value) {
  if (!value) return null;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "number" || /^\d+$/.test(String(value))) {
    const numberValue = Number(value);
    const milliseconds = numberValue < 10000000000 ? numberValue * 1000 : numberValue;
    const parsed = new Date(milliseconds);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const stringValue = String(value);

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(stringValue)) {
    const [day, month, year] = stringValue.split("/").map(Number);
    return new Date(year, month - 1, day);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
    const [year, month, day] = stringValue.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(stringValue);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getCurrentMonthRange() {
  const today = new Date();
  return {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  };
}

function getPreviousMonthRange() {
  const today = new Date();
  return {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };
}

function getBeforePreviousMonthRange() {
  const today = new Date();

  return {
    start: new Date(0),
    end: new Date(today.getFullYear(), today.getMonth() - 1, 0),
  };
}

function normalizeDate(date) {
  if (!date) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isDateInRange(date, range) {
  const normalizedDate = normalizeDate(date);
  const normalizedStart = normalizeDate(range?.start);
  const normalizedEnd = normalizeDate(range?.end);

  if (!normalizedDate || !normalizedStart || !normalizedEnd) return false;

  return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
}

function getDateRangeFromFilterValue(value, customRange) {
  if (value === "currentMonth") return getCurrentMonthRange();
  if (value === "previousMonth") return getPreviousMonthRange();
  if (value === "beforePreviousMonth") return getBeforePreviousMonthRange();

  if (value === "custom" && customRange?.from && customRange?.to) {
    return {
      start: parseDate(customRange.from),
      end: parseDate(customRange.to),
    };
  }

  return null;
}

function renderCell(row, column, section) {
  const value = row[column.key];

  if (column.type === "actions") {
    return null;  
  }

  if (typeof column.render === "function") {
    return column.render(value, row, section);
  }

  if (column.type === "status" || column.type === "badge") {
    return (
      <StatusBadge
        value={getDisplayValue(row, column, section)}
        columnKey={column.key}
        section={section}
      />
    );
  }

  return getDisplayValue(row, column, section);
}

function StatusBadge({ value, columnKey = "estado", section }) {
  const normalized = String(value || "SIN ESTADO");
  const configuredColor = section?.badgeStyles?.[columnKey]?.[normalized];
  const className = badgeColorStyles[configuredColor] || badgeColorStyles.slate;

  return (
    <span
      className={`inline-block max-w-full rounded-md px-2 py-1 text-[10px] font-medium leading-tight whitespace-normal break-words text-center ${className}`}
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

function ChevronRightIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 shrink-0 text-muted-foreground transition-transform ${
        open ? "rotate-90" : ""
      }`}
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

function MultiFilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  customDateRange,
  onCustomDateRangeChange,
  resetKey,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [resetKey]);

  const selectedValues = Array.isArray(value) ? value.map(String) : [];
  const allOptionValues = options.map((option) => String(option.value));
  const selectableOptionValues = allOptionValues.filter((optionValue) => optionValue !== "custom");
  const allSelected =
    selectableOptionValues.length > 0 &&
    selectableOptionValues.every((optionValue) => selectedValues.includes(optionValue));

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
      onChange(allSelected ? [] : selectableOptionValues);
      return;
    }

    if (normalized === "custom") {
      onChange(selectedValues.includes("custom") ? [] : ["custom"]);
      return;
    }

    const valuesWithoutCustom = selectedValues.filter((item) => item !== "custom");

    if (valuesWithoutCustom.includes(normalized)) {
      onChange(valuesWithoutCustom.filter((item) => item !== normalized));
      return;
    }

    onChange([...valuesWithoutCustom, normalized]);
  };

  const isActive = (optionValue) => {
    const normalized = String(optionValue);
    if (normalized === "all") return allSelected;
    return selectedValues.includes(normalized);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-10 w-full min-w-[160px] items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 xl:w-[180px]"
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

function IconButton({ onClick, title, children, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
      title={title}
    >
      {children}
    </button>
  );
}

function AdvancedFiltersButton({ onClick, mobile = false, showLabel = false }) {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
      >
        <SlidersHorizontal className="size-4" />
        +Filtros
      </button>
    );
  }

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
        title="+Filtros"
      >
        <SlidersHorizontal className="size-4 shrink-0" />
        <span>+Filtros</span>
      </button>
    );
  }

  return (
    <IconButton onClick={onClick} title="+Filtros">
      <SlidersHorizontal className="size-4" />
    </IconButton>
  );
}

function ColumnSelector({ columns, visibleColumns, onToggleColumn, compact = false, resetKey }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [resetKey]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={
          compact
            ? "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-input bg-background shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
            : "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-semibold shadow-sm transition-colors hover:bg-muted/40 focus:outline-none focus:ring-1 focus:ring-ring/30"
        }
        title="Columnas"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0"
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
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 ${
        mobile ? "w-full" : ""
      }`}
    >
      <SquareCheckBig className="size-4" />
      Cambios masivos
      <span className="rounded-full bg-background/15 px-2 py-0.5 text-xs">{selectedCount}</span>
    </button>
  );
}

function getConfiguredPrimaryFilters(section, columns) {
  return (section.primaryFilters || [])
    .map((filter) => {
      if (typeof filter === "string") {
        const column = columns.find((item) => item.key === filter);
        if (!column) return null;
        return {
          key: column.key,
          label: column.label,
          type: "select",
        };
      }

      return filter;
    })
    .filter(Boolean)
    .slice(0, 3);
}

function getFilterOptions(filter, rows, columns, section) {
  if (filter.options) return filter.options;

  const column = columns.find((item) => item.key === filter.key);

  return getOptionsForColumn(rows, column, section);
}

function FiltersToolbar({
  section,
  sectionKey,
  rows,
  columns,
  configuredPrimaryFilters,
  search,
  setSearch,
  primaryFilters,
  setPrimaryFilter,
  dateRangeFilters,
  setDateRangeFilter,
  visibleColumns,
  onToggleColumn,
  onOpenAdvancedFilters,
  onToggleSelectAll,
  allVisibleSelected,
  desktopView,
}) {
  const showSelectAllButton = desktopView === "lanes" || desktopView === "cards";

  return (
    <div className="hidden sm:flex w-full flex-col gap-2 xl:flex-row xl:items-center">
      <div className="flex w-full flex-col gap-2 xl:flex-row xl:items-center">
        <div className="relative w-full xl:min-w-[280px] xl:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            placeholder={`Buscar ${section.title.toLowerCase()}`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
          />
        </div>

        <div className="grid w-full grid-cols-3 gap-2 xl:flex xl:w-auto xl:shrink-0 xl:items-center">
          {configuredPrimaryFilters.map((filter) => (
            <MultiFilterSelect
              key={`${sectionKey}-${filter.key}`}
              value={primaryFilters[filter.key] || []}
              onChange={(nextValue) => setPrimaryFilter(filter.key, nextValue)}
              placeholder={filter.label}
              className="min-w-0"
              options={getFilterOptions(filter, rows, columns, section)}
              resetKey={sectionKey}
              customDateRange={dateRangeFilters[filter.key]}
              onCustomDateRangeChange={
                filter.type === "dateRange"
                  ? (nextRange) => setDateRangeFilter(filter.key, nextRange)
                  : undefined
              }
            />
          ))}

          <div className="col-span-3 flex flex-wrap items-center gap-2 xl:col-span-1 xl:flex-nowrap">
            <AdvancedFiltersButton onClick={onOpenAdvancedFilters} showLabel />

            <ColumnSelector
              columns={columns}
              visibleColumns={visibleColumns}
              onToggleColumn={onToggleColumn}
              resetKey={sectionKey}
            />

            {showSelectAllButton && (
              <SelectAllButton allSelected={allVisibleSelected} onClick={onToggleSelectAll} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getEditableColumns(columns) {
  return columns.filter(
    (column) =>
      column.type !== "actions" &&
      column.key !== "acciones" &&
      !column.virtual &&
      !column.locked &&
      !column.autoGenerated &&
      column.editable !== false
  );
}

function getEditInputValue(row, column) {
  const value = row?.[column.key];

  if (value === null || value === undefined) {
    return "";
  }

  const fieldType = getBulkFieldType(column);

  if (fieldType === "date") {
    return formatDateForInput(value);
  }

  return String(value);
}

function normalizeEditableValue(column, value, { emptyAsNull = true } = {}) {
  if (value === "") {
    return emptyAsNull ? null : "";
  }

  const fieldType = getBulkFieldType(column);

  if (column.lookup) {
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? value : numericValue;
  }

  if (fieldType === "date") {
    return parseDateForStorage(value);
  }

  if (fieldType === "number") {
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? value : numericValue;
  }

  return value;
}

function getBulkFieldType(column) {
  if (column.bulkType) return column.bulkType;
  if (column.formType) return column.formType;

  if (column.lookup) return "select";

  if (column.type === "date") return "date";
  if (column.type === "number" || column.type === "money") return "number";
  if (column.type === "status" || column.type === "badge") return "select";

  return "text";
}

function BulkFieldInput({ section, column, rows, value, onChange, mode = "bulk" }) {
  const fieldType = getBulkFieldType(column);
const sectionOptions = getOptionsFromSection(section, column);

const options =
  sectionOptions.length > 0
    ? sectionOptions
    : getOptionsForColumn(rows, column, section);

  if (column.locked || column.autoGenerated || column.key === "id" || column.key === "orderId") {
    return (
      <input
        disabled
        value="Automático / no editable"
        className="h-10 w-full cursor-not-allowed rounded-xl border border-input bg-muted/40 px-4 text-sm text-muted-foreground shadow-sm"
      />
    );
  }

  if (fieldType === "select") {
    return (
      <select
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring/30"
      >
        <option value="">
  {mode === "single" ? "Sin valor" : "Sin cambios"}
</option>
        {options.map((option) => {
          const normalizedOption = typeof option === "string" ? { value: option, label: option } : option;

          return (
            <option key={String(normalizedOption.value)} value={normalizedOption.value}>
              {normalizedOption.label}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <input
      type={fieldType === "date" ? "date" : fieldType === "number" ? "number" : "text"}
      value={value || ""}
      step={fieldType === "number" ? "any" : undefined}
      onChange={(event) => onChange(event.target.value)}
      placeholder={`Nuevo valor para ${column.label}`}
      className="h-10 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring/30"
    />
  );
}

function AdvancedFiltersPanel({
  section,
  columns,
  rows,
  advancedFilters,
  setAdvancedFilters,
  onClose,
  resetKey,
}) {
  const advancedColumns = columns.filter((column) => column.type !== "actions" && !column.locked);

  const updateFilter = (columnKey, nextValue) => {
    setAdvancedFilters((current) => ({ ...current, [columnKey]: nextValue }));
  };

  return (
    <Card className="shadow-none p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-semibold">Filtros Avanzados</h2>
          <p className="text-sm text-muted-foreground">
            Ajustá los filtros por columna y guardá los cambios para volver a la vista normal.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {advancedColumns.map((column) => (
          <div key={column.key} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[160px_1fr] sm:items-center">
            <span className="text-sm font-medium text-muted-foreground">{column.label}</span>
            <MultiFilterSelect
              value={advancedFilters[column.key] || []}
              onChange={(nextValue) => updateFilter(column.key, nextValue)}
              placeholder={column.label}
              className="min-w-0"
              options={getOptionsForColumn(rows, column, section)}
              resetKey={resetKey}
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

function ChangesPanel({
  title,
  description,
  section,
  columns,
  rows,
  changes,
  setChanges,
  onClose,
  onSave,
  saveLabel = "Guardar cambios",
  mode = "bulk",
}) {
  const editableColumns = columns.filter(
  (column) =>
    column.type !== "actions" &&
    column.key !== "acciones" &&
    !column.virtual &&
    !column.locked &&
    !column.autoGenerated
);

  const updateChange = (columnKey, value) => {
    setChanges((current) => ({ ...current, [columnKey]: value }));
  };

  return (
    <Card className="shadow-none p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {editableColumns.map((column) => (
          <div key={column.key} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[180px_1fr] sm:items-center">
            <span className="text-sm font-medium text-muted-foreground">{column.label}</span>
<BulkFieldInput
  section={section}
  column={column}
  rows={rows}
  value={changes[column.key] || ""}
  onChange={(nextValue) => updateChange(column.key, nextValue)}
  mode={mode}
/>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {saveLabel}
        </button>
      </div>
    </Card>
  );
}

function BulkChangesPanel({
  section,
  columns,
  rows,
  selectedCount,
  bulkChanges,
  setBulkChanges,
  onClose,
  onSave,
}) {
  return (
    <ChangesPanel
      title="Cambios masivos"
      description={`Editá campos para aplicar cambios a ${selectedCount} registro${
        selectedCount === 1 ? "" : "s"
      } seleccionado${selectedCount === 1 ? "" : "s"}.`}
      section={section}
      columns={columns}
      rows={rows}
      changes={bulkChanges}
      setChanges={setBulkChanges}
      onClose={onClose}
      onSave={onSave}
      saveLabel="Guardar cambios"
      mode="bulk"
    />
  );
}

function SingleChangesPanel({
  section,
  columns,
  rows,
  item,
  changes,
  setChanges,
  onClose,
  onSave,
}) {
  return (
    <ChangesPanel
      title="Editar registro"
      description={`Editá uno o más campos del registro #${getRowId(item)}.`}
      section={section}
      columns={columns}
      rows={rows}
      changes={changes}
      setChanges={setChanges}
      onClose={onClose}
      onSave={onSave}
      saveLabel="Guardar cambios"
      mode="single"
    />
  );
}

function CustomRowActions({
  item,
  section,
  compact = false,
  selected = false,
  onToggleSelected,
  showSelectionButton = false,
}) {
  const actions = section.rowActions || [];

  return (
    <div className={compact ? "flex items-center gap-1.5 justify-end" : "flex flex-wrap items-center gap-1.5"}>
      {actions.map((action) => {
        if (typeof action.visible === "function" && !action.visible(item)) return null;

        const disabled =
          typeof action.disabled === "function" ? action.disabled(item) : Boolean(action.disabled);
        const loading =
          typeof action.loading === "function" ? action.loading(item) : Boolean(action.loading);

        const Icon = loading ? Loader2 : iconMap[action.icon] || MoreHorizontal;
        const variant = action.variant || "default";

        return (
          <button
            key={action.key}
            type="button"
            onClick={() => action.onClick?.(item)}
            disabled={disabled || loading}
            title={action.title || action.label}
            className={`inline-flex items-center justify-center rounded-md border transition-colors ${
              compact ? "size-8" : "gap-1.5 px-2 py-1 text-xs"
            } ${rowActionStyles[variant] || rowActionStyles.default}`}
          >
            <Icon className={`size-4 ${loading ? "animate-spin" : ""}`} />
            {!compact && action.label && <span>{action.label}</span>}
          </button>
        );
      })}

      {showSelectionButton && (
        <button
          type="button"
          onClick={() => onToggleSelected(getRowId(item))}
          className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 border rounded-md transition-colors ${
            selected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
          }`}
        >
          <SquareCheckBig className="size-4" /> Seleccionar
        </button>
      )}
    </div>
  );
}

function ActionButtons({
  item,
  section,
  onView,
  onDelete,
  onMarkDone,
  compact = false,
  showSelectionButton = false,
  selected = false,
  onToggleSelected,
}) {
  if (section.rowActions?.length > 0) {
    return (
      <CustomRowActions
        item={item}
        section={section}
        compact={compact}
        showSelectionButton={showSelectionButton}
        selected={selected}
        onToggleSelected={onToggleSelected}
      />
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 justify-end">
        <button
          type="button"
          onClick={() => onView(item)}
          className="p-1 hover:bg-muted rounded"
          title="Editar"
        >
          <Pencil className="size-4 text-muted-foreground" />
        </button>

        <button
          type="button"
          onClick={() => onMarkDone(item)}
          className="p-1 hover:bg-muted rounded"
          title="Confirmar"
        >
          <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(item)}
          className="p-1 hover:bg-muted rounded"
          title="Eliminar"
        >
          <Trash2 className="size-4 text-red-600 dark:text-red-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={() => onView(item)}
        className="inline-flex items-center gap-1.5 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted"
      >
        <Pencil className="size-4" /> Editar
      </button>

      <button
        type="button"
        onClick={() => onMarkDone(item)}
        className="inline-flex items-center gap-1.5 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted"
      >
        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" /> Confirmar
      </button>

      <button
        type="button"
        onClick={() => onDelete(item)}
        className="inline-flex items-center gap-1.5 text-xs px-2 py-1 border border-border rounded-md hover:bg-muted text-destructive"
      >
        <Trash2 className="size-4" /> Eliminar
      </button>

      {showSelectionButton && (
        <button
          type="button"
          onClick={() => onToggleSelected(getRowId(item))}
          className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 border rounded-md transition-colors ${
            selected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
          }`}
        >
          <SquareCheckBig className="size-4" /> Seleccionar
        </button>
      )}
    </div>
  );
}

function RecordsCount({ count }) {
  return (
    <div className="flex items-center justify-start mb-3">
      <span className="text-sm text-muted-foreground">
        {count} registro{count === 1 ? "" : "s"}
      </span>
    </div>
  );
}

function TableLoadingState({ columns }) {
  return (
    <tr>
      <td
        colSpan={Math.max(columns.length + 1, 2)}
        className="px-4 py-8 text-center text-sm text-muted-foreground"
      >
        Cargando registros...
      </td>
    </tr>
  );
}

function TableEmptyState({ columns, message }) {
  return (
    <tr>
      <td
        colSpan={Math.max(columns.length + 1, 2)}
        className="px-4 py-8 text-center text-sm text-muted-foreground"
      >
        {message}
      </td>
    </tr>
  );
}

function DesktopTable({
  section,
  columns,
  items,
  visibleColumns,
  selectedIds,
  onToggleSelected,
  onToggleSelectAll,
  allVisibleSelected,
  onView,
  onDelete,
  onMarkDone,
}) {
  const isVisible = (columnKey) => visibleColumns.includes(columnKey);
  const isLoading = Boolean(section.loading);
  const emptyMessage = section.emptyMessage || "No hay registros para mostrar.";

  return (
    <div>
      <RecordsCount count={items.length} />

      <Card className="shadow-none overflow-hidden block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left w-8">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={onToggleSelectAll}
                    disabled={isLoading || items.length === 0}
                    className="size-3.5"
                    aria-label="Seleccionar todos"
                  />
                </th>
                {columns.filter((column) => isVisible(column.key)).map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-xs font-medium text-muted-foreground ${
column.type === "actions" ? "text-right" : "text-left"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading && <TableLoadingState columns={columns} />}

              {!isLoading && items.length === 0 && (
                <TableEmptyState columns={columns} message={emptyMessage} />
              )}

              {!isLoading &&
                items.map((item) => {
                  const rowId = getRowId(item);
                  const selected = selectedIds.includes(rowId);

                  return (
                    <tr
                      key={rowId}
                      className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${
                        selected ? "bg-muted/40" : ""
                      }`}
                    >
                      <td className="px-4 py-3 align-top">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => onToggleSelected(rowId)}
                          className="size-3.5"
                          aria-label={`Seleccionar ${rowId}`}
                        />
                      </td> 

                      {columns.filter((column) => isVisible(column.key)).map((column) => (
                        <td
                          key={column.key}
                          className={`px-4 py-3 text-xs align-top ${
column.type === "actions" ? "text-right" : "text-left"
                          }`}
                        >
{column.type === "actions" || column.key === "acciones" ? (
  <ActionButtons
    item={item}
    section={section}
    compact
    onView={onView}
    onDelete={onDelete}
    onMarkDone={onMarkDone}
  />
) : column.cellLayout === "stacked" ? (
                            <div>
                              <p className="font-medium text-xs">{renderCell(item, column, section)}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-sm">{getSecondaryText(item)}</p>
                            </div>
                          ) : (
                            renderCell(item, column, section)
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
    </div>
  );
}

function LanesView({ section, columns, items, selectedIds, onToggleSelected, onView, onDelete, onMarkDone }) {
  const laneField = section.laneField || "estado";
  const lanes = getUniqueValues(items, laneField).map((value) => {
    const laneItems = items.filter((item) => String(item[laneField]) === String(value));
    return { id: value, label: value, count: laneItems.length, items: laneItems };
  });

  if (section.loading) {
    return (
      <Card className="shadow-none p-8 text-center text-sm text-muted-foreground">
        Cargando registros...
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="shadow-none p-8 text-center text-sm text-muted-foreground">
        {section.emptyMessage || "No hay registros para mostrar."}
      </Card>
    );
  }

  return (
    <div className="block">
      <RecordsCount count={items.length} />

      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
        {lanes.map((lane) => (
          <div key={lane.id} className="space-y-3 min-w-0">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5 text-sm font-medium min-w-0">
                <span className="text-muted-foreground">◎</span>
                <span className="truncate">{lane.label}</span>
                <span className="text-muted-foreground font-normal">{lane.count}</span>
              </div>
            </div>

            <div className="space-y-3">
              {lane.items.map((item) => {
                const rowId = getRowId(item);
                const selected = selectedIds.includes(rowId);

                return (
                  <Card
                    key={rowId}
                    className={`shadow-none p-3 space-y-2 cursor-pointer hover:shadow-sm transition-shadow ${
                      selected ? "bg-muted/40 ring-1 ring-border" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between text-xs text-muted-foreground gap-2">
                      <span>
                        ID: <span className="font-semibold text-foreground text-sm">#{rowId}</span>
                      </span>
{item.importeTotal !== undefined && (
  <span className="text-right">
    Total{" "}
    <span className="font-semibold text-foreground">
      {String(item.importeTotal)}
    </span>
  </span>
)}
{item.total !== undefined && item.importeTotal === undefined && (
  <span className="text-right">
    Total{" "}
    <span className="font-semibold text-foreground">
      {String(item.total)}
    </span>
  </span>
)}
                    </div>

                    <p className="text-xs font-medium leading-tight break-words">
                      {getPrimaryText(item, columns)}
                    </p>
                    <p className="text-xs text-muted-foreground break-words">
                      {getSecondaryText(item)}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      <StatusBadge value={getStatus(item, laneField)} columnKey={laneField} section={section} />
                    </div>

                    <ActionButtons
                      item={item}
                      section={section}
                      onView={onView}
                      onDelete={onDelete}
                      onMarkDone={onMarkDone}
                      showSelectionButton
                      selected={selected}
                      onToggleSelected={onToggleSelected}
                    />
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCards({ section, columns, items, selectedIds, onToggleSelected, onView, onDelete, onMarkDone }) {
  if (section.loading) {
    return (
      <Card className="shadow-none p-8 text-center text-sm text-muted-foreground">
        Cargando registros...
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="shadow-none p-8 text-center text-sm text-muted-foreground">
        {section.emptyMessage || "No hay registros para mostrar."}
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <RecordsCount count={items.length} />

      {items.map((item) => {
        const rowId = getRowId(item);
        const selected = selectedIds.includes(rowId);

        return (
          <Card
            key={rowId}
            className={`shadow-none p-4 hover:shadow-sm transition-shadow cursor-pointer ${
              selected ? "bg-muted/40 ring-1 ring-border" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">#{rowId}</span>
                  <StatusBadge value={getStatus(item, section.laneField)} columnKey={section.laneField} section={section} />
                </div>

                <p className="text-base font-semibold mt-1 break-words">{getPrimaryText(item, columns)}</p>
                <p className="text-xs text-muted-foreground break-words">{getSecondaryText(item)}</p>

                <div className="mt-3">
                  <ActionButtons
                    item={item}
                    section={section}
                    onView={onView}
                    onDelete={onDelete}
                    onMarkDone={onMarkDone}
                    showSelectionButton
                    selected={selected}
                    onToggleSelected={onToggleSelected}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
{item.importeTotal !== undefined && (
  <span className="text-lg font-bold text-right">{String(item.importeTotal)}</span>
)}
{item.total !== undefined && item.importeTotal === undefined && (
  <span className="text-lg font-bold text-right">{String(item.total)}</span>
)}
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

function StatsCards({ cards }) {
  if (!Array.isArray(cards) || cards.length === 0) return null;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card
          key={card.key || card.label}
          className="shadow-none border border-border rounded-lg p-4 bg-card flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">{card.icon || "◈"}</span>
              <span className="text-sm">{card.label}</span>
            </div>
            {card.info !== false && <span className="text-muted-foreground text-xs">ℹ</span>}
          </div>
          <p className="text-2xl font-bold">{card.value}</p>
          {card.sub && <p className="text-xs text-muted-foreground">{card.sub}</p>}
        </Card>
      ))}
    </div>
  );
}

function HeaderActionButton({ action }) {
  const Icon = iconMap[action.icon] || Plus;
  const variant = action.variant || "secondary";

  const className =
    variant === "primary"
      ? "inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-foreground px-2.5 text-sm text-background transition-opacity hover:opacity-90 xl:px-3"
      : "inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3";

  const content = (
    <>
      <Icon className="size-4" />
      <span className="hidden xl:inline">{action.label}</span>
    </>
  );

  if (action.path) {
    return (
      <Link to={action.path} className={className} title={action.label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={className} title={action.label}>
      {content}
    </button>
  );
}

export default function EntityListPage({ section }) {
  const { section: runtimeSection, extraContent } = useEntityTable(section);

  const currentSection = runtimeSection || section;
  const rows = currentSection.rows || [];
  const columns = currentSection.columns || [];
  const columnKeysSignature = columns.map((column) => column.key).join("|");

  const previousIsDesktopRef = useRef(typeof window !== "undefined" ? window.innerWidth >= 1280 : true);
  const previousSectionKeyRef = useRef(currentSection.key);
  const userSelectedViewRef = useRef(false);

  const [search, setSearch] = useState("");
  const [desktopView, setDesktopView] = useState(getInitialView);
  const [primaryFilters, setPrimaryFilters] = useState({});
  const [dateRangeFilters, setDateRangeFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState(() => getAllColumnKeys(currentSection.columns || []));
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [bulkChangesOpen, setBulkChangesOpen] = useState(false);
  const [bulkChanges, setBulkChanges] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
const [singleChanges, setSingleChanges] = useState({});
  const [refreshing, setRefreshing] = useState(false);

 useEffect(() => {
  if (previousSectionKeyRef.current === currentSection.key) {
    return;
  }

  previousSectionKeyRef.current = currentSection.key;

  setSearch("");
  setPrimaryFilters({});
  setDateRangeFilters({});
  setAdvancedFilters({});
  setBulkChanges({});
  setSelectedIds([]);
  setAdvancedFiltersOpen(false);
  setBulkChangesOpen(false);
  setEditingRow(null);
setSingleChanges({});
  setVisibleColumns(getAllColumnKeys(columns));
}, [currentSection.key, columnKeysSignature]);

useEffect(() => {
  if (columns.length === 0) {
    return;
  }

  setVisibleColumns((current) => {
    const allColumnKeys = getAllColumnKeys(columns);

    const currentValidColumns = current.filter((columnKey) =>
      allColumnKeys.includes(columnKey)
    );

    const missingColumns = allColumnKeys.filter(
      (columnKey) => !currentValidColumns.includes(columnKey)
    );

    return [...currentValidColumns, ...missingColumns];
  });
}, [columnKeysSignature, columns]);

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

  const configuredPrimaryFilters = getConfiguredPrimaryFilters(currentSection, columns);
  const searchableColumns = columns.filter((column) => column.type !== "actions");

  const setPrimaryFilter = (filterKey, nextValue) => {
    setPrimaryFilters((current) => ({ ...current, [filterKey]: nextValue }));
  };

  const setDateRangeFilter = (filterKey, nextRange) => {
    setDateRangeFilters((current) => ({ ...current, [filterKey]: nextRange }));
  };

  const toggleColumn = (columnKey) => {
    const column = columns.find((item) => item.key === columnKey);
    if (column?.locked) return;

    setVisibleColumns((current) => {
      const next = current.includes(columnKey)
        ? current.filter((key) => key !== columnKey)
        : [...current, columnKey];

      return getAllColumnKeys(columns).filter((key) => next.includes(key));
    });
  };

  const normalizedSearch = search.trim().toLowerCase();

  const normalizedAdvancedFilters = Object.fromEntries(
    Object.entries(advancedFilters).filter(([, values]) => Array.isArray(values) && values.length > 0)
  );

  const filteredRows = rows.filter((item) => {
  const matchesSearch =
    !normalizedSearch ||
    searchableColumns.some((column) =>
      getDisplayValue(item, column, currentSection)
        .toLowerCase()
        .includes(normalizedSearch)
    );

  const matchesPrimaryFilters = configuredPrimaryFilters.every((filter) => {
    const values = primaryFilters[filter.key];

    if (!Array.isArray(values) || values.length === 0) return true;

if (filter.type === "dateRange") {
  const selectableOptions = (filter.options || [])
    .map((option) => String(option.value))
    .filter((value) => value !== "custom");

  const allDateOptionsSelected =
    selectableOptions.length > 0 &&
    selectableOptions.every((optionValue) => values.includes(optionValue));

  if (allDateOptionsSelected) {
    return true;
  }

  const itemDate = parseDate(item[filter.sourceKey || filter.key]);
  if (!itemDate) return false;

  const ranges = values
    .map((value) => getDateRangeFromFilterValue(value, dateRangeFilters[filter.key]))
    .filter(Boolean);

  if (ranges.length === 0) return true;

  return ranges.some((range) => isDateInRange(itemDate, range));
}

    return values.includes(getRawValue(item, filter.key));
  });

  const matchesAdvancedFilters = Object.entries(normalizedAdvancedFilters).every(
    ([columnKey, selectedValues]) =>
      selectedValues.includes(getRawValue(item, columnKey))
  );

  return matchesSearch && matchesPrimaryFilters && matchesAdvancedFilters;
});

const filtered = sortRows(
  filteredRows,
  currentSection.defaultSort,
  columns,
  currentSection
);

  const visibleIds = filtered.map((item) => getRowId(item));
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const toggleSelected = (rowId) => {
    setSelectedIds((current) =>
      current.includes(rowId)
        ? current.filter((id) => id !== rowId)
        : [...current, rowId]
    );
  };

  const toggleSelectAllVisible = () => {
    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleIds.includes(id))
        : Array.from(new Set([...current, ...visibleIds]))
    );
  };

  const handleViewChange = (nextView) => {
    userSelectedViewRef.current = true;
    setDesktopView(nextView);
  };

const handleView = (item) => {
  if (typeof currentSection.onView === "function") {
    currentSection.onView(item);
    return;
  }

const initialChanges = Object.fromEntries(
  getEditableColumns(columns).map((column) => [
    column.key,
    getEditInputValue(item, column),
  ])
);

  setEditingRow(item);
  setSingleChanges(initialChanges);
  setAdvancedFiltersOpen(false);
  setBulkChangesOpen(false);
};

const handleDelete = async (item) => {
  if (typeof currentSection.onDelete === "function") {
    await currentSection.onDelete(item);
    return;
  }

  console.log("Eliminar", item);
};

const handleMarkDone = async (item) => {
  if (typeof currentSection.onMarkDone === "function") {
    await currentSection.onMarkDone(item);
    return;
  }

  console.log("Confirmar", item);
};

  const handleRefresh = async () => {
    setRefreshing(true);

    setSearch("");
    setPrimaryFilters({});
    setDateRangeFilters({});
    setAdvancedFilters({});
    setBulkChanges({});
    setSelectedIds([]);
    setAdvancedFiltersOpen(false);
    setBulkChangesOpen(false);
    setEditingRow(null);
setSingleChanges({});
    setVisibleColumns(getAllColumnKeys(currentSection.columns || []));

    try {
      if (typeof currentSection.onRefresh === "function") {
        await currentSection.onRefresh();
      }
    } finally {
      window.setTimeout(() => {
        setRefreshing(false);
      }, 450);
    }
  };

  const selectedCount = selectedIds.length;
  const headerActions = Array.isArray(currentSection.headerActions) ? currentSection.headerActions : [];

const handleSaveSingleChanges = async () => {
  if (!editingRow) return;

  const editableColumns = getEditableColumns(columns);
  const columnMap = new Map(editableColumns.map((column) => [column.key, column]));

  const payload = Object.fromEntries(
    Object.entries(singleChanges)
      .filter(([key]) => columnMap.has(key))
      .map(([key, value]) => {
        const column = columnMap.get(key);
        return [key, normalizeEditableValue(column, value, { emptyAsNull: true })];
      })
  );

  if (typeof currentSection.onUpdate === "function") {
    await currentSection.onUpdate(editingRow, payload);
  }

  setEditingRow(null);
  setSingleChanges({});
};

  const handleSaveBulkChanges = async () => {
  const editableColumns = getEditableColumns(columns);
  const columnMap = new Map(editableColumns.map((column) => [column.key, column]));

  const payload = Object.fromEntries(
    Object.entries(bulkChanges)
      .filter(([key, value]) => columnMap.has(key) && value !== "")
      .map(([key, value]) => {
        const column = columnMap.get(key);
        return [key, normalizeEditableValue(column, value, { emptyAsNull: false })];
      })
  );

  if (Object.keys(payload).length === 0) {
    setBulkChangesOpen(false);
    setBulkChanges({});
    return;
  }

  if (typeof currentSection.onUpdate === "function") {
    const selectedRows = rows.filter((row) => selectedIds.includes(getRowId(row)));

    await Promise.all(
      selectedRows.map((row) => currentSection.onUpdate(row, payload))
    );
  }

  setBulkChangesOpen(false);
  setBulkChanges({});
  setSelectedIds([]);
};

  return (
    <div className="space-y-4">
      <PageBreadcrumb section={currentSection} />

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{currentSection.title}</h1>
          <p className="text-sm text-muted-foreground">{currentSection.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {currentSection.createPath && (
            <Link
              to={currentSection.createPath}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-foreground px-2.5 text-sm text-background transition-opacity hover:opacity-90 xl:px-3"
            >
              <Plus className="size-4" />
              <span className="hidden xl:inline">Nuevo {currentSection.title.toLowerCase()}</span>
            </Link>
          )}

          {headerActions.map((action) => (
            <HeaderActionButton key={action.key || action.label} action={action} />
          ))}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || currentSection.loading}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-70 xl:px-3"
            title="Refresh"
          >
            <RefreshCw className={`size-4 ${refreshing || currentSection.loading ? "animate-spin" : ""}`} />
            <span className="hidden xl:inline">Refresh</span>
          </button>
        </div>
      </div>

      <StatsCards cards={currentSection.statsCards} />

      {currentSection.error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {currentSection.error}
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && !editingRow && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="hidden sm:flex items-center gap-2">
            <ViewSwitcher value={desktopView} onChange={handleViewChange} />
          </div>

          <div className="flex sm:hidden items-center gap-2 w-full">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input
                placeholder={`Buscar ${currentSection.title.toLowerCase()}...`}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-base focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && !editingRow && (
        <div className="sm:hidden space-y-2">
          <AdvancedFiltersButton mobile onClick={() => setAdvancedFiltersOpen(true)} />

          <div className={`grid gap-2 ${selectedCount > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
            <SelectAllButton mobile allSelected={allVisibleSelected} onClick={toggleSelectAllVisible} />

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

      {!advancedFiltersOpen && !bulkChangesOpen && !editingRow && (
        <FiltersToolbar
          section={currentSection}
          sectionKey={currentSection.key}
          rows={rows}
          columns={columns}
          configuredPrimaryFilters={configuredPrimaryFilters}
          search={search}
          setSearch={setSearch}
          primaryFilters={primaryFilters}
          setPrimaryFilter={setPrimaryFilter}
          dateRangeFilters={dateRangeFilters}
          setDateRangeFilter={setDateRangeFilter}
          visibleColumns={visibleColumns}
          onToggleColumn={toggleColumn}
          onOpenAdvancedFilters={() => setAdvancedFiltersOpen(true)}
          onToggleSelectAll={toggleSelectAllVisible}
          allVisibleSelected={allVisibleSelected}
          desktopView={desktopView}
        />
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && selectedCount > 0 && (
        <div className="hidden sm:block">
          <BulkChangesButton selectedCount={selectedCount} onClick={() => setBulkChangesOpen(true)} />
        </div>
      )}
      {editingRow && (
        <SingleChangesPanel
          section={currentSection}
          columns={columns}
          rows={rows}
          item={editingRow}
          changes={singleChanges}
          setChanges={setSingleChanges}
          onClose={() => {
            setEditingRow(null);
            setSingleChanges({});
          }}
          onSave={handleSaveSingleChanges}
        />
      )}
      {advancedFiltersOpen && (
<AdvancedFiltersPanel
  section={currentSection}
  columns={columns}
  rows={rows}
  advancedFilters={advancedFilters}
  setAdvancedFilters={setAdvancedFilters}
  onClose={() => setAdvancedFiltersOpen(false)}
  resetKey={currentSection.key}
/>
      )}

      {bulkChangesOpen && (
        <BulkChangesPanel
          section={currentSection}
          columns={columns}
          rows={rows}
          selectedCount={selectedCount}
          bulkChanges={bulkChanges}
          setBulkChanges={setBulkChanges}
          onClose={() => setBulkChangesOpen(false)}
          onSave={handleSaveBulkChanges}
        />
      )}

      {!advancedFiltersOpen && !bulkChangesOpen && !editingRow && (
        <>
          <div className="hidden sm:block">
            {desktopView === "table" && (
              <DesktopTable
                section={currentSection}
                columns={columns}
                items={filtered}
                visibleColumns={visibleColumns}
                selectedIds={selectedIds}
                onToggleSelected={toggleSelected}
                onToggleSelectAll={toggleSelectAllVisible}
                allVisibleSelected={allVisibleSelected}
                onView={handleView}
                onDelete={handleDelete}
                onMarkDone={handleMarkDone}
              />
            )}

            {desktopView === "lanes" && (
              <LanesView
                section={currentSection}
                columns={columns}
                items={filtered}
                selectedIds={selectedIds}
                onToggleSelected={toggleSelected}
                onView={handleView}
                onDelete={handleDelete}
                onMarkDone={handleMarkDone}
              />
            )}

            {desktopView === "cards" && (
              <MobileCards
                section={currentSection}
                columns={columns}
                items={filtered}
                selectedIds={selectedIds}
                onToggleSelected={toggleSelected}
                onView={handleView}
                onDelete={handleDelete}
                onMarkDone={handleMarkDone}
              />
            )}
          </div>

          <div className="sm:hidden">
            <MobileCards
              section={currentSection}
              columns={columns}
              items={filtered}
              selectedIds={selectedIds}
              onToggleSelected={toggleSelected}
              onView={handleView}
              onDelete={handleDelete}
              onMarkDone={handleMarkDone}
            />
          </div>
          
        </>
      )}
      {extraContent}
    </div>
  );
}