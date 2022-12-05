import produce from "immer";
import { FC, useEffect, useState } from "react";
import { Comment, ParentType, User } from "../../../../graphql/types.generated";
import RichTextInput from "../Inputs/RichTextInput";
import ReactionBar from "../ReactionBar";
import CommentHeader from "./ThreadComponents/commentHeader";

import { useRecoilState } from "recoil";
import { ideaNumberState, ideaState } from "../../../../store/idea";
import { projectSlugState } from "../../../../store/project";
import { currentUserState } from "../../../../store/user";

import { updateCommentReactionsLocalState } from "./ThreadComponents/reactionHelper";

import { firstThreadCommentsStatesProps } from ".";
import { useCreateReactionMutation } from "../../../../graphql/createReaction.generated";
import { useDeleteReactionMutation } from "../../../../graphql/deleteReaction.generated";
import { useUpdateReactionMutation } from "../../../../graphql/updateReaction.generated";

interface CommentItemProps {
  comment: Comment;
  users: User[];
  firstThreadCommentsStates: firstThreadCommentsStatesProps;
  setFirstThreadCommentsStates: (value: firstThreadCommentsStatesProps) => void;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  users,
  firstThreadCommentsStates,
  setFirstThreadCommentsStates,
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

  const handleSaveEditor = () => {
    console.log(richText);
  };

  async function handleReactionBarAction(unified: string, fromPicker: boolean) {
    if (idea && comment) {
      //update Local state of comments in idea
      updateCommentReactionsLocalState(
        idea,
        comment.id,
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

  //handle Open Thread Comment
  let threadInputOpen = false;
  threadInputOpen =
    firstThreadCommentsStates.commentIds.find(
      (commentId) => commentId === comment.id
    ) !== undefined
      ? true
      : false;
  useEffect(() => {
    if (comment.threadComment && comment.threadComment.length >= 1) {
      if (
        firstThreadCommentsStates?.commentIds.find(
          (commentId) => commentId === comment.id
        ) === undefined
      ) {
        const nextThreadCommentState = produce(
          firstThreadCommentsStates,
          (draftState) => {
            draftState?.commentIds.push(comment.id);
          }
        );
        if (nextThreadCommentState)
          setFirstThreadCommentsStates(nextThreadCommentState);
      }
    }
  }, [firstThreadCommentsStates, comment, setFirstThreadCommentsStates]);
  const addThreadCommentId = () => {
    const nextThreadCommentState = produce(
      firstThreadCommentsStates,
      (draftState) => {
        draftState?.commentIds.push(comment.id);
      }
    );
    if (nextThreadCommentState)
      setFirstThreadCommentsStates(nextThreadCommentState);
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg px-3 pt-2 pb-2 flex flex-col gap-2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {comment.creator?.image &&
          comment.creator.alias &&
          comment.createdAt && (
            <CommentHeader
              image={comment.creator.image}
              alias={comment.creator.alias}
              isHovered={hover}
              isThreadable={
                comment.threadComment && comment.threadComment?.length >= 1
                  ? false
                  : true
              }
              createdAt={comment.createdAt}
              handleReactionBarAction={handleReactionBarAction}
              reactionNumber={
                comment.reactions?.length ? comment.reactions?.length : 0
              }
              isCurrentUser={
                currentUser?.email === comment.creator.email ? true : false
              }
              addThreadCommentId={addThreadCommentId}
              threadInputOpen={threadInputOpen}
              parentType={ParentType.Idea}
              commentId={comment.id}
              commentOrThreadCommentId={comment.id}
              setReadOnly={setReadOnly}
            />
          )}
        <div className="w-full pl-8">
          <RichTextInput
            users={users}
            setRichText={setRichText}
            handleSaveEditor={handleSaveEditor}
            readOnly={readOnly}
            customInitialValue={comment.content as string}
            containerSize="small"
            initialPlaceholder="Write a comment ..."
            withSendButton={true}
            sendButtonText="Comment"
            isNewInputField={false}
          />
        </div>

        {comment.reactions && comment.reactions.length >= 1 && (
          <div className="w-full pl-8">
            <ReactionBar
              onlyPicker={false}
              reactions={comment.reactions}
              handleReactionBarAction={handleReactionBarAction}
            />
          </div>
        )}
      </div>
      {threadInputOpen && (
        <div className="flex flex-col items-center w-6 ml-3">
          <div className="bg-slate-300 w-[6px] h-[6px] rounded-full -mt-[3px]" />
          <div className="bg-slate-300 h-2 w-[1px]" />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
