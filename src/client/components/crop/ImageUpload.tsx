import { FC, Fragment, useEffect, useRef, useState } from "react";

import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

import { Dialog, Transition } from "@headlessui/react";
import { decodeGlobalID } from "@pothos/plugin-relay";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { uploadType } from "../../../client/components/Dropzone";
import { generateGradient } from "../../../helper/generateUserGradient";
import { uploadFile } from "../../../server/aws/helper";
import { useUpdateSiteHeaderMutation } from "../../graphql/updateSiteHeader.generated";
import { useUpdateUploadCreditMutation } from "../../graphql/updateUploadCredit.generated";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import { isrDataState, isrState } from "../../store/isr";
import { siteSlugState, siteState } from "../../store/site";
import { currentUserState, isrUserState } from "../../store/user";

interface ImageUploadProps {
  imageUrl: string;
  uploadType: uploadType;
  mutationId?: string;
  size: string;
  disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
  imageUrl,
  uploadType,
  mutationId,
  size,
  disabled = false,
}) => {
  // console.log(imageUrl, uploadType, mutationId);
  const cancelButtonRef = useRef(null);

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isIsrMode] = useRecoilState(isrState);
  const [currentUser, setCurrentUser] = useRecoilState(
    isIsrMode ? isrUserState : currentUserState
  );
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(
    isIsrMode ? isrDataState : siteState(siteSlug)
  );

  const [, updateUser] = useUpdateUserMutation();
  const [, updateSiteHeader] = useUpdateSiteHeaderMutation();
  const [, updateUploadCredit] = useUpdateUploadCreditMutation();

  // handle image chnange and current user state image to new image
  const handleImageChange = (url: string, subdomain?: string) => {
    if (uploadType === "profileImage" || uploadType === "profileCoverImage") {
      if (url === "" || currentUser === null) return;
      setCurrentUser({
        ...currentUser,
        image: url,
      });
    } else if (uploadType === "siteImage") {
      if (url === "" || site === null) return;
      setSite({
        ...site,
        image: url,
      });
      if (!currentUser || !subdomain) return null;
      setCurrentUser({
        ...currentUser,
        sites: currentUser.sites
          ? currentUser.sites.map((site) => {
              if (!url) return site;
              if (site.subdomain === subdomain) {
                return {
                  ...site,
                  ...{ image: url },
                };
              }
              return site;
            })
          : [],
      });
    }
  };

  const onChange = (e: any) => {
    setOpenModal(true);

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  function dataURItoBlob(dataURI: string) {
    const binary = atob(dataURI.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: dataURI.substring(dataURI.indexOf(":") + 1, dataURI.indexOf(";")),
    });
  }

  const handleUpload = async (url: string) => {
    if (currentUser?.uploadCredit && currentUser.uploadCredit < 100) {
      // console.log(url);
      const file = dataURItoBlob(url);

      updateUploadCredit().then((result) => {
        if (result.data?.updateUploadCredit) {
          // console.log("Updated Credit");
        } else {
          throw new Error("Error adding upload credit to user");
        }
      });

      if (!currentUser) return null;
      // console.log(file, currentUser.id, uploadType);
      uploadFile(file, currentUser.id, uploadType).then((data) => {
        if (
          uploadType === "profileImage" ||
          uploadType === "profileCoverImage"
        ) {
          // Update user images
          updateUser({
            image: data,
          }).then((result) => {
            // Success messages if image is uploaded
            if (result.data?.updateUser) {
              // console.log("Success");
              handleImageChange(
                result.data?.updateUser.image
                  ? result.data?.updateUser.image
                  : ""
              );
            } else {
              throw new Error("Error adding image to user");
            }
          });
        } else if (uploadType === "siteImage" && mutationId != null) {
          // Update site images
          updateSiteHeader({
            siteId: decodeGlobalID(mutationId).id,
            image: data,
          }).then((result) => {
            // Success messages if image is uploaded
            if (result.data?.updateSiteHeader) {
              // console.log("Success");
              handleImageChange(
                result.data?.updateSiteHeader.image
                  ? result.data?.updateSiteHeader.image
                  : "",
                result.data?.updateSiteHeader.subdomain
                  ? result.data.updateSiteHeader.subdomain
                  : ""
              );
            } else {
              throw new Error("Error adding image to user");
            }
          });
        }
      });
    } else {
      toast.error(
        "Wow, you already uploaded 200 images!! Congrats 🎊 If you want more images, please get in touch."
      );
    }
  };

  useEffect(() => {
    if (cropData !== "#") {
      handleUpload(cropData);
    }
  }, [cropData]);

  const gradient = generateGradient(
    currentUser?.firstName ? currentUser.firstName : "Horst"
  );

  return (
    <>
      <div
        className={clsx(
          "relative flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-zinc-600 focus-within:ring-offset-2 dark:focus-within:ring-zinc-300 dark:focus-within:ring-offset-zinc-900",
          !disabled && "cursor-pointer",
          size
        )}
      >
        {imageUrl ? (
          <div className="inline-block h-full w-full overflow-hidden rounded-full">
            <img
              className="h-full w-full"
              src={imageUrl}
              referrerPolicy="no-referrer"
              alt="image"
            />
          </div>
        ) : (
          (!isIsrMode || imageUrl) && (
            <div
              style={{ background: gradient }}
              className="h-full w-full rounded-full border border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800"
            />
          )
        )}
        <div className="absolute h-full w-full">
          {!disabled && (
            <div className="absolute bottom-0 right-0 h-[40%] w-[40%] rounded-full border-2 border-zinc-50 bg-zinc-800 dark:border-zinc-900 dark:bg-zinc-700">
              <div className="flex h-full w-full items-center justify-center text-zinc-200">
                <EditIcon />
              </div>
            </div>
          )}
          <input
            onChange={onChange}
            accept="image/png, image/jpeg"
            id="photo"
            name="photo"
            type="file"
            className={clsx(
              "dark:border-no ne absolute inset-0 rounded-md border-gray-300 text-[0] opacity-0",
              !disabled && "cursor-pointer"
            )}
            style={{ cursor: disabled ? "" : "pointer" }}
            disabled={disabled}
            aria-label="Upload image"
          />
        </div>
      </div>

      <Transition.Root show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpenModal}
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <Cropper
                      style={{ height: "100%", width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      aspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-zinc-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={() => {
                        setOpenModal(false);
                        getCropData();
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-base font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setOpenModal(false)}
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
    </>
  );
};

export default ImageUpload;

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="h-5 w-5"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
