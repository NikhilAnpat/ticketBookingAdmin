import React, { useEffect, useState } from "react";
import { Search, Bell, Settings, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { HeaderProps } from '../interfaces/header';

export default function Header({ toggleSidebar, onSearch, showSearch = false }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      if (onSearch) onSearch("");
      return;
    }

    const delayDebounce = setTimeout(() => {
      if (onSearch) onSearch(searchQuery);
    });

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, onSearch]);

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const pageTitles: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/bookings": "Bookings",
    "/schedule": "Schedule",
    "/payments": "Payments",
    "/messages": "Messages",
    "/flight-tracking": "Flight Tracking",
    "/deals": "Deals",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[64px] w-full bg-gray-50 sticky top-0 z-[998] flex items-center justify-between px-4">
      <div className="flex items-center">
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="p-1 md:hidden bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        {!isSearchOpen && (
          <h1 className="text-xl md:text-2xl pl-2 font-semibold">{title}</h1>
        )}
      </div>

      <div className="flex md:gap-2 items-center" style={{ width: isSearchOpen ? "calc(350px - 28px)" : "auto" }}>
        {showSearch && (
          <div className="p-2 w-full md:w-64">
            {!isSearchOpen && (
              <Search
                className="w-5 h-5 flex items-center text-gray-400 md:hidden cursor-pointer"
                onClick={() => setIsSearchOpen(true)}
              />
            )}

            {isSearchOpen && (
              <div className="flex items-center border bg-white rounded-lg h-full">
                <input
                  type="text"
                  placeholder={location.pathname.includes("/deals") ? "Destination and Origin" : "Search anything"}
                  className="px-2 py-1 border-none text-[12px] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <X
                  className="w-5 h-5 text-[13px] text-gray-400 cursor-pointer"
                  onClick={() => setIsSearchOpen(false)}
                />
              </div>
            )}

            <div className="relative hidden md:block w-full">
              <Search
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={location.pathname.includes("/deals") ? "Destination and Origin" : "Search anything"}
                className="pl-10 pr-4 py-2 border rounded-lg w-full text-[15px] focus:outline-none focus:ring-2 focus:ring-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <button className="p-3 md:p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>

        <button className="p-2 hidden md:block hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>

        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="hidden md:block">
          <span className="text-nowrap font-medium">Martin</span>
          <div className="text-sm text-gray-500">Admin</div>
        </div>
      </div>
    </div>
  );
}