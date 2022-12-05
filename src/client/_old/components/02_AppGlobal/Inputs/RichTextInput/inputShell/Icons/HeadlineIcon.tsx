import React from "react";

const HeadlineIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M8.51136 25V7.54545H11.1449V15.1307H19.8466V7.54545H22.4886V25H19.8466V17.3892H11.1449V25H8.51136Z"
        fill="#0F172A"
      />
    </svg>
  );
};

export default HeadlineIcon;
