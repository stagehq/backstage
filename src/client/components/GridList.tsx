import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { dashboardQueryState } from "../store/ui/dashboardSearch";
import { currentUserState } from "../store/user";

export default function GridList() {
  const user = useRecoilValue(currentUserState);
  const query = useRecoilValue(dashboardQueryState);
  const [focusedId, setFocusedId] = useState<number | null>(null);

  if (!user) return null;

  const filteredSites =
    query === ''
      ? user.sites
      : user.sites?.filter((site) => {
          return (
            site.subdomain?.toLowerCase().includes(query.toLowerCase())
            || site.tagline?.toLowerCase().includes(query.toLowerCase())
          );
        })

  function handleFocus(id: number) {
    setFocusedId(id);
  }

  function handleBlur() {
    setFocusedId(null);
  }

  return (
    <div className="mt-8 mb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {filteredSites &&
        filteredSites.map((site, index) => (
          <div
            className={clsx("flex flex-col justify-between relative group bg-white p-6 border border-zinc-200 rounded-lg hover:shadow-lg focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800",
              focusedId === index && "border-zinc-800 outline-none ring-1 ring-zinc-800"
            )}
            key={'site' + index}
          >
            <div>
              {user.image && (
                <img
                  className="w-12 h-12 bg-cover rounded-full border border-zinc-200"
                  src={user.image}
                  alt="site profile picture"
                />
              )}
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  {site.subdomain && (
                    <Link
                      to={"/s/" + site.subdomain}
                      className="focus:outline-none"
                      onFocus={() => handleFocus(index)}
                      onBlur={handleBlur}
                    >
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {site.tagline}
                    </Link>
                  )}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{site.bio}</p>
              </div>
            </div>
            <div className="mt-6 ">
              <p className="text-sm font-medium text-gray-900">
                {site.subdomain}
              </p>
            </div>
            <a
              {...(process.env.NODE_ENV === "development"
                ? { href: `http://localhost:3000/${site.subdomain}` }
                : { href: `https://getstage.app/${site.subdomain}` })}
              target="_blank"
              rel="noopener"
              className="absolute top-6 right-6 flex items-center w-10 h-10 justify-center rounded-3xl border border-zinc-200 hover:border-zinc-300 bg-white hover:shadow shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                ></path>
              </svg>
            </a>
          </div>
        ))}
    </div>
  );
}
