import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import AppShell from "../../client/components/02_AppGlobal/AppShell";
import LoadingPage from "../../client/components/02_AppGlobal/Loading/Page";
import DiscoverPage from "../../client/routes/discover/Discover";
import ProfilePage from "../../client/routes/profile/Profile";
import IdeaCreatePage from "../../client/routes/workspace/ideas/CreatePage";
import IdeaPage from "../../client/routes/workspace/ideas/idea/IdeaPage";
import IdeasPage from "../../client/routes/workspace/ideas/IdeasPage";
import InitiativesPage from "../../client/routes/workspace/initiatives/InitiativesOverviewPage";
import MeetingsPage from "../../client/routes/workspace/meetings/MeetingsPage";
import OverviewPage from "../../client/routes/workspace/overview/OverviewPage";
import SettingsPage from "../../client/routes/workspace/settings/Settings";
import WorkspacePage from "../../client/routes/workspace/Workspace";

//@ts-ignore
const IdeaBreadcrumb = ({ match }) => <span>#{match.params.ideaId}</span>;

/* For breadcrumbs */
export const routes = [
  { path: "/app/profile", breadcrumb: "Profile" },
  { path: "/app/profile/:profileId", breadcrumb: "Profile" },
  { path: "/app/discover", breadcrumb: "Discover" },
  { path: "/app/workspace/:workspaceId", breadcrumb: "Overview" },
  { path: "/app/workspace/:workspaceId/ideas", breadcrumb: "Ideas" },
  { path: "/app/workspace/:workspaceId/ideas/new", breadcrumb: "New" },
  {
    path: "/app/workspace/:workspaceId/ideas/:ideaId",
    breadcrumb: IdeaBreadcrumb,
  },
  {
    path: "/app/workspace/:workspaceId/initiatives",
    breadcrumb: "Initiatives",
  },
  {
    path: "/app/workspace/:workspaceId/initiative/:initiativeId",
    breadcrumb: "Initiative",
  },
  { path: "/app/workspace/:workspaceId/meetings", breadcrumb: "Meetings" },
  {
    path: "/app/workspace/:workspaceId/meeting/:meetingId",
    breadcrumb: "Meeting",
  },
  { path: "/app/workspace/:workspaceId/settings", breadcrumb: "Settings" },
];

export default function App() {
  return (
    <>
      <Router>
        <AppShell>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              {/* Discover */}
              <Route path="/app/discover" element={<DiscoverPage />} />
              {/* Profile */}
              <Route path="/app/profile/:userAlias" element={<ProfilePage />} />
              {/* Workspace */}
              <Route
                path="/app/workspace/:workspaceId"
                element={<WorkspacePage />}
              >
                <Route
                  path="/app/workspace/:workspaceId"
                  element={<OverviewPage />}
                />
                <Route
                  path="/app/workspace/:workspaceId/ideas/new"
                  element={<IdeaCreatePage />}
                />
                <Route
                  path="/app/workspace/:workspaceId/ideas"
                  element={<IdeasPage />}
                />
                <Route
                  path="/app/workspace/:workspaceId/ideas/:ideaId"
                  element={<IdeaPage />}
                />
                <Route
                  path="/app/workspace/:workspaceId/initiatives"
                  element={<InitiativesPage />}
                />
                <Route
                  path="/app/workspace/:workspaceId/meet"
                  element={<MeetingsPage />}
                />

                <Route
                  path="/app/workspace/:workspaceId/settings"
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
