import { useSession } from "next-auth/react";
import ProjectCreateModal from "../_old/components/03_AppWorkspace/Modals";
import SettingsModal from "./modals/SettingsModal";

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
