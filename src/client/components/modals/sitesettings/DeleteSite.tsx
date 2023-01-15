import { FC, useState } from "react";

// import { CheckCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDeleteSiteMutation } from "../../../graphql/deleteSite.generated";
import { Site } from "../../../graphql/types.generated";
import { siteSlugState, siteState } from "../../../store/site";
import { siteSettingsOpenState } from "../../../store/ui/modals";
import { currentUserState } from "../../../store/user";
import Spinner from "../../loading/Spinner";

interface DeleteSiteProps {
  site: Site;
}

const DeleteSite: FC<DeleteSiteProps> = ({ site }) => {
  const { data: session } = useSession();
  const [, deleteSite] = useDeleteSiteMutation();

  const [updateSiteLoading, setUpdateSiteLoading] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [editCurrentInput, setEditCurrentInput] = useState("");

  const [, setSiteSettingsOpen] = useRecoilState(siteSettingsOpenState);
  const siteSlug = useRecoilValue(siteSlugState);
  const currentSite = useRecoilValue(siteState(siteSlug));
  const [user, setUser] = useRecoilState(currentUserState);

  const navigate = useNavigate();

  const handleDeleteCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditCurrentInput(event.target.value);
    if (event.target.value === "getstage.app/" + site.subdomain) {
      setDeleteState(true);
    } else {
      setDeleteState(false);
    }
  };

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="delete-site"
              className="block text-sm font-medium text-gray-900"
            >
              Delete Site
            </label>
            <div className="mt-2 max-w-xl text-sm text-zinc-500">
              <p>
                To confirm the deletion, enter the full domain of your website
                in the text input field.
              </p>
            </div>

            <div className="mt-2 sm:flex sm:items-center">
              {/* Input with check, if the site name is correct */}
              <div className="w-full sm:max-w-xs">
                {/* <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-zinc-500 sm:text-sm">
                  getstage.app/
                </span> */}
                <label htmlFor="delete-subdomain" className="sr-only">
                  Delete Subdomain
                </label>
                <input
                  type="text"
                  name="delelte-check"
                  id="delete-check"
                  placeholder={`getstage.app/${site.subdomain}`}
                  value={editCurrentInput}
                  onChange={(event) => {
                    handleDeleteCheck(event);
                  }}
                  className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (deleteState) {
                    setUpdateSiteLoading(true);
                    if (
                      session?.user?.email &&
                      currentSite?.subdomain &&
                      user
                    ) {
                      toast
                        .promise(
                          deleteSite({
                            subdomain: currentSite.subdomain,
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
                          // router.push("/s");
                          setUser({
                            ...user,
                            sites: user.sites?.filter(
                              (site) => site.subdomain !== currentSite.subdomain
                            ),
                          });
                          navigate("/s");
                          setSiteSettingsOpen(false);
                        });
                    }
                  }
                }}
                className={clsx(
                  "mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm",
                  deleteState
                    ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                    : "bg-zinc-300 text-zinc-500 hover:bg-zinc-200 focus:ring-zinc-300"
                )}
              >
                {updateSiteLoading ? <Spinner color={"text-white"} /> : null}
                Delete Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DeleteSite };
