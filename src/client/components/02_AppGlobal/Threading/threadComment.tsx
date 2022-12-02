import { FC, useState } from "react";
import {
  ParentType,
  ThreadComment,
  User,
} from "../../../graphql/types.generated";
import RichTextInput from "../Inputs/RichTextInput";
import ReactionBar from "../ReactionBar";
import CommentHeader from "./ThreadComponents/commentHeader";

import { useRecoilState } from "recoil";
import { ideaNumberState, ideaState } from "../../../store/idea";
import { projectSlugState } from "../../../store/project";
import { currentUserState } from "../../../store/user";

import { updateThreadCommentReactionsLocalState } from "./ThreadComponents/reactionHelper";

import { useCreateReactionMutation } from "../../../graphql/createReaction.generated";
import { useDeleteReactionMutation } from "../../../graphql/deleteReaction.generated";
import { useUpdateReactionMutation } from "../../../graphql/updateReaction.generated";

import { useUpdateThreadCommentMutation } from "../../../graphql/updateThreadComment.generated";
import { updateThreadCommentHelper } from "./ThreadComponents/threadCommentHelper";

interface ThreadCommentItemProps {
  commentId: string;
  threadComment: ThreadComment;
  users: User[];
}

const ThreadCommentItem: FC<ThreadCommentItemProps> = ({
  threadComment,
  users,
  commentId,
}) => {
  const [currentUser] = useRecoilState(currentUserState);
  const [ideaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const [idea, setIdea] = useRecoilState(ideaState([ideaNumber, projectSlug]));
  const [hover, setHover] = useState(false);
  const [richText, setRichText] = useState<string>("");
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const [, createReaction] = useCreateReactionMutation();
  const [, updateReaction] = useUpdateReactionMutation();
  const [, deleteReaction] = useDeleteReactionMutation();

  const [, updateThreadComment] = useUpdateThreadCommentMutation();

  const handleSaveEditor = () => {
    console.log(richText);
  };

  async function handleReactionBarAction(unified: string, fromPicker: boolean) {
    if (idea && threadComment) {
      //update Local state of comments in idea
      updateThreadCommentReactionsLocalState(
        idea,
        commentId,
        threadComment.id,
        unified,
        fromPicker,
        currentUser as User,
        setIdea,
        createReaction,
        updateReaction,
        deleteReaction
      );
    }
  }

  const handleThreadCommentUpdate = () => {
    setReadOnly(true);
    updateThreadCommentHelper(richText, threadComment.id, updateThreadComment);
  };

  return (
    <div>
      <div className="flex ml-3 gap-2">
        <div className="w-6 flex flex-col items-center">
          <div className="bg-slate-300 h-[12px] w-[1px]" />
          {threadComment.creator?.image ? (
            <img
              className="h-6 w-6 flex-shrink-0 rounded-full bg-slate-500"
              referrerPolicy="no-referrer"
              src={threadComment.creator.image}
              alt="comment creator image"
            />
          ) : (
            <div className="h-6 w-6 bg-slate-200" />
          )}
          <div className="bg-slate-300 h-[calc(100%_-_36px)] w-[1px]" />
        </div>
        <div
          className="bg-white rounded-lg pr-3 pl-4 pt-2 pb-2 flex flex-col gap-2 grow max-w-[calc(100%_-_32px)]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {threadComment?.creator?.alias && threadComment.createdAt && (
            <CommentHeader
              alias={threadComment.creator.alias}
              isHovered={hover}
              isThreadable={false}
              createdAt={threadComment.createdAt}
              handleReactionBarAction={handleReactionBarAction}
              reactionNumber={
                threadComment.reactions?.length
                  ? threadComment.reactions?.length
                  : 0
              }
              isCurrentUser={
                currentUser?.email === threadComment.creator.email
                  ? true
                  : false
              }
              parentType={ParentType.Comment}
              commentId={commentId}
              commentOrThreadCommentId={threadComment.id}
              setReadOnly={setReadOnly}
            />
          )}
          <RichTextInput
            users={users}
            setRichText={setRichText}
            handleSaveEditor={handleSaveEditor}
            readOnly={readOnly}
            customInitialValue={threadComment.content as string}
            containerSize="small"
            initialPlaceholder="Write a comment ..."
            withSendButton={true}
            sendButtonText="Save"
            isNewInputField={false}
            handleSend={handleThreadCommentUpdate}
          />

          {threadComment.reactions && threadComment.reactions.length >= 1 && (
            <ReactionBar
              onlyPicker={false}
              reactions={threadComment.reactions}
              handleReactionBarAction={handleReactionBarAction}
            />
          )}
        </div>
      </div>
      <div className="w-6 flex flex-col items-center ml-3">
        <div className="w-[1px] h-2 bg-slate-300" />
      </div>
    </div>
  );
};

export default ThreadCommentItem;
