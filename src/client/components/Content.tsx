import { FC } from "react";

interface ContentProps {
  children: React.ReactNode;
}

const Content: FC<ContentProps> = ({ children }) => {
  return (
    <div className="w-full h-full bg-neutral-50 border-t border-zinc-200">
      { children }
    </div>
  );
};

export default Content;
