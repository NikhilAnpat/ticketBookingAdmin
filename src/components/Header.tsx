import React, { useEffect, useState } from 'react';
import { Search, Bell, Settings, ChevronDown, Menu, X } from 'lucide-react';

interface HeaderProps {
  title: string;
  toggleSidebar?: () => void;  
}
// interface SearchBarProps {
//   title: string;
// }

export default function Header({ title, toggleSidebar }: HeaderProps) {

  const[isSearchOpen, setIsSearchOpen] = useState(false);

  // Close search bar on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="h-[64px] w-full bg-gray-50 sticky top-0 z-[998]  flex items-center justify-between px-4">
      <div className="flex items-center justify-center">
        {/* Menu icon for mobile - only visible on screens smaller than md */}
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="p-1 md:hidden bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5  " />
          </button>
        )}
        {!isSearchOpen && (
        <h1 className="text-xl md:text-2xl pr-2 font-semibold">{title}</h1>
      )}
      </div>

      <div className="flex items-center justify-center  ">
        <div className="relative w-[100%]">
        {!isSearchOpen && (
          <Search
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 md:hidden cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          />
        )}

        {/* Search Input (shown only when icon is clicked on small screens) */}
        {isSearchOpen && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything"
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <X
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        )}

        {/* Full search bar visible on larger screens */}
        <input
          type="text"
          placeholder="Search anything"
          className="pl-10 pr-4 py-2 border rounded-lg w-full hidden md:block focus:outline-none focus:ring-2 focus:ring-gray-50"
        />
        </div>

        <button className=" p-3 md:p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>

        <button className="p-2 hidden md:block hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center md:px-6 md:space-x-3 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block">
            <span className=" text-nowrap font-medium">Martin Septimus</span>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}