import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

// TODO: Fix this
// Make sure the font exists in the specified path:
// const font = fetch(new URL('../../assets/TYPEWR__.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer(),
// );

// call with /api/og?tagline=Hello&bio=World&image=https://example.com/image.png
export default async function handler(req: NextRequest) {
  // const fontData = await font;

  try {
    const { searchParams } = new URL(req.url);

    const hasTagline = searchParams.has('tagline');
    const tagline = hasTagline
      ? searchParams.get('tagline')?.slice(0, 100)
      : 'Awesome person';

    const hasBio = searchParams.has('bio');
    const bio = hasBio
      ? searchParams.get('bio')?.slice(0, 200)
      : 'with a cool bio';

    const image = searchParams.get('image');

    return new ImageResponse(
      (
        <div
          style={{
            // TODO: Fix Inter font loading
            fontFamily: 'Inter',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <div tw="flex w-full flex-col items-start justify-start self-stretch @3xl:w-3/4 @6xl:w-1/2 pl-16 pr-32">
            {image && (
              <img
                tw="w-30 h-30 rounded-full"
                src={image}
              />
            )}
            <div tw="flex w-full flex-col">
              <span
                tw="-ml-4 mt-6 w-full border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-3xl leading-8 font-bold text-zinc-800 lg:text-4xl">{tagline}
              </span>
              <span
                tw="-ml-4 mt-6 w-full border-0 border-l-2 border-transparent bg-white py-0 px-0 pl-4 text-md text-zinc-800">{bio}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
        // fonts: [
        //   {
        //     name: "Inter",
        //     data: fontData,
        //     style: 'normal',
        //     weight: 400,
        //   },
        // ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }

}