import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Idea, User } from "../../../graphql/types.generated";
import { ideaNumberState, ideaState } from "../../../store/idea";
import { projectSlugState, projectState } from "../../../store/project";

import { decodeGlobalID } from "@pothos/plugin-relay";
import { useParams } from "react-router-dom";
import { useCreateReactionMutation } from "../../../graphql/createReaction.generated";
import { useDeleteReactionMutation } from "../../../graphql/deleteReaction.generated";
import { useUpdateIdeaMutation } from "../../../graphql/updateIdea.generated";
import { useUpdateReactionMutation } from "../../../graphql/updateReaction.generated";
import { currentUserState } from "../../../store/user";
import RichTextInput from "../../02_AppGlobal/Inputs/RichTextInput";
import LoadingPage from "../../02_AppGlobal/Loading/Page";
import ReactionBar from "../../02_AppGlobal/ReactionBar";
import Threading from "../../02_AppGlobal/Threading";
import IdeaSideBar from "../IdeaSideBar";
import IdeaHeader from "./ideaHeader";
import { updateIdeaReactionsLocalState } from "./reactionHelper";

interface IdeaMainContainerProps {
  number: number;
}

const IdeaMainContainer: FC<IdeaMainContainerProps> = ({ number }) => {
  const [currentUser] = useRecoilState(currentUserState);
  const [ideaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [idea, setIdea] = useRecoilState(ideaState([ideaNumber, projectSlug]));
  const [richText, setRichText] = useState<string>("");
  const [title, setTitle] = useState<string>(idea?.title ? idea.title : "");
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [, updateIdea] = useUpdateIdeaMutation();
  const [, createReaction] = useCreateReactionMutation();
  const [, deleteReaction] = useDeleteReactionMutation();
  const [, updateReaction] = useUpdateReactionMutation();

  const handleSaveEditor = () => {
    if (idea) {
      //console.log(idea.id);
      //console.log(decodeGlobalID(idea?.id).id);
      updateIdea({
        id: decodeGlobalID(idea?.id).id,
        description: richText as string,
        title: title as string,
      });

      // check if project ideas exist
      if (project?.ideas) {
        // find idea id in project state ideas and update idea propertys
        const newIdeas = project.ideas.map((projectIdea) => {
          if (projectIdea.id === idea.id) {
            return {
              ...projectIdea,
              description: richText,
              title: title,
            };
          }
          return projectIdea;
        });
        setProject({ ...project, ideas: newIdeas });
      }
    }
  };

  useEffect(() => {
    if (richText && richText != "") {
      //console.log("richText: ", richText);
      setIdea({
        ...(idea as Idea),
        description: richText as string,
      });
    }
  }, [richText]);

  useEffect(() => {
    if (title && title != "") {
      //console.log("richText: ", richText);
      setIdea({
        ...(idea as Idea),
        title: title as string,
      });
    }
  }, [title]);

  async function handleReactionBarAction(unified: string, fromPicker: boolean) {
    if (idea) {
      //update Local state of comments in idea
      updateIdeaReactionsLocalState(
        idea,
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

  return (
    <div className="w-full flex gap-8 flex-col">
      <div className="w-full bg-white rounded-lg flex pb-4 flex-col gap-5">
        <IdeaHeader
          readOnly={readOnly}
          setReadOnly={setReadOnly}
          handleSaveEditor={handleSaveEditor}
          title={title}
          setTitle={setTitle}
        />
        <div className="px-4">
          {idea?.participants && idea.description && number === ideaNumber && (
            <RichTextInput
              setRichText={setRichText}
              handleSaveEditor={handleSaveEditor}
              users={idea.participants as User[]}
              containerSize="big"
              readOnly={readOnly}
              customInitialValue={idea.description as string}
              initialPlaceholder="Enter an idea description ..."
              withSendButton={false}
              isNewInputField={false}
            />
          )}
        </div>
        <div className="px-4">
          {idea?.reactions && (
            <ReactionBar
              reactions={idea.reactions}
              handleReactionBarAction={handleReactionBarAction}
              onlyPicker={false}
            />
          )}
        </div>
      </div>
      {idea?.comments && (
        <Threading
          comments={idea.comments}
          users={idea.participants as User[]}
          currentUser={currentUser as User}
        />
      )}
    </div>
  );
};

interface IdeaDetailMobileProps {
  number: number;
}

const IdeaDetailMobile: FC<IdeaDetailMobileProps> = ({ number }) => {
  return (
    <div className="w-full">
      <IdeaMainContainer number={number} />
    </div>
  );
};

interface IdeaDetailDesktopProps {
  number: number;
}

const IdeaDetailDesktop: FC<IdeaDetailDesktopProps> = ({ number }) => {
  return (
    <div className="max-w-[1400px] w-full flex gap-[40px] px-4 md:px-8 py-7">
      <div className="w-[calc(100%_-_360px)]">
        <IdeaMainContainer number={number} />
      </div>
      <div className="w-[320px]">
        <IdeaSideBar />
      </div>
    </div>
  );
};

const IdeaContainer = () => {
  /* data */
  const params = useParams();
  const [ideaNumber, setIdeaNumber] = useRecoilState(ideaNumberState);
  const [projectSlug] = useRecoilState(projectSlugState);
  const idea = useRecoilValue(ideaState([ideaNumber, projectSlug]));

  useEffect(() => {
    if (params.ideaId) {
      setIdeaNumber(Number(params.ideaId));
    }
  }, [params.ideaId, setIdeaNumber]);

  return (
    <div className="w-full flex justify-center items-center">
      {idea != null && idea ? (
        <div className="w-full">
          <div className="lg:hidden h-full">
            <IdeaDetailMobile number={Number(params.ideaId)} />
          </div>
          <div className="hidden lg:flex justify-center w-full">
            <IdeaDetailDesktop number={Number(params.ideaId)} />
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default IdeaContainer;
