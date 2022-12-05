import { Dialog, Transition } from "@headlessui/react";
/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ProjectRole,
  UserProjectRelation,
} from "../../../../graphql/types.generated";
import { projectSlugState, projectState } from "../../../../store/project";

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useUpdateUserProjectRelationRoleMutation } from "../../../../graphql/updateUserProjectRelationRole.generated";
import Spinner from "../../02_AppGlobal/Icons/Spinner";

const roleOptions = [
  { id: ProjectRole.Contributor, title: "Contributor" },
  { id: ProjectRole.Core, title: "Core (Extended project rights)" },
  { id: ProjectRole.Owner, title: "Owner" },
];
interface RoleChangeModalProps {
  roleChangeModalOpen: boolean;
  setRoleChangeModalOpen: (value: boolean) => void;
  user: UserProjectRelation;
}

const RoleChangeModal: FC<RoleChangeModalProps> = ({
  roleChangeModalOpen,
  setRoleChangeModalOpen,
  user,
}) => {
  /* data handling */
  const { data: session } = useSession();
  const projectSlug = useRecoilValue(projectSlugState);
  const [project, setProject] = useRecoilState(projectState(projectSlug));
  const [, updateUserProjectRelationRole] =
    useUpdateUserProjectRelationRoleMutation();

  /* UI states */
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<ProjectRole>(
    user.role || ProjectRole.Contributor
  );
  const [updateProjectLoading, setUpdateProjectLoading] =
    useState<boolean>(false);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(roleChangeModalOpen);
  }, [roleChangeModalOpen]);

  const handleClose = () => {
    setOpen(false);
    setRoleChangeModalOpen(false);
  };

  useEffect(() => {
    if (project) {
      // set project and change role of nested contributor by user id
      setProject({
        ...project,
        contributors: project?.contributors?.map((contributor) => {
          if (contributor?.user?.id === user?.user?.id) {
            return {
              ...contributor,
              role: selectedRole,
            };
          }
          return contributor;
        }),
      });
    }
  }, [selectedRole]);

  const userContributor = user.user;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => handleClose()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-6">
                  <label className="text-base font-medium text-gray-900">
                    {"Change role of " + userContributor?.firstName &&
                    userContributor?.lastName
                      ? userContributor.fullName
                      : userContributor?.name}
                  </label>
                  <p className="text-sm leading-5 text-gray-500">
                    {"in " + project?.name}
                  </p>
                  <fieldset className="mt-8">
                    <div className="flex flex-col items-start space-y-4">
                      {roleOptions.map((roleOption) => (
                        <div key={roleOption.id} className="flex items-center">
                          <input
                            onClick={() => setSelectedRole(roleOption.id)}
                            id={roleOption.id}
                            name="notification-method"
                            type="radio"
                            defaultChecked={roleOption.id === selectedRole}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            disabled={
                              user.role === ProjectRole.Core &&
                              roleOption.id === ProjectRole.Owner
                            }
                          />
                          <label
                            htmlFor={roleOption.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {roleOption.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      console.log(selectedRole);
                      setUpdateProjectLoading(true);
                      if (session?.user?.email) {
                        toast
                          .promise(
                            updateUserProjectRelationRole({
                              role: selectedRole,
                              slug: project?.slug || " ",
                              userMail: user.userMail || " ",
                            }),
                            {
                              loading: `Updating role ...`,
                              success: `Successfully updated!`,
                              error: (err) => err,
                            }
                          )
                          .then((result) => {
                            setUpdateProjectLoading(false);
                            handleClose();
                          });
                      }
                    }}
                  >
                    {updateProjectLoading ? (
                      <Spinner color={"text-white"} />
                    ) : null}
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleClose()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { RoleChangeModal };
