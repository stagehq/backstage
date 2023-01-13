import clsx from "clsx";
import { FC } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Container from "./Container";

const globalTabs = [
  { name: "Sites", path: "/s" },
  { name: "Analytics", path: "/s/analytics" },
];

const Tabs = () => {
  const location = useLocation();
  const { siteId } = useParams();

  const siteTabs = [
    { name: "Preview", path: `/s/${siteId}` },
    { name: "Sections", path: `/s/${siteId}/sections` },
    { name: "Settings", path: `/s/${siteId}/settings` },
  ];

  return (
    <>
      <div className={clsx("w-full bg-white", siteId ? "md:hidden" : "")}>
        <Container>
          <div className="flex h-10 items-start justify-start gap-1">
            {siteId
              ? siteTabs.map((tab) => (
                  <Tab
                    {...{
                      key: tab.name,
                      name: tab.name,
                      path: tab.path,
                      active: location.pathname.endsWith(tab.path),
                    }}
                  />
                ))
              : globalTabs.map((tab) => (
                  <Tab
                    {...{
                      key: tab.name,
                      name: tab.name,
                      path: tab.path,
                      active: location.pathname.endsWith(tab.path),
                    }}
                  />
                ))}
          </div>
        </Container>
      </div>
    </>
  );
};

interface TabProps {
  name: string;
  path: string;
  active: boolean;
}

const Tab: FC<TabProps> = ({ name, path, active }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-1.5">
      <Link
        to={path}
        className="relative flex h-8 items-center justify-start gap-2 rounded px-4 py-0.5 hover:bg-zinc-100"
      >
        <p
          className={clsx(
            "text-left text-sm font-medium",
            active ? "text-zinc-900" : "text-zinc-700 hover:text-zinc-900"
          )}
        >
          {name}
        </p>
      </Link>
      <div className="relative flex flex-col items-center justify-center gap-2 self-stretch px-1">
        {active && (
          <div className="h-0.5 self-stretch rounded-[1px] bg-zinc-900"></div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
