import React from 'react';
import { LayoutDashboard, Ticket, Calendar, CreditCard, MessageSquare, Plane, Percent } from 'lucide-react';

interface NavItemProps {
  icon: any;
  text: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, text, active = false, onClick }: NavItemProps) => (
  <div
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer ${
      active ? 'bg-amber-100 text-amber-900' : 'hover:bg-gray-100'
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
}

export default function LeftNav({ currentPage, onPageChange }: LeftNavProps) {
  return (
    <div className="w-64 bg-white h-screen p-4 border-r">
      <div className="flex items-center space-x-2 px-4 mb-8">
        <Plane className="w-8 h-8 text-amber-500 transform -rotate-45" />
        <span className="text-2xl font-bold">Skytix</span>
        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">v1.0</span>
      </div>
      
      <div className="space-y-1">
        <NavItem
          icon={LayoutDashboard}
          text="Dashboard"
          active={currentPage === 'dashboard'}
          onClick={() => onPageChange('dashboard')}
        />
        <NavItem
          icon={Ticket}
          text="Bookings"
          active={currentPage === 'bookings'}
          onClick={() => onPageChange('bookings')}
        />
        <NavItem
          icon={Calendar}
          text="Schedule"
          active={currentPage === 'schedule'}
          onClick={() => onPageChange('schedule')}
        />
        <NavItem
          icon={CreditCard}
          text="Payments"
          active={currentPage === 'payments'}
          onClick={() => onPageChange('payments')}
        />
        <NavItem
          icon={MessageSquare}
          text="Messages"
          active={currentPage === 'messages'}
          onClick={() => onPageChange('messages')}
        />
        <NavItem
          icon={Plane}
          text="Flight Tracking"
          active={currentPage === 'flight-tracking'}
          onClick={() => onPageChange('flight-tracking')}
        />
        <NavItem
          icon={Percent}
          text="Deals"
          active={currentPage === 'deals'}
          onClick={() => onPageChange('deals')}
        />
      </div>
    </div>
  );
}