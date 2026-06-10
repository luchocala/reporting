import EntityListPage from "@/pages/entities/EntityListPage";
import { useEntityTable } from "@/hooks/useEntityTable";
import { getEntitySectionByKey } from "@/config/entitySections";

export default function Users() {
  const usersConfig = getEntitySectionByKey("configuracion-users");
  const { section, extraContent } = useEntityTable(usersConfig);

  return (
    <>
      <EntityListPage section={section} />
      {extraContent}
    </>
  );
}
