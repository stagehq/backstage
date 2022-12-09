import clsx from "clsx";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import { useParams } from 'react-router-dom';

const globalTabs = [
  { name: "Sites", path: "/s" },
  { name: "Analytics", path: "/s/analytics" },
];

const Tabs = () => {
  const location = useLocation();
  const { siteId } = useParams();

  const siteTabs = [
    { name: "Preview", path: `/s/${siteId}`  },
    { name: "Sections", path: `/s/${siteId}/sections` },
    { name: "Settings", path: `/s/${siteId}/settings` },
  ];

  return (
    <>
      <div className="w-full bg-white md:hidden">
        <Container>
          <div className="flex justify-start items-start gap-3 h-10">
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
              ))
            }
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
    <div className="flex flex-col justify-start items-start gap-2.5 pt-1">
      <Link
        to={path}
        className="flex justify-start items-center relative gap-2 px-2 py-0.5"
      >
        <p className={clsx("text-sm font-medium text-left text-zinc-900")}>
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
