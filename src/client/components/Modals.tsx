import { useSession } from "next-auth/react";
import SettingsModal from "../_old/components/02_AppGlobal/SettingsModal";
import ProjectCreateModal from "../_old/components/03_AppWorkspace/Modals";

const Modals = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <SettingsModal />
        <ProjectCreateModal />
      </>
    );
  }

  return null;
};

export default Modals;
