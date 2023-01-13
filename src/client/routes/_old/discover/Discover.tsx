import Categories, {
  DiscoverTab,
} from "../../../_old/components/01_Account/Categories";

import { useSession } from "next-auth/react";
import Head from "next/head";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/loading/Page";
import Spinner from "../../../components/loading/Spinner";
import GetStartedBanner from "../../../components/More";
import CommunityHeader from "../../../_old/components/01_Account/CommunityHeader";
import RecommendedProjects from "../../../_old/components/01_Account/RecommendedProjects";
import SearchResults from "../../../_old/components/02_AppGlobal/SearchResults";

const tabs: DiscoverTab[] = [
  { name: "Explore" },
  { name: "Ideas" },
  { name: "Initiatives" },
  { name: "Meetings" },
  { name: "Channels" },
];

function DiscoverPage() {
  const { status } = useSession();
  const navigate = useNavigate();

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
              <div className="flex h-24 w-full items-center justify-center">
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

export default DiscoverPage;
