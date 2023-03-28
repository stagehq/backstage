import clsx from "clsx";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Navigation from "../../components/studio/Navigation";
//import StudioEditor from "../../components/studio/StudioEditor";
import { siteSlugState } from "../../store/site";
import { themeState } from "../../store/ui/theme";

const StudioEditor = dynamic(() => import('../../components/studio/StudioEditor').then(module => module.StudioEditor), {
  ssr: false
});

const Site = () => {
  const { siteId } = useParams();
  const [, setSiteSlug] = useRecoilState(siteSlugState);

  const [theme] = useRecoilState(themeState);

  const isSSR = typeof window === 'undefined';

  useEffect(() => {
    if (siteId) {
      setSiteSlug(siteId);
    }
  }, [siteId, setSiteSlug]);

  return (
    <>
      <div className={clsx(theme === "dark" && "dark", "flex h-screen w-full")}>
        {siteId && (
          <>
            <Navigation />
            <StudioEditor />
          </>
        )}
      </div>
    </>
  );
};

export default Site;
