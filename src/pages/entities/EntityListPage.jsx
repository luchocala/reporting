import { useMemo, useRef, useState } from "react";
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
  TableProperties,
  Columns3,
  LayoutGrid,
  KanbanSquare,
  Table2,
  ChevronDown,
} from "lucide-react";

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
  return window.innerWidth >= 1280 ? "table" : "cards";
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
  return getUniqueValues(items, columnKey).map((value) => ({
    value,
    label: value,
  }));
}

function formatMoney(value, moneda = "ARS") {
  return `${moneda} ${new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0)}`;
}

function renderCell(row, column) {
  const value = row[column.key];

  if (column.type === "status") {
    return (
      <span
        className={`inline-block max-w-full rounded-md px-2 py-1 text-[10px] font-medium leading-tight whitespace-normal break-words text-center ${
          statusStyles[value] || defaultStatusStyle
        }`}
      >
        {value || "-"}
      </span>
    );
  }

  if (column.type === "money") {
    return formatMoney(value, row.moneda || "ARS");
  }

  return value || "-";
}

function ToolbarButton({
  children,
  icon: Icon,
  onClick,
  active = false,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${className}`}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </button>
  );
}

function ViewButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="size-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function DropdownButton({
  label,
  icon: Icon,
  children,
  align = "left",
  width = "w-64",
  active = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div className="relative" ref={ref}>
      <ToolbarButton
        icon={Icon}
        active={active}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{label}</span>
        <ChevronDown className="size-3.5 opacity-70" />
      </ToolbarButton>

      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />

          <div
            className={`absolute z-40 mt-2 ${width} rounded-lg border border-border bg-popover p-2 shadow-md ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children({ close: () => setOpen(false) })}
          </div>
        </>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 min-w-[140px] appearance-none rounded-md border border-input bg-background pl-3 pr-8 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus:text-foreground"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export default function EntityListPage({ section }) {
  const rows = section.rows || [];
  const columns = section.columns || [];
  const editableColumns = columns.filter((column) => !column.locked);
  const searchableColumns = columns.filter((column) => column.type !== "actions");
  const laneField = section.laneField || "estado";

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState(getInitialView);
  const [visibleColumns, setVisibleColumns] = useState(
    section.defaultVisibleColumns || columns.map((column) => column.key)
  );
  const [advancedFilterColumn, setAdvancedFilterColumn] = useState("");
  const [advancedFilterValue, setAdvancedFilterValue] = useState("");
  const [primaryFilters, setPrimaryFilters] = useState({});

  const PER_PAGE = 10;

  const visibleTableColumns = columns.filter((column) =>
    visibleColumns.includes(column.key)
  );

  const primaryFilterColumns = (section.primaryFilters || [])
    .map((key) => columns.find((column) => column.key === key))
    .filter(Boolean)
    .slice(0, 3);

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return rows.filter((row) => {
      const matchesSearch =
        !normalizedSearch ||
        searchableColumns.some((column) =>
          String(row[column.key] || "")
            .toLowerCase()
            .includes(normalizedSearch)
        );

      const matchesPrimaryFilters = Object.entries(primaryFilters).every(
        ([key, value]) => {
          if (!value) return true;
          return String(row[key] || "") === String(value);
        }
      );

      const matchesAdvancedFilter =
        !advancedFilterColumn ||
        !advancedFilterValue ||
        String(row[advancedFilterColumn] || "") === String(advancedFilterValue);

      return matchesSearch && matchesPrimaryFilters && matchesAdvancedFilter;
    });
  }, [
    rows,
    search,
    searchableColumns,
    primaryFilters,
    advancedFilterColumn,
    advancedFilterValue,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const groupedLanes = useMemo(() => {
    const values = getUniqueValues(filtered, laneField);

    return values.map((value) => ({
      id: value,
      label: value,
      items: filtered.filter((row) => String(row[laneField]) === String(value)),
    }));
  }, [filtered, laneField]);

  const toggleAll = () => {
    setSelected(
      selected.length === paged.length ? [] : paged.map((row) => row.id)
    );
  };

  const toggleOne = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id]
    );
  };

  const toggleColumn = (columnKey) => {
    const column = columns.find((item) => item.key === columnKey);

    if (column?.locked) return;

    setVisibleColumns((current) =>
      current.includes(columnKey)
        ? current.filter((key) => key !== columnKey)
        : [...current, columnKey]
    );
  };

  const handlePrimaryFilterChange = (key, value) => {
    setPrimaryFilters((current) => ({
      ...current,
      [key]: value,
    }));
    setPage(1);
  };

  const handleAdvancedColumnChange = (columnKey) => {
    setAdvancedFilterColumn(columnKey);
    setAdvancedFilterValue("");
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setPrimaryFilters({});
    setAdvancedFilterColumn("");
    setAdvancedFilterValue("");
    setPage(1);
  };

  const hasActiveFilters =
    search ||
    advancedFilterColumn ||
    advancedFilterValue ||
    Object.values(primaryFilters).some(Boolean);

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <span>Home</span>
        <span>›</span>
        <span>{section.group}</span>
        <span>›</span>
        <span className="text-foreground">{section.title}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{section.title}</h1>
          <p className="text-sm text-muted-foreground">{section.subtitle}</p>
        </div>

        {section.createPath && (
          <Link
            to={section.createPath}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background hover:opacity-90"
          >
            <Plus className="size-3.5" />
            Agregar
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              placeholder={`Filtrar ${section.title.toLowerCase()}...`}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring sm:w-56"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {primaryFilterColumns.map((column) => (
              <FilterSelect
                key={column.key}
                label={column.label}
                value={primaryFilters[column.key] || ""}
                onChange={(value) => handlePrimaryFilterChange(column.key, value)}
                options={getOptionsForColumn(rows, column.key)}
              />
            ))}
          </div>

          <DropdownButton
            label="Filtrar"
            icon={SlidersHorizontal}
            active={Boolean(advancedFilterColumn || advancedFilterValue)}
          >
            {() => (
              <div className="space-y-2">
                <p className="px-1 text-xs font-medium text-muted-foreground">
                  Filtrar por columna
                </p>

                <select
                  value={advancedFilterColumn}
                  onChange={(event) =>
                    handleAdvancedColumnChange(event.target.value)
                  }
                  className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs outline-none"
                >
                  <option value="">Seleccionar columna</option>
                  {editableColumns.map((column) => (
                    <option key={column.key} value={column.key}>
                      {column.label}
                    </option>
                  ))}
                </select>

                <select
                  value={advancedFilterValue}
                  onChange={(event) => {
                    setAdvancedFilterValue(event.target.value);
                    setPage(1);
                  }}
                  disabled={!advancedFilterColumn}
                  className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs outline-none disabled:opacity-50"
                >
                  <option value="">Seleccionar valor</option>
                  {advancedFilterColumn &&
                    getOptionsForColumn(rows, advancedFilterColumn).map(
                      (option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    )}
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="h-8 w-full rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </DropdownButton>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 xl:justify-end">
          <DropdownButton label="Columnas" icon={Columns3} align="right">
            {() => (
              <div className="space-y-1">
                <p className="px-1 pb-1 text-xs font-medium text-muted-foreground">
                  Mostrar columnas
                </p>

                {columns.map((column) => {
                  const checked = visibleColumns.includes(column.key);

                  return (
                    <button
                      key={column.key}
                      type="button"
                      onClick={() => toggleColumn(column.key)}
                      disabled={column.locked}
                      className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="flex size-4 items-center justify-center rounded border border-border">
                        {checked && <Check className="size-3" />}
                      </span>
                      <span className="flex-1 text-left">{column.label}</span>
                      {column.locked && (
                        <span className="text-[10px] text-muted-foreground">
                          fijo
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </DropdownButton>

          <DropdownButton
            label="Cambios masivos"
            icon={SquareCheckBig}
            align="right"
            width="w-56"
          >
            {() => (
              <div className="space-y-1">
                <p className="px-1 pb-1 text-xs font-medium text-muted-foreground">
                  {selected.length} registros seleccionados
                </p>

                <button
                  type="button"
                  disabled={selected.length === 0}
                  className="h-8 w-full rounded-md px-2 text-left text-xs hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cambiar estado
                </button>

                <button
                  type="button"
                  disabled={selected.length === 0}
                  className="h-8 w-full rounded-md px-2 text-left text-xs text-red-600 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Eliminar seleccionados
                </button>
              </div>
            )}
          </DropdownButton>

          <div className="inline-flex h-8 items-center rounded-md border border-input bg-muted/40 p-0.5">
            <ViewButton
              active={viewMode === "table"}
              icon={Table2}
              label="Tabla"
              onClick={() => setViewMode("table")}
            />
            <ViewButton
              active={viewMode === "lanes"}
              icon={KanbanSquare}
              label="Lane"
              onClick={() => setViewMode("lanes")}
            />
            <ViewButton
              active={viewMode === "cards"}
              icon={LayoutGrid}
              label="Card"
              onClick={() => setViewMode("cards")}
            />
          </div>

          <ToolbarButton icon={TableProperties}>
            Vista
          </ToolbarButton>
        </div>
      </div>

      {viewMode === "table" && (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left w-8">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === paged.length && paged.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>

                {visibleTableColumns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-xs font-medium text-muted-foreground ${
                      column.type === "money" || column.type === "actions"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paged.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                    />
                  </td>

                  {visibleTableColumns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-xs ${
                        column.type === "money" || column.type === "actions"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {column.type === "actions" ? (
                        <div className="flex items-center justify-end gap-1">
                          <button className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
                            <Eye className="size-4" />
                          </button>
                          <button className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted text-red-600">
                            <Trash2 className="size-4" />
                          </button>
                          <button className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
                            <MoreHorizontal className="size-4" />
                          </button>
                        </div>
                      ) : column.primary ? (
                        <div>
                          <p className="font-medium text-sm">
                            {renderCell(row, column)}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-sm">
                            {row.descripcion || row.email || ""}
                          </p>
                        </div>
                      ) : (
                        renderCell(row, column)
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleTableColumns.length + 1}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    No hay registros para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "cards" && (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((row) => (
            <div
              key={row.id}
              className="rounded-lg border border-border bg-card p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{row.nombre || row.id}</p>
                  <p className="text-xs text-muted-foreground">{row.id}</p>
                </div>

                {row.estado && renderCell(row, { key: "estado", type: "status" })}
              </div>

              <div className="space-y-1">
                {visibleTableColumns
                  .filter(
                    (column) =>
                      !["acciones", "id", "estado", "nombre"].includes(
                        column.key
                      )
                  )
                  .slice(0, 5)
                  .map((column) => (
                    <div
                      key={column.key}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="text-muted-foreground">
                        {column.label}
                      </span>
                      <span className="text-right font-medium">
                        {renderCell(row, column)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "lanes" && (
        <div className="grid gap-3 xl:grid-cols-4">
          {groupedLanes.map((lane) => (
            <div
              key={lane.id}
              className="rounded-lg border border-border bg-muted/20 p-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{lane.label}</h3>
                <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
                  {lane.items.length}
                </span>
              </div>

              <div className="space-y-2">
                {lane.items.map((row) => (
                  <div
                    key={row.id}
                    className="rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">
                          {row.nombre || row.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {row.descripcion || row.email || row.id}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleOne(row.id)}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{row.tipo || "-"}</span>
                      <span>
                        {row.total !== undefined
                          ? formatMoney(row.total, row.moneda)
                          : row.documento || ""}
                      </span>
                    </div>
                  </div>
                ))}

                {lane.items.length === 0 && (
                  <p className="py-6 text-center text-xs text-muted-foreground">
                    Sin registros
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {selected.length} of {filtered.length} row(s) selected.
        </span>

        <div className="flex items-center gap-2">
          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            className="p-1 hover:bg-muted rounded disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page >= totalPages}
            className="p-1 hover:bg-muted rounded disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}