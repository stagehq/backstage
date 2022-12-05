import React from "react";

const MarkdownIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="32"
      width="32"
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1373_3467)">
        <rect
          height="16.2484"
          width="22.7477"
          rx="0.812419"
          stroke="#0F172A"
          strokeLinejoin="round"
          strokeWidth="1.62484"
          x="4.62492"
          y="7.87687"
        />
        <path
          d="M7.45594 11.4156H9.61277L11.8908 16.9733H11.9877L14.2657 11.4156H16.4225V19.6875H14.7262V14.3035H14.6575L12.5168 19.6471H11.3617L9.22099 14.2833H9.15232V19.6875H7.45594V11.4156Z"
          fill="#0F172A"
        />
        <path
          d="M21.6873 12.75V19.2493M21.6873 19.2493L24.1245 16.6496M21.6873 19.2493L19.25 16.6496"
          stroke="#0F172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.62484"
        />
      </g>
      <defs>
        <clipPath id="clip0_1373_3467">
          <rect
            height="19.498"
            width="25.9974"
            fill="white"
            transform="translate(3.00391 6.25)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MarkdownIcon;
