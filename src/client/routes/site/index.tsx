import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import DndPage from "../../components/dnd/dndPage";
import Navigation from "../../components/studio/Navigation";
import { siteSlugState, siteState } from "../../store/site";

const Site = () => {
  const { siteId } = useParams();

  const [siteSlug, setSiteSlug] = useRecoilState(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  useEffect(() => {
    if (siteId) {
      setSiteSlug(siteId);
    }
  }, [siteId, setSiteSlug]);

  return (
    <>
      <div className="flex h-full w-full">
        <Navigation />
        <DndPage />
      </div>
    </>
  );
};

export default Site;
