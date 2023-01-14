import { Dialog, Transition } from "@headlessui/react";
import { userAgentFromString } from "next/server";
import { FC, Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUpsertSiteMutation } from "../../graphql/upsertSite.generated";
import { subdomainCardOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import Gradient from "../Gradient";
import { Icon } from "../Icons";
import DomainIcon from "../onboarding/visuals/DomainIcon";

const SubdomainModal: FC = () => {
  const [subdomainCardOpen, setSubdomainCardOpen] = useRecoilState(
    subdomainCardOpenState
  );
  const user = useRecoilValue(currentUserState);

  const cancelButtonRef = useRef(null);

  if (!user) return null;

  return (
    <Transition.Root show={subdomainCardOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setSubdomainCardOpen}
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block transform overflow-hidden rounded-lg text-left align-bottom shadow-xl transition-all sm:h-auto sm:align-middle">
                <div className="absolute top-0 right-0 z-10 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    onClick={() => setSubdomainCardOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div className="flex min-h-full flex-col justify-center">
                  <div className="sm:max-w-sm">
                    <div className="h-screen overflow-hidden bg-white shadow-zinc-400 sm:h-full sm:min-h-[530px] sm:rounded-2xl sm:border sm:border-white sm:shadow-[0_4px_100px_0_rgba(0,0,0,0.08)]">
                      <div className="flex h-full flex-col sm:min-h-[530px]">
                        <InSiteSubdomain />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubdomainModal;

const InSiteSubdomain: FC = () => {
  const [subdomain, setSubdomain] = useState("");
  const [user, setUser] = useRecoilState(currentUserState);
  const [, setSubdomainCardOpen] = useRecoilState(subdomainCardOpenState);
  const [subdomainValid, setSubdomainValid] = useState(false);
  const [, upsertSite] = useUpsertSiteMutation();

  const navigate = useNavigate();

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSubdomain(value);
      setSubdomainValid(false);
    } else if (value.match(/^[a-z]+$/)) {
      setSubdomain(value);
      if (value.length > 3) {
        setSubdomainValid(true);
      } else {
        setSubdomainValid(false);
      }
    }
  };

  const handleUpsertSite = async () => {
    setSubdomainCardOpen(false);
    if (subdomainValid) {
      const response = await upsertSite({
        subdomain: subdomain,
        image: user?.image ? user.image : undefined 
      });

      if (response.data?.upsertSite) {
        const subdomain = response.data.upsertSite.subdomain;
        if(!user) return null;
        setUser({
           ...user, 
           sites: user.sites
            ? [...user?.sites, response.data.upsertSite]
            : [response.data.upsertSite],
        }) ;
        setSubdomainCardOpen(false);
        setTimeout(() => {
          if (subdomain) navigate(`/s/${subdomain}`);
        }, 500);
      }
    }
  };

  return (
    <>
      <div className="relative h-[50vh] sm:h-64">
        <div className="absolute top-1/2 left-2/4 z-10 -translate-x-1/2 -translate-y-1/2">
          <DomainIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="mt-auto flex flex-col items-start justify-start gap-2 px-4 pt-8 sm:px-6">
        <p className="text-left text-xl font-semibold text-zinc-900">
          Get your alias
        </p>
        <p className="text-left text-xs font-medium text-zinc-500">
          The alias is the name which is displayed in your url.{" "}
          {subdomain.length === 0 ? (
            <>
              For example: getstage.app/
              <span className="underline">nilsjacobsen</span>
            </>
          ) : (
            <>
              Your domain: getstage.app/
              <span className="underline">{subdomain}</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 px-4 py-6 sm:px-6">
        <div className="w-full">
          <div className="w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-zinc-600"
            >
              Alias
            </label>
            <div className="relative mt-1">
              <input
                onChange={handleSubdomainChange}
                value={subdomain}
                id="subdomain"
                maxLength={20}
                name="subdomain"
                type="text"
                autoComplete="subdomain"
                className="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!subdomainValid}
            onClick={() => {
              handleUpsertSite();
            }}
            className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-zinc-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-30"
          >
            Claim alias
          </button>
        </div>
      </div>
    </>
  );
};
