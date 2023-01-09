import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Navigation from "../../components/studio/Navigation";
import { siteSlugState, siteState } from "../../store/site";
import StudioEditor from "../../components/studio/StudioEditor";

const Site = () => {
  const { siteId } = useParams();
  const [, setSiteSlug] = useRecoilState(siteSlugState);

  useEffect(() => {
    if (siteId) {
      setSiteSlug(siteId);
    }
  }, [siteId, setSiteSlug]);

  return (
    <>
      <div className="flex h-screen w-full">
        <Navigation />
        <StudioEditor />
      </div>
    </>
  );
};

export default Site;
