import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function EntityCreatePage({ section }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
          <span>Home</span>
          <span>›</span>
          <span>{section.group}</span>
          <span>›</span>
          <button
            type="button"
            onClick={() => navigate(section.path)}
            className="hover:text-foreground"
          >
            {section.title}
          </button>
          <span>›</span>
          <span className="text-foreground">Agregar</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Agregar {section.title}</h1>
            <p className="text-sm text-muted-foreground">
              Cargá los datos principales de {section.title.toLowerCase()}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(section.path)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Volver
          </button>
        </div>
      </div>

      <div className="border border-border rounded-lg bg-card p-5 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Nombre</label>
            <input
              placeholder="Ingrese un nombre"
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Estado</label>
            <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none">
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Borrador</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            rows={4}
            placeholder="Detalle o notas internas"
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background rounded-md hover:opacity-90">
            <Save className="size-4" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}