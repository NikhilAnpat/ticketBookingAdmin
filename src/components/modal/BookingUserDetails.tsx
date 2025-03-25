import React from "react";

const BookingUserDetails = ({ flight, onClose }) => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-3 py-2 bg-yellow-500 rounded-t-lg">
          <h2 className="text-sm font-bold text-white">Passengers</h2>
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
          >
    X
          </button>
        </div>

        <div className="p-3 overflow-y-auto max-h-60">
          {flight.people.map((person, index) => (
            <div key={index} className="flex items-center p-2 space-x-3 border-b">
              <img
                src={person.image || "https://www.pngitem.com/pimgs/m/146-1468479_airplane-logo-png-transparent-png.png"}
                alt={person.name}
                className="w-10 h-10 border rounded-full"
              />
              <p className="text-sm font-medium text-gray-800">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingUserDetails;
