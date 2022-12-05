import { FC } from "react";

interface MenuIconProps {
  color: string;
}

const MenuIcon: FC<MenuIconProps> = ({ color }) => {
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
        strokeWidth="2.001"
        d="M2.993 9.999h.01m6.994 0h.01m6.995 0h.01m-13.019 0a1 1 0 11-2.001 0 1 1 0 012.001 0v0zm7.005 0a1 1 0 11-2.002 0 1 1 0 012.002 0v0zm7.005 0a1 1 0 11-2.002 0 1 1 0 012.002 0v0z"
      ></path>
    </svg>
  );
};

export default MenuIcon;
