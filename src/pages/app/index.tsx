import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import Dashboard from "../../client/routes/dashboard/page";
import DiscoverPage from "../../client/routes/_old/discover/Discover";
import ProfilePage from "../../client/routes/_old/profile/Profile";
import IdeaCreatePage from "../../client/routes/_old/workspace/ideas/CreatePage";
import IdeaPage from "../../client/routes/_old/workspace/ideas/idea/IdeaPage";
import IdeasPage from "../../client/routes/_old/workspace/ideas/IdeasPage";
import InitiativesPage from "../../client/routes/_old/workspace/initiatives/InitiativesOverviewPage";
import MeetingsPage from "../../client/routes/_old/workspace/meetings/MeetingsPage";
import OverviewPage from "../../client/routes/_old/workspace/overview/OverviewPage";
import SettingsPage from "../../client/routes/_old/workspace/settings/Settings";
import WorkspacePage from "../../client/routes/_old/workspace/Workspace";
import AppShell from "../../client/_old/components/02_AppGlobal/AppShell";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";
import Analytics from "../../client/routes/analytics";

/* For breadcrumbs */
export const routes = [
  { path: "/s", breadcrumb: "Overview" },
  { path: "/s/analytics", breadcrumb: "Overview" },
  { path: "/s/settings", breadcrumb: "Overview" },
  
  { path: "/s/:siteId", breadcrumb: "Site" },
  { path: "/s/:siteId/settings", breadcrumb: "Site" },
  { path: "/s/:siteId/sections", breadcrumb: "Site" },
  { path: "/s/:siteId/sections/:sectionId", breadcrumb: "Site" },
];

export default function App() {
  return (
    <>
      <Router>
        <AppShell>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              {/* Portfolio and Tailorings */}
              <Route path="/s/" element={<Dashboard />} />

              {/* Personal Analytics */}
              <Route path="/s/analytics" element={<Analytics />} />

              {/* Personal Analytics */}
              <Route path="/s/settings" element={<Analytics />} />

              {/* Website Editing */}
              <Route path="/s/:siteId" element={<Dashboard />} />

              {/* Site settings */}
              <Route path="/s/:siteId/settings" element={<Dashboard />} />

              {/* Mobile site sections */}
              <Route path="/s/:siteId/sections" element={<Dashboard />} />

              {/* Mobile site sections editing */}
              <Route path="/s/:siteId/sections/:sectionId" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </AppShell>
      </Router>
    </>
  );
}
