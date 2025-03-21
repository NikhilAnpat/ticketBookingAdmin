import React from 'react';
import { ArrowLeft, Plane } from 'lucide-react';

type Flight = {
  id: string;
  airline: {
    name: string;
    code: string;
    logo?: string;
  };
  departure: {
    time: string;
    city: string;
    airport: string;
    code: string;
  };
  arrival: {
    time: string;
    city: string;
    airport: string;
    code: string;
  };
  duration: string;
  price: number;
  facilities: string[];
  baggage: string;
  meal: string;
};

interface FlightDetailProps {
  flight: Flight;
  onBack: () => void;
}

export default function FlightDetail({ flight, onBack }: FlightDetailProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">
              {flight.departure.city} → {flight.arrival.city}
            </h1>
            <p className="text-sm text-gray-500">
              {flight.departure.code} - {flight.arrival.code}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">
                {flight.airline.name.substring(0, 2)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{flight.airline.name}</h2>
              <p className="text-gray-500">{flight.airline.code}</p>
            </div>
          </div>

          <div className="relative pb-8">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
            
            <div className="flex items-start mb-12">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                <Plane className="w-8 h-8 text-amber-600" />
              </div>
              <div className="ml-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{flight.departure.time}</h3>
                  <p className="text-gray-600">{flight.departure.airport}</p>
                  <p className="text-sm text-gray-500">Terminal 4</p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
                <Plane className="w-8 h-8 text-amber-600 transform rotate-90" />
              </div>
              <div className="ml-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{flight.arrival.time}</h3>
                  <p className="text-gray-600">{flight.arrival.airport}</p>
                  <p className="text-sm text-gray-500">Terminal 2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold mb-4">What's included</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Baggage</h4>
                <p className="text-sm text-gray-500">
                  Cabin baggage 7kg<br />
                  Check-in baggage 23kg
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {flight.facilities.map((facility, index) => (
                    <span key={index} className="px-2 py-1 bg-white rounded text-sm">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-2xl font-semibold">${flight.price}</p>
            </div>
            <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
              Edit Flight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}