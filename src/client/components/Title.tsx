import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/user";

const Title = () => {
  // get current user from recoil state
  const user = useRecoilValue(currentUserState);

  if (!user) return null;

  return (
    <div className="flex justify-between items-end w-full mt-10 mb-4">
      <p className="text-xl lg:text-2xl font-semibold text-left text-zinc-900">
        {user.firstName}'s sites
      </p>
    </div>
  );
};

export default Title;
