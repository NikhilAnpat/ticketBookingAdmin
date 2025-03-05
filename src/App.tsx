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
    <div className="flex min-h-screen bg-gray-50">
      <LeftNav currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header title={currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
        {getPageComponent()}
      </div>
    </div>
  );
}

export default App;