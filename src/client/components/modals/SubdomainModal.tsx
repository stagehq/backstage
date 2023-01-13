import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
import { useUpsertSiteMutation } from "../../graphql/upsertSite.generated";
import { onboardingState } from "../../store/onboarding";
import { subdomainCardOpenState } from "../../store/ui/modals";
import { currentUserState } from "../../store/user";
import Gradient from "../Gradient";
import { Icon } from "../Icons";
import { OnboardingSubdomain } from "../onboarding/Onboarding";
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
              <Dialog.Panel className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:h-auto sm:align-middle">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                    onClick={() => setSubdomainCardOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <Icon name="XMarkIcon" />
                  </button>
                </div>
                <div className="min-h-full flex flex-col justify-center">
                  <div className="sm:max-w-sm">
                    <div className="h-screen sm:h-full sm:min-h-[530px] bg-white sm:border sm:border-white sm:shadow-[0_4px_100px_0_rgba(0,0,0,0.08)] shadow-zinc-400 sm:rounded-2xl overflow-hidden">
                      <div className="flex flex-col h-full sm:min-h-[530px]">
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
  const user = useRecoilValue(currentUserState);
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
      })

      if(response.data?.upsertSite){
        const subdomain = response.data.upsertSite.subdomain;
        setSubdomainCardOpen(false);
        setTimeout(() => {
          if(subdomain) navigate(`/s/${subdomain}`);
        }, 500)
      }
    }
  };

  return (
    <>
      <div className="relative h-[50vh] sm:h-64">
        <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-10">
          <DomainIcon />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent"></div>
        <Gradient />
      </div>
      <div className="mt-auto flex flex-col justify-start items-start gap-2 pt-8 px-4 sm:px-6">
        <p className="text-xl font-semibold text-left text-zinc-900">
          Get your alias
        </p>
        <p className="text-xs font-medium text-left text-zinc-500">
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
      <div className="flex flex-col justify-start items-start gap-2 px-4 py-6 sm:px-6">
        <div className="w-full">
          <div className="w-full">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-zinc-600"
            >
              Alias
            </label>
            <div className="mt-1 relative">
              <input
                onChange={handleSubdomainChange}
                value={subdomain}
                id="subdomain"
                maxLength={20}
                name="subdomain"
                type="text"
                autoComplete="subdomain"
                className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="button"
            disabled={!subdomainValid}
            onClick={() => {
              handleUpsertSite();
            }}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 disabled:opacity-30"
          >
            Claim alias
          </button>
        </div>
      </div>
    </>
  );
};