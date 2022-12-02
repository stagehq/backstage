import { FC } from "react";

interface SimpleInputProps {
  text: string;
  setText: (value: string) => void;
  autoFocus: boolean;
}

const SimpleInput: FC<SimpleInputProps> = ({ text, setText, autoFocus }) => {
  const handleChange = (value: string) => {
    setText(value);
  };

  return (
    <div>
      <input
        autoFocus={autoFocus}
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="placeholder:text-slate-400 shadow-sm focus-within:ring-indigo-600 focus-within:ring-[1px] block w-full h-[40px] sm:text-sm border-slate-300 rounded-md"
        placeholder="Enter a idea name"
      />
    </div>
  );
};

export default SimpleInput;
