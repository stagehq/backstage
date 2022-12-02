import Categories, {
  DiscoverTab,
} from "../../components/01_Account/Categories";

import { useSession } from "next-auth/react";
import Head from "next/head";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import CommunityHeader from "../../components/01_Account/CommunityHeader";
import RecommendedProjects from "../../components/01_Account/RecommendedProjects";
import GetStartedBanner from "../../components/02_AppGlobal/GetStartedBanner";
import Spinner from "../../components/02_AppGlobal/Icons/Spinner";
import LoadingPage from "../../components/02_AppGlobal/Loading/Page";
import SearchResults from "../../components/02_AppGlobal/SearchResults";

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

export default DiscoverPage;
