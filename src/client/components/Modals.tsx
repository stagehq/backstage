import { useSession } from "next-auth/react";
import AnalyticsModal from "./modals/AnalyticsModal";
import SoonModal from "./modals/ComingSoon";
import PreferencesModal from "./modals/PreferencesModal";
import SettingsModal from "./modals/SettingsModal";
import SiteSettingsModal from "./modals/SiteSettingsModal";

const Modals = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <SettingsModal />
        <SoonModal />
        <PreferencesModal />
        <SiteSettingsModal />
        <AnalyticsModal />
      </>
    );
  }

  return null;
};

export default Modals;
