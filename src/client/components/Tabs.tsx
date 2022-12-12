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
          <div className="flex justify-start items-start gap-1 h-10">
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
    <div className="flex flex-col justify-start items-start gap-1.5">
      <Link
        to={path}
        className="flex h-8 justify-start items-center relative gap-2 px-4 rounded py-0.5 hover:bg-zinc-100"
      >
        <p className={clsx("text-sm font-medium text-left", active ? "text-zinc-900" : "text-zinc-700 hover:text-zinc-900")}>
          {name}
        </p>
      </Link>
      <div className="flex flex-col justify-center items-center self-stretch relative gap-2 px-1">
        {active && (
          <div className="self-stretch h-0.5 rounded-[1px] bg-zinc-900"></div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
