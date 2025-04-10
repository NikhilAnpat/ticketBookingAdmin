import { FaEnvelope, FaPhone, FaPassport, FaWeight, FaGlobe } from "react-icons/fa"; 
import { MdAirlineSeatReclineNormal, MdOutlineAirplaneTicket } from "react-icons/md";

const BookingUserDetails = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div
      className="fixed inset-[-16px] z-40 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[40rem] bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 mt-0 bg-yellow-500 rounded-t-lg">
          <h2 className="text-lg font-bold text-white">Passenger Details</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          >
            X
          </button>
        </div>

        <div className="flex items-center px-4 py-6 space-x-6 border-b">
          <img
            src={person.image || "https://www.pngitem.com/pimgs/m/146-1468479_airplane-logo-png-transparent-png.png"}
            alt={person.name}
            className="w-24 h-24 border-4 border-yellow-400 rounded-full shadow-lg hover:border-orange-400"
          />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{person.name}</p>
            <p className="text-gray-600 text-md">Age: {person.age} | Gender: {person.gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-6 py-4 border-b">
          <DetailItem icon={<FaPassport className="text-yellow-500" />} label="Passport" value={person.passportNumber} />
          <DetailItem icon={<FaEnvelope className="text-yellow-500" />} label="Email" value={person.email} />
          <DetailItem icon={<FaPhone className="text-yellow-500" />} label="Phone" value={person.phone} />
          <DetailItem icon={<MdAirlineSeatReclineNormal className="text-yellow-500" />} label="Seat" value={person.seatNumber} />
          <DetailItem icon={<FaWeight className="text-yellow-500" />} label="Luggage" value={person.luggageWeight} />
          <DetailItem icon={<MdOutlineAirplaneTicket className="text-yellow-500" />} label="Ticket Type" value={person.ticketType} />
          <DetailItem icon={<FaGlobe className="text-yellow-500" />} label="Nationality" value={person.nationality} />
        </div>

        <div className="px-6 pb-6 mt-4">
          <p className="font-semibold text-gray-800">Check-In Status: <span className="font-normal">{person.checkInStatus}</span></p>
          <p className="font-semibold text-gray-800">Special Request: <span className="font-normal">{person.specialRequest}</span></p>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 text-gray-700">
    {icon}
    <p><span className="font-semibold">{label}:</span> {value}</p>
  </div>
);

export default BookingUserDetails;
