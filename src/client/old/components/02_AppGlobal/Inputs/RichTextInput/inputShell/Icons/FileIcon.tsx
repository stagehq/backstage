import React from "react";

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M14 6C16.7614 6 19 8.23858 19 11V18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18V13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13V18C15 18.5523 15.4477 19 16 19C16.5523 19 17 18.5523 17 18V11C17 9.34315 15.6569 8 14 8C12.3431 8 11 9.34315 11 11V19C11 21.7614 13.2386 24 16 24C18.7614 24 21 21.7614 21 19V13C21 12.4477 21.4477 12 22 12C22.5523 12 23 12.4477 23 13V19C23 22.866 19.866 26 16 26C12.134 26 9 22.866 9 19V11C9 8.23858 11.2386 6 14 6Z"
        fill="#0F172A"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default FileIcon;
