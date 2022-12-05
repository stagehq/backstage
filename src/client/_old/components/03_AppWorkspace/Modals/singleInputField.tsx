import { ExclamationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

interface SingleInputFieldProps {
  label: string;
  name: string;
  minCharacter: number;
  maxCharacter: number;
  handleInputField: (value: HandleSingleInputProps) => void;
}

export interface HandleSingleInputProps {
  value: string;
  check: boolean;
}

const SingleInputField: FC<SingleInputFieldProps> = ({
  label,
  name,
  minCharacter,
  maxCharacter,
  handleInputField,
}) => {
  /* Field */
  const [fieldValue, setFieldValue] = useState<string>("");

  /* Checks */
  const [maxCharExeeded, setMaxCharExeeded] = useState<boolean>(false);
  const [minCharBelow, setMinCharBelow] = useState<boolean>(false);

  /* Generel Check*/
  const [check, setCheck] = useState<boolean>(false);

  /* Make the individual checks */
  useEffect(() => {
    fieldValue.length >= maxCharacter
      ? setMaxCharExeeded(true)
      : setMaxCharExeeded(false);
    fieldValue.length <= minCharacter
      ? setMinCharBelow(true)
      : setMinCharBelow(false);
    handleInputField({ value: fieldValue, check: check });
  }, [fieldValue]);

  /* Make the generel check */
  useEffect(() => {
    const checker = [!maxCharExeeded, !minCharBelow].every(
      (check) => check === true
    );
    setCheck(checker);
  }, [maxCharExeeded, minCharBelow, fieldValue]);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          id={name}
          className={clsx(
            "block w-full pr-10 sm:text-sm rounded-md focus:outline-none placeholder-grey-300",
            maxCharExeeded
              ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 text-grey-900 focus:ring-grey-500 focus:border-grey-500"
          )}
          placeholder="Enter your project name ..."
          aria-invalid="true"
          aria-describedby={name + "-error"}
          onChange={(event) => setFieldValue(event.target.value)}
          onFocus={(event) => setFieldValue(event.target.value)}
          onInput={(event) => setFieldValue(event.currentTarget.value)}
        />
        {!check && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-black opacity-30"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {maxCharExeeded && (
        <p className="mt-2 text-sm text-black opacity-50" id={name + "-error"}>
          {"Your project name must be less than " +
            maxCharacter +
            " characters."}
        </p>
      )}
      {minCharBelow && (
        <p className="mt-2 text-sm text-black opacity-50" id={name + "-error"}>
          {"Your project name must be more than " +
            minCharacter +
            " characters."}
        </p>
      )}
    </div>
  );
};

export { SingleInputField };
