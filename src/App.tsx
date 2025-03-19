import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LeftNav from "./components/LeftNav";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Bookings from "./components/Bookings";
import FlightTracking from "./components/FlightTracking";
import Messages from "./components/Messages";
import Schedule from "./components/Schedule";
import Deals from "./components/Deals";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex h-[100%] w-[100%] bg-gray-50">
        {/* Sidebar */}
        <div className="h-[100%] sticky top-0 left-0 z-[999] md:h-full md:w-[220px]">
          <LeftNav isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col bg-gray-50 w-[100%] overflow-hidden md:w-[calc(100%-220px)]" style={{ height: "100%" }}>
          <Header toggleSidebar={toggleSidebar} onSearch={setSearchQuery} />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Dashboard  />} />
            <Route path="/dashboard" element={<Navigate to="/" replace={true} />} />
            <Route path="/bookings" element={<Bookings  />} />
            <Route path="/flight-tracking" element={<FlightTracking  />} />
            <Route path="/messages" element={<Messages  />} />
            <Route path="/schedule" element={<Schedule  />} />
            <Route path="/payments" element={<Dashboard  />} />
            <Route path="/deals" element={<Deals searchQuery={searchQuery} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
