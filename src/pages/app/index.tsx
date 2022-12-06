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

//@ts-ignore
const IdeaBreadcrumb = ({ match }) => <span>#{match.params.ideaId}</span>;

/* For breadcrumbs */
export const routes = [
  { path: "/s/profile", breadcrumb: "Profile" },
  { path: "/s/profile/:profileId", breadcrumb: "Profile" },
  { path: "/s/discover", breadcrumb: "Discover" },
  { path: "/s/workspace/:workspaceId", breadcrumb: "Overview" },
  { path: "/s/workspace/:workspaceId/ideas", breadcrumb: "Ideas" },
  { path: "/s/workspace/:workspaceId/ideas/new", breadcrumb: "New" },
  {
    path: "/s/workspace/:workspaceId/ideas/:ideaId",
    breadcrumb: IdeaBreadcrumb,
  },
  {
    path: "/s/workspace/:workspaceId/initiatives",
    breadcrumb: "Initiatives",
  },
  {
    path: "/s/workspace/:workspaceId/initiative/:initiativeId",
    breadcrumb: "Initiative",
  },
  { path: "/s/workspace/:workspaceId/meetings", breadcrumb: "Meetings" },
  {
    path: "/s/workspace/:workspaceId/meeting/:meetingId",
    breadcrumb: "Meeting",
  },
  { path: "/s/workspace/:workspaceId/settings", breadcrumb: "Settings" },
];

export default function App() {
  return (
    <>
      <Router>
        <AppShell>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/s/dashboard" element={<Dashboard />} />
              {/* Discover */}
              <Route path="/s/discover" element={<DiscoverPage />} />
              {/* Profile */}
              <Route path="/s/profile/:userAlias" element={<ProfilePage />} />
              {/* Workspace */}
              <Route
                path="/s/workspace/:workspaceId"
                element={<WorkspacePage />}
              >
                <Route
                  path="/s/workspace/:workspaceId"
                  element={<OverviewPage />}
                />
                <Route
                  path="/s/workspace/:workspaceId/ideas/new"
                  element={<IdeaCreatePage />}
                />
                <Route
                  path="/s/workspace/:workspaceId/ideas"
                  element={<IdeasPage />}
                />
                <Route
                  path="/s/workspace/:workspaceId/ideas/:ideaId"
                  element={<IdeaPage />}
                />
                <Route
                  path="/s/workspace/:workspaceId/initiatives"
                  element={<InitiativesPage />}
                />
                <Route
                  path="/s/workspace/:workspaceId/meet"
                  element={<MeetingsPage />}
                />

                <Route
                  path="/s/workspace/:workspaceId/settings"
                  element={<SettingsPage />}
                />
              </Route>
            </Routes>
          </Suspense>
        </AppShell>
      </Router>
    </>
  );
}
