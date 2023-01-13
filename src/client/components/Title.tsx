import { useRecoilValue } from "recoil";
import { currentUserState } from "../store/user";

const Title = () => {
  // get current user from recoil state
  const user = useRecoilValue(currentUserState);

  if (!user) return null;

  return (
    <div className="mt-10 mb-4 flex w-full items-end justify-between">
      <p className="text-left text-xl font-semibold text-zinc-900 lg:text-2xl">
        {user.firstName}'s sites
      </p>
    </div>
  );
};

export default Title;
