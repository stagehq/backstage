import React from "react";

const ItalicIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M12.1719 7.9375L11.832 9.82422H15.7227L13.4141 23.125H9.53516L9.20703 25H19.2266L19.5547 23.125H15.582L17.8906 9.82422H21.8516L22.1914 7.9375H12.1719Z"
        fill="#0F172A"
      />
    </svg>
  );
};

export default ItalicIcon;
