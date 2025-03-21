import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import { Search, Plus } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Flight = {
  id: string;
  airline: string;
  flightNumber: string;
  status: 'On Time' | 'Delayed' | 'Cancelled' | 'Landed';
  departure: {
    city: string;
    time: string;
    coordinates: [number, number];
  };
  arrival: {
    city: string;
    time: string;
    coordinates: [number, number];
  };
};

const flights: Flight[] = [
  {
    id: '1',
    airline: 'SkyHigh Airlines',
    flightNumber: 'SH-123',
    status: 'On Time',
    departure: {
      city: 'New York',
      time: '10:00 AM',
      coordinates: [40.7128, -74.0060]
    },
    arrival: {
      city: 'Los Angeles',
      time: '1:00 PM',
      coordinates: [34.0522, -118.2437]
    }
  },
  {
    id: '2',
    airline: 'FlyFast Airways',
    flightNumber: 'FF-456',
    status: 'Delayed',
    departure: {
      city: 'London',
      time: '2:00 PM',
      coordinates: [51.5074, -0.1278]
    },
    arrival: {
      city: 'Paris',
      time: '3:30 PM',
      coordinates: [48.8566, 2.3522]
    }
  },
  {
    id: '3',
    airline: 'AeroJet',
    flightNumber: 'AJ-789',
    status: 'On Time',
    departure: {
      city: 'Tokyo',
      time: '9:00 AM',
      coordinates: [35.6762, 139.6503]
    },
    arrival: {
      city: 'Seoul',
      time: '11:30 AM',
      coordinates: [37.5665, 126.9780]
    }
  }
];

const FlightRow = ({ flight }: { flight: Flight }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <span className="text-amber-700 font-semibold">{flight.airline.substring(0, 2)}</span>
          </div>
          <div>
            <h3 className="font-medium">{flight.airline}</h3>
            <p className="text-sm text-gray-500">{flight.flightNumber}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 mx-8">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="font-semibold">{flight.departure.time}</p>
            <p className="text-sm text-gray-500">{flight.departure.city}</p>
          </div>
          <div className="flex-1 mx-4 relative">
            <div className="h-px bg-gray-300 w-full absolute top-1/2"></div>
            <div className="absolute w-full text-center -top-2">
              <span className={`px-2 py-1 rounded-full text-xs
                ${flight.status === 'On Time' ? 'bg-green-100 text-green-800' :
                flight.status === 'Delayed' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}>
                {flight.status}
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="font-semibold">{flight.arrival.time}</p>
            <p className="text-sm text-gray-500">{flight.arrival.city}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function FlightTracking() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/3 p-6 overflow-y-auto border-r">
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search flight"
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {flights.map(flight => (
            <div
              key={flight.id}
              onClick={() => setSelectedFlight(flight)}
              className={`cursor-pointer transition-all ${
                selectedFlight?.id === flight.id ? 'ring-2 ring-amber-500' : ''
              }`}
            >
              <FlightRow flight={flight} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          className="h-full w-full"
          style={{ background: '#f3f4f6' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {flights.map(flight => (
            <React.Fragment key={flight.id}>
              <Marker position={flight.departure.coordinates} />
              <Marker position={flight.arrival.coordinates} />
              <Polyline
                positions={[flight.departure.coordinates, flight.arrival.coordinates]}
                color={selectedFlight?.id === flight.id ? '#f59e0b' : '#94a3b8'}
                weight={2}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}