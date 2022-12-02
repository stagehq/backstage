import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../store/user";
import LoadingPage from "../Loading/Page";
import BillingHistory from "./BillingHistory";
import Integrations from "./Integrations";
import Notifications from "./Notifications";
import Plan from "./Plan";
import { Profile } from "./Profile";
import { SettingsForm } from "./SettingsForm";
import SettingSidebar from "./SettingsSidebar";

export default function Settings() {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const {push: navigate} = useRouter()

  if (status === "unauthenticated") {
    navigate("/");
    return <LoadingPage />;
  }

  return (
    <div className="bg-gray-100 w-full h-full">
      <main className="max-w-7xl mx-auto lg:px-8 h-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 h-full">
          {/* Sidebar */}
          <SettingSidebar />
          {/* Main content */}
          <SettingsForm {...{}}>
            {currentUser ? (
              <>
                <Profile user={currentUser} />
                <Notifications user={currentUser} />
                <Plan user={currentUser} />
                <BillingHistory />
                <Integrations />
              </>
            ) : null}
          </SettingsForm>
        </div>
      </main>
    </div>
  );
}
