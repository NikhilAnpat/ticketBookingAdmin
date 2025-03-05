import React from 'react';
import { Filter, Plus } from 'lucide-react';

type Booking = {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    time: string;
    city: string;
    code: string;
  };
  arrival: {
    time: string;
    city: string;
    code: string;
  };
  duration: string;
  date: string;
  passengers: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

const bookings: Booking[] = [
  {
    id: '1',
    airline: 'CloudNine Airlines',
    flightNumber: 'CN-MN9901',
    departure: {
      time: '7:30 AM',
      city: 'Paris',
      code: 'CDG'
    },
    arrival: {
      time: '10:30 AM',
      city: 'New York',
      code: 'JFK'
    },
    duration: '3 hours',
    date: '2028-07-02',
    passengers: 3,
    status: 'Confirmed'
  },
  {
    id: '2',
    airline: 'QuickWing Air',
    flightNumber: 'QW-XY2345',
    departure: {
      time: '10:00 PM',
      city: 'Hong Kong',
      code: 'HKG'
    },
    arrival: {
      time: '7:00 AM',
      city: 'Los Angeles',
      code: 'LAX'
    },
    duration: '9 hours',
    date: '2028-07-02',
    passengers: 2,
    status: 'Confirmed'
  },
  {
    id: '3',
    airline: 'SkyHigh Airlines',
    flightNumber: 'SH-ZY6789',
    departure: {
      time: '8:00 AM',
      city: 'Frankfurt',
      code: 'FRA'
    },
    arrival: {
      time: '4:00 PM',
      city: 'Bangkok',
      code: 'BKK'
    },
    duration: '8 hours',
    date: '2028-07-02',
    passengers: 3,
    status: 'Pending'
  }
];

const BookingRow = ({ booking }: { booking: Booking }) => (
  <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-lg font-bold text-gray-600">{booking.airline.substring(0, 2)}</span>
        </div>
        <div>
          <h3 className="font-medium">{booking.airline}</h3>
          <p className="text-sm text-gray-500">{booking.flightNumber}</p>
        </div>
      </div>
      
      <div className="flex-1 mx-8">
        <div className="flex items-center justify-between px-8">
          <div className="text-center">
            <p className="text-lg font-semibold">{booking.departure.time}</p>
            <p className="text-sm text-gray-500">{booking.departure.city}</p>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="h-px bg-gray-300 absolute w-full top-1/2"></div>
            <div className="text-xs text-gray-500 text-center relative -top-3">
              Duration: {booking.duration}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold">{booking.arrival.time}</p>
            <p className="text-sm text-gray-500">{booking.arrival.city}</p>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-gray-500">Date</p>
        <p className="font-medium">{booking.date}</p>
      </div>
      
      <div className="ml-8 flex items-center space-x-4">
        <div className="flex -space-x-2">
          {Array(booking.passengers).fill(0).map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
          ))}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm
          ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'}`}>
          {booking.status}
        </span>
      </div>
    </div>
  </div>
);

export default function Bookings() {
  return (
    <div className="p-6 bg-gray-50 flex-1">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <select className="border rounded-lg px-3 py-2 bg-amber-100 text-amber-900">
            <option>1 - 8 July 2028</option>
          </select>
          
          <button className="border rounded-lg px-3 py-2 flex items-center space-x-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Airline</span>
          </button>
          
          <button className="border rounded-lg px-3 py-2 flex items-center space-x-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Status</span>
          </button>
          
          <button className="border rounded-lg px-3 py-2 flex items-center space-x-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Departure</span>
          </button>
        </div>
        
        <button className="bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-amber-600">
          <Plus className="w-4 h-4" />
          <span>Add Booking</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {bookings.map(booking => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}