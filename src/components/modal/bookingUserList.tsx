import React, { useState } from "react";
import BookingUserDetails from "./BookingUserDetails"; // Import user details popup

function BookingUserList({ flight, onClose }) {
  const [selectedPerson, setSelectedPerson] = useState(null);


  if (!flight || !flight.people) {
    return null;
  }

  return (
    <div className="fixed inset-[-16px] px-8 flex items-center justify-center p-4 bg-black bg-opacity-50 z-[999]" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-yellow-500 rounded-t-lg">
          <h2 className="text-base font-bold text-white">Passengers</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            X
          </button>
        </div>

        <div className="overflow-y-auto max-h-80">
          {flight.people.map((person, index) => (
            <div
              key={index}
              onClick={() => setSelectedPerson(person)}
              className="flex items-center p-3 space-x-4 border-b cursor-pointer hover:bg-gray-100"
            >
              <img
                src={person.image ||
                  "https://www.pngitem.com/pimgs/m/146-1468479_airplane-logo-png-transparent-png.png"}
                alt={person.name}
                className="w-12 h-12 border rounded-full" />
              <p className="text-base font-medium text-gray-800">
                {person.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedPerson && (
        <BookingUserDetails
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)} />
      )}
    </div>
  );
}

export default BookingUserList;
