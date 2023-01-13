import { FC, Fragment, useEffect, useRef, useState } from "react";

import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { uploadFile } from "../../../server/aws/helper";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import { currentUserState } from "../../store/user";
import { uploadType } from "../../../client/components/Dropzone";
import clsx from "clsx";
import { useUpdateSiteHeaderMutation } from "../../graphql/updateSiteHeader.generated";
import { decodeGlobalID } from "@pothos/plugin-relay";
import { siteSlugState, siteState } from "../../store/site";

interface ImageUploadProps {
  imageUrl: string
  uploadType: uploadType
  mutationId?: string 
  size: string
}

const ImageUpload:FC<ImageUploadProps> = ({imageUrl, uploadType, mutationId, size}) => {
  console.log(imageUrl, uploadType, mutationId);
  const cancelButtonRef = useRef(null);

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));

  const [, updateUser] = useUpdateUserMutation();
  const [, updateSiteHeader] = useUpdateSiteHeaderMutation();

  // handle image chnange and current user state image to new image
  const handleImageChange = (url: string) => {
    if(uploadType === "profileImage" || uploadType === "profileCoverImage"){
      if (url === "" || currentUser === null) return;
      setCurrentUser({
        ...currentUser,
        image: url,
      });
    }else if(uploadType === "siteImage"){
      if (url === "" ||  site === null) return;
      setSite({
        ...site,
        image: url,
      })
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
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  const handleUpload = async (url: string) => {
    const file = dataURItoBlob(url);

    if (!currentUser) return null;

    uploadFile(file, currentUser.id, uploadType).then((data) => {
      if(uploadType === "profileImage" || uploadType === "profileCoverImage"){
        // Update user images
        updateUser({
          image: data
        }).then((result) => {
          // Success messages if image is uploaded
          if (result.data?.updateUser) {
            console.log("Success");
            handleImageChange(
              result.data?.updateUser.image ? result.data?.updateUser.image : ""
            );
          } else {
            throw new Error("Error adding image to user");
          }
        });
      }else if(uploadType === "siteImage" && mutationId != null){
        // Update site images
        updateSiteHeader({
          siteId: decodeGlobalID(mutationId).id,
          image: data
        }).then((result) => {
          // Success messages if image is uploaded
          if (result.data?.updateSiteHeader) {
            console.log("Success");
            handleImageChange(
              result.data?.updateSiteHeader.image ? result.data?.updateSiteHeader.image : ""
            );
          } else {
            throw new Error("Error adding image to user");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (cropData !== "#") {
      handleUpload(cropData);
    }
  }, [cropData]);

  return (
    <>
      <div className={clsx("flex items-center relative cursor pointer", size)}>
        {imageUrl ? <div className="w-full h-full inline-block rounded-full overflow-hidden" >
          <img
            className="w-full h-full"
            src={imageUrl}
            referrerPolicy="no-referrer"
            alt="image"
          />
        </div>
        : <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-full"/>
        }
        <div className="absolute w-full h-full">
          <div className="w-[40%] h-[40%] border-2 border-zinc-50 dark:border-zinc-900 bg-zinc-800 dark:bg-zinc-700 focus-within:bg-zinc-700 absolute bottom-0 right-0 rounded-full">
            <div className="flex w-full h-full justify-center items-center text-zinc-200">
              <EditIcon/>
            </div>
          </div>
          <input
            onChange={onChange}
            accept="image/*"
            id="photo"
            name="photo"
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer border-gray-300 rounded-md"
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
                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
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
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900 text-base font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 sm:col-start-2 sm:text-sm"
                      onClick={() => {
                        setOpenModal(false);
                        getCropData();
                      }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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
}

export default ImageUpload;

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="w-5 h-5"
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