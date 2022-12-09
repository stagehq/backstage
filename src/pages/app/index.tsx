import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import Dashboard from "../../client/routes/dashboard/page";
import AppShell from "../../client/_old/components/02_AppGlobal/AppShell";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";
import Analytics from "../../client/routes/analytics";
import SiteEditing from "../../client/routes/site";

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
              <Route path="/s/:siteId" element={<SiteEditing />} />

              {/* Site settings */}
              <Route path="/s/:siteId/settings" element={<Dashboard />} />

              {/* Mobile site sections */}
              <Route path="/s/:siteId/sections" element={<Dashboard />} />

              {/* Mobile site sections editing */}
              <Route
                path="/s/:siteId/sections/:sectionId"
                element={<Dashboard />}
              />
            </Routes>
          </Suspense>
        </AppShell>
      </Router>
    </>
  );
}
