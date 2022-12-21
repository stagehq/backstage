import { useSession } from "next-auth/react";
import SoonModal from "./modals/ComingSoon";
import PreferencesModal from "./modals/PreferencesModal";
import PublishingMobileModal from "./modals/PublishingModal";
import SettingsModal from "./modals/SettingsModal";

const Modals = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <SettingsModal />
        <SoonModal />
        <PublishingMobileModal />
        <PreferencesModal />
      </>
    );
  }

  return null;
};

export default Modals;
