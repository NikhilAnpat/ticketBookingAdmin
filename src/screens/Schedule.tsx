import { useState, useEffect } from "react";
import { Search, ArrowRight, Filter } from "lucide-react";
import FlightDetail from "./FlightDetail";
import { Flight } from "../components/interfaces/sheuduleInterface";
import AddFlight from "../components/modal/addFlight";

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
  onEdit: () => void;
}) => (
  <div className="relative p-2 mb-4 bg-white rounded-lg shadow-md sm:p-6">
    {/* Facilities Section - Only visible on larger screens at top */}
    <div className="flex-wrap items-center hidden mb-4 space-x-4 text-sm text-gray-500 lg:flex">
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">Facilities:</span>
        <div className="flex flex-wrap gap-2">
          {flight.facilities.map((facility, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 rounded sm:text-sm whitespace-nowrap"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 whitespace-nowrap">
          {flight.baggage}
        </span>
        <span className="text-gray-600 whitespace-nowrap">{flight.meal}</span>
      </div>
    </div>

    <div className="absolute block right-3 top-3 lg:hidden">
      <div className="flex flex-col items-end text-xs text-gray-500 sm:text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 text-[10px] sm:text-xs">
            Facilities:
          </span>
          <div className="flex flex-wrap justify-end gap-1 sm:gap-2">
            {flight.facilities.map((facility, index) => (
              <span
                key={index}
                className="px-1.5 py-0.5 text-[10px] bg-gray-100 rounded sm:px-2 sm:py-1 sm:text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-1 sm:gap-4">
          <span className="text-gray-600 text-[10px] sm:text-xs whitespace-nowrap">
            {flight.baggage}
          </span>
          <span className="text-gray-600 text-[10px] sm:text-xs whitespace-nowrap">
            {flight.meal}
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-between lg:flex-nowrap ">
      {/* Airline Info Section */}
      <div className="relative flex items-center flex-shrink-0 mb-4 space-x-4 sm:mb-2">
        <div className="flex items-start flex-1">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg sm:w-12 sm:h-12">
            <span className="text-base font-bold text-gray-600 sm:text-lg">
              {flight.airline.name.substring(0, 2)}
            </span>
          </div>
          <div className="ml-2 sm:ml-4">
            <h3 className="text-xs font-medium sm:text-sm md:text-base">
              {flight.airline.name}
            </h3>
            <p className="text-[11px] text-gray-500 sm:text-xs md:text-sm">
              {flight.airline.code}
            </p>
          </div>
        </div>
      </div>

      {/* Flight Info Section */}
      <div className="flex-col w-full gap-2 mx-2 mb-2 sm:mx-8 sm:mb-5 sm:flex-col sm:justify-center sm:items-start ">
        <div className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 rounded-lg sm:px-8 sm:py-2">
          <div className="text-center">
            <p className="text-xs font-semibold sm:text-sm md:text-lg">
              {flight.departure.time}
            </p>
            <p className="text-[10px] text-gray-500 sm:text-xs md:text-sm">
              {flight.departure.code}
            </p>
          </div>

          <div className="relative flex-1 mx-2 sm:mx-4 ">
            <div className="absolute flex items-center justify-center w-full -translate-y-1/2 top-1/2">
              <span className="h-1 w-1 rounded-full bg-[#E5C87C]"></span>
              <div className="h-0.5 w-full bg-[#E5C87C]"></div>
              <span className="h-1 w-1 rounded-full bg-[#E5C87C]"></span>
            </div>

            <div className="relative items-center text-[8px] sm:text-[11px] text-center text-black -top-2">
              <span>Duration: </span>
              {flight.duration}
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold sm:text-sm md:text-lg">
              {flight.arrival.time}
            </p>
            <p className="text-[10px] text-gray-500 sm:text-xs md:text-sm">
              {flight.arrival.code}
            </p>
          </div>
        </div>
      </div>

      {/* Price and View Details Section */}
      <div className="flex items-center justify-between flex-shrink-0 w-full py-2 mb-4 space-x-4 sm:mb-0 sm:w-auto">
        <div className="flex-shrink-0">
          <p className="text-[10px] text-gray-500 sm:text-xs md:text-sm">
            Price
          </p>
          <p className="text-xs font-semibold sm:text-sm md:text-lg">
            ${flight.price}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className="px-3 py-1.5 text-xs text-white bg-gray-900 rounded-lg sm:px-4 sm:py-2 sm:text-sm hover:bg-gray-800"
          >
            View Details
          </button>
          {/* <button
            onClick={onEdit}
            className="px-3 py-1.5 text-xs text-white bg-amber-500 rounded-lg sm:px-4 sm:py-2 sm:text-sm hover:bg-amber-600"
          >
            Edit
          </button> */}
        </div>
      </div>
    </div>
  </div>
);

export default function Schedule() {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isflightOpen, setIsFlightOpen] = useState(false);
  const [flightsList, setFlightsList] = useState<Flight[]>(() => {
    const stored = localStorage.getItem("flightsList");
    return stored ? JSON.parse(stored) : flights;
  });
  const [editFlight, setEditFlight] = useState<Flight | null>(null);

  useEffect(() => {
    localStorage.setItem("flightsList", JSON.stringify(flightsList));
  }, [flightsList]);

  const handleAddFlight = (newFlight: Flight) => {
    setFlightsList([...flightsList, newFlight]);
    setIsFlightOpen(false);
  };

  const handleUpdateFlight = (updatedFlight: Flight) => {
    setFlightsList((prev) => prev.map(f => f.id === updatedFlight.id ? updatedFlight : f));
    setEditFlight(null);
    setIsFlightOpen(false);
    // If details view is open for this flight, update it
    if (selectedFlight && selectedFlight.id === updatedFlight.id) {
      setSelectedFlight(updatedFlight);
    }
  };

  if (selectedFlight) {
    return (
      <FlightDetail
        flight={selectedFlight}
        onBack={() => setSelectedFlight(null)}
        onUpdateFlight={handleUpdateFlight}
      />
    );
  }
  

  return (
    <div className={`overflow-hidden bg-gray-50 ${isflightOpen || editFlight ? 'h-screen overflow-hidden' : ''}`}>
      <div className="left-[13rem] top-10 px-6 py-4 bg-gray-50 block">
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

              <div className="flex justify-between w-[100%]">
                <div>
                  <select className="px-4 py-2 border rounded-lg">
                    <option>Economy</option>
                    <option>Business</option>
                    <option>First Class</option>
                  </select>
                </div>
                <div className="flex">
                  <button className="flex items-center px-4 py-2 space-x-2 sm:w-auto hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span className="hidden lg:inline">Filter</span>
                  </button>
                  <button
                    className="flex items-center px-2 py-1 space-x-2 text-white rounded-lg bg-amber-500 hover:bg-amber-600 lg:mx-2"
                    onClick={() => setIsFlightOpen(true)}
                  >
                    <span>Add Flight</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Cards Container */}
      <div className={`mt-[10px] sm:mt-[20px] px-6 ${isflightOpen || editFlight ? '' : ''}`}>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
          {flightsList.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onViewDetails={() => setSelectedFlight(flight)}
              onEdit={() => setEditFlight(flight)}
            />
          ))}
        </div>
      </div>

      {/* Add/Edit Flight Popup */}
      {(isflightOpen || editFlight) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-lg">
            <AddFlight
              closePopup={() => { setIsFlightOpen(false); setEditFlight(null); }}
              onAddFlight={editFlight ? handleUpdateFlight : handleAddFlight}
              flight={editFlight || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
