import { DocumentTextIcon, LightBulbIcon } from "@heroicons/react/outline";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { projectSlugState, projectState } from "../../../store/project";
import {
  labelSelectState,
  userSelectState,
} from "../../../store/ui/ideasFilter";

import { decodeGlobalID } from "@pothos/plugin-relay";
import { decode as base64_decode } from "base-64";
import clsx from "clsx";
import { useRegisterActions } from "kbar";
import Head from "next/head";
import useMarkdownActions from "../../../components/kbar/hooks/useMarkdownActions";
import useThemeActions from "../../../components/kbar/hooks/useThemeActions";
import LoadingPage from "../../../components/loading/Page";
import { useUpdateUserMutation } from "../../../graphql/updateUser.generated";
import { currentUserState } from "../../../store/user";
import LabelEditModal from "../../../_old/components/05_Idea/IdeaSideBar/LabelItem/LabelEditModal";

export const getIdfromRelayId = (id: string) => base64_decode(id).split(":")[1];

function WorkspacePage() {
  const { workspaceId } = useParams();
  const [, updateUser] = useUpdateUserMutation();

  const [projectSlug, setProjectSlug] = useRecoilState(projectSlugState);
  const project = useRecoilValue(projectState(projectSlug));
  // recoil state current user
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const resetLabelSelectState = useResetRecoilState(labelSelectState);
  const resetUserSelectState = useResetRecoilState(userSelectState);

  const navigate = useNavigate();

  /* change project slug if workspaceId changes */
  useEffect(() => {
    if (workspaceId) {
      setProjectSlug(workspaceId);
    }
  }, [workspaceId, setProjectSlug]);

  /* reset label and user select states if project slug changes */
  useEffect(
    () => () => {
      if (project) {
        resetLabelSelectState();
        resetUserSelectState();
      }
    },
    [projectSlug]
  );

  /* Update last project */
  useEffect(() => {
    if (project?.id) {
      currentUser?.userProjectRelations?.map((userProjectRelation) => {
        const userProject = userProjectRelation.project;
        if (userProject?.id === project.id) {
          console.log("update last project to ", userProject.name);

          setCurrentUser({
            ...currentUser,
            lastProject: userProject,
          });

          updateUser({
            lastProject: decodeGlobalID(project.id).id,
          });
        }
      });
    }
  }, [project, updateUser]);

  // register action for ⌘K
  useMarkdownActions();
  useThemeActions();

  useRegisterActions(
    [
      {
        id: "idea",
        name: "New idea",
        shortcut: ["I"],
        keywords: "Create new idea",
        icon: (
          <LightBulbIcon
            className={clsx("h-6 w-6 flex-none text-gray-900 text-opacity-60")}
          />
        ),
        section: "Quick actions",
        perform: () => navigate(`/s/workspace/${projectSlug}/ideas/new`),
      },
      {
        id: "initiative",
        name: "New initiative",
        shortcut: ["N"],
        keywords: "Create new initiative",
        section: "Quick actions",
        icon: (
          <DocumentTextIcon
            className={clsx("h-6 w-6 flex-none text-gray-900 text-opacity-60")}
          />
        ),
        perform: () => navigate(`/s/workspace/${projectSlug}/initiatives/new`),
      },
    ],
    [projectSlug]
  );

  return (
    <>
      <Head>
        <title>Workspace</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex min-h-[calc(100vh_-_64px)]">
        <Suspense fallback={<LoadingPage />}>
          <Outlet />
          <LabelEditModal />
        </Suspense>
      </div>
    </>
  );
}

export default WorkspacePage;
