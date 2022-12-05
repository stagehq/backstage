import { FC, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { projectSlugState, projectState } from "../../../../store/project";

import {
  ProjectRole,
  UserProjectRelation,
} from "../../../../graphql/types.generated";
import { currentUserState } from "../../../../store/user";
import { RoleChangeModal } from "./roleChangeModal";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ProjectMembers: FC = () => {
  /* data */
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  /* UI states */
  const [roleChangeModalOpen, setRoleChangeModalOpen] =
    useState<boolean>(false);
  const [focusedUser, setFocusedUser] = useState<UserProjectRelation | null>(
    null
  );

  function handleOpen(user: UserProjectRelation) {
    setFocusedUser(user);
    setRoleChangeModalOpen(true);
  }

  const canEdit =
    currentUser?.id ===
    project?.contributors?.find(
      (contributor) =>
        contributor.role === ProjectRole.Owner ||
        contributor.role === ProjectRole.Core
    )?.user?.id;

  return (
    <div className="px-4 sm:px-6 lg:px-0">
      {focusedUser && (
        <RoleChangeModal
          roleChangeModalOpen={roleChangeModalOpen}
          setRoleChangeModalOpen={setRoleChangeModalOpen}
          user={focusedUser}
        />
      )}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto lg:overflow-x-visible sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-x-hidden overflow-y-visible shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {project?.contributors?.map((person) => (
                    <tr key={person.userMail}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.user?.firstName && person.user.lastName
                          ? person.user.fullName
                          : person.user?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.userMail}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {capitalizeFirstLetter(person.role ? person.role : "-")}
                      </td>
                      <td className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleOpen(person)}
                          disabled={!canEdit}
                          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          Change role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectMembers };
