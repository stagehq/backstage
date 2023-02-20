import { FC } from "react";
import { SocialsType } from "./modals/sitesettings/Socials";
import { renderSocialsColorBorder } from "./PageHeader";

interface FooterProps {
  socials: { url: string; network: SocialsType }[];
}

const Footer: FC<FooterProps> = ({ socials }) => {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900">
      <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-8 p-8 pb-24 sm:p-12 lg:mx-auto lg:flex-row lg:gap-2">
        <div className="flex flex-col items-center gap-2 px-8 lg:items-start">
          <div className=" text-center text-sm font-semibold text-zinc-400 dark:text-zinc-600 lg:text-left">
            Built with
          </div>
          <div className=" text-center text-lg font-semibold text-zinc-600 dark:text-zinc-400 lg:text-left">
            Stage, the API-based developer portfolio.
          </div>
          <div className="font-mdeium flex flex-wrap gap-4 pt-4 text-center text-sm text-zinc-500 dark:text-zinc-600 lg:text-left">
            <a
              href={
                process.env.NODE_ENV === `development`
                  ? "http://localhost:3000/imprint"
                  : "https://getstage.app/imprint"
              }
              target={"_blank"}
              rel={"noopener"}
              className="cursor-pointer hover:text-zinc-600 hover:underline hover:dark:text-zinc-500"
            >
              Imprint
            </a>
            <a
              href="mailto:office@getstage.app"
              target={"_blank"}
              rel={"noopener"}
              className="cursor-pointer hover:text-zinc-600 hover:underline hover:dark:text-zinc-500"
            >
              Feedback
            </a>
          </div>
        </div>
        <div className="px-8">
          {socials && (
            <div className="flex flex-wrap items-center justify-start gap-4">
              {socials?.map((social: { url: string; network: SocialsType }) => {
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
