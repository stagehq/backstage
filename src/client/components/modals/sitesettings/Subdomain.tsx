import { FC, useEffect, useState } from "react";

// import { CheckCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import router from "next/router";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import slug from "slug";
import { client } from "../../../graphql/client";
import { GetValidSubdomainDocument } from "../../../graphql/getValidSubdomain.generated";
import { Site } from "../../../graphql/types.generated";
import Spinner from "../../loading/Spinner";
import { siteSlugState, siteState } from "../../../store/site";
import { useUpdateSiteSubdomainMutation } from "../../../graphql/updateSiteSubdomain.generated";
import { useDeleteSiteMutation } from "../../../graphql/deleteSite.generated";

interface SubdomainProps {
  site: Site;
}

type UpdateSiteSuccessType = boolean | null;

const Subdomain: FC<SubdomainProps> = ({ site }) => {
  const { data: session } = useSession();
  const [, updateSiteSubdomain] = useUpdateSiteSubdomainMutation();
  const [, deleteSite] = useDeleteSiteMutation();

  const [fieldsEdited, setFieldsEdited] = useState(false);
  const [updateSiteLoading, setUpdateSiteLoading] = useState(false);
  const [updateSiteSuccess, setUpdateSiteSuccess] =
    useState<UpdateSiteSuccessType>(null);

  // Edit current site state
  const [editCurrentSite, setEditCurrentSite] = useState(site);

  // subdomain state
  const [subdomain, setSubdomain] = useState(site.subdomain);
  const [subdomainValid, setSubdomainValid] = useState(true);
  const [subdomainTooShort, setSubdomainTooShort] = useState(false);

  /* Set name */
  const siteSlug = useRecoilValue(siteSlugState);
  const [, setCurrentSite] = useRecoilState(siteState(siteSlug));

  // handle subdomain change
  const handleSubdomainChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCurrentSite({
      ...editCurrentSite,
      subdomain: slug(e.target.value, { lower: true }),
    });

    // Check if subdomain is valid
    if (e.target.value && e.target.value !== subdomain) {
      await client
        .query(GetValidSubdomainDocument, {
          subdomain: e.target.value,
        })
        .toPromise()
        .then((result) => {
          if (result.data?.getValidSubdomain) {
            setSubdomainValid(false);
          } else {
            setSubdomainValid(true);
          }
        });
    }
  };

  // useEffect to set subdomain error states
  useEffect(() => {
    // check if entered subdomain is the same as the current subdomain
    if (editCurrentSite.subdomain === subdomain) {
      setSubdomainTooShort(false);
      setSubdomainValid(true);
    }

    // Check if subdomain is long enough
    if (editCurrentSite.subdomain && editCurrentSite.subdomain.length < 3) {
      setSubdomainTooShort(true);
    } else {
      setSubdomainTooShort(false);
    }
  }, [editCurrentSite, subdomain]);

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-4 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="subdomain"
              className="block text-sm font-medium text-gray-900"
            >
              Subdomain
            </label>
            <div className="relative mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-zinc-500 sm:text-sm">
                getstage.app/
              </span>
              <input
                type="text"
                name="subdomain"
                id="subdomain"
                value={editCurrentSite.subdomain ? editCurrentSite.subdomain : ""}
                onChange={(event) => {
                  setFieldsEdited(true);
                  handleSubdomainChange(event);
                }}
                className={clsx(
                  "block w-full min-w-0 flex-1 rounded-none rounded-r-md border-zinc-300 text-gray-900 focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm",
                  (!subdomainValid || subdomainTooShort) &&
                    "border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500"
                )}
              />
              {subdomainValid && !subdomainTooShort && editCurrentSite && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {/* <CheckCircleIcon
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  /> */}
                </div>
              )}
            </div>
            {!editCurrentSite && (
              <p className="text-zinc-gray-500 mt-2 text-sm" id="email-error">
                Please provide an subdomain.
              </p>
            )}
            {!subdomainValid && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                This subdomain is already taken or not valid.
              </p>
            )}
            {subdomainTooShort && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                Your subdomain must be 3 characters or more.
              </p>
            )}
          </div>

          {/* <div className="sm:col-span-6">
            <div className="flex items-center justify-start gap-2">
              <button
                type="button"
                onClick={() => {
                  setUpdateSiteLoading(true);
                  if (session?.user?.email && editCurrentSite.subdomain && subdomain) {
                    toast
                      .promise(
                        deleteSite({
                          subdomain: subdomain,
                        }),
                        {
                          loading: `Deleting site ...`,
                          success: `Successfully deleted!`,
                          error: (err) => err,
                        }
                      )
                      .then((result) => {
                        // check if the site is successfully updated
                        if (!result.data?.deleteSite) {
                          toast.error("Something went wrong.");
                          return false;
                        }

                        // Site successfully updated
                        setUpdateSiteLoading(false);
                        router.push("/s/");
                      });
                  }
                }}
                className="inline-flex w-full justsify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                >
                {updateSiteLoading ? <Spinner color={"text-white"} /> : null}
                Delete Site
              </button>
            </div>
          </div> */}

          {fieldsEdited && session?.user?.email ? (
            <div className="sm:col-span-6">
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditCurrentSite(site);
                    setCurrentSite(site);
                    setSubdomainValid(true);
                    setSubdomainTooShort(false);
                    setFieldsEdited(false);
                  }}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Catch if subdomain is not provided
                    if (!editCurrentSite.subdomain) {
                      setSubdomainValid(false);
                      toast.error("This subdomain is not valid.");
                      return false;
                    }
                    // Catch if subdomain is not valid
                    if (!subdomainValid) {
                      toast.error("This subdomain is already taken or not valid.");
                      return false;
                    }
                    // Catch if subdomain is too short
                    if (
                      editCurrentSite.subdomain &&
                      editCurrentSite.subdomain.length < 3
                    ) {
                      setSubdomainTooShort(true);
                      toast.error("Your subdomain must be 3 characters or more.");
                      return false;
                    }

                    setUpdateSiteLoading(true);
                    if (session?.user?.email && editCurrentSite.subdomain && subdomain) {
                      toast
                        .promise(
                          updateSiteSubdomain({
                            id: subdomain,
                            subdomain: editCurrentSite.subdomain,
                          }),
                          {
                            loading: `Save settings ...`,
                            success: `Successfully saved!`,
                            error: (err) => err,
                          }
                        )
                        .then((result) => {
                          // check if the site is successfully updated
                          console.log(result.data);
                          if (!result.data?.updateSiteSubdomain) {
                            toast.error("Something went wrong.");
                            return false;
                          }

                          // Site successfully updated
                          setUpdateSiteLoading(false);
                          setFieldsEdited(false);
                          setCurrentSite(editCurrentSite);
                          setSubdomain(editCurrentSite.subdomain);
                          router.push("/s/" + editCurrentSite.subdomain);
                        });
                    }
                  }}
                  className="inline-flex justify-center rounded-md border border-transparent bg-zinc-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                >
                  {updateSiteLoading ? <Spinner color={"text-white"} /> : null}
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

export { Subdomain };
