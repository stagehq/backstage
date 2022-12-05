import Link from "next/link";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../../store/user";
import SidebarItemWrapper from "../SidebarItemWrapper";

interface AuthorItemProps {
  authorName?: string;
  authorImgPath?: string | null;
  authorAlias?: string;
  creationDate?: string | number | Date;
}

const AuthorItem: FC<AuthorItemProps> = ({
  authorName,
  authorImgPath,
  authorAlias,
  creationDate,
}) => {
  const [currentUser] = useRecoilState(currentUserState);
  if (!authorName) {
    authorName = currentUser?.name ? currentUser.name : "";
    authorImgPath = currentUser?.image ? currentUser.image : "";
    authorAlias = currentUser?.alias ? currentUser.alias : "";
  }
  return (
    <div className="">
      <SidebarItemWrapper title="Author">
        {/* taiwind user info displaying round profile image and name of currentUser */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {authorImgPath ? (
              <Link href={`/profile/${authorAlias}`}>
                <img
                  className="h-8 w-8 rounded-full"
                  src={authorImgPath}
                  referrerPolicy="no-referrer"
                  alt="profile image"
                />
              </Link>
            ) : (
              <div className="h-8 w-8 rounded-full bg-slate-400" />
            )}
            <div className="ml-3">
              <Link href={`/profile/${authorAlias}`}>
                <p className="text-sm font-medium text-gray-800">
                  {authorName}
                </p>
              </Link>
              {creationDate && (
                <div className="text-sm font-regular text-gray-600">
                  created {creationDate}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarItemWrapper>
    </div>
  );
};

export default AuthorItem;
