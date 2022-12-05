import { useRecoilState, useRecoilValue } from "recoil";
import { ProjectRole } from "../../../graphql/types.generated";
import { projectSlugState, projectState } from "../../../store/project";
import { currentUserState } from "../../../store/user";
import { ProjectDelete } from "./projectDelete";
import { ProjectMembers } from "./projectMembers";
import { ProjectProperties } from "./projectProperties";

export default function ProjectSettings() {
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const canEdit =
    currentUser?.id ===
    project?.contributors?.find(
      (contributor) =>
        contributor.role === ProjectRole.Owner ||
        contributor.role === ProjectRole.Core
    )?.user?.id;

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pb-8">
          <div>
            <h3 className="text-xl leading-6 font-semibold text-gray-900">
              Project Settings
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              This information can only be edited by the project owner or
              core-contributor.
            </p>
          </div>
          <ProjectProperties />
        </div>
      </div>
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-16 pb-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3 className="text-xl font-semibold text-gray-900">
                Contributor List
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                A list of all the contributors of the project including their
                name, email and role.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add user
              </button>
            </div>
          </div>
          <ProjectMembers />
        </div>
      </div>
      {canEdit && (
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-16 pb-8">
            <div>
              <h3 className="text-xl leading-6 font-semibold text-red-500">
                Delete this project
              </h3>
              <p className="mt-2 text-sm text-gray-500 w-2/3">
                Your project will be deactivated for 30 days. During this time
                you can still recover your project. After this periode your
                project will be deleted completely and{" "}
                <span className="text-black">there is no going back.</span>
              </p>
            </div>
            <ProjectDelete />
          </div>
        </div>
      )}
    </form>
  );
}
