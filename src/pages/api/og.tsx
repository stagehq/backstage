import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const regular = fetch(
  new URL("../../assets/og/inter/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const semibold = fetch(
  new URL("../../assets/og/inter/Inter-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

// call with /api/og?tagline=Hello&bio=World&image=https://example.com/image.png
export default async function handler(req: NextRequest) {
  const regularFontData = await regular;
  const semiboldFontData = await semibold;

  function cleanUpString(str: string): string {
    return str.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, "");
  }

  try {
    const { searchParams } = new URL(req.url);

    const hasTagline = searchParams.has("tagline");
    const tagline = hasTagline ? searchParams.get("tagline") : "Awesome person";

    const hasBio = searchParams.has("bio");
    const bio = hasBio ? searchParams.get("bio") : "with a cool bio";

    const image = searchParams.get("image");

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: "Inter",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            // backgroundImage: `url(${getBaseUrl()}/images/og/background.jpg)`,
            // backgroundSize: "100% 100%",
          }}
        >
          <div tw="flex w-full flex-col items-start justify-start self-stretch @3xl:w-3/4 @6xl:w-1/2 pl-16 pr-56">
            {image && <img tw="w-30 h-30 rounded-full" src={image} />}
            <div tw="flex w-full flex-col">
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                }}
                tw="-ml-4 mt-6 w-full border-0 border-l-2 border-transparent py-0 px-0 pl-4 text-4xl leading-8 font-bold text-zinc-800 lg:text-4xl"
              >
                {cleanUpString(tagline ? tagline : "")}
              </span>
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                }}
                tw="-ml-4 mt-6 w-full border-0 border-l-2 border-transparent py-0 px-0 pl-4 text-lg text-zinc-800"
              >
                {cleanUpString(bio ? bio : "")}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        emoji: "twemoji",
        fonts: [
          {
            name: "Inter",
            data: regularFontData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: semiboldFontData,
            style: "normal",
            weight: 600,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
