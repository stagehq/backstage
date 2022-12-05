import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAliasState, userState } from "../../store/profile";

import { Project } from "@prisma/client";
import Head from "next/head";
import PinnedProjects from "../../components/01_Account/PinnedProjects";
import ProfileHeader from "../../components/01_Account/ProfileHeader";
import ProjectListing from "../../components/01_Account/ProjectListing.tsx";
import EmptyState from "../../components/02_AppGlobal/EmptyState";

function ProfilePage() {
  const { userAlias } = useParams();

  /* UI States */
  const [projects, setProjects] = useState<Project[] | null>(null);

  /* User data */
  const [userId, setUserId] = useRecoilState(userAliasState);
  const user = useRecoilValue(userState(userId));

  useEffect(() => {
    /* Set projects */
    if (user !== null && user.userProjectRelations) {
      const userProjects = user.userProjectRelations.map(
        (project) => project.project as Project
      );
      setProjects(userProjects);
    }
  }, [user]);

  useEffect(() => {
    if (userAlias) {
      setUserId(userAlias);
    }
  }, [userAlias, setUserId]);

  return (
    <>
      <Head>
        <title>{userAlias} profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        <ProfileHeader />
        {projects ? (
          <>
            <PinnedProjects projects={projects} />
            <ProjectListing projects={projects} />
          </>
        ) : (
          <EmptyState />
        )}
      </>
    </>
  );
}

export default ProfilePage;
