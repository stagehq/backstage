const Logo = () => {
  /* TODO: When we have a logo, we can use it here, but check all references in the UI if they get rendered correctly. */
  return (
    <div
      className="relative flex h-20 w-20 flex-shrink-0 flex-grow-0 items-center justify-center gap-[20.000001907348633px] rounded-[20px]"
      style={{ boxShadow: "0px 2.6666667461395264px 16px 0 rgba(0,0,0,0.04)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        fill="none"
        viewBox="0 0 400 400"
        className="rounded-[20px]"
      >
        <path
          fill="#18181B"
          d="M0 0H400V400H0z"
          transform="matrix(-1 0 0 1 400 0)"
        ></path>
        <path
          fill="url(#paint0_radial_350_51489)"
          d="M317.083 295.583L201 80 84.917 295.583h232.166z"
        ></path>
        <path
          fill="url(#paint1_radial_350_51489)"
          d="M317.083 295.583L201 80 84.917 295.583h232.166z"
        ></path>
        <ellipse
          cx="116.083"
          cy="24.875"
          fill="#D4D4D8"
          rx="116.083"
          ry="24.875"
          transform="matrix(-1 0 0 1 317.083 270.708)"
        ></ellipse>
        <defs>
          <radialGradient
            id="paint0_radial_350_51489"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 -211.437 227.702 0 201 295.583)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E4E4E7" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#E4E4E7"></stop>
          </radialGradient>
          <radialGradient
            id="paint1_radial_350_51489"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(0 -215.583 232.167 0 201 295.583)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.625" stopColor="#E4E4E7" stopOpacity="0"></stop>
            <stop offset="1" stopColor="#E4E4E7"></stop>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
