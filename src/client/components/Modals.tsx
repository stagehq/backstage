import { useSession } from "next-auth/react";
import AnalyticsModal from "./modals/AnalyticsModal";
import SoonModal from "./modals/ComingSoon";
import PreferencesModal from "./modals/PreferencesModal";
import SettingsModal from "./modals/SettingsModal";
import SiteSettingsModal from "./modals/SiteSettingsModal";
import StoreModal from "./modals/store";
import SubdomainModal from "./modals/SubdomainModal";

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
        <StoreModal />
        <SubdomainModal />
      </>
    );
  }

  return null;
};

export default Modals;
