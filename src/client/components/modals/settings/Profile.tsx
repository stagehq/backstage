import { FC, useEffect, useState } from "react";

// import { CheckCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import router from "next/router";
import toast from "react-hot-toast";
import { matchPath } from "react-router-dom";
import { useRecoilState } from "recoil";
import slug from "slug";
import { client } from "../../../graphql/client";
import { GetValidAliasDocument } from "../../../graphql/getValidAlias.generated";
import { User } from "../../../graphql/types.generated";
import { useUpdateUserMutation } from "../../../graphql/updateUser.generated";
import { currentUserState } from "../../../store/user";
import Spinner from "../../../_old/components/02_AppGlobal/Icons/Spinner";
import { Dropzone } from "../../Dropzone";
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

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-4 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-xl font-medium text-gray-900">Profile</h2>
            <p className="mt-1 text-sm text-zinc-gray-500">
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
                "mt-1 flex-1 block w-full min-w-0 border-zinc-300 rounded-md text-gray-900 sm:text-sm focus:ring-zinc-500 focus:border-zinc-500",
                !firstNameValid &&
                  "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
              )}
            />
            {!firstNameValid && (
              <p className="mt-2 text-sm text-zinc-gray-500" id="email-error">
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
                "mt-1 flex-1 block w-full min-w-0 border-zinc-300 rounded-md text-gray-900 sm:text-sm focus:ring-zinc-500 focus:border-zinc-500",
                !lastNameValid &&
                  "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
              )}
            />
            {!lastNameValid && (
              <p className="mt-2 text-sm text-zinc-gray-500" id="email-error">
                Please provide a valid last name.
              </p>
            )}
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="alias"
              className="block text-sm font-medium text-gray-900"
            >
              Alias
            </label>
            <div className="mt-1 flex rounded-md shadow-sm relative">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-zinc-gray-300 bg-zinc-gray-50 text-zinc-gray-500 sm:text-sm">
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
                  "flex-1 block w-full min-w-0 border-zinc-300 rounded-none rounded-r-md text-gray-900 sm:text-sm focus:ring-zinc-500 focus:border-zinc-500",
                  (!aliasValid || aliasTooShort) &&
                    "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
                )}
              />
              {aliasValid && !aliasTooShort && editCurrentUser.alias && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {/* <CheckCircleIcon
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  /> */}
                </div>
              )}
            </div>
            {!editCurrentUser.alias && (
              <p className="mt-2 text-sm text-zinc-gray-500" id="email-error">
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
          </div>

          <div className="sm:col-span-6">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-900"
            >
              Photo
            </label>
            <Dropzone user={editCurrentUser} type={"profileImage"}>
              <div className="mt-1 flex items-center">
                <img
                  className="inline-block h-12 w-12 rounded-full"
                  src={user.image ? user.image : ""}
                  referrerPolicy="no-referrer"
                  alt="profile image"
                />
                <div className="ml-4 flex">
                  <div className="relative bg-white py-2 px-3 border border-zinc-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-zinc-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-zinc-gray-50 focus-within:ring-zinc-500">
                    <label
                      htmlFor="user-photo"
                      className="relative text-sm font-medium text-gray-900 pointer-events-none"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                    <input
                      id="user-photo"
                      name="user-photo"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-gray-900 hover:text-zinc-gray-700 focus:outline-none focus:border-zinc-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-gray-50 focus:ring-zinc-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Dropzone>
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
          <div className="sm:col-span-6">
            {fieldsEdited && session?.user?.email ? (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditCurrentUser(user);
                    setCurrentUser(user);
                    setAliasValid(true);
                    setAliasTooShort(false);
                    setFieldsEdited(false);
                  }}
                  className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
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
                    // Catch if alias is not provided
                    if (!editCurrentUser.alias) {
                      setAliasValid(false);
                      toast.error("This alias is not valid.");
                      return false;
                    }
                    // Catch if alias is not valid
                    if (!aliasValid) {
                      toast.error("This alias is already taken or not valid.");
                      return false;
                    }
                    // Catch if alias is too short
                    if (
                      editCurrentUser.alias &&
                      editCurrentUser.alias.length < 3
                    ) {
                      setAliasTooShort(true);
                      toast.error("Your alias must be 3 characters or more.");
                      return false;
                    }

                    setUpdateUserLoading(true);
                    if (session?.user?.email && editCurrentUser.alias) {
                      toast
                        .promise(
                          updateUser({
                            alias: editCurrentUser.alias,
                            firstName: editCurrentUser.firstName,
                            lastName: editCurrentUser.lastName,
                            // bio: editCurrentUser.bio,
                            // url: editCurrentUser.url,
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
                            router.push("/s/discover");
                          }
                        });
                    }
                  }}
                  className="bg-zinc-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
                >
                  {updateUserLoading ? <Spinner color={"text-white"} /> : null}
                  Save
                </button>
              </div>
            ) : null}
            {redirectToDiscover && (
              <div>
                <p className="text-sm text-zinc-gray-500">Redirecting ...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Profile };
