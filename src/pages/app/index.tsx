import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import LoadingPage from "../../client/components/loading/Page";
import Modals from "../../client/components/Modals";
import Dashboard from "../../client/routes/dashboard/page";
import Site from "../../client/routes/site";
import SiteSettings from "../../client/routes/site/siteSettings";

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Modals />
          <Routes>
            {/* Backstage */}
            <Route path="/s">
              {/* Dashboard */}
              <Route index element={<Dashboard />} />

              {/* 
              Personal Settings
              <Route path="settings" element={<Analytics />} /> */}

              {/* Website Editing */}
              <Route path=":siteId">
                {/* Site preview */}
                <Route index element={<Site />} />

                {/* Site settings */}
                <Route path="settings" element={<SiteSettings />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
