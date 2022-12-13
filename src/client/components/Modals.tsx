import { useSession } from "next-auth/react";
import ProjectCreateModal from "../_old/components/03_AppWorkspace/Modals";
import PublishingMobileModal from "./modals/PublishingModal";
import SettingsModal from "./modals/SettingsModal";

const Modals = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <SettingsModal />
        <ProjectCreateModal />
        <PublishingMobileModal />
      </>
    );
  }

  return null;
};

export default Modals;
