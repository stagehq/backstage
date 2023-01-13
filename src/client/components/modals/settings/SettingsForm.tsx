import { FC } from "react";

interface SettingsFormProps {
  children: React.ReactNode;
}

const SettingsForm: FC<SettingsFormProps> = (props) => {
  return (
    <div className="no-scrollbar space-y-6 overflow-y-auto sm:px-6 lg:col-span-9 lg:px-0">
      <form className="space-y-2">{props.children}</form>
    </div>
  );
};

export { SettingsForm };
