import { FC } from "react";

interface AddEmojiIconProps {
  color: string;
}

const AddEmojiIcon: FC<AddEmojiIconProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <g fill={color} clipPath="url(#clip0_2008_6950)">
        <path
          fillRule="evenodd"
          d="M3.506 3.52a6.222 6.222 0 0110.583 5.09l1.752-.319a7.945 7.945 0 10-6.686 7.474v-1.75A6.218 6.218 0 012.158 10.3a6.222 6.222 0 011.349-6.78zm2.038 1.964a.861.861 0 000 1.722h.008a.861.861 0 000-1.722h-.008zm4.723 0a.861.861 0 100 1.722h.008a.861.861 0 100-1.722h-.008zM6.289 9.536a.861.861 0 00-1.218 1.218 4.01 4.01 0 005.67 0 .861.861 0 00-1.219-1.218 2.287 2.287 0 01-3.233 0z"
          clipRule="evenodd"
        ></path>
        <path d="M10.828 14.14a.861.861 0 000 1.722v-1.723zm8.334 1.722a.861.861 0 000-1.723v1.723zm-3.306-5.028a.861.861 0 10-1.723 0h1.723zm-1.723 8.333a.861.861 0 101.723 0h-1.723zm-3.305-3.305h4.167v-1.723h-4.167v1.723zm4.167 0h4.167v-1.723h-4.167v1.723zm.861-.861v-4.167h-1.723v4.167h1.723zm-1.723-4.167v8.333h1.723v-8.333h-1.723z"></path>
      </g>
      <defs>
        <clipPath id="clip0_2008_6950">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export default AddEmojiIcon;
