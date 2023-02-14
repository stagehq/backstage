import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getBaseUrl } from "../../helper/getBaseUrl";
import { dashboardQueryState } from "../store/ui/dashboardSearch";
import { currentUserState } from "../store/user";

export default function GridList() {
  const user = useRecoilValue(currentUserState);
  const query = useRecoilValue(dashboardQueryState);
  const [focusedId, setFocusedId] = useState<number | null>(null);

  if (!user) return null;

  const filteredSites =
    query === ""
      ? user.sites
      : user.sites?.filter((site) => {
          return (
            site.subdomain?.toLowerCase().includes(query.toLowerCase()) ||
            site.tagline?.toLowerCase().includes(query.toLowerCase())
          );
        });

  function handleFocus(id: number) {
    setFocusedId(id);
  }

  function handleBlur() {
    setFocusedId(null);
  }

  return (
    <div className="mt-8 mb-16 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredSites &&
        filteredSites.map((site, index) => (
          <div
            className={clsx(
              "group relative flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-6 hover:shadow-lg focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800",
              focusedId === index &&
                "border-zinc-800 outline-none ring-1 ring-zinc-800"
            )}
            key={"site" + index}
          >
            <div>
              {site.image ? (
                <img
                  className="h-12 w-12 rounded-full border border-zinc-200 bg-cover"
                  src={site.image}
                  alt="site profile picture"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-zinc-100" />
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
              <p className="inline rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
                {getBaseUrl() + "/" + site.subdomain}
              </p>
            </div>
            <a
              href={`${getBaseUrl()}/${site.subdomain}`}
              target="_blank"
              rel="noopener"
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-3xl border border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
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
