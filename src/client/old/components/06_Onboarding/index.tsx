import { FC } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../store/user";
import { Profile } from "../02_AppGlobal/Settings/Profile";

const Onboarding: FC = () => {
  const [currentUser] = useRecoilState(currentUserState);
  return (
    <div className="flex flex-col">
      <div className="sm:overflow-hidden">
        <div className="bg-white py-6 px-4 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h1 className="text-2xl font-medium text-gray-900">
                Welcome to Zirkular!
              </h1>
              <p className="mt-1 text-sm text-blue-gray-500">
                Happy that you joined the open source movement 🥳
              </p>
              <p className="mt-4 text-sm text-blue-gray-500">
                Please provide these additional information in order to set up
                your account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {currentUser && <Profile user={currentUser} />}
    </div>
  );
};

export default Onboarding;
