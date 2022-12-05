import { FC } from "react";

interface inputFieldWrapperProps {
  children: React.ReactNode;
  title: string;
}

const InputFieldWrapper: FC<inputFieldWrapperProps> = ({ children, title }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="text-gray-600 text-sm font-medium">{title}</div>
      {children}
    </div>
  );
};

export default InputFieldWrapper;
