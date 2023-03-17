import { FC, useEffect, useState } from "react";

// import { CheckCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import router from "next/router";
import toast from "react-hot-toast";
import { matchPath } from "react-router-dom";
import { useRecoilState } from "recoil";
import slug from "slug";
import { generateGradient } from "../../../../helper/generateUserGradient";
import { client } from "../../../graphql/client";
import { GetValidAliasDocument } from "../../../graphql/getValidAlias.generated";
import { User } from "../../../graphql/types.generated";
import { useUpdateUserMutation } from "../../../graphql/updateUser.generated";
import { currentUserState } from "../../../store/user";
import { Dropzone } from "../../Dropzone";
import Spinner from "../../loading/Spinner";
import { parseName } from "./helper/parseName";

interface ProfileProps {
  user: User;
}

type UpdateUserSuccessType = boolean | null;

const Profile: FC<ProfileProps> = ({ user }) => {
  const { data: session } = useSession();
  const [, updateUser] = useUpdateUserMutation();

  const [fieldsEdited, setFieldsEdited] = useState(false);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] =
    useState<UpdateUserSuccessType>(null);

  // Edit current user state
  const [editCurrentUser, setEditCurrentUser] = useState(user);

  // redirect to Discover state
  const [redirectToDiscover, setRedirectToDiscover] = useState(false);

  // Alias state
  const [alias, setAlias] = useState(user.alias);
  const [aliasValid, setAliasValid] = useState(true);
  const [aliasTooShort, setAliasTooShort] = useState(false);

  // First name valid state
  const [firstNameValid, setFirstNameValid] = useState(true);
  // Last name valid state
  const [lastNameValid, setLastNameValid] = useState(true);

  // Match onbaording route
  const isOnboarding = matchPath("/auth/new-user", location.pathname);

  /* Set name */
  const [, setCurrentUser] = useRecoilState(currentUserState);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCurrentUser({
      ...editCurrentUser,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCurrentUser({
      ...editCurrentUser,
      lastName: e.target.value,
    });
  };

  // // handle bio change
  // const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setEditCurrentUser({
  //     ...editCurrentUser,
  //     bio: e.target.value,
  //   });
  // };

  // handle alias change
  const handleAliasChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCurrentUser({
      ...editCurrentUser,
      alias: slug(e.target.value, { lower: true }),
    });

    // Check if alias is valid
    if (e.target.value && e.target.value !== alias) {
      await client
        .query(GetValidAliasDocument, {
          alias: e.target.value,
        })
        .toPromise()
        .then((result) => {
          if (result.data?.getValidAlias) {
            setAliasValid(false);
          } else {
            setAliasValid(true);
          }
        });
    }
  };

  // // handle url change
  // const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEditCurrentUser({
  //     ...editCurrentUser,
  //     url: e.target.value,
  //   });
  // };

  // useEffect to set first name and last name with parsed name
  useEffect(() => {
    if (
      editCurrentUser.name &&
      editCurrentUser.firstName === null &&
      editCurrentUser.lastName === null
    ) {
      const parsedName = parseName(editCurrentUser.name);
      setEditCurrentUser({
        ...editCurrentUser,
        firstName: parsedName.name,
        lastName: parsedName.lastName,
      });
    }
  }, []);

  // useEffect to set alias error states
  useEffect(() => {
    // check if entered alias is the same as the current alias
    if (editCurrentUser.alias === alias) {
      setAliasTooShort(false);
      setAliasValid(true);
    }

    // Check if alias is long enough
    if (editCurrentUser.alias && editCurrentUser.alias.length < 3) {
      setAliasTooShort(true);
    } else {
      setAliasTooShort(false);
    }
  }, [editCurrentUser.alias, alias]);

  // useEffect to set first name error state
  useEffect(() => {
    if (!editCurrentUser.firstName || editCurrentUser.firstName.length < 2) {
      setFirstNameValid(false);
    } else {
      setFirstNameValid(true);
    }
  }, [editCurrentUser.firstName]);

  // useEffect to set last name error state
  useEffect(() => {
    if (!editCurrentUser.lastName || editCurrentUser.lastName.length < 2) {
      setLastNameValid(false);
    } else {
      setLastNameValid(true);
    }
  }, [editCurrentUser.lastName]);

  const gradient = generateGradient(
    editCurrentUser?.firstName ? editCurrentUser.firstName : "Horst"
  );

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-4 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-gray-900">Profile</h2>
            <p className="text-zinc-gray-500 mt-1 text-sm">
              This information will be displayed publicly.
            </p>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              value={editCurrentUser.firstName || ""}
              onChange={(event) => {
                setFieldsEdited(true);
                handleFirstNameChange(event);
              }}
              className={clsx(
                "mt-1 block w-full min-w-0 flex-1 rounded-md border-zinc-300 text-gray-900 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm",
                !firstNameValid &&
                  "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
              )}
            />
            {!firstNameValid && (
              <p className="text-zinc-gray-500 mt-2 text-sm" id="email-error">
                Please provide a valid first name.
              </p>
            )}
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              value={editCurrentUser.lastName ? editCurrentUser.lastName : ""}
              onChange={(event) => {
                setFieldsEdited(true);
                handleLastNameChange(event);
              }}
              className={clsx(
                "mt-1 block w-full min-w-0 flex-1 rounded-md border-zinc-300 text-gray-900 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm",
                !lastNameValid &&
                  "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
              )}
            />
            {!lastNameValid && (
              <p className="text-zinc-gray-500 mt-2 text-sm" id="email-error">
                Please provide a valid last name.
              </p>
            )}
          </div>

          {/* <div className="sm:col-span-6">
            <label
              htmlFor="alias"
              className="block text-sm font-medium text-gray-900"
            >
              Alias
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-zinc-500 sm:text-sm">
                getstage.app/
              </span>
              <input
                type="text"
                name="alias"
                id="alias"
                value={editCurrentUser.alias ? editCurrentUser.alias : ""}
                onChange={(event) => {
                  setFieldsEdited(true);
                  handleAliasChange(event);
                }}
                className={clsx(
                  "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-zinc-300 text-gray-900 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm",
                  (!aliasValid || aliasTooShort) &&
                    "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
                )}
              />
              {aliasValid && !aliasTooShort && editCurrentUser.alias && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            {!editCurrentUser.alias && (
              <p className="text-zinc-gray-500 mt-2 text-sm" id="email-error">
                Please provide an alias.
              </p>
            )}
            {!aliasValid && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                This alias is already taken or not valid.
              </p>
            )}
            {aliasTooShort && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                Your alias must be 3 characters or more.
              </p>
            )}
          </div> */}

          <div className="sm:col-span-6">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-900"
            >
              Photo
            </label>
            <div className="mt-1 flex items-center">
              {user.image ? (
                <img
                  className="inline-block h-12 w-12 rounded-full"
                  src={user.image}
                  referrerPolicy="no-referrer"
                  alt="profile image"
                />
              ) : (
                <div
                  style={{ background: gradient }}
                  className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800"
                />
              )}

              <div className="ml-4 flex">
                <Dropzone user={editCurrentUser} type={"profileImage"}>
                  <div className="border-zinc-gray-300 hover:bg-zinc-gray-50 focus-within:ring-offset-zinc-gray-50 relative flex cursor-pointer items-center rounded-md border bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-500 focus-within:ring-offset-2">
                    <label
                      htmlFor="user-photo"
                      className="pointer-events-none relative text-sm font-medium text-gray-900"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                  </div>
                </Dropzone>
                <button
                  type="button"
                  className="hover:text-zinc-gray-700 focus:border-zinc-gray-300 focus:ring-offset-zinc-gray-50 ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* <div className="sm:col-span-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Bio
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                value={editCurrentUser.bio ? editCurrentUser.bio : ""}
                onChange={(event) => {
                  setFieldsEdited(true);
                  // handleBioChange(event);
                }}
                className="block w-full border border-zinc-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-zinc-500 focus:border-zinc-500"
              />
            </div>
            <p className="mt-3 text-sm text-zinc-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
          </div> */}

          {/* <div className="sm:col-span-6">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-900"
            >
              URL
            </label>
            <input
              type="text"
              name="url"
              id="url"
              value={editCurrentUser.url ? editCurrentUser.url : ""}
              onChange={(event) => {
                setFieldsEdited(true);
                handleUrlChange(event);
              }}
              className="mt-1 block w-full border-zinc-gray-300 rounded-md shadow-sm text-gray-900 sm:text-sm focus:ring-zinc-500 focus:border-zinc-500"
            />
          </div> */}
          {fieldsEdited && session?.user?.email ? (
            <div className="sm:col-span-6">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditCurrentUser(user);
                    setCurrentUser(user);
                    // setAliasValid(true);
                    // setAliasTooShort(false);
                    setFieldsEdited(false);
                  }}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Catch if first name is valid
                    if (!firstNameValid) {
                      toast.error("First name is not valid.");
                      return false;
                    }
                    // Catch if first name is valid
                    if (!lastNameValid) {
                      toast.error("Last name is not valid.");
                      return false;
                    }
                    // // Catch if alias is not provided
                    // if (!editCurrentUser.alias) {
                    //   setAliasValid(false);
                    //   toast.error("This alias is not valid.");
                    //   return false;
                    // }
                    // // Catch if alias is not valid
                    // if (!aliasValid) {
                    //   toast.error("This alias is already taken or not valid.");
                    //   return false;
                    // }
                    // // Catch if alias is too short
                    // if (
                    //   editCurrentUser.alias &&
                    //   editCurrentUser.alias.length < 3
                    // ) {
                    //   setAliasTooShort(true);
                    //   toast.error("Your alias must be 3 characters or more.");
                    //   return false;
                    // }

                    setUpdateUserLoading(true);
                    if (session?.user?.email) {
                      toast
                        .promise(
                          updateUser({
                            firstName: editCurrentUser.firstName,
                            lastName: editCurrentUser.lastName,
                          }),
                          {
                            loading: `Save profile ...`,
                            success: `Successfully saved!`,
                            error: (err) => err,
                          }
                        )
                        .then((result) => {
                          // check if the user is successfully updated
                          if (!result.data?.updateUser) {
                            toast.error("Something went wrong.");
                            return false;
                          }

                          // User successfully updated
                          setUpdateUserLoading(false);
                          setFieldsEdited(false);
                          setCurrentUser(editCurrentUser);
                          if (isOnboarding) {
                            setRedirectToDiscover(true);
                            router.push("/s");
                          }
                        });
                    }
                  }}
                  className="inline-flex justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                >
                  {updateUserLoading ? <Spinner color={"text-white"} /> : null}
                  Save
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Profile };
