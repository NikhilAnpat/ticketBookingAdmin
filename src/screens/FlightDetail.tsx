import { useState } from "react";
import { ArrowLeft, Plane } from "lucide-react";
import AddFlight from "../components/modal/addFlight";

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
  onUpdateFlight: (updatedFlight: Flight) => void; // Function to update the flight
}

export default function FlightDetail({
  flight,
  onBack,
  onUpdateFlight,
}: FlightDetailProps) {
  const [isEditOpen, setIsEditOpen] = useState(false); 

  const handleEditFlight = (updatedFlight: Flight) => {
    onUpdateFlight(updatedFlight); 
    setIsEditOpen(false); 
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6 space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100"
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

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center mb-8 space-x-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
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
            <div className="absolute top-0 bottom-0 w-px bg-gray-200 left-8"></div>

            <div className="flex items-start mb-12">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-amber-100">
                <Plane className="w-8 h-8 text-amber-600" />
              </div>
              <div className="ml-8">
                <div className="p-6 rounded-lg bg-gray-50">
                  <h3 className="mb-2 text-lg font-semibold">
                    {flight.departure.time}
                  </h3>
                  <p className="text-gray-600">{flight.departure.airport}</p>
                  <p className="text-sm text-gray-500">Terminal 4</p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-amber-100">
                <Plane className="w-8 h-8 transform rotate-90 text-amber-600" />
              </div>
              <div className="ml-8">
                <div className="p-6 rounded-lg bg-gray-50">
                  <h3 className="mb-2 text-lg font-semibold">
                    {flight.arrival.time}
                  </h3>
                  <p className="text-gray-600">{flight.arrival.airport}</p>
                  <p className="text-sm text-gray-500">Terminal 2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t">
            <h3 className="mb-4 font-semibold">What's included</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-medium">Baggage</h4>
                <p className="text-sm text-gray-500">{flight.baggage}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-medium">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {flight.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-white rounded"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-8 border-t">
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-2xl font-semibold">${flight.price}</p>
            </div>
            <button
              onClick={() => setIsEditOpen(true)} 
              className="px-6 py-3 text-white rounded-lg bg-amber-500 hover:bg-amber-600"
            >
              Edit Flight
            </button>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-lg">
            <AddFlight
              closePopup={() => setIsEditOpen(false)} 
              onAddFlight={handleEditFlight} 
              flight={flight} 
            />
          </div>
        </div>
      )}
    </div>
  );
}