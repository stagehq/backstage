import { FC, useState } from "react";

import clsx from "clsx";
import { Link } from "react-router-dom";
import { User } from "../../../../graphql/types.generated";
import SidebarItemWrapper from "../SidebarItemWrapper";

interface ContributorItemProps {
  participants: User[];
  creator: User;
}

const ContributorItem: FC<ContributorItemProps> = ({
  participants,
  creator,
}) => {
  const myParticipants = participants;
  const [contributorExtended, setContributorExtended] = useState(false);

  return (
    <div className="">
      <SidebarItemWrapper
        title="Contributor"
        number={myParticipants.length + 1}
      >
        {/* taiwind user info displaying round profile image and name of currentUser */}
        <div
          className={clsx(
            !contributorExtended
              ? "-space-x-1 isolate flex overflow-hidden items-center"
              : "flex gap-2 flex-wrap"
          )}
        >
          <div className="" key={"creator"}>
            {creator?.image ? (
              <Link to={`/app/profile/${creator.alias}`}>
                <img
                  className="h-8 w-8 rounded-full bg-white ring-4 ring-gray-50"
                  src={creator.image}
                  referrerPolicy="no-referrer"
                  alt="profile image"
                />
              </Link>
            ) : (
              <div className="h-8 w-8 rounded-full bg-slate-400" />
            )}
          </div>
          {myParticipants
            .slice(0, contributorExtended ? myParticipants.length : 8)
            .map((user, index) => (
              <div className="" key={index}>
                {user?.image ? (
                  <Link to={`/app/profile/${user.alias}`}>
                    <img
                      className="h-8 w-8 rounded-full bg-white ring-4 ring-gray-50"
                      src={user.image}
                      referrerPolicy="no-referrer"
                      alt="profile image"
                    />
                  </Link>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-slate-400" />
                )}
              </div>
            ))}
          {myParticipants.length >= 8 && (
            <div
              onClick={() =>
                setContributorExtended(contributorExtended ? false : true)
              }
              className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-200 ring-4 ring-gray-50 text-sm font-normal text-slate-600"
            >
              {contributorExtended ? (
                <img
                  alt="minimize"
                  className="h-4 w-4"
                  src="/icons/icon-minimize.svg"
                ></img>
              ) : (
                <div>+{myParticipants.length - 8}</div>
              )}
            </div>
          )}
        </div>
      </SidebarItemWrapper>
    </div>
  );
};

export default ContributorItem;
