import React from "react";

const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="32"
      width="32"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 13L7 16.5L11 20"
        stroke="#0F172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M21 20L25 16.5L21 13"
        stroke="#0F172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M17.6797 9L14.315 24.0024"
        stroke="#0F172A"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CodeIcon;
