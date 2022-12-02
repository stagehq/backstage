import { FC } from "react";

interface projectCreateFormProps {
  children: React.ReactNode;
}

const ProjectCreateForm: FC<projectCreateFormProps> = (props) => {
  return (
    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 overflow-y-auto no-scrollbar">
      <form className="space-y-2">{props.children}</form>
    </div>
  );
};

export { ProjectCreateForm };
