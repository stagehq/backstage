import { ExclamationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useCreateProjectMutation } from "../../../../graphql/createProject.generated";
import { Project, ProjectRole } from "../../../../graphql/types.generated";
import { projectCreateOpenState } from "../../../../store/ui/modals";
import { currentUserState } from "../../../../store/user";
import Spinner from "../../../02_AppGlobal/Icons/Spinner";
import { HandleSingleInputProps, SingleInputField } from "../singleInputField";

export default function ManualFrom() {
  /* Data Handling */
  const { data: session } = useSession();
  const [, createProject] = useCreateProjectMutation();

  /* Stores */
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  /* UI States */
  const [fieldsStatusValid, setFieldsStatusValid] = useState<boolean>(false);
  const [projectNameInUse, setProjectNameInUse] = useState<boolean>(false);
  const [createProjectLoading, setCreateProjectLoading] =
    useState<boolean>(false);
  // project create modal state
  const [projectCreateOpen, setProjectCreateOpen] = useRecoilState<boolean>(
    projectCreateOpenState
  );

  /* Project Name */
  const [projectName, setProjectName] = useState<string>("");

  /* Router */
  const navigate = useNavigate();

  function handleCreateProject() {
    /* Check if form is good */
    if (fieldsStatusValid) {
      setCreateProjectLoading(true);

      /* Check if user is there */
      if (session?.user?.email) {
        /* Create project */
        createProject({
          name: projectName,
        }).then((result) => {
          /* Stop Loading */
          setCreateProjectLoading(false);
          if (result.error) {
            /* Set Error Msg */
            setProjectNameInUse(true);
          } else {
            /* Check if project is there */
            if (!result.data?.createProject) {
              toast.error("Something went wrong");
              return false;
            }

            /* Update local currentUser store */
            handleUpdateCurrentUserWithProject(
              result.data?.createProject as Project
            );

            /* Close modal */
            setProjectCreateOpen(false);

            /* Redirect */
            const slug = result.data?.createProject?.slug;
            if (slug) navigate(`/app/workspace/${slug}`);
          }
        });
      }
    }
  }

  const handleUpdateCurrentUserWithProject = (project: Project) => {
    if (project && project.id && currentUser) {
      setCurrentUser({
        ...currentUser,
        userProjectRelations: currentUser.userProjectRelations
          ? [
              ...currentUser.userProjectRelations,
              {
                id: project.contributors![0].id,
                projectId: project.id,
                project: project,
                role: ProjectRole.Owner,
                user: currentUser,
                userMail: currentUser.email,
              },
            ]
          : [
              {
                id: project.contributors![0].id,
                projectId: project.id,
                project: project,
                role: ProjectRole.Owner,
                user: currentUser,
                userMail: currentUser.email,
              },
            ],
      });
    }
  };

  function handleInputField(props: HandleSingleInputProps) {
    props.check ? setFieldsStatusValid(true) : setFieldsStatusValid(false);
    setProjectName(props.value);
  }

  return (
    <div>
      <SingleInputField
        label="Project name"
        name="projectName"
        maxCharacter={24}
        minCharacter={3}
        handleInputField={handleInputField}
      />
      <div className="pt-8 flex justify-end gap-8">
        {projectNameInUse && (
          <div className="flex gap-2 mt-2 text-sm text-red-600 max-content">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
            {"Project name is already in use"}
          </div>
        )}
        <button
          type="button"
          onClick={() => handleCreateProject()}
          className={clsx(
            fieldsStatusValid ? "opacity-100" : "opacity-50",
            "bg-blue-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          )}
        >
          {createProjectLoading ? <Spinner color={"text-white"} /> : null}
          Save
        </button>
      </div>
    </div>
  );
}
