import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import { Header } from "../../client/components/Header";
import Analytics from "../../client/routes/analytics";
import Dashboard from "../../client/routes/dashboard/page";
import Site from "../../client/routes/site";
import Sections from "../../client/routes/site/sections";
import SectionEditing from "../../client/routes/site/sections/sectionEditing";
import SiteSettings from "../../client/routes/site/siteSettings";
import LoadingPage from "../../client/_old/components/02_AppGlobal/Loading/Page";

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* Backstage */}
            <Route path="/s" element={<Header />}>
              {/* Dashboard */}
              <Route index element={<Dashboard />} />

              {/* Personal Analytics */}
              <Route path="analytics" element={<Analytics />} />

              {/* Personal Analytics */}
              <Route path="settings" element={<Analytics />} />

              {/* Website Editing */}
              <Route path=":siteId">
                {/* Site preview */}
                <Route index element={<Site />} />

                {/* Site settings */}
                <Route path="settings" element={<SiteSettings />} />

                {/* Mobile site sections */}
                <Route path="sections" element={<Sections />}>
                  {/* Mobile site sections editing */}
                  <Route path=":sectionId" element={<SectionEditing />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
