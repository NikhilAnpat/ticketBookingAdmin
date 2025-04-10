import { useState } from "react";
import { Search, ArrowRight, Filter } from "lucide-react";
import FlightDetail from "./FlightDetail";
import { Flight } from "../components/interfaces/sheuduleInterface";

const flights: Flight[] = [
  {
    id: "1",
    airline: {
      name: "SkyHigh Airlines",
      code: "SH-ZY6789",
    },
    departure: {
      time: "8:00 AM",
      city: "Los Angeles",
      airport: "Los Angeles International Airport",
      code: "LAX",
    },
    arrival: {
      time: "9:00 PM",
      city: "New York",
      airport: "John F. Kennedy International Airport",
      code: "JFK",
    },
    duration: "13 hours",
    price: 350,
    facilities: ["WiFi", "Power Outlet"],
    baggage: "2 Baggage",
    meal: "No Meal",
  },
  {
    id: "2",
    airline: {
      name: "FlyFast Airways",
      code: "FF-XY2345",
    },
    departure: {
      time: "8:00 AM",
      city: "Los Angeles",
      code: "LAX",
      airport: "Los Angeles International Airport",
    },
    arrival: {
      time: "11:30 AM",
      city: "New York",
      code: "JFK",
      airport: "John F. Kennedy International Airport",
    },
    duration: "3.5 hours",
    price: 400,
    facilities: ["WiFi"],
    baggage: "2 Baggage",
    meal: "No Meal",
  },
  {
    id: "3",
    airline: {
      name: "AeroJet",
      code: "AJ-789",
    },
    departure: {
      time: "10:00 AM",
      city: "Los Angeles",
      code: "LAX",
      airport: "Los Angeles International Airport",
    },
    arrival: {
      time: "12:45 PM",
      city: "New York",
      code: "JFK",
      airport: "John F. Kennedy International Airport",
    },
    duration: "2.75 hours",
    price: 450,
    facilities: ["WiFi", "Entertainment"],
    baggage: "2 Baggage",
    meal: "In-flight Meal",
  },
];

const FlightCard = ({
  flight,
  onViewDetails,
}: {
  flight: Flight;
  onViewDetails: () => void;
}) => (
  <div className="p-4 mb-4 bg-white rounded-lg shadow-sm sm:p-6">
    <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
      {/* Airline Info Section */}
      <div className="flex items-center flex-shrink-0 mb-4 space-x-4 sm:mb-0">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
          <span className="text-lg font-bold text-gray-600">
            {flight.airline.name.substring(0, 2)}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium sm:text-base">
            {flight.airline.name}
          </h3>
          <p className="text-xs text-gray-500 sm:text-sm">
            {flight.airline.code}
          </p>
        </div>
      </div>

      {/* Flight Info Section */}
      <div className="flex-1 mx-4 mb-2 sm:mx-8 sm:mb-0">
        <div className="flex items-center justify-center flex-grow order-last px-8 py-2 bg-gray-100 rounded-lg xl:mx-4">
          <div className="text-center">
            <p className="text-sm font-semibold sm:text-lg">
              {flight.departure.time}
            </p>
            <p className="text-xs text-gray-500 sm:text-sm">
              {flight.departure.code}
            </p>
          </div>

          <div className="relative flex-1 mx-2 sm:mx-4">
            <div className="absolute flex items-center justify-center w-full -translate-y-1/2 top-1/2">
              <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#E5C87C]"></span>
              <div className="h-0.5 w-full bg-[#E5C87C]"></div>
              <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-[#E5C87C]"></span>
            </div>

            <div className="relative items-center text-[9px] sm:text-[11px] text-center text-black -top-2 sm:-top-3">
              <span>Duration: </span>
              {flight.duration}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold sm:text-lg">
              {flight.arrival.time}
            </p>
            <p className="text-xs text-gray-500 sm:text-sm">
              {flight.arrival.code}
            </p>
          </div>
        </div>
      </div>

      {/* Price and View Details Section */}
      <div className="flex items-center flex-shrink-0 mb-4 space-x-4 sm:mb-0">
        <div>
          <p className="text-xs text-gray-500 sm:text-sm">Price</p>
          <p className="text-sm font-semibold sm:text-lg">${flight.price}</p>
        </div>
        <button
          onClick={onViewDetails}
          className="px-4 py-2 text-sm text-white bg-gray-900 rounded-lg sm:text-base hover:bg-gray-800"
        >
          View Details
        </button>
      </div>
    </div>

    {/* Facilities, Baggage, Meal Section */}
    <div className="flex flex-wrap items-center mt-4 space-x-4 text-xs text-gray-500 sm:text-sm sm:flex-nowrap">
      <div className="flex items-center mb-2 space-x-2 sm:mb-0">
        <span>Facilities:</span>
        {flight.facilities.map((facility, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-gray-100 rounded sm:text-sm"
          >
            {facility}
          </span>
        ))}
      </div>
      <div className="mb-2 sm:mb-0">{flight.baggage}</div>
      <div>{flight.meal}</div>
    </div>
  </div>
);

export default function Schedule() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  if (selectedFlight) {
    return (
      <FlightDetail
        flight={selectedFlight}
        onBack={() => setSelectedFlight(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed right-0 z-50 left-[13rem] top-10 px-6 py-4 bg-gray-50"> 
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search flights"
                  className="w-full py-2 pl-10 pr-4 border rounded-lg sm:w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <select className="w-full px-4 py-2 border rounded-lg sm:w-auto">
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>

              <button className="flex items-center w-full px-4 py-2 space-x-2 border rounded-lg sm:w-auto hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            {/* "Add Flight" button */}
            <button className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-amber-500 hover:bg-amber-600 sm:w-auto">
              <span>Add Flight</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Flight Cards Container */}
      <div className="mt-[100px] sm:mt-[80px] px-6">
        <div className="overflow-y-auto max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-90px)]">
          {flights.map((flight) => (
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
