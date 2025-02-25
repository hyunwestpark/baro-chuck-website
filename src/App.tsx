import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navigation/NavBar";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Home/Home";
import Doctor from "./pages/Doctor/Doctor";
import Hours from "./pages/Hours/Hours";
import RequestPermission from "./pages/RequestPermission/RequestPermission";
import SuperAdminDashboard from "./pages/Admin/\bSuperAdminDashboard";
import Notice from "./pages/Notice/Notice";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/hours" element={<Hours />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/request-permission" element={<RequestPermission />} />
            <Route
              path="/super-admin/dashboard"
              element={<SuperAdminDashboard />}
            />
            <Route path="/admin/notices" element={<Notice />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
