"use client";

import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { Provider } from "urql";
import { client } from "../graphql/client";

interface RootProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: RootProviderProps) => {
  return (
    <RecoilRoot>
      <SessionProvider>
        <Provider value={client}>{children}</Provider>
      </SessionProvider>
    </RecoilRoot>
  );
};
