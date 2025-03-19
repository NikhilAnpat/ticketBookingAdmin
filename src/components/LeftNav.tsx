import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Ticket, Calendar, CreditCard, MessageSquare, Plane, Percent } from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  to: string;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, text, to, onClick }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition 
       ${isActive ? 'bg-amber-100 text-amber-900' : 'hover:bg-gray-100'}`
    }
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </NavLink>
);

interface LeftNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LeftNav({ isOpen, setIsOpen }: LeftNavProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && window.innerWidth < 768) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:h-screen h-full w-[270px] md:w-[210px] bg-white p-4 border-r transition-all duration-300 z-[999]
                    ${isOpen ? 'translate-x-0 overflow-y-auto' : 'hidden md:block'}`}
      >
        <div>
          {/* Logo */}
          <div
            className="flex items-center space-x-2 px-4 mb-8 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <Plane className="w-8 h-8 text-amber-500 transform -rotate-45" />
            <span className="text-2xl font-bold">Skytix</span>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">v1.0</span>
          </div>

          {/* Navigation */}
          <div className="overflow-y-auto">
            <NavItem icon={LayoutDashboard} text="Dashboard" to="/" onClick={() => setIsOpen(false)} />
            <NavItem icon={Ticket} text="Bookings" to="/bookings" onClick={() => setIsOpen(false)} />
            <NavItem icon={Calendar} text="Schedule" to="/schedule" onClick={() => setIsOpen(false)} />
            <NavItem icon={CreditCard} text="Payments" to="/payments" onClick={() => setIsOpen(false)} />
            <NavItem icon={MessageSquare} text="Messages" to="/messages" onClick={() => setIsOpen(false)} />
            <NavItem icon={Plane} text="Flight Tracking" to="/flight-tracking" onClick={() => setIsOpen(false)} />
            <NavItem icon={Percent} text="Deals" to="/deals" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 md:hidden z-0" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
