import React, { useState } from 'react';
import { Search,  ArrowRight, Filter } from 'lucide-react';
import FlightDetail from './FlightDetail';
import {Flight} from '../components/interfaces/sheuduleInterface'



const flights: Flight[] = [
  {
    id: '1',
    airline: {
      name: 'SkyHigh Airlines',
      code: 'SH-ZY6789',
    },
    departure: {
      time: '8:00 AM',
      city: 'Los Angeles',
      airport: 'Los Angeles International Airport',
      code: 'LAX'
    },
    arrival: {
      time: '9:00 PM',
      city: 'New York',
      airport: 'John F. Kennedy International Airport',
      code: 'JFK'
    },
    duration: '13 hours',
    price: 350,
    facilities: ['WiFi', 'Power Outlet'],
    baggage: '2 Baggage',
    meal: 'No Meal'
  },
  {
    id: '2',
    airline: {
      name: 'FlyFast Airways',
      code: 'FF-XY2345',
    },
    departure: {
      time: '8:00 AM',
      city: 'Los Angeles',
      code: 'LAX',
      airport: 'Los Angeles International Airport'
    },
    arrival: {
      time: '11:30 AM',
      city: 'New York',
      code: 'JFK',
      airport: 'John F. Kennedy International Airport'
    },
    duration: '3.5 hours',
    price: 400,
    facilities: ['WiFi'],
    baggage: '2 Baggage',
    meal: 'No Meal'
  },
  {
    id: '3',
    airline: {
      name: 'AeroJet',
      code: 'AJ-789',
    },
    departure: {
      time: '10:00 AM',
      city: 'Los Angeles',
      code: 'LAX',
      airport: 'Los Angeles International Airport'
    },
    arrival: {
      time: '12:45 PM',
      city: 'New York',
      code: 'JFK',
      airport: 'John F. Kennedy International Airport'
    },
    duration: '2.75 hours',
    price: 450,
    facilities: ['WiFi', 'Entertainment'],
    baggage: '2 Baggage',
    meal: 'In-flight Meal'
  }
];

const FlightCard = ({ flight, onViewDetails }: { flight: Flight, onViewDetails: () => void }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-lg font-bold text-gray-600">
            {flight.airline.name.substring(0, 2)}
          </span>
        </div>
        <div>
          <h3 className="font-medium">{flight.airline.name}</h3>
          <p className="text-sm text-gray-500">{flight.airline.code}</p>
        </div>
      </div>

      <div className="flex-1 mx-8">
        <div className="flex items-center justify-between px-8">
          <div className="text-center">
            <p className="text-lg font-semibold">{flight.departure.time}</p>
            <p className="text-sm text-gray-500">{flight.departure.code}</p>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="h-px bg-gray-300 absolute w-full top-1/2"></div>
            <div className="text-xs text-gray-500 text-center relative -top-3">
              {flight.duration}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold">{flight.arrival.time}</p>
            <p className="text-sm text-gray-500">{flight.arrival.code}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-semibold">${flight.price}</p>
        </div>
        <button
          onClick={onViewDetails}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          View Details
        </button>
      </div>
    </div>

    <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
      <div className="flex items-center space-x-2">
        <span>Facilities:</span>
        {flight.facilities.map((facility, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 rounded">
            {facility}
          </span>
        ))}
      </div>
      <div>{flight.baggage}</div>
      <div>{flight.meal}</div>
    </div>
  </div>
);

export default function Schedule() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  if (selectedFlight) {
    return <FlightDetail flight={selectedFlight} onBack={() => setSelectedFlight(null)} />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search flights"
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <select className="border rounded-lg px-3 py-2">
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>

            <button className="border rounded-lg px-3 py-2 flex items-center space-x-2 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          <button className="bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-amber-600">
            <span>Add Flight</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {flights.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onViewDetails={() => setSelectedFlight(flight)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}