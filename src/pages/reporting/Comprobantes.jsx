import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  CheckCircle2,
  Trash2,
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

function ActionButtons({ item, compact = false, onView, onMarkPaid, onDelete }) {
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
    <div className="hidden xl:inline-flex rounded-md border border-input bg-background p-0.5">
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

function DesktopTable({ items, onView, onMarkPaid, onDelete, forceVisible = false }) {
  return (
    <Card className={`shadow-none overflow-hidden ${forceVisible ? "block" : "hidden xl:block"}`}>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-[11px] leading-tight">
          <colgroup>
            <col className="w-[40px]" />
            <col className="w-[80px]" />
            <col className="w-[90px]" />
            <col className="w-[25px]" />
            <col className="w-[60px]" />
            <col className="w-[95px]" />
            <col className="w-[85px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[30px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[40px]" />
            <col className="w-[80px]" />
            <col className="w-[140px]" />
            <col className="w-[40px]" />
          </colgroup>

          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Order ID</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Fecha</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Estado</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">T/C</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Provincia</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Documento</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Razón Social</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Tipo</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Leyenda</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">Importe Neto</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">%</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">Iva</th>
              <th className="text-right font-medium text-muted-foreground px-2 py-2 align-top">Importe Total</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Moneda</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Emisora</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Emails</th>
              <th className="text-left font-medium text-muted-foreground px-2 py-2 align-top">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.orderId}
                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
              >
                <td className="px-2 py-2 align-top font-medium break-words">{item.orderId}</td>
                <td className="px-2 py-2 align-top text-muted-foreground tabular-nums whitespace-nowrap">{item.fecha}</td>
                <td className="px-1 py-1 align-top whitespace-normal break-words">
                  <EstadoBadge estado={item.estado} />
                </td>
                <td className="px-2 py-2 align-top font-medium">{item.tc}</td>
                <td className="px-2 py-2 align-top break-words">{item.provincia}</td>
                <td className="px-2 py-2 align-top tabular-nums break-words">{item.documento}</td>
                <td className="px-2 py-2 align-top break-words">{item.razonSocial}</td>
                <td className="px-2 py-2 align-top break-words">{item.tipo}</td>
                <td className="px-2 py-2 align-top break-words">{item.leyenda}</td>

                <td className="px-2 py-2 align-top text-right font-medium tabular-nums whitespace-nowrap">
                  {formatAmount(item.importeNeto)}
                </td>
                <td className="px-2 py-2 align-top text-right tabular-nums whitespace-nowrap">
                  {formatAmount(item.porcentajeIva)}
                </td>
                <td className="px-2 py-2 align-top text-right tabular-nums whitespace-nowrap">
                  {formatAmount(item.iva)}
                </td>
                <td className="px-2 py-2 align-top text-right font-medium tabular-nums whitespace-nowrap">
                  {formatAmount(item.importeTotal)}
                </td>

                <td className="px-2 py-2 align-top break-words">{item.moneda}</td>
                <td className="px-2 py-2 align-top break-words">{item.emisora}</td>
                <td className="px-2 py-2 align-top break-all">{item.emails}</td>

                <td className="px-1 py-2 align-top">
                  <ActionButtons
                    item={item}
                    compact
                    onView={onView}
                    onMarkPaid={onMarkPaid}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
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

function LanesView({ items, onView, onMarkPaid, onDelete, forceVisible = false }) {
  const lanes = groupByEstado(items);

  return (
    <div className={forceVisible ? "block" : "hidden sm:block xl:hidden"}>
      <div className="flex items-center gap-2 mb-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          <Filter className="size-3.5" />
          Filter
        </button>
        <span className="text-xs text-muted-foreground ml-auto">
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
              {lane.orders.map((item) => (
                <Card
                  key={item.orderId}
                  className="shadow-none p-3 space-y-2 cursor-pointer hover:shadow-sm transition-shadow"
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
                  />
                </Card>
              ))}

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

function MobileCards({ items, onView, onMarkPaid, onDelete, forceVisible = false }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredByStatus = items.filter(
    (item) => statusFilter === "All" || item.estado === statusFilter
  );

  const total = filteredByStatus.reduce((sum, item) => sum + item.importeTotal, 0);

  return (
    <div className={forceVisible ? "space-y-4" : "space-y-4 sm:hidden"}>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-4">
          <Card className="shadow-none p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Estado
              </p>
              {[
                ["All", items.length],
                ["ESPERANDO PAGO", items.filter((item) => item.estado === "ESPERANDO PAGO").length],
                ["PAGADO", items.filter((item) => item.estado === "PAGADO").length],
                ["BORRADOR", items.filter((item) => item.estado === "BORRADOR").length],
                ["ANULADO", items.filter((item) => item.estado === "ANULADO").length],
              ].map(([status, count]) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm ${
                    statusFilter === status
                      ? "bg-muted font-medium"
                      : "hover:bg-muted/50 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {statusFilter === status && <span className="size-2 rounded-full bg-foreground" />}
                    {statusFilter !== status && <span className="size-2 rounded-full border border-muted-foreground" />}
                    {status === "All" ? "Todos" : status}
                  </div>
                  <span className="text-muted-foreground">{count}</span>
                </button>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Período
              </p>
              <select className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none">
                <option>Todos los períodos</option>
              </select>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Moneda
              </p>
              <select className="w-full border border-input rounded-md px-2 py-1.5 text-sm bg-background focus:outline-none">
                <option>Todas las monedas</option>
              </select>
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filteredByStatus.length} comprobantes ·{" "}
              <span className="font-medium text-foreground">
                ARS {formatAmount(total)} total
              </span>
            </span>
            <select className="text-sm border border-input rounded-md px-2 py-1 bg-background focus:outline-none">
              <option>Más recientes</option>
            </select>
          </div>

          {filteredByStatus.map((item) => (
            <Card
              key={item.orderId}
              className="shadow-none p-4 hover:shadow-sm transition-shadow cursor-pointer"
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Comprobantes() {
  const [tab, setTab] = useState("Todos");
  const [search, setSearch] = useState("");
  const [desktopView, setDesktopView] = useState("table");

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return comprobantes.filter((item) => {
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

      return matchesTab && matchesSearch;
    });
  }, [tab, search]);

  const handleView = (item) => {
    console.log("Ver detalle", item);
  };

  const handleMarkPaid = (item) => {
    console.log("Marcar como pagada", item);
  };

  const handleDelete = (item) => {
    console.log("Eliminar", item);
  };

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

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar comprobantes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-44 sm:w-56"
          />
        </div>

        <div className="flex items-center gap-2">
          <ViewSwitcher value={desktopView} onChange={setDesktopView} />

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
            Display ▾
          </button>
        </div>
      </div>

      <div className="hidden sm:flex gap-0 border-b border-border overflow-x-auto">
        {["Todos", "ESPERANDO PAGO", "PAGADO", "BORRADOR", "ANULADO"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
              tab === item
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="hidden xl:block">
        {desktopView === "table" && (
          <DesktopTable
            items={filtered}
            forceVisible
            onView={handleView}
            onMarkPaid={handleMarkPaid}
            onDelete={handleDelete}
          />
        )}

        {desktopView === "lanes" && (
          <LanesView
            items={filtered}
            forceVisible
            onView={handleView}
            onMarkPaid={handleMarkPaid}
            onDelete={handleDelete}
          />
        )}

        {desktopView === "cards" && (
          <MobileCards
            items={filtered}
            forceVisible
            onView={handleView}
            onMarkPaid={handleMarkPaid}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div className="hidden sm:block xl:hidden">
        <LanesView
          items={filtered}
          forceVisible
          onView={handleView}
          onMarkPaid={handleMarkPaid}
          onDelete={handleDelete}
        />
      </div>

      <div className="sm:hidden">
        <MobileCards
          items={filtered}
          forceVisible
          onView={handleView}
          onMarkPaid={handleMarkPaid}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}