import EntityListPage from "@/pages/entities/EntityListPage";
import { getEntitySectionByKey } from "@/config/entitySections";
import { useEntityTable } from "@/hooks/useEntityTable";

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