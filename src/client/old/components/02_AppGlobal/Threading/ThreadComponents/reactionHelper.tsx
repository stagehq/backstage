import { decodeGlobalID } from "@pothos/plugin-relay";
import produce from "immer";
import { CreateReactionMutationVariables } from "../../../../graphql/createReaction.generated";
import { DeleteReactionMutationVariables } from "../../../../graphql/deleteReaction.generated";
import {
  Idea,
  ParentType,
  Reaction,
  User,
} from "../../../../graphql/types.generated";
import { UpdateReactionMutationVariables } from "../../../../graphql/updateReaction.generated";

//---------------- Comment Helper------------------

export const updateCommentReactionsLocalState = (
  idea: Idea,
  commentId: string,
  unified: string,
  fromPicker: boolean,
  currentUser: User,
  setIdea: (value: Idea) => void,
  createReaction: (variables?: CreateReactionMutationVariables) => any,
  updateReaction: (variables?: UpdateReactionMutationVariables) => any,
  deleteReaction: (variables?: DeleteReactionMutationVariables) => any
) => {
  const comments = idea.comments;
  const reaction = comments
    ?.find((comment) => comment.id === commentId)
    ?.reactions?.find((reaction) => reaction.content === unified);
  if (reaction) {
    //reaction already there
    if (reaction.reactionGroup) {
      const user = reaction.reactionGroup.find(
        (user) => user.email === currentUser.email
      );
      if (user) {
        //already reacted with that emoji
        if (reaction.reactionGroup.length > 1) {
          //remove user
          if (!fromPicker) {
            setIdea(
              removeUserCommentReactionsLocalState(
                idea,
                commentId,
                reaction,
                currentUser
              )
            );
            updateReaction({
              content: unified,
              commentId: decodeGlobalID(commentId).id,
              type: ParentType.Comment,
              //@ts-ignore
            }).then((result) => {
              console.log(result);
            });
          }
        } else {
          //delete reaction
          if (!fromPicker) {
            setIdea(
              removeCommentReactionsLocalState(idea, commentId, reaction)
            );
            deleteReaction({
              commentId: decodeGlobalID(commentId).id,
              content: unified,
              type: ParentType.Comment,
              //@ts-ignore
            }).then((result) => {
              console.log(result);
            });
          }
        }
      } else {
        //user not in reaction -> add user
        setIdea(
          addUserCommentReactionsLocalState(
            idea,
            commentId,
            reaction,
            currentUser
          )
        );
        updateReaction({
          content: unified,
          commentId: decodeGlobalID(commentId).id,
          type: ParentType.Comment,
          //@ts-ignore
        }).then((result) => {
          console.log(result);
        });
      }
    }
  } else {
    //reaction not there -> create
    setIdea(
      createCommentReactionsLocalState(idea, commentId, unified, currentUser)
    );
    createReaction({
      content: unified,
      commentId: decodeGlobalID(commentId).id,
      type: ParentType.Comment,
      //@ts-ignore
    }).then((result) => {
      console.log(result);
    });
  }
};

const createCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  unified: string,
  currentUser: User
) => {
  console.log("create Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const nextReactionGroup = [currentUser];
    const comment = draftState.comments?.find(
      (comment) => comment.id === commentId
    );
    comment?.reactions?.push({
      id: "",
      content: unified,
      reactionGroup: nextReactionGroup,
    });
  });

  return nextCommentState;
};

const removeCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  reaction: Reaction
) => {
  console.log("remove Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const comment = draftState.comments?.find(
      (comment) => comment.id === commentId
    );
    const index = comment?.reactions?.findIndex(
      (r) => r.content === reaction.content
    );
    if (index != undefined && index !== -1)
      comment?.reactions?.splice(index, 1);
  });

  return nextCommentState;
};

const addUserCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  reaction: Reaction,
  currentUser: User
) => {
  console.log("add User Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const comment = draftState.comments?.find(
      (comment) => comment.id === commentId
    );
    comment?.reactions
      ?.find((r) => r.id === reaction.id)
      ?.reactionGroup?.push(currentUser);
  });

  return nextCommentState;
};

const removeUserCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  reaction: Reaction,
  currentUser: User
) => {
  console.log("remove User Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const comment = draftState.comments?.find(
      (comment) => comment.id === commentId
    );
    const index = comment?.reactions
      ?.find((r) => r.id === reaction.id)
      ?.reactionGroup?.findIndex((user) => user.email === currentUser.email);
    if (index != undefined && index !== -1)
      comment?.reactions
        ?.find((r) => r.id === reaction.id)
        ?.reactionGroup?.splice(index, 1);
  });

  return nextCommentState;
};

//---------------- Thread Comment Helper------------------

export const updateThreadCommentReactionsLocalState = (
  idea: Idea,
  commentId: string,
  threadCommentId: string,
  unified: string,
  fromPicker: boolean,
  currentUser: User,
  setIdea: (value: Idea) => void,
  createReaction: (variables?: CreateReactionMutationVariables) => any,
  updateReaction: (variables?: UpdateReactionMutationVariables) => any,
  deleteReaction: (variables?: DeleteReactionMutationVariables) => any
) => {
  const comments = idea.comments;
  const reaction = comments
    ?.find((comment) => comment.id === commentId)
    ?.threadComment?.find(
      (threadComment) => threadComment.id === threadCommentId
    )
    ?.reactions?.find((reaction) => reaction.content === unified);
  if (reaction) {
    //reaction already there
    if (reaction.reactionGroup) {
      const user = reaction.reactionGroup.find(
        (user) => user.email === currentUser.email
      );
      if (user) {
        //already reacted with that emoji
        if (reaction.reactionGroup.length > 1) {
          //remove user
          if (!fromPicker) {
            console.log("remove user");
            setIdea(
              removeUserThreadCommentReactionsLocalState(
                idea,
                commentId,
                threadCommentId,
                reaction,
                currentUser
              )
            );
            updateReaction({
              content: unified,
              threadCommentId: decodeGlobalID(threadCommentId).id,
              type: ParentType.ThreadComment,
              //@ts-ignore
            }).then((result) => {
              console.log(result);
            });
          }
        } else {
          //delete reaction
          if (!fromPicker) {
            setIdea(
              removeThreadCommentReactionsLocalState(
                idea,
                commentId,
                threadCommentId,
                reaction
              )
            );
            deleteReaction({
              threadCommentId: decodeGlobalID(threadCommentId).id,
              content: unified,
              type: ParentType.ThreadComment,
              //@ts-ignore
            }).then((result) => {
              console.log(result);
            });
          }
        }
      } else {
        //user not in reaction -> add user
        setIdea(
          addUserThreadCommentReactionsLocalState(
            idea,
            commentId,
            threadCommentId,
            reaction,
            currentUser
          )
        );
        updateReaction({
          content: unified,
          threadCommentId: decodeGlobalID(threadCommentId).id,
          type: ParentType.ThreadComment,
          //@ts-ignore
        }).then((result) => {
          console.log(result);
        });
      }
    }
  } else {
    //reaction not there -> create
    setIdea(
      createThreadCommentReactionsLocalState(
        idea,
        commentId,
        threadCommentId,
        unified,
        currentUser
      )
    );
    createReaction({
      content: unified,
      threadCommentId: decodeGlobalID(threadCommentId).id,
      type: ParentType.ThreadComment,
      //@ts-ignore
    }).then((result) => {
      console.log(result);
    });
  }
};

const createThreadCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  threadCommentId: string,
  unified: string,
  currentUser: User
) => {
  console.log("create Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const nextReactionGroup = [currentUser];
    const threadComment = draftState.comments
      ?.find((comment) => comment.id === commentId)
      ?.threadComment?.find(
        (threadComment) => threadComment.id === threadCommentId
      );
    threadComment?.reactions?.push({
      id: "",
      content: unified,
      reactionGroup: nextReactionGroup,
    });
  });

  return nextCommentState;
};

const removeThreadCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  threadCommentId: string,
  reaction: Reaction
) => {
  console.log("remove Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const threadComment = draftState.comments
      ?.find((comment) => comment.id === commentId)
      ?.threadComment?.find(
        (threadComment) => threadComment.id === threadCommentId
      );
    const index = threadComment?.reactions?.findIndex(
      (r) => r.content === reaction.content
    );
    if (index != undefined && index !== -1)
      threadComment?.reactions?.splice(index, 1);
  });

  return nextCommentState;
};

const addUserThreadCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  threadCommentId: string,
  reaction: Reaction,
  currentUser: User
) => {
  console.log("add User Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const threadComment = draftState.comments
      ?.find((comment) => comment.id === commentId)
      ?.threadComment?.find(
        (threadComment) => threadComment.id === threadCommentId
      );
    threadComment?.reactions
      ?.find((r) => r.id === reaction.id)
      ?.reactionGroup?.push(currentUser);
  });

  return nextCommentState;
};

const removeUserThreadCommentReactionsLocalState = (
  baseState: Idea,
  commentId: string,
  threadCommentId: string,
  reaction: Reaction,
  currentUser: User
) => {
  console.log("remove User Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const threadComment = draftState.comments
      ?.find((comment) => comment.id === commentId)
      ?.threadComment?.find(
        (threadComment) => threadComment.id === threadCommentId
      );
    const index = threadComment?.reactions
      ?.find((r) => r.id === reaction.id)
      ?.reactionGroup?.findIndex((user) => user.email === currentUser.email);
    if (index != undefined && index !== -1)
      threadComment?.reactions
        ?.find((r) => r.id === reaction.id)
        ?.reactionGroup?.splice(index, 1);
  });

  return nextCommentState;
};
