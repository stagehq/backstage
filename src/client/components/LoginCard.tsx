const LoginCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex flex-col justify-center sm:py-36 sm:px-6 lg:px-8">
      <div className="sm:mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="min-h-[530px] bg-white sm:border sm:border-white sm:shadow-[0_4px_100px_0_rgba(0,0,0,0.08)] shadow-zinc-400 sm:rounded-2xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
