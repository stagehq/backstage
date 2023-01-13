import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserState } from "../store/user";

const Breadcrumb = () => {
  const { siteId } = useParams();
  const [currentUser] = useRecoilState(currentUserState);

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-1">
      <Link to={`/s`}>
        <div className="flex h-8 w-8 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-1 py-[3px]">
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 flex-grow-0"
            preserveAspectRatio="none"
          >
            <path
              d="M9.60541 16.5351C9.24541 16.8151 8.7354 16.8151 8.37541 16.5351L2.22541 11.7551C2.05118 11.619 1.83647 11.5451 1.61541 11.5451C1.39434 11.5451 1.17963 11.619 1.00541 11.7551C0.886292 11.8484 0.789965 11.9675 0.723719 12.1035C0.657473 12.2395 0.623047 12.3888 0.623047 12.5401C0.623047 12.6914 0.657473 12.8407 0.723719 12.9767C0.789965 13.1127 0.886292 13.2319 1.00541 13.3251L7.76541 18.5851C8.48541 19.1451 9.49541 19.1451 10.2254 18.5851L16.9854 13.3251C17.4954 12.9251 17.4954 12.1551 16.9854 11.7551L16.9754 11.7451C16.8012 11.609 16.5865 11.5351 16.3654 11.5351C16.1443 11.5351 15.9296 11.609 15.7554 11.7451L9.60541 16.5351ZM10.2354 13.5151L16.9954 8.25512C17.5054 7.85512 17.5054 7.07512 16.9954 6.67512L10.2354 1.41512C9.5154 0.855117 8.50541 0.855117 7.77541 1.41512L1.01541 6.68512C0.505406 7.08512 0.505406 7.86512 1.01541 8.26512L7.77541 13.5251C8.49541 14.0851 9.5154 14.0851 10.2354 13.5151Z"
              fill="#27272A"
            ></path>
          </svg>
        </div>
      </Link>
      {siteId && (
        <div className="flex items-center">
          <div className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="#A1A1AA"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.5 3l5 5-5 5"
              ></path>
            </svg>
          </div>
          <Link to={`/s/${siteId}`}>
            <div className="flex h-8 items-center rounded px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900">
              <p>{`${currentUser.firstName}'s sites`}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
