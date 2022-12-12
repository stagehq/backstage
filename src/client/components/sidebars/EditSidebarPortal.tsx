import React, { FC } from "react";
import { createPortal } from "react-dom";

interface EditSidebarPortalProps {
  children: React.ReactNode;
}

const EditSidebarPortal: FC<EditSidebarPortalProps> = ({ children }) => {
  const portal = document.getElementById(
    process.env.NEXT_PUBLIC_EDIT_SIDEBAR_PORTAL_NAME || "editSidebarPortal"
  );

  if (portal) {
    return createPortal(children, portal);
  }

  return null;
};

export default EditSidebarPortal;
