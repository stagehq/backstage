import clsx from "clsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Navigation from "../../components/studio/Navigation";
import StudioEditor from "../../components/studio/StudioEditor";
import { siteSlugState } from "../../store/site";
import { themeState } from "../../store/ui/theme";

const Site = () => {
  const { siteId } = useParams();
  const [, setSiteSlug] = useRecoilState(siteSlugState);

  const [theme] = useRecoilState(themeState);

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
