import { FC, useState } from "react";

// import { CheckCircleIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import router from "next/router";
import toast from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { Site } from "../../../graphql/types.generated";
import Spinner from "../../loading/Spinner";
import { siteSlugState, siteState } from "../../../store/site";
import { useDeleteSiteMutation } from "../../../graphql/deleteSite.generated";
import { useNavigate } from "react-router-dom"
import { siteSettingsOpenState } from "../../../store/ui/modals";
import { currentUserState } from "../../../store/user";

interface DeleteSiteProps {
  site: Site;
}

const DeleteSite: FC<DeleteSiteProps> = ({ site }) => {
  const { data: session } = useSession();
  const [, deleteSite] = useDeleteSiteMutation();

  const [updateSiteLoading, setUpdateSiteLoading] = useState(false);
  
  const [, setSiteSettingsOpen] = useRecoilState(
    siteSettingsOpenState
  );
  const siteSlug = useRecoilValue(siteSlugState);
  const currentSite = useRecoilValue(siteState(siteSlug));
  const [user, setUser] = useRecoilState(currentUserState);
  
  const navigate = useNavigate();

  return (
    <div className="sm:overflow-hidden">
      <div className="bg-white py-6 px-4 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            {/* <label
              htmlFor="delete-site"
              className="block text-sm font-medium text-gray-900"
            >
              Delete Site
            </label> */}

            {/* Input with check, if the site name is correct */}
            {/* <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="delete-site"
                id="delete-site"
                className="focus:ring-zinc-800 focus:border-zinc-800 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="Type the site name to confirm"
              />
            </div> */}

            <div className="flex items-center justify-start gap-2">
              <button
                type="button"
                onClick={() => {
                  setUpdateSiteLoading(true);
                  if (session?.user?.email && currentSite?.subdomain && user) {
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
                        setUpdateSiteLoading(false)
                        // router.push("/s");
                        setUser({
                          ...user,
                          sites: user.sites?.filter(
                            (site) => site.subdomain !== currentSite.subdomain
                          ),
                        });
                        navigate("/s")
                        setSiteSettingsOpen(false)
                      });
                  }
                }}
                className="inline-flex w-full justsify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
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
