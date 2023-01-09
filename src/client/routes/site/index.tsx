import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import DndPage from "../../components/dnd/dndPage";
import { useStoreExtensionActions } from "../../components/kbar/hooks/useStoreExtensionActions";
import useThemeActions from "../../components/kbar/hooks/useThemeActions";
import { siteSlugState, siteState } from "../../store/site";
import { themeState } from "../../store/ui/theme";

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
      <div>
        <DndPage />
      </div>
    </>
  );
};

export default Site;
