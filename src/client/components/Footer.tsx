import { FC } from "react";
import { SocialsType } from "./modals/sitesettings/Socials";
import { renderSocialsColorBorder } from "./PageHeader";

interface FooterProps {
  socials: { url: string; network: SocialsType }[]
}

const Footer:FC <FooterProps> = ({socials}) => {

  return <div className="w-full bg-zinc-50 dark:bg-zinc-900">
  <div className="flex gap-8 justify-between items-center w-full max-w-6xl pb-24 p-8 sm:p-12 lg:mx-auto flex-col lg:flex-row lg:gap-2">
    <div className="px-8 flex flex-col gap-2 items-center lg:items-start">
      <div className=" text-sm font-semibold text-zinc-400 dark:text-zinc-600 text-center lg:text-left">
        Build with
      </div>
      <div className=" text-lg font-semibold text-zinc-600 dark:text-zinc-400 text-center lg:text-left">
        Stage ©, API-based developer portfolio.
      </div>
      <div className="text-sm pt-4 font-mdeium text-zinc-500 dark:text-zinc-600 text-center lg:text-left flex gap-4 flex-wrap">
        <a 
          href={process.env.NODE_ENV === `development`? "http://localhost:3000/imprint" : "https://getstage.app/imprint"}
          target={"_blank"}
          rel={"noopener"}
          className="hover:underline hover:text-zinc-600 hover:dark:text-zinc-500 cursor-pointer">Imprint
        </a>
        <a 
          href="mailto:office@getstage.app"
          target={"_blank"}
          rel={"noopener"}
          className="hover:underline hover:text-zinc-600 hover:dark:text-zinc-500 cursor-pointer">Feedback
        </a>
      </div>
    </div>
    <div className="px-8">
      {socials && <div className="flex flex-wrap items-center justify-start gap-4">
        {socials?.map(
          (social: { url: string; network: SocialsType }) => {
            return (
              <a
                key={social.network}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="block resize-none border-transparent bg-white text-sm text-zinc-600 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
              >
                {renderSocialsColorBorder(social.network)}
              </a>
            );
          }
        )}
      </div>}
    </div>
  </div>
</div>
}

export default Footer;