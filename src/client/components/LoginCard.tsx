import Gradient from "./Gradient";
import Logo from "./Logo";

const LoginCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex flex-col justify-center sm:py-36 sm:px-6 lg:px-8">
      <div className="sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white sm:border sm:border-white sm:shadow-[0_4px_100px_0_rgba(0,0,0,0.08)] shadow-zinc-400 sm:rounded-lg overflow-hidden">
          <div className="relative h-64">
            <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
              <Logo />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
            <Gradient />
          </div>
          <div className="py-8 px-4 sm:px-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
