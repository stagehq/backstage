import Categories, {
  DiscoverTab,
} from "../../src/client/components/01_Account/Categories";

import { getCurrentUser } from "@/lib/session";
import Head from "next/head";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommunityHeader from "../../src/client/components/01_Account/CommunityHeader";
import RecommendedProjects from "../../src/client/components/01_Account/RecommendedProjects";
import GetStartedBanner from "../../src/client/components/02_AppGlobal/GetStartedBanner";
import Spinner from "../../src/client/components/02_AppGlobal/Icons/Spinner";
import SearchResults from "../../src/client/components/02_AppGlobal/SearchResults";

const tabs: DiscoverTab[] = [
  { name: "Explore" },
  { name: "Ideas" },
  { name: "Initiatives" },
  { name: "Meetings" },
  { name: "Channels" },
];

export default async function DiscoverPage() {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>Discover | Zirkular</title>
      </Head>
      <>
        <Categories tabs={tabs} />
        <CommunityHeader />
        <GetStartedBanner />
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-24 w-full">
              <Spinner color={"text-gray-400"} />
            </div>
          }
        >
          <SearchResults />
        </Suspense>
        <RecommendedProjects />
      </>
    </>
  );
}
