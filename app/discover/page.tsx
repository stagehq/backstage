import Categories, {
  DiscoverTab,
} from "../../src/client/components/01_Account/Categories";

import Head from "next/head";
import { Suspense } from "react";
import CommunityHeader from "../../src/client/components/01_Account/CommunityHeader";
import RecommendedProjects from "../../src/client/components/01_Account/RecommendedProjects";
import GetStartedBanner from "../../src/client/components/02_AppGlobal/GetStartedBanner";
import Spinner from "../../src/client/components/02_AppGlobal/Icons/Spinner";
import LoadingPage from "../../src/client/components/02_AppGlobal/Loading/Page";
import SearchResults from "../../src/client/components/02_AppGlobal/SearchResults";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { useRouter } from "next/navigation";

const tabs: DiscoverTab[] = [
  { name: "Explore" },
  { name: "Ideas" },
  { name: "Initiatives" },
  { name: "Meetings" },
  { name: "Channels" },
];

export default async function DiscoverPage() {
  const session = unstable_getServerSession(authOptions)
  console.log(JSON.stringify(session, null, 2));
  
  const {push: navigate} = useRouter();

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "unauthenticated") {
    navigate("/");
    return <LoadingPage />;
  }

  if (status === "authenticated") {
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

  return null;
}
