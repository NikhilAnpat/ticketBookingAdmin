import React, { useState } from 'react';
import LeftNav from './components/LeftNav';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Bookings from './components/Bookings';
import FlightTracking from './components/FlightTracking';
import Messages from './components/Messages';
import Schedule from './components/Schedule';
import Deals from './components/Deals';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getPageComponent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <Bookings />;
      case 'flight-tracking':
        return <FlightTracking />;
      case 'messages':
        return <Messages />;
      case 'schedule':
        return <Schedule />;
      case 'deals':
        return <Deals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className='' >
      <div className="flex  h-[100%] w-[100%] bg-gray-50">
        <div className='h-[100%] sticky top-0 left-0 z-[999] md:h-full md:w-[220px]'>
          <LeftNav
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />
        </div>
        <div className="flex flex-col bg-gray-50 w-[100%]  overflow-hidden md:w-[calc(100%-220px)]" style={{ height: '100%' }}>
          <Header
            title={currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            toggleSidebar={toggleSidebar}
          />
          {getPageComponent()}
        </div>
      </div>
    </div>
  );
}

export default App;