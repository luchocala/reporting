import { useMemo, useState } from "react";
import { Search, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
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
];

const estadoStyles = {
  "PAGADO": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "ESPERANDO PAGO": "text-amber-700 bg-amber-50 border-amber-200",
  "BORRADOR": "text-gray-600 bg-gray-50 border-gray-200",
  "ANULADO": "text-red-700 bg-red-50 border-red-200",
};

function formatAmount(value) {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export default function Comprobantes() {
  const [tab, setTab] = useState("Todos");
  const [search, setSearch] = useState("");

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

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
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

      <div className="flex gap-0 border-b border-border">
        {["Todos", "ESPERANDO PAGO", "PAGADO", "BORRADOR"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === item
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar comprobantes"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-56"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          Todos los períodos ▾
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          Estado ▾
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          Moneda ▾
        </button>

        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          Administrar tabla
        </button>
      </div>

      <Card className="shadow-none overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full table-fixed text-[11px] leading-tight">
      <colgroup>
        <col className="w-[35px]" />
        <col className="w-[75px]" />
        <col className="w-[90px]" />
        <col className="w-[20px]" />
        <col className="w-[65px]" />
        <col className="w-[95px]" />
        <col className="w-[110px]" />
        <col className="w-[95px]" />
        <col className="w-[100px]" />
        <col className="w-[75px]" />
        <col className="w-[35px]" />
        <col className="w-[65px]" />
        <col className="w-[80px]" />
        <col className="w-[40px]" />
        <col className="w-[80px]" />
        <col className="w-[170px]" />
        <col className="w-[35px]" />
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
          <th className="w-8" />
        </tr>
      </thead>

      <tbody>
        {filtered.map((item) => (
          <tr
            key={item.orderId}
            className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
          >
            <td className="px-2 py-2 align-top font-medium break-words">{item.orderId}</td>
            <td className="px-2 py-2 align-top text-muted-foreground tabular-nums whitespace-nowrap">{item.fecha}</td>

            <td className="px-2 py-2 align-top">
              <span
                className={`inline-flex max-w-full items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium leading-tight whitespace-normal break-words ${
                  estadoStyles[item.estado] || "text-gray-600 bg-gray-50 border-gray-200"
                }`}
              >
                {item.estado}
              </span>
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
            <td className="px-2 py-2 align-top break-words">{item.emails}</td>

            <td className="px-1 py-2 align-top">
              <button className="p-1 hover:bg-muted rounded">
                <MoreHorizontal className="size-3.5 text-muted-foreground" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="flex items-center justify-between px-4 py-3 border-t border-border">
    <span className="text-xs text-muted-foreground">
      1–{filtered.length} of {comprobantes.length}
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