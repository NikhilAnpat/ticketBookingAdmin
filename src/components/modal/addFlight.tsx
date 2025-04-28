import { useState, useEffect, FormEvent } from "react";

interface Flight {
  id: string;
  airline: {
    name: string;
    code: string;
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
}

interface AddFlightProps {
  closePopup: () => void;
  onAddFlight: (flight: Flight) => void;
  flight?: Flight; // Optional, for editing
}

const AddFlight = ({ closePopup, onAddFlight, flight }: AddFlightProps) => {
  // State for each field
  const [airlineName, setAirlineName] = useState("");
  const [airlineCode, setAirlineCode] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureAirportCode, setDepartureAirportCode] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState("");
  const [baggage, setBaggage] = useState("");
  const [meal, setMeal] = useState("");

  // Pre-fill state if editing
  useEffect(() => {
    if (flight) {
      setAirlineName(flight.airline.name);
      setAirlineCode(flight.airline.code);
      setDepartureTime(flight.departure.time);
      setDepartureCity(flight.departure.city);
      setDepartureAirport(flight.departure.airport);
      setDepartureAirportCode(flight.departure.code);
      setArrivalTime(flight.arrival.time);
      setArrivalCity(flight.arrival.city);
      setArrivalAirport(flight.arrival.airport);
      setArrivalAirportCode(flight.arrival.code);
      setDuration(flight.duration);
      setPrice(flight.price.toString());
      setFacilities(flight.facilities.join(", "));
      setBaggage(flight.baggage);
      setMeal(flight.meal);
    } else {
      setAirlineName(""); setAirlineCode(""); setDepartureTime(""); setDepartureCity("");
      setDepartureAirport(""); setDepartureAirportCode(""); setArrivalTime(""); setArrivalCity("");
      setArrivalAirport(""); setArrivalAirportCode(""); setDuration(""); setPrice("");
      setFacilities(""); setBaggage(""); setMeal("");
    }
  }, [flight]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFlight = {
      id: flight ? flight.id : Date.now().toString(),
      airline: { name: airlineName, code: airlineCode },
      departure: {
        time: departureTime,
        city: departureCity,
        airport: departureAirport,
        code: departureAirportCode,
      },
      arrival: {
        time: arrivalTime,
        city: arrivalCity,
        airport: arrivalAirport,
        code: arrivalAirportCode,
      },
      duration,
      price: Number(price),
      facilities: facilities.split(",").map(f => f.trim()).filter(Boolean),
      baggage,
      meal,
    };
    
// console
    console.log(flight ? "Updated Flight Data:" : "New Flight Data:", newFlight);

    onAddFlight(newFlight);
    
    if (!flight) {
      setAirlineName(""); setAirlineCode(""); setDepartureTime(""); setDepartureCity("");
      setDepartureAirport(""); setDepartureAirportCode(""); setArrivalTime(""); setArrivalCity("");
      setArrivalAirport(""); setArrivalAirportCode(""); setDuration(""); setPrice("");
      setFacilities(""); setBaggage(""); setMeal("");
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60" onClick={closePopup}>
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-yellow-500 rounded-t-lg">
          <h2 className="text-base font-bold text-white">{flight ? "Edit Flight" : "Add Flight"}</h2>
          <button
            onClick={closePopup}
            className="flex items-center justify-center text-base text-white bg-red-500 rounded w-7 h-7 hover:bg-red-600"
          >
            ✕
          </button>
        </div>
        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 rounded-b-lg bg-gray-50 overflow-y-auto max-h-[80vh]">
          {/* Airline Information */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Airline Name
              </label>
              <input
                type="text"
                placeholder="Enter airline name"
                required
                value={airlineName}
                onChange={(e) => setAirlineName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Airline Code
              </label>
              <input
                type="text"
                placeholder="Enter airline code (e.g., SH-ZY6789)"
                required
                value={airlineCode}
                onChange={(e) => setAirlineCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Departure Information */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Departure Time
              </label>
              <input
                type="time"
                required
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Departure City
              </label>
              <input
                type="text"
                placeholder="Enter departure city"
                required
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Departure Airport
              </label>
              <input
                type="text"
                placeholder="Enter departure airport"
                required
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Departure Airport Code
              </label>
              <input
                type="text"
                placeholder="Enter airport code (e.g., LAX)"
                required
                value={departureAirportCode}
                onChange={(e) => setDepartureAirportCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Arrival Information */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Arrival Time
              </label>
              <input
                type="time"
                required
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Arrival City
              </label>
              <input
                type="text"
                placeholder="Enter arrival city"
                required
                value={arrivalCity}
                onChange={(e) => setArrivalCity(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Arrival Airport
              </label>
              <input
                type="text"
                placeholder="Enter arrival airport"
                required
                value={arrivalAirport}
                onChange={(e) => setArrivalAirport(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Arrival Airport Code
              </label>
              <input
                type="text"
                placeholder="Enter airport code (e.g., JFK)"
                required
                value={arrivalAirportCode}
                onChange={(e) => setArrivalAirportCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                placeholder="Enter duration (e.g., 13 hours)"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                placeholder="Enter price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Facilities
              </label>
              <input
                type="text"
                placeholder="Enter facilities (comma separated)"
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Baggage Allowance
              </label>
              <input
                type="text"
                placeholder="Enter baggage allowance"
                required
                value={baggage}
                onChange={(e) => setBaggage(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Meal Service
            </label>
            <input
              type="text"
              placeholder="Enter meal service details"
              required
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex justify-center gap-2 mt-6">
            <button
              type="submit"
              className="w-[200px] py-2 mt-4 font-semibold text-white rounded-lg bg-amber-500 hover:bg-amber-600"
            >
              {flight ? "Update Flight" : "Add Flight"}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default AddFlight;
