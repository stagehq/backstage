import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";

interface PageMainPortalProps {
  children: React.ReactNode;
}

export const PageMainPortal: FC<PageMainPortalProps> = ({ children }) => {
  // state to store portal in
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);

  // create portal on mount
  useEffect(() => {
    setPortal(
      document.getElementById(
        process.env.NEXT_PUBLIC_MAIN_PORTAL_NAME || "pageMainPortal"
      )
    );
  }, []);

  if (portal) {
    return createPortal(children, portal);
  } else {
    return null;
  }
};

interface PageAsidePortalProps {
  children: React.ReactNode;
}

export const PageAsidePortal: FC<PageAsidePortalProps> = ({ children }) => {
  // state to store portal in
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);

  // create portal on mount
  useEffect(() => {
    setPortal(
      document.getElementById(
        process.env.NEXT_PUBLIC_ASIDE_PORTAL_NAME || "pageAsidePortal"
      )
    );
  }, []);

  if (portal) {
    return createPortal(children, portal);
  } else {
    return null;
  }
};
