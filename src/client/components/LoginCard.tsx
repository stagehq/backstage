const LoginCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full flex-col justify-center sm:py-36 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:mt-8 sm:w-full sm:max-w-sm">
        <div className="h-screen overflow-hidden bg-white shadow-zinc-400 sm:h-full sm:min-h-[530px] sm:rounded-2xl sm:border sm:border-white sm:shadow-[0_4px_100px_0_rgba(0,0,0,0.08)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
