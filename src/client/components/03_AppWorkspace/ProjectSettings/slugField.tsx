import { FC } from "react";

interface SlugFieldProps {
  label: string;
  name: string;
  value: string;
}

const SlugField: FC<SlugFieldProps> = ({ label, name, value }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md pointer-events-none">
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          disabled={true}
          className="block w-full pr-10 sm:text-sm rounded-md focus:outline-none placeholder-grey-300 bg-gray-100 text-gray-600 cursor-default pointer-events-none"
          aria-invalid="true"
          aria-describedby={name + "-error"}
        />
      </div>
    </div>
  );
};

export { SlugField };
