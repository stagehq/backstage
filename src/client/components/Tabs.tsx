import clsx from "clsx";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "./Container";

const tabs = [
  { name: "Sites", path: "/s" },
  { name: "Analytics", path: "/s/analytics" },
];

const Tabs = () => {
  const location = useLocation();
  console.log(location.pathname.endsWith("/s/analytics"))

  return (
    <div className="w-full bg-white">
      <Container>
        <div className="flex justify-start items-start gap-3 h-10">
          {tabs.map((tab) => (
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
