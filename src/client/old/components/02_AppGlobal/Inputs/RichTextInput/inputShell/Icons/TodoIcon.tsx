import React from "react";

const TodoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="32"
      width="32"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        height="20"
        width="20"
        rx="1"
        stroke="#0F172A"
        strokeLinejoin="round"
        strokeWidth="2"
        x="6"
        y="6"
      />
      <path
        d="M11 15.8889L14.3333 19L21 12"
        stroke="#0F172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default TodoIcon;
