import { FC, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectSlugState, projectState } from "../../../store/project";

import { ProjectDeleteModal } from "./projectDeleteModal";

const ProjectDelete: FC = () => {
  // recoil project state
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [deleterModalOpen, setDeleterModalOpen] = useState<boolean>(false);

  return (
    <div className="pt-6">
      <ProjectDeleteModal
        deleterModalOpen={deleterModalOpen}
        setDeleterModalOpen={setDeleterModalOpen}
        project={project ? project : null}
      />
      <button
        type="button"
        onClick={() => setDeleterModalOpen(true)}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Delete project
      </button>
    </div>
  );
};

export { ProjectDelete };
