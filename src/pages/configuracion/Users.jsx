import EntityListPage from "@/pages/entities/EntityListPage";
import { getEntitySectionByKey } from "@/config/entitySections";
import { useEntityTable } from "@/hooks/useEntityTable";

export default function Users() {
  const usersConfig = getEntitySectionByKey("configuracion-users");

  const { section, extraContent } = useEntityTable({
    ...usersConfig,
    dataSource: "authUsers",
    actionsKey: "users",
    statsKey: "users",
    rows: [],
  });
console.log("[Users] usersConfig:", usersConfig);
console.log("[Users] runtime section:", section);
  return (
    <>
      <EntityListPage section={section} />
      {extraContent}
    </>
  );
}