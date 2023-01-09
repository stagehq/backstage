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
    <div className="flex justify-between items-end w-full mt-10 mb-4">
      <p className="text-xl lg:text-2xl font-semibold text-left text-zinc-900">
        {user.firstName}'s portfolio website
      </p>
    </div>
  );
};

export default Title;
