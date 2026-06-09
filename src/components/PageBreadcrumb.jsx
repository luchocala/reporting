import { Link } from "react-router-dom";

function getGroupPath(section) {
  if (!section?.path) return "/";

  const parts = section.path.split("/").filter(Boolean);

  if (parts.length <= 1) return "/";

  return `/${parts.slice(0, -1).join("/")}`;
}

export default function PageBreadcrumb({ section, currentLabel }) {
  if (!section) return null;

  const items = [
    {
      label: "Home",
      path: "/",
      clickable: true,
    },
    {
      label: section.group,
      path: getGroupPath(section),
      clickable: false,
    },
    {
      label: section.title,
      path: section.path,
      clickable: true,
    },
  ];

  if (currentLabel) {
    items.push({
      label: currentLabel,
      clickable: false,
    });
  }

  return (
    <nav
      className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const canClick = item.clickable && item.path && !isLast;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
            {index > 0 && <span>›</span>}

            {canClick ? (
              <Link to={item.path} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}