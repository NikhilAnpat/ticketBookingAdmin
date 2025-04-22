
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LeftNav from "./components/common/LeftNav";
import Header from "./components/common/Header";
import Dashboard from "./screens/Dashboard";
import Bookings from "./screens/Bookings";
import FlightTracking from "./screens/FlightTracking";
import Payments from "./screens/Payments";
import Messages from "./screens/Messages";
import Schedule from "./screens/Schedule";
import Deals from "./screens/Deals";
import Login from "./components/auth/Login";
import ForgetPass from "./components/auth/ForgetPass";
import Register from "./components/auth/Register";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  
  const authRoutes = ["/register", "/login", "/forgetpass"];
  
  const searchRoutes = ["/dashboard", "/deals"];
  const showSearchbar = searchRoutes.includes(location.pathname);

  return (
    <div className="flex h-[100vh] w-[100%] bg-gray-50">
      {!authRoutes.includes(location.pathname) && (
        <div className="h-[100%] sticky top-0 left-0 z-[999] md:h-full md:w-[210px]">
          <LeftNav isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>
      )}

      <div className="flex flex-col bg-gray-50 w-[100%] overflow-y-auto md:w-[calc(100%-210px)]" style={{ height: "100%" }}>
        {!authRoutes.includes(location.pathname) && (
          <Header 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            onSearch={setSearchQuery}
            showSearch={showSearchbar} 
          />
        )}

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPass" element={<ForgetPass />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/flight-tracking" element={<FlightTracking />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/deals" element={<Deals searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;