import { FC } from "react";
import { GradientArea } from "./Login";
import LoginCard from "./LoginCard";

const Onboarding: FC = () => {  
  return (
    <LoginCard>
      <div className="flex flex-col h-full sm:min-h-[530px]">
        <OnboardingStart />
      </div>
    </LoginCard>
  );
};

export default Onboarding;

const OnboardingStart = () => {
  return (
    <>
      <GradientArea />
      <div className="mt-auto py-8 px-4 sm:px-10">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <div className="flex flex-col justify-start items-start gap-2">
              <p className="text-xl font-semibold text-left text-zinc-900">
                Welcome on Stage
              </p>
              <p className="text-xs font-medium text-left text-zinc-500">
                Let’s get started, by connecting some API’s to your developer
                portfolio.
              </p>
              <button
                type="submit"
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
