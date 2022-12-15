import { useSession } from "next-auth/react";
import PublishingMobileModal from "./modals/PublishingModal";
import SettingsModal from "./modals/SettingsModal";

const Modals = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <SettingsModal />
        <PublishingMobileModal />
      </>
    );
  }

  return null;
};

export default Modals;
