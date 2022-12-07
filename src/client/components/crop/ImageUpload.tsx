import { Fragment, useEffect, useRef, useState } from "react";

import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";

import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { uploadFile } from "../../../server/aws/helper";
import { useUpdateUserMutation } from "../../graphql/updateUser.generated";
import { currentUserState } from "../../store/user";

export default function ImageUpload() {
  const cancelButtonRef = useRef(null);

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [, updateUser] = useUpdateUserMutation();

  // handle image chnange and current user state image to new image
  const handleImageChange = (url: string) => {
    if (url === "" || currentUser === null) return;
    setCurrentUser({
      ...currentUser,
      image: url,
    });
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

    const type = "profileImage";

    uploadFile(file, currentUser.id, type).then((data) => {
      // Update user images
      updateUser({
        image: type === "profileImage" ? data : undefined,
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
    });
  };

  useEffect(() => {
    if (cropData !== "#") {
      handleUpload(cropData);
    }
  }, [cropData]);

  if (!currentUser) return null;

  return (
    <>
      <div className="mt-1 flex items-center">
        <img
          className="inline-block h-12 w-12 rounded-full"
          src={currentUser.image ? currentUser.image : ""}
          referrerPolicy="no-referrer"
          alt="profile image"
        />
        <div className="ml-4 flex">
          <div className="relative bg-white px-4 py-2 rounded border border-zinc-200 text-sm font-medium text-zinc-700">
            <label htmlFor="user-photo">
              <span>Change</span>
              <span className="sr-only"> user photo</span>
            </label>
            <input
              onChange={onChange}
              accept="image/*"
              id="user-photo"
              name="user-photo"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            className="ml-3 bg-transparent py-2 px-3 border border-transparent rounded-md text-sm font-medium text-gray-900 hover:text-blue-gray-700 focus:outline-none focus:border-blue-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-gray-50 focus:ring-blue-500"
          >
            Remove
          </button>
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
