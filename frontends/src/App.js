import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Applicant from "./pages/Applicant";
import Recruiter from "./pages/Recruiter";
import RecommendedJobs from "./pages/RecommendedJobs";

// 🔥 COMPONENTS
import Navbar from "./components/Navbar";

/* 🔹 Scroll to top on page change */
function ScrollToTop() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* 🔹 Main App */
function App() {

  return (

    <BrowserRouter>

      {/* 🔥 AUTO SCROLL */}
      <ScrollToTop />

      {/* 🔥 GLOBAL NAVBAR */}
      <Navbar />

      {/* 🔥 ROUTES */}
      <Routes>

        {/* 🏠 HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* 👨‍💻 APPLICANT */}
        <Route
          path="/applicant"
          element={<Applicant />}
        />

        {/* 🧑‍💼 RECRUITER */}
        <Route
          path="/recruiter"
          element={<Recruiter />}
        />

        {/* 🔥 RECOMMENDED JOBS */}
        <Route
          path="/recommended-jobs"
          element={<RecommendedJobs />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;