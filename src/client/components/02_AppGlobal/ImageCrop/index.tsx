import "react-image-crop/dist/ReactCrop.css";

import React, { useRef, useState } from "react";
import { centerCrop, Crop, makeAspectCrop, PixelCrop } from "react-image-crop";

import ImageCropModal from "../ImageCropModal";
import ImageUpload from "../ImageUpload";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
        height: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropp() {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.

      const reader = new FileReader();
      reader.addEventListener("load", () =>
        //@ts-ignore
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (e) => {
        const image = new Image();
        if (e.target) {
          image.src = e.target.result as string;
          image.onload = function (this: any) {
            const height = this.height;
            const width = this.width;
            console.log(height, width);

            if (height < 512 || width < 512) {
              alert(
                "Please provide an image with minimal height and width of 512px."
              );
              return false;
            }
            setOpenModal(true);
            return true;
          };
        }
      };
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  return (
    <div className="max-w-md">
      <ImageUpload {...{ onSelectFile }} />
      <ImageCropModal
        {...{
          openModal,
          setOpenModal,
          crop,
          setCrop,
          setCompletedCrop,
          aspect,
          imgRef,
          imgSrc,
          onImageLoad,
        }}
      />
      {/* <div>
        {completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div> */}
    </div>
  );
}
