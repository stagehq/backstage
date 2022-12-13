import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";

interface EditSidebarPortalProps {
  children: React.ReactNode;
}

const EditSidebarPortal: FC<EditSidebarPortalProps> = ({ children }) => {
  // state to store portal in
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);

  // create portal on mount
  useEffect(() => {
    setPortal(
      document.getElementById(
        process.env.NEXT_PUBLIC_EDIT_SIDEBAR_PORTAL_NAME || "editSidebarPortal"
      )
    );
  }, []);

  if (portal) {
    return createPortal(children, portal);
  } else {
    return null;
  }
};

export default EditSidebarPortal;
