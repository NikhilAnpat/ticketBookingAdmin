import React, { useEffect, useRef } from 'react';
import { LayoutDashboard, Ticket, Calendar, CreditCard, MessageSquare, Plane, Percent } from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, text, active = false, onClick }: NavItemProps) => (
  <div
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${active ? 'bg-amber-100 text-amber-900' : 'hover:bg-gray-100'
      }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </div>
);

interface LeftNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LeftNav({ currentPage, onPageChange, isOpen, setIsOpen }: LeftNavProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Function to handle page change and close sidebar on mobile
  const handlePageChange = (page: string) => {
    onPageChange(page);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  
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
        className={`fixed md:h-screen h-full w-[270px] md:w-[210px]  bg-white p-4 border-r transition-all duration-300 z-[999] 
                  ${isOpen ? 'translate-x-0 overflow-y-auto ' : 'hidden md:block'}`}
      >
        <div>
          {/* Logo section */}
          <div 
            className="flex items-center space-x-2 px-4 mb-8 cursor-pointer"
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsOpen(false);
              }
            }}
          >
            <Plane className="w-8 h-8 text-amber-500 transform -rotate-45" />
            <span className="text-2xl font-bold">Skytix</span>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">v1.0</span>
          </div>

          <div className="overflow-y-auto ">
            <NavItem
              icon={LayoutDashboard}
              text="Dashboard"
              active={currentPage === 'dashboard'}
              onClick={() => handlePageChange('dashboard')}
            />
            <NavItem
              icon={Ticket}
              text="Bookings"
              active={currentPage === 'bookings'}
              onClick={() => handlePageChange('bookings')}
            />
            <NavItem
              icon={Calendar}
              text="Schedule"
              active={currentPage === 'schedule'}
              onClick={() => handlePageChange('schedule')}
            />
            <NavItem
              icon={CreditCard}
              text="Payments"
              active={currentPage === 'payments'}
              onClick={() => handlePageChange('payments')}
            />
            <NavItem
              icon={MessageSquare}
              text="Messages"
              active={currentPage === 'messages'}
              onClick={() => handlePageChange('messages')}
            />
            <NavItem
              icon={Plane}
              text="Flight Tracking"
              active={currentPage === 'flight-tracking'}
              onClick={() => handlePageChange('flight-tracking')}
            />
            <NavItem
              icon={Percent}
              text="Deals"
              active={currentPage === 'deals'}
              onClick={() => handlePageChange('deals')}
            />
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile - only visible when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}