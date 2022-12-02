import { FC } from "react";

interface AddThreadCommentIconProps {
  color: string;
}

const AddThreadCommentIcon: FC<AddThreadCommentIconProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.778"
        d="M5.556 6.444h8.888M5.556 10H9.11M10 17.11l-3.556-3.555H3.778A1.778 1.778 0 012 11.778V4.666A1.778 1.778 0 013.778 2.89h12.444A1.778 1.778 0 0118 4.666v7.112a1.778 1.778 0 01-1.778 1.777h-2.666L10 17.111z"
      ></path>
    </svg>
  );
};

export default AddThreadCommentIcon;
