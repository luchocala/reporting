import { useRef, useState } from "react";
import {
  Search,
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

export default function EntityToolbar({
  section,
  rows,
  columns,
  editableColumns,
  primaryFilterColumns,
  search,
  onSearchChange,
  primaryFilters,
  onPrimaryFilterChange,
  advancedFilterColumn,
  advancedFilterValue,
  onAdvancedFilterColumnChange,
  onAdvancedFilterValueChange,
  visibleColumns,
  onToggleColumn,
  selectedCount,
  viewMode,
  onViewModeChange,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1 sm:flex-none">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder={`Filtrar ${section.title.toLowerCase()}...`}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring sm:w-56"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {primaryFilterColumns.map((column) => (
            <FilterSelect
              key={column.key}
              label={column.label}
              value={primaryFilters[column.key] || ""}
              onChange={(value) => onPrimaryFilterChange(column.key, value)}
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
                  onAdvancedFilterColumnChange(event.target.value)
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
                onChange={(event) =>
                  onAdvancedFilterValueChange(event.target.value)
                }
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
                  onClick={onClearFilters}
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
                    onClick={() => onToggleColumn(column.key)}
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
                {selectedCount} registros seleccionados
              </p>

              <button
                type="button"
                disabled={selectedCount === 0}
                className="h-8 w-full rounded-md px-2 text-left text-xs hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cambiar estado
              </button>

              <button
                type="button"
                disabled={selectedCount === 0}
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
            onClick={() => onViewModeChange("table")}
          />
          <ViewButton
            active={viewMode === "lanes"}
            icon={KanbanSquare}
            label="Lane"
            onClick={() => onViewModeChange("lanes")}
          />
          <ViewButton
            active={viewMode === "cards"}
            icon={LayoutGrid}
            label="Card"
            onClick={() => onViewModeChange("cards")}
          />
        </div>

        <ToolbarButton icon={TableProperties}>Vista</ToolbarButton>
      </div>
    </div>
  );
}