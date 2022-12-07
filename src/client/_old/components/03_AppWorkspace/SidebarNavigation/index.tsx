import clsx from "clsx";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectSlugState } from "../../../../store/project";

export const navigation = [
  { name: "Overview", href: "", key: "" },
  { name: "Ideas", href: "/ideas", key: "ideas" },
  { name: "Initiatives", href: "/initiatives", key: "initiatives" },
  { name: "Status meeting", href: "/meet", key: "meet" },
  { name: "Settings", href: "/settings", key: "settings" },
];

const SidebarNavigation: FC = () => {
  const location = useLocation();
  const [projectSlug, setProjectSlug] = useRecoilState(projectSlugState);

  if (projectSlug) {
    return (
      <nav className="mt-8 flex-1 px-4 bg-white space-y-1" aria-label="Sidebar">
        {projectSlug &&
          navigation.map((item) => (
            <Link
              key={item.name}
              to={"/s/workspace/" + projectSlug + item.href}
            >
              <span
                className={clsx(
                  location.pathname.endsWith(item.key || projectSlug)
                    ? "bg-gray-100 text-gray-900 hover:text-gray-900 hover:bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",

                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                )}
              >
                <span className="flex-1">{item.name}</span>
              </span>
            </Link>
          ))}
      </nav>
    );
  }

  return null;
};

export { SidebarNavigation };