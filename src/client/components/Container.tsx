import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-start items-start sm:w-full md:w-[750] lg:w-[1200px] px-2 sm:px-4 w-full mx-auto min-h-screen">
      {children}
    </div>
  );
};

export default Container;
