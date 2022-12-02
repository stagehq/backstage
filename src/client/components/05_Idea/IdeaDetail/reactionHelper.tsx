import { decodeGlobalID } from "@pothos/plugin-relay";
import produce from "immer";
import { CreateReactionMutationVariables } from "../../../graphql/createReaction.generated";
import { DeleteReactionMutationVariables } from "../../../graphql/deleteReaction.generated";
import {
  Idea,
  ParentType,
  Reaction,
  User,
} from "../../../graphql/types.generated";
import { UpdateReactionMutationVariables } from "../../../graphql/updateReaction.generated";

export const updateIdeaReactionsLocalState = (
  idea: Idea,
  unified: string,
  fromPicker: boolean,
  currentUser: User,
  setIdea: (value: Idea) => void,
  createReaction: (variables?: CreateReactionMutationVariables) => any,
  updateReaction: (variables?: UpdateReactionMutationVariables) => any,
  deleteReaction: (variables?: DeleteReactionMutationVariables) => any
) => {
  const reaction = idea?.reactions?.find(
    (reaction) => reaction.content === unified
  );
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
              removeUserIdeaReactionsLocalState(idea, reaction, currentUser)
            );
            updateReaction({
              content: unified,
              ideaId: decodeGlobalID(idea.id).id,
              //@ts-ignore
            }).then((result) => {
              console.log(result);
              if (result.error) {
                setIdea(
                  addUserIdeaReactionsLocalState(idea, reaction, currentUser)
                );
              }
            });
          }
        } else {
          //delete reaction
          if (!fromPicker) {
            setIdea(removeIdeaReactionsLocalState(idea, reaction));
            deleteReaction({
              ideaId: decodeGlobalID(idea.id).id,
              content: unified,
              type: ParentType.Idea,
              //@ts-ignore
            }).then((result) => {
              console.log(result);
              if (result.error) {
                setIdea(
                  createIdeaReactionsLocalState(idea, unified, currentUser)
                );
              }
            });
          }
        }
      } else {
        //user not in reaction -> add user
        setIdea(addUserIdeaReactionsLocalState(idea, reaction, currentUser));
        updateReaction({
          content: unified,
          ideaId: decodeGlobalID(idea.id).id,
          type: ParentType.Idea,
          //@ts-ignore
        }).then((result) => {
          console.log(result);
          if (result.error) {
            setIdea(
              removeUserIdeaReactionsLocalState(idea, reaction, currentUser)
            );
          }
        });
      }
    }
  } else {
    //reaction not there -> create
    setIdea(createIdeaReactionsLocalState(idea, unified, currentUser));
    createReaction({
      content: unified,
      ideaId: decodeGlobalID(idea.id).id,
      type: ParentType.Idea,
      //@ts-ignore
    }).then((result) => {
      console.log(result);
    });
  }
};

const createIdeaReactionsLocalState = (
  baseState: Idea,
  unified: string,
  currentUser: User
) => {
  console.log("create Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const nextReactionGroup = [currentUser];
    draftState?.reactions?.push({
      id: "",
      content: unified,
      reactionGroup: nextReactionGroup,
    });
  });

  return nextCommentState;
};

const removeIdeaReactionsLocalState = (baseState: Idea, reaction: Reaction) => {
  console.log("remove Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const index = draftState?.reactions?.findIndex(
      (r) => r.content === reaction.content
    );
    if (index != undefined && index !== -1)
      draftState?.reactions?.splice(index, 1);
  });

  return nextCommentState;
};

const addUserIdeaReactionsLocalState = (
  baseState: Idea,
  reaction: Reaction,
  currentUser: User
) => {
  console.log("add User Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    draftState?.reactions
      ?.find((r) => r.id === reaction.id)
      ?.reactionGroup?.push(currentUser);
  });

  return nextCommentState;
};

const removeUserIdeaReactionsLocalState = (
  baseState: Idea,
  reaction: Reaction,
  currentUser: User
) => {
  console.log("remove User Reaction");

  const nextCommentState = produce(baseState, (draftState) => {
    const index = draftState?.reactions
      ?.find((r) => r.id === reaction.id)
      ?.reactionGroup?.findIndex((user) => user.email === currentUser.email);
    if (index != undefined && index !== -1)
      draftState?.reactions
        ?.find((r) => r.id === reaction.id)
        ?.reactionGroup?.splice(index, 1);
  });

  return nextCommentState;
};
