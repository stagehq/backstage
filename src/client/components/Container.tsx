import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-start items-start max-w-3xl px-2 sm:px-4 w-full mx-auto">
      {children}
    </div>
  )
}

export default Container;