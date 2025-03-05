import React from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything"
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium">Martin Septimus</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}