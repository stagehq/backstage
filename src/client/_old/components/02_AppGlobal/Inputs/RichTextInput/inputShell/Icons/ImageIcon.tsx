import React from "react";

const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M7 5C5.89543 5 5 5.89543 5 7V25C5 26.1046 5.89543 27 7 27H25C26.1046 27 27 26.1046 27 25V7C27 5.89543 26.1046 5 25 5H7ZM9.62609 24H22.382C23.1253 24 23.6088 23.2177 23.2764 22.5528L20.133 16.266C19.8242 15.6483 18.9972 15.5221 18.5182 16.0195L16.0182 18.6158C15.7109 18.9349 15.2302 19.0138 14.837 18.8096L12.3972 17.5428C11.9033 17.2863 11.295 17.4824 11.0439 17.9791L8.73365 22.5488C8.39738 23.214 8.88076 24 9.62609 24Z"
        fill="#0F172A"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ImageIcon;
