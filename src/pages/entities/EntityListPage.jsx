import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  SlidersHorizontal,
  TableProperties,
} from "lucide-react";

const mockRows = [
  {
    id: "REG-001",
    estado: "ACTIVO",
    documento: "20333444556",
    nombre: "Registro de ejemplo",
    tipo: "General",
    descripcion: "Descripción o referencia del registro",
    total: 45000,
    moneda: "ARS",
    email: "info@example.com",
  },
  {
    id: "REG-002",
    estado: "PENDIENTE",
    documento: "30711222334",
    nombre: "Segundo registro",
    tipo: "General",
    descripcion: "Información complementaria",
    total: 100000,
    moneda: "ARS",
    email: "admin@example.com",
  },
  {
    id: "REG-003",
    estado: "INACTIVO",
    documento: "27123456789",
    nombre: "Tercer registro",
    tipo: "General",
    descripcion: "Observaciones internas",
    total: 20576,
    moneda: "ARS",
    email: "contacto@example.com",
  },
];

const statusStyles = {
  ACTIVO: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDIENTE: "bg-amber-50 text-amber-700 border-amber-200",
  INACTIVO: "bg-red-50 text-red-700 border-red-200",
};

export default function EntityListPage({ section }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    const normalized = search.toLowerCase().trim();

    return mockRows.filter((row) => {
      return (
        row.id.toLowerCase().includes(normalized) ||
        row.nombre.toLowerCase().includes(normalized) ||
        row.documento.toLowerCase().includes(normalized) ||
        row.email.toLowerCase().includes(normalized)
      );
    });
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <span>Home</span>
        <span>›</span>
        <span>{section.group}</span>
        <span>›</span>
        <span className="text-foreground">{section.title}</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{section.title}</h1>
          <p className="text-sm text-muted-foreground">{section.subtitle}</p>
        </div>

        {section.createPath && (
          <Link
            to={section.createPath}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-foreground text-background rounded-md hover:opacity-90"
          >
            <Plus className="size-4" />
            Agregar
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            placeholder={`Filtrar ${section.title.toLowerCase()}...`}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="pl-8 pr-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none w-full"
          />
        </div>

        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted">
          <SlidersHorizontal className="size-4" />
          Estado
        </button>

        <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm border border-input rounded-md hover:bg-muted text-muted-foreground">
          <TableProperties className="size-4" />
          Vista
        </button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left w-8">
                <input
                  type="checkbox"
                  checked={selected.length === paged.length && paged.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Documento
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                Tipo
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Total
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                Acciones
              </th>
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

                <td className="px-4 py-3">
                  <button className="text-xs font-medium underline underline-offset-2 text-muted-foreground hover:text-foreground whitespace-nowrap">
                    {row.id}
                  </button>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                      statusStyles[row.estado] ||
                      "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {row.estado}
                  </span>
                </td>

                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {row.documento}
                </td>

                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-sm">{row.nombre}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-sm">
                      {row.descripcion}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {row.tipo}
                </td>

                <td className="px-4 py-3 text-right text-xs font-medium">
                  {row.moneda} {row.total.toLocaleString("es-AR")}
                </td>

                <td className="px-4 py-3">
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
                </td>
              </tr>
            ))}

            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No hay registros para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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