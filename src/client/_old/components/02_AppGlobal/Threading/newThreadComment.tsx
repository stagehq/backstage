import { FC, useState } from "react";
import { User } from "../../../../graphql/types.generated";
import RichTextInput from "../Inputs/RichTextInput";

import { useRecoilState } from "recoil";
import { ideaNumberState, ideaState } from "../../../../store/idea";
import { projectSlugState } from "../../../../store/project";

import { useCreateThreadCommentMutation } from "../../../../graphql/createThreadComment.generated";
import { createThreadCommentHelper } from "./ThreadComponents/threadCommentHelper";

interface NewThreadCommentProps {
  currentUser: User;
  users: User[];
  commentId: string;
}

const NewThreadComment: FC<NewThreadCommentProps> = ({
  currentUser,
  users,
  commentId,
}) => {
  const [ideaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const [idea, setIdea] = useRecoilState(ideaState([ideaNumber, projectSlug]));
  const [richText, setRichText] = useState<string>("");

  const [, createThreadComment] = useCreateThreadCommentMutation();

  const handleSend = () => {
    if (idea)
      createThreadCommentHelper(
        idea,
        commentId,
        richText,
        setIdea,
        createThreadComment,
        currentUser
      );
  };

  return (
    <div className="flex gap-2">
      <div className="w-6 flex flex-col items-center ml-3">
        <div className="bg-slate-300 h-[8px] w-[1px]" />
        {currentUser?.image ? (
          <img
            className="h-6 w-6 flex-shrink-0 rounded-full bg-slate-500"
            referrerPolicy="no-referrer"
            src={currentUser.image}
            alt="comment creator image"
          />
        ) : (
          <div className="h-6 w-6 bg-slate-200" />
        )}
      </div>
      <div className="w-[calc(100%_-_42px)]">
        <RichTextInput
          setRichText={setRichText}
          users={users}
          containerSize="small"
          readOnly={false}
          initialPlaceholder="Write a comment ..."
          withSendButton={true}
          sendButtonText="Comment"
          handleSend={handleSend}
          isNewInputField={true}
        />
      </div>
    </div>
  );
};

export default NewThreadComment;
