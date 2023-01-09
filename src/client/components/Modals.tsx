import { useSession } from "next-auth/react";
import SoonModal from "./modals/ComingSoon";
import PreferencesModal from "./modals/PreferencesModal";
import SettingsModal from "./modals/SettingsModal";

const Modals = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <SettingsModal />
        <SoonModal />
        <PreferencesModal />
      </>
    );
  }

  return null;
};

export default Modals;
