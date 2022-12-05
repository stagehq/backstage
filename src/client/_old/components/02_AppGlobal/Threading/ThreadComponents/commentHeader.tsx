import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC } from "react";
import { ParentType } from "../../../../../graphql/types.generated";
import { timeAgo } from "../../../../../helper/time";
import ReactionBar from "../../ReactionBar";
import AddThreadCommentIcon from "./icons/addThreadComment";
import MenuIcon from "./icons/menu";

import { useRecoilState } from "recoil";
import { ideaNumberState, ideaState } from "../../../../../store/idea";
import { projectSlugState } from "../../../../../store/project";

import { useDeleteThreadCommentMutation } from "../../../../../graphql/deleteThreadComment.generated";
import { deleteThreadCommentHelper } from "./threadCommentHelper";

interface CommentHeaderProps {
  image?: string;
  alias: string;
  isHovered: boolean;
  createdAt: string;
  handleReactionBarAction: (unified: string, fromPicker: boolean) => void;
  reactionNumber: number;
  isThreadable: boolean;
  isCurrentUser: boolean;
  addThreadCommentId?: () => void;
  threadInputOpen?: boolean;
  parentType: ParentType;
  commentId: string;
  commentOrThreadCommentId: string;
  setReadOnly: (value: boolean) => void;
}

const CommentHeader: FC<CommentHeaderProps> = ({
  image,
  alias,
  isHovered,
  createdAt,
  handleReactionBarAction,
  reactionNumber,
  isThreadable,
  isCurrentUser,
  addThreadCommentId,
  threadInputOpen,
  parentType,
  commentId,
  commentOrThreadCommentId,
  setReadOnly,
}) => {
  const [ideaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const [idea, setIdea] = useRecoilState(ideaState([ideaNumber, projectSlug]));

  const [, deleteThreadComment] = useDeleteThreadCommentMutation();

  const handleDelete = () => {
    switch (parentType) {
      case ParentType.Idea:
        break;
      case ParentType.Comment:
        if (idea)
          deleteThreadCommentHelper(
            idea,
            setIdea,
            commentId,
            commentOrThreadCommentId,
            deleteThreadComment
          );
    }
  };

  return (
    <div className="flex justify-between h-8">
      <div className="flex gap-2 items-center">
        {image && (
          <img
            className="h-6 w-6 flex-shrink-0 rounded-full bg-slate-500"
            referrerPolicy="no-referrer"
            src={image}
            alt="comment creator image"
          />
        )}
        <div className="text-sm text-slate-800 font-medium">{alias}</div>
        <div className="text-sm text-slate-600 font-regular">
          {timeAgo(createdAt).toString()}
        </div>
      </div>
      {isHovered && (
        <div className="flex items-center gap-1">
          {isThreadable && !threadInputOpen && (
            <div
              onClick={() => addThreadCommentId && addThreadCommentId()}
              className="cursor-pointer rounded-lg h-8 w-8 flex justify-center items-center hover:bg-slate-100"
            >
              <AddThreadCommentIcon color="#64748B" />
            </div>
          )}
          {reactionNumber == 0 && (
            <ReactionBar
              onlyPicker={true}
              handleReactionBarAction={handleReactionBarAction}
            />
          )}
          {isCurrentUser && (
            <div className="z-10">
              <Menu as="div" className="flex-shrink-0 relative">
                <div>
                  <Menu.Button className="bg-white rounded-lg flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="cursor-pointer rounded-lg h-8 w-8 flex justify-center items-center hover:bg-slate-100">
                      <MenuIcon color="#64748B" />
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none cursor-pointer">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setReadOnly(false)}
                          className={clsx(
                            active ? "bg-gray-100" : "",
                            "block py-2 px-4 text-sm text-gray-700"
                          )}
                        >
                          Edit
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => handleDelete()}
                          className={clsx(
                            active ? "bg-gray-100" : "",
                            "block py-2 px-4 text-sm text-gray-700"
                          )}
                        >
                          Delete
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentHeader;
