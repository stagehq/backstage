import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/user";

export default function GridList() {
  const user = useRecoilValue(currentUserState);

  if (!user) return null;

  return (
    <div className="mt-8 mb-16 sm:grid sm:grid-cols-2 gap-4 w-full">
      {user?.sites &&
        user.sites.map((site) => (
          <div
            key={site.id}
            className="relative group bg-white p-6 border border-zinc-200 rounded-lg hover:shadow-lg"
          >
            {user.image && (
              <img
                className="w-12 h-12 bg-cover rounded-full border border-zinc-200"
                src={user.image}
                alt="site profile picture"
              />
            )}
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                {site.subdomain && (
                  <Link
                    to={"/s/" + site.subdomain}
                    className="focus:outline-none"
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {site.tagline}
                  </Link>
                )}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{site.bio}</p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
    </div>
  );
}
