import { PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";

let previewUrl = "";

function toBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve as BlobCallback);
  });
}

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(image: HTMLImageElement, crop: PixelCrop) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop);

  const blob = await toBlob(canvas);
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
}
