import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { siteSlugState, siteState } from "../store/site";
import { currentUserState } from "../store/user";

const Title = () => {
  // get current user from recoil state
  const user = useRecoilValue(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  if (!user) return null;

  return (
    <div className="flex justify-between items-end w-full mt-10">
      <div className="flex flex-col justify-start items-start relative gap-[3px]">
        <p className="text-xl lg:text-2xl font-semibold text-left text-zinc-900">
          {user.firstName}'s portfolio website
        </p>
        <div className="flex justify-start items-center relative gap-3">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 motion-safe:animate-pulse"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle cx="7" cy="7.5" r="7" fill="#04D187"></circle>
          </svg>
          <p className="text-sm font-medium text-left text-zinc-500">
            Created 2 weeks ago
          </p>
        </div>
      </div>
      <Link key="editing" to={"/s/" + site?.subdomain}>
        <div className="flex justify-start items-start relative gap-2 px-4 py-2 rounded border border-zinc-200 hover:bg-zinc-100 cursor-pointer text-zinc-700 hover:text-zinc-900">
          <p className="text-sm font-medium text-left">Edit</p>
        </div>
      </Link>
    </div>
  );
};

export default Title;
