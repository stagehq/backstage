import { FC, useState } from "react";
import { Comment, User } from "../../../graphql/types.generated";
import CommentItem from "./comment";
import NewThreadComment from "./newThreadComment";
import ThreadCommentItem from "./threadComment";
import ThreadHeader from "./ThreadComponents/threadHeader";

interface ThreadingProps {
  comments: Comment[];
  users: User[];
  currentUser: User;
}
export interface firstThreadCommentsStatesProps {
  commentIds: string[];
}

const Threading: FC<ThreadingProps> = ({ comments, users, currentUser }) => {
  const [firstThreadCommentsStates, setFirstThreadCommentsStates] =
    useState<firstThreadCommentsStatesProps>({ commentIds: [] });

  return (
    <div className="flex flex-col gap-4">
      <ThreadHeader />
      {comments.map((comment, index) => (
        <div key={index}>
          <CommentItem
            comment={comment}
            users={users}
            firstThreadCommentsStates={firstThreadCommentsStates}
            setFirstThreadCommentsStates={setFirstThreadCommentsStates}
          />
          {comment.threadComment?.map((threadComment, index) => (
            <div key={index}>
              <ThreadCommentItem
                commentId={comment.id}
                threadComment={threadComment}
                users={users}
              />
            </div>
          ))}
          {firstThreadCommentsStates.commentIds.find(
            (commentId) => commentId === comment.id
          ) !== undefined && (
            <NewThreadComment
              currentUser={currentUser}
              users={users}
              commentId={comment.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Threading;
