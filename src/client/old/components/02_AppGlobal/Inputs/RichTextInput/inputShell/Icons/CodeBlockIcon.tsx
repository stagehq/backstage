import React from "react";

const CodeBlockIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="32"
      width="32"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1373_3256)">
        <path
          d="M12.5349 14.1348L10.4023 16.0008L12.5349 17.8667"
          stroke="#0F172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M19.4651 17.8672L21.5977 16.0012L19.4651 14.1352"
          stroke="#0F172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M16.8945 12.002L15.1007 20.0003"
          stroke="#0F172A"
          strokeLinecap="round"
          strokeWidth="2"
        />
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
      </g>
      <defs>
        <clipPath id="clip0_1373_3256">
          <rect height="32" width="32" fill="white" rx="6" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CodeBlockIcon;
