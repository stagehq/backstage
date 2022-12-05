/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { routes } from "../../../../pages/app";

const Breadcrumb: FC = () => {
  const breadcrumbs = useBreadcrumbs(routes, {
    excludePaths: ["/", "/app", "/app/workspace"],
  });

  return (
    <nav className="md:flex hidden" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 pr-2">
        {breadcrumbs.map(({ breadcrumb, match, key }, index) => (
          <li key={key}>
            <div className="flex items-center">
              <Link to={match.pathname}>
                <span
                  className="mr-2 text-base font-medium text-gray-500 hover:text-gray-700"
                  aria-current={match.pathname ? true : false}
                >
                  {breadcrumb}
                </span>
              </Link>
              {index < breadcrumbs.length - 1 ? (
                <ChevronRightIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
