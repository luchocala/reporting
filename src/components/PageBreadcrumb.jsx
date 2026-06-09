import { Link, useLocation } from "react-router-dom";

function titleize(segment) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function PageBreadcrumb({ section, currentLabel }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isCreatePage = pathname.endsWith("/new");

  const fallbackSegments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment !== "new");

  const baseItems = section
    ? [
        { label: "Home", path: "/" },
        { label: section.group },
        { label: section.title, path: section.path },
      ]
    : [
        { label: "Home", path: "/" },
        ...fallbackSegments.map((segment, index) => ({
          label: titleize(segment),
          path: `/${fallbackSegments.slice(0, index + 1).join("/")}`,
        })),
      ];

  const items = currentLabel
    ? [...baseItems, { label: currentLabel }]
    : isCreatePage
      ? [...baseItems, { label: "Agregar" }]
      : baseItems;

  return (
    <nav className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
            {index > 0 && <span>›</span>}
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
