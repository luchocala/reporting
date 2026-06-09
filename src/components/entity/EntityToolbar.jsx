import { useRef, useState } from "react";
import {
  Search,
  Check,
  SlidersHorizontal,
  SquareCheckBig,
  TableProperties,
  LayoutGrid,
  KanbanSquare,
  Table2,
  ChevronDown,
  X,
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
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${className}`}
    >
      {Icon && <Icon className="size-3.5 shrink-0" />}
      {children}
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
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <div className="relative" ref={ref}>
      <ToolbarButton
        icon={Icon}
        active={active}
        onClick={() => setOpen((current) => !current)}
        className={className}
      >
        <span className="truncate">{label}</span>
        <ChevronDown className="size-3.5 shrink-0 opacity-70" />
      </ToolbarButton>

      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-30 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />

          <div
            className={`absolute z-40 mt-2 ${width} max-w-[calc(100vw-2rem)] rounded-md border border-border bg-popover p-1.5 shadow-lg ${
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

function NativeSelect({ label, value, onChange, options, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-8 text-xs font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus:text-foreground focus:ring-1 focus:ring-ring"
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

function ViewToggle({ viewMode, onViewModeChange }) {
  const views = [
    { key: "table", label: "Tabla", icon: Table2 },
    { key: "lanes", label: "Lane", icon: KanbanSquare },
    { key: "cards", label: "Card", icon: LayoutGrid },
  ];

  return (
    <div className="inline-flex h-8 items-center rounded-md border border-input bg-background p-0.5 shadow-sm">
      {views.map((view) => {
        const Icon = view.icon;
        const active = viewMode === view.key;

        return (
          <button
            key={view.key}
            type="button"
            onClick={() => onViewModeChange(view.key)}
            title={view.label}
            className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-[5px] px-2.5 text-xs font-medium transition-colors ${
              active
                ? "bg-muted text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function MenuItemButton({ children, onClick, disabled = false, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-full items-center rounded-sm px-2 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        danger
          ? "text-red-600 hover:bg-red-500/10"
          : "text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
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
  const advancedOptions = advancedFilterColumn
    ? getOptionsForColumn(rows, advancedFilterColumn)
    : [];

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              placeholder={`Filtrar ${section.title.toLowerCase()}...`}
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-8 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
            {primaryFilterColumns.map((column) => (
              <NativeSelect
                key={column.key}
                label={column.label}
                value={primaryFilters[column.key] || ""}
                onChange={(value) => onPrimaryFilterChange(column.key, value)}
                options={getOptionsForColumn(rows, column.key)}
                className="w-full sm:w-[150px]"
              />
            ))}
          </div>

          <DropdownButton
            label="Filtrar"
            icon={SlidersHorizontal}
            active={Boolean(advancedFilterColumn || advancedFilterValue)}
            width="w-72"
            className="w-full sm:w-auto"
          >
            {() => (
              <div className="space-y-1.5 p-1">
                <div className="px-1 pb-1">
                  <p className="text-xs font-medium text-foreground">
                    Filtro avanzado
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Elegí una columna y un valor disponible.
                  </p>
                </div>

                <NativeSelect
                  label="Seleccionar columna"
                  value={advancedFilterColumn}
                  onChange={onAdvancedFilterColumnChange}
                  options={editableColumns.map((column) => ({
                    value: column.key,
                    label: column.label,
                  }))}
                />

                <NativeSelect
                  label="Seleccionar valor"
                  value={advancedFilterValue}
                  onChange={onAdvancedFilterValueChange}
                  options={advancedOptions}
                />

                {hasActiveFilters && (
                  <MenuItemButton onClick={onClearFilters}>
                    Limpiar filtros
                  </MenuItemButton>
                )}
              </div>
            )}
          </DropdownButton>
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <DropdownButton
            label="Columnas"
            icon={TableProperties}
            align="right"
            width="w-64"
          >
            {() => (
              <div className="space-y-1 p-1">
                <div className="px-1 pb-1">
                  <p className="text-xs font-medium text-foreground">
                    Columnas visibles
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Mostrá u ocultá columnas de esta vista.
                  </p>
                </div>

                {columns.map((column) => {
                  const checked = visibleColumns.includes(column.key);

                  return (
                    <button
                      key={column.key}
                      type="button"
                      onClick={() => onToggleColumn(column.key)}
                      disabled={column.locked}
                      className="flex h-8 w-full items-center gap-2 rounded-sm px-2 text-xs hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="flex size-4 items-center justify-center rounded border border-border bg-background">
                        {checked && <Check className="size-3" />}
                      </span>
                      <span className="flex-1 truncate text-left">
                        {column.label}
                      </span>
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
            active={selectedCount > 0}
          >
            {() => (
              <div className="space-y-1 p-1">
                <div className="px-1 pb-1">
                  <p className="text-xs font-medium text-foreground">
                    Cambios masivos
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedCount} registros seleccionados
                  </p>
                </div>

                <MenuItemButton disabled={selectedCount === 0}>
                  Cambiar estado
                </MenuItemButton>
                <MenuItemButton disabled={selectedCount === 0} danger>
                  Eliminar seleccionados
                </MenuItemButton>
              </div>
            )}
          </DropdownButton>

          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        </div>
      </div>
    </div>
  );
}
