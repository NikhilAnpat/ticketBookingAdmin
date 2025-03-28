import { useState } from "react";

export default function AddBooking({ closePopup = () => {} }) {
  const [rating, setRating] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null);

  const [departureTime, setDepartureTime] = useState("00:00 AM");
  const [arrivalTime, setArrivalTime] = useState("00:00 AM");

  const formatTime = (selectedTime) => {
    const [hours, minutes] = selectedTime.split(":");
    let formattedHours = parseInt(hours, 10);
    let period = "AM";

    if (formattedHours >= 12) {
      period = "PM";
      formattedHours = formattedHours > 12 ? formattedHours - 12 : formattedHours;
    } else if (formattedHours === 0) {
      formattedHours = 12;
    }

    return `${formattedHours}:${minutes} ${period}`;
  };

  const handleSubmit = (event: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());

    formValues.flightNumber = formData.get("flightNumber");
    formValues.airlineName = formData.get("airlineName");
    formValues.departureTime = formData.get("departureTime");
    formValues.arrivalTime = formData.get("arrivalTime");
    formValues.origin = formData.get("origin");
    formValues.destination = formData.get("destination");
    formValues.adultTicketPrice = formData.get("adultTicketPrice");
    formValues.childTicketPrice = formData.get("childTicketPrice");
    formValues.availableSeats = formData.get("availableSeats");
    formValues.totalSeats = formData.get("totalSeats");
    formValues.selectedDate = formData.get("selectedDate");
    formValues.rating = rating;
    formValues.flightCategory = formData.get("category");

    formValues.flightClass = formData.get("flightClass");

    // formValues.departureDate = new Date(
    //   formData.get("departureDate")
    // ).toISOString();
    // formValues.returnDate = new Date(formData.get("returnDate")).toISOString();

    formValues.profilePicture = profilePicture
      ? profilePicture
      : "No image uploaded";

    console.log("Form Data:", formValues);
  };

  const handleImageUpload = (event: { target: { files: unknown[] } }) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  return (
    <div
  className="fixed inset-0 flex items-center justify-center px-4 bg-black bg-opacity-50 z-[999]"
  onClick={closePopup}
>
  <div
    className="bg-white max-h-[600px] h-[600px] rounded-lg shadow-lg relative overflow-hidden"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-yellow-500 rounded-lg">
      <h2 className="text-lg font-bold text-white">Add Booking</h2>
      <button
        onClick={closePopup}
        className="flex items-center justify-center w-8 h-8 text-lg text-white bg-red-500 hover:bg-red-600"
      >
        ✕
      </button>
    </div>

    <form
      className="p-4 space-y-4 overflow-auto h-full bg-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Flight Number:
          </label>
          <input
            type="text"
            name="flightNumber"
            placeholder="Enter flight number"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Airline Name:
          </label>
          <input
            type="text"
            name="airlineName"
            placeholder="Enter airline name"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Flight Category:
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="category"
                value="Domestic"
                className="mr-1 scale-150 cursor-pointer"
                required
              />{" "}
              Domestic
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="International"
                className="mr-1 text-gray-600 scale-150 cursor-pointer"
                required
              />{" "}
              International
            </label>
          </div>
        </div>

        <div >
          <label className="block mb-1 font-semibold text-gray-600">
            Flight Class:
          </label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="flightClass"
                value="Business"
                className="mr-0.2 scale-150 cursor-pointer"
                required
              />{" "}
              Business
            </label>
            <label>
              <input
                type="radio"
                name="flightClass"
                value="Economy"
                className="mr-0.2 scale-150 cursor-pointer"
                required
              />{" "}
              Economy
            </label>
            <label>
              <input
                type="radio"
                name="flightClass"
                value="First Class"
                className="mr-0.2 text-gray-600 scale-150 cursor-pointer"
                required
              />{" "}
              First Class
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Departure Time:
          </label>
          <input
            type="text"
            name="departureTime"
            className="w-full p-2 border cursor-pointer rounded-xl"
            value={departureTime}
            readOnly
            onClick={(e) => e.target.nextSibling.showPicker()}
          />
          <input
            type="time"
            className="opacity-0"
            onChange={(e) => handleTimeChange(e, setDepartureTime)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Arrival Time:
          </label>
          <input
            type="text"
            name="arrivalTime"
            className="w-full p-2 border cursor-pointer rounded-xl"
            value={arrivalTime}
            readOnly
            onClick={(e) => e.target.nextSibling.showPicker()}
          />
          <input
            type="time"
            className="opacity-0"
            onChange={(e) => handleTimeChange(e, setArrivalTime)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Origin:
          </label>
          <input
            type="text"
            name="origin"
            placeholder="Enter origin"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Destination:
          </label>
          <input
            type="text"
            name="destination"
            placeholder="Enter destination"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Adult Ticket Price:
          </label>
          <input
            type="number"
            name="adultTicketPrice"
            placeholder="Enter price"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Child Ticket Price:
          </label>
          <input
            type="number"
            name="childTicketPrice"
            placeholder="Enter price"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Available Seats:
          </label>
          <input
            type="number"
            name="availableSeats"
            placeholder="Enter available seats"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Total Seats:
          </label>
          <input
            type="number"
            name="totalSeats"
            placeholder="Enter total seats"
            className="w-full p-2 border rounded-xl"
            required
          />
        </div>
      </div>

      <div className="grid items-center grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-600">
            Select Date:
          </label>
          <input
            type="date"
            name="selectedDate"
            className="w-full p-2 border cursor-pointer rounded-xl"
            required
            onFocus={(e) => e.target.showPicker()}
          />
        </div>
        <div className="mx-2">
          <label className="block mb-1 font-semibold">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="text-2xl cursor-pointer"
                onClick={() => setRating(star)}
                style={{
                  color: "white",
                  fontSize: "24px",
                  WebkitTextStroke: rating >= star ? "2px green" : "1px gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold text-gray-600">
          Upload Profile Picture:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 rounded-xl cursor-pointer file:cursor-pointer file:border-0 file:rounded-lg file:bg-[#EAB308] bg-white file:shadow-md"
          required
        />
        {profilePicture && (
          <div className="mt-2">
            <img
              src={profilePicture}
              alt="Profile Preview"
              className="object-cover w-24 h-24 border rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[200px] px-4 py-2 bg-[#EAB308] hover:bg-[#fedb73] text-black font-medium rounded-lg"
        >
          Submit Booking
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
