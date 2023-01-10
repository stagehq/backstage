import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Navigation from "../../components/studio/Navigation";
import StudioEditor from "../../components/studio/StudioEditor";
import { siteSlugState } from "../../store/site";

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
