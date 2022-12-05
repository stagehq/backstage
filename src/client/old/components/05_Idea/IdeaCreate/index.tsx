import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { User } from "../../../graphql/types.generated";
import { projectSlugState, projectState } from "../../../store/project";

import { decodeGlobalID } from "@pothos/plugin-relay";
import { useSession } from "next-auth/react";
import { useNavigate } from "react-router-dom";
import { useCreateIdeaMutation } from "../../../graphql/createIdea.generated";
import Spinner from "../../02_AppGlobal/Icons/Spinner";
import RichTextInput from "../../02_AppGlobal/Inputs/RichTextInput";
import SimpleInput from "../../02_AppGlobal/Inputs/SimpleInput";
import IdeaSideBar from "../IdeaSideBar";
import InputFieldWrapper from "./inputFieldWrapper";

const IdeaMainContainer = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));

  const users: User[] = [];
  if (project) {
    if (project.contributors) {
      project.contributors.map((contributor) => {
        if (contributor.user) {
          users.push(contributor.user);
        }
      });
    }
  }

  //navigation on creation
  const [, createIdea] = useCreateIdeaMutation();

  /* UI States */
  const [createProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);

  const navigate = useNavigate();

  // //force focus
  const inputRef = useRef(null);
  useEffect(() => {
    //@ts-ignore
    //inputRef.current.focus();
  }, []);

  const handleSubmit = () => {
    setCreateProjectLoading(true);
    if (session?.user?.email) {
      if (!project?.id) return null;

      /* Create project */
      createIdea({
        title: title,
        description: description,
        projectId: decodeGlobalID(project.id).id,
      }).then((result) => {
        /* Stop Loading */
        setCreateProjectLoading(false);
        if (result.error) {
          /* Set Error Msg */
        } else {
          if (!result.data?.createIdea) return null;

          project &&
            setProject({
              ...project,
              //@ts-ignore
              ideas: project.ideas
                ? [...project.ideas, result.data.createIdea]
                : [result.data.createIdea],
            });

          /* Redirect */
          const ideaNumber = result.data?.createIdea?.number;

          if (ideaNumber) {
            navigate(`/app/workspace/${project.slug}/ideas/${ideaNumber}`);
          }
        }
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-lg px-8 pt-6 pb-4 flex flex-col gap-5">
      <h2 className="text-2xl font-semibold text-gray-900">New idea</h2>
      <InputFieldWrapper title="Name">
        <SimpleInput autoFocus={true} text={title} setText={setTitle} />
      </InputFieldWrapper>

      <InputFieldWrapper title="Content">
        <RichTextInput
          setRichText={setDescription}
          users={users}
          containerSize={"big"}
          readOnly={false}
          initialPlaceholder="Enter an idea description ..."
          withSendButton={false}
          isNewInputField={false}
        />
      </InputFieldWrapper>
      <div className="w-full flex gap-4 justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-[7px] border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit()}
          type="button"
          className="inline-flex items-center px-4 py-[7px] border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {createProjectLoading ? <Spinner color={"text-white"} /> : <></>}
          Publish idea
        </button>
      </div>
    </div>
  );
};

const IdeaCreateMobile = () => {
  return (
    <div className="w-full">
      <IdeaMainContainer />
    </div>
  );
};

const IdeaCreateDesktop = () => {
  return (
    <div className="max-w-[1400px] w-full flex gap-[40px] px-4 md:px-8 py-7">
      <div className="w-[calc(100%_-_360px)]">
        <IdeaMainContainer />
      </div>
      <div className="w-[320px]">
        <IdeaSideBar />
      </div>
    </div>
  );
};

const IdeaCreate = () => {
  return (
    <div className="h-full">
      <div className="lg:hidden">
        <IdeaCreateMobile />
      </div>
      <div className="hidden lg:flex justify-center w-full">
        <IdeaCreateDesktop />
      </div>
    </div>
  );
};

export default IdeaCreate;
