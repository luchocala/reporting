import { mapAuthUserToEntityRow } from "@/lib/entityActionHandlers.jsx";

const entityMappers = {
  authUsers: mapAuthUserToEntityRow,
  personas: mapAuthUserToEntityRow,
};

export function mapEntityRows(rows = [], mapperKey) {
  if (!mapperKey) return rows;

  const mapper = entityMappers[mapperKey];

  if (!mapper) {
    console.warn(`[entity-mappers] Mapper no encontrado: ${mapperKey}`);
    return rows;
  }

  return rows.map(mapper);
}