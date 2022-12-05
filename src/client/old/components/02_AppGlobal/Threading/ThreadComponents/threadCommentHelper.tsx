import { decodeGlobalID } from "@pothos/plugin-relay";
import produce from "immer";
import { CreateThreadCommentMutationVariables } from "../../../../graphql/createThreadComment.generated";
import { DeleteThreadCommentMutationVariables } from "../../../../graphql/deleteThreadComment.generated";
import { Idea, ThreadComment, User } from "../../../../graphql/types.generated";
import { UpdateThreadCommentMutationVariables } from "../../../../graphql/updateThreadComment.generated";

export const createThreadCommentHelper = (
  idea: Idea,
  commentId: string,
  content: string,
  setIdea: (value: Idea) => void,
  createThreadComment: (
    variables?: CreateThreadCommentMutationVariables
  ) => any,
  currentUser: User
) => {
  //local State
  const temporaryID = String(Date.now());
  console.log(temporaryID);
  const nextIdeaState = produce(idea, (draftState) => {
    const comment = draftState.comments?.find(
      (comment) => comment.id === commentId
    );
    const newCreatedAt = new Date(Date.now()).toUTCString();
    const newThreadComment: ThreadComment = {
      id: temporaryID,
      content: content,
      creator: currentUser,
      createdAt: newCreatedAt,
      reactions: [],
    };
    comment?.threadComment?.push(newThreadComment);
  });
  setIdea(nextIdeaState);

  //DataBase
  if (content !== "") {
    createThreadComment({
      commentId: decodeGlobalID(commentId).id,
      content: content as string,
      //@ts-ignore
    }).then((result) => {
      console.log(result);
      if (!result.error) {
        const nextCommentState = produce(nextIdeaState, (draftState) => {
          const threadComment = draftState.comments
            ?.find((c) => c.id === commentId)
            ?.threadComment?.find((c) => c.id === temporaryID);
          if (threadComment)
            threadComment.id = result.data.createThreadComment.id;
        });
        setIdea(nextCommentState);
      }
    });
  }
};

export const deleteThreadCommentHelper = (
  idea: Idea,
  setIdea: (value: Idea) => void,
  commentId: string,
  threadCommentId: string,
  deleteThreadComment: (variables?: DeleteThreadCommentMutationVariables) => any
) => {
  const nextIdeaState = produce(idea, (draftState) => {
    const comment = draftState?.comments?.find(
      (comment) => comment.id === commentId
    );
    const threadCommentIndex = draftState?.comments
      ?.find((comment) => comment.id === commentId)
      ?.threadComment?.findIndex(
        (threadComment) => threadComment.id === threadCommentId
      );
    if (threadCommentIndex != undefined && threadCommentIndex !== -1)
      comment?.threadComment?.splice(threadCommentIndex, 1);
  });
  setIdea(nextIdeaState);
  deleteThreadComment({
    threadCommentId: decodeGlobalID(threadCommentId).id,
    //@ts-ignore
  }).then((result) => {
    console.log(result);
  });
};

export const updateThreadCommentHelper = (
  content: string,
  threadCommentId: string,
  updateThreadComment: (variables: UpdateThreadCommentMutationVariables) => any
) => {
  updateThreadComment({
    content: content,
    threadCommentId: decodeGlobalID(threadCommentId).id,
    //@ts-ignore
  }).then((result) => {
    console.log(result);
  });
};
