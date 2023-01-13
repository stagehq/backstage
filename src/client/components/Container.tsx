import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-start justify-start px-2 sm:w-full sm:px-4 md:w-[750] lg:w-[1200px]">
      {children}
    </div>
  );
};

export default Container;
