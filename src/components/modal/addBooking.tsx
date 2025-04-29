import { useState } from "react";

interface AddBookingProps {
  closePopup: () => void;
}

export default function AddBooking({ closePopup }: AddBookingProps) {
  const [rating, setRating] = useState<number>(0);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [departureTime, setDepartureTime] = useState<string>("00:00 AM");
  const [arrivalTime, setArrivalTime] = useState<string>("00:00 AM");

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTime: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const time = e.target.value;
    const [hours, minutes] = time.split(":");
    const hoursNum = parseInt(hours);
    const period = hoursNum >= 12 ? "PM" : "AM";
    const hours12 = hoursNum % 12 || 12;
    setTime(`${hours12.toString().padStart(2, "0")}:${minutes} ${period}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(event.currentTarget instanceof HTMLFormElement)) {
      console.error("Expected form element");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const formValues: Record<string, string | number | null> = {};

    // Helper function to convert FormDataEntryValue to string or number
    const convertFormValue = (
      value: FormDataEntryValue | null,
      fieldName: string
    ): string | number | null => {
      if (value === null) return null;
      const strValue = value.toString();
      // Convert to number if it's a numeric field
      if (
        [
          "adultTicketPrice",
          "childTicketPrice",
          "availableSeats",
          "totalSeats",
        ].includes(fieldName)
      ) {
        const numValue = Number(strValue);
        return isNaN(numValue) ? strValue : numValue;
      }
      return strValue;
    };

    formValues.flightNumber = convertFormValue(
      formData.get("flightNumber"),
      "flightNumber"
    );
    formValues.airlineName = convertFormValue(
      formData.get("airlineName"),
      "airlineName"
    );
    formValues.departureTime = convertFormValue(
      formData.get("departureTime"),
      "departureTime"
    );
    formValues.arrivalTime = convertFormValue(
      formData.get("arrivalTime"),
      "arrivalTime"
    );
    formValues.origin = convertFormValue(formData.get("origin"), "origin");
    formValues.destination = convertFormValue(
      formData.get("destination"),
      "destination"
    );
    formValues.adultTicketPrice = convertFormValue(
      formData.get("adultTicketPrice"),
      "adultTicketPrice"
    );
    formValues.childTicketPrice = convertFormValue(
      formData.get("childTicketPrice"),
      "childTicketPrice"
    );
    formValues.availableSeats = convertFormValue(
      formData.get("availableSeats"),
      "availableSeats"
    );
    formValues.totalSeats = convertFormValue(
      formData.get("totalSeats"),
      "totalSeats"
    );
    formValues.selectedDate = convertFormValue(
      formData.get("selectedDate"),
      "selectedDate"
    );
    formValues.rating = rating;
    formValues.flightCategory = convertFormValue(
      formData.get("category"),
      "category"
    );
    formValues.flightClass = convertFormValue(
      formData.get("flightClass"),
      "flightClass"
    );
    formValues.profilePicture = profilePicture ?? "No image uploaded";

    console.log("Form Data:", formValues);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleStarClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement;
    const starValue = parseInt(target.getAttribute("data-value") || "0");
    setRating(starValue);

    const stars = target.parentElement?.children;
    if (!stars) return;

    Array.from(stars).forEach((star, index) => {
      if (index < starValue) {
        star.classList.add("text-yellow-500");
      } else {
        star.classList.remove("text-yellow-500");
      }
    });
  };

  const handleStarHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement;
    const starValue = parseInt(target.getAttribute("data-value") || "0");
    const stars = target.parentElement?.children;
    if (!stars) return;

    Array.from(stars).forEach((star, index) => {
      if (index < starValue) {
        star.classList.add("text-yellow-500");
      } else {
        star.classList.remove("text-yellow-500");
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center min-h-screen w-full bg-black bg-opacity-60 p-4 overflow-x-hidden"
      onClick={closePopup}
    >
      <div
        className="bg-white w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] rounded-lg shadow-lg relative my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-yellow-500">
          <h2 className="text-base font-bold text-white sm:text-lg">
            Add Booking
          </h2>
          <button
            onClick={closePopup}
            className="flex items-center justify-center text-base text-white bg-red-500 rounded w-7 h-7 sm:w-8 sm:h-8 sm:text-lg hover:bg-red-600"
          >
            ✕
          </button>
        </div>

        <form
          className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto bg-gray-100 max-h-[calc(85vh-120px)]"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Flight Number:
              </label>
              <input
                type="text"
                name="flightNumber"
                placeholder="Enter flight number"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Airline Name:
              </label>
              <input
                type="text"
                name="airlineName"
                placeholder="Enter airline name"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Flight Category:
              </label>
              <div className="flex gap-4">
                <label className="flex items-center text-sm whitespace-nowrap sm:text-base">
                  <input
                    type="radio"
                    name="category"
                    value="Domestic"
                    className="mr-1 scale-125 cursor-pointer sm:scale-150"
                    required
                  />{" "}
                  Domestic
                </label>
                <label className="flex items-center text-sm whitespace-nowrap sm:text-base">
                  <input
                    type="radio"
                    name="category"
                    value="International"
                    className="mr-1 scale-125 cursor-pointer sm:scale-150"
                    required
                  />{" "}
                  International
                </label>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Flight Class:
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center text-sm whitespace-nowrap sm:text-base">
                  <input
                    type="radio"
                    name="flightClass"
                    value="Business"
                    className="mr-1 scale-125 cursor-pointer sm:scale-150"
                    required
                  />{" "}
                  Business
                </label>
                <label className="flex items-center text-sm whitespace-nowrap sm:text-base">
                  <input
                    type="radio"
                    name="flightClass"
                    value="Economy"
                    className="mr-1 scale-125 cursor-pointer sm:scale-150"
                    required
                  />{" "}
                  Economy
                </label>
                <label className="flex items-center text-sm whitespace-nowrap sm:text-base">
                  <input
                    type="radio"
                    name="flightClass"
                    value="First Class"
                    className="mr-1 scale-125 cursor-pointer sm:scale-150"
                    required
                  />{" "}
                  First Class
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Departure Time:
              </label>
              <input
                type="text"
                name="departureTime"
                className="w-full p-2 mb-0 text-sm border cursor-pointer sm:text-base rounded-xl"
                value={departureTime}
                readOnly
                onClick={(e) => {
                  const input = e.target as HTMLInputElement;
                  const nextInput = input.nextElementSibling as HTMLInputElement;
                  nextInput.showPicker();
                }}
              />
              <input
                type="time"
                className="h-0 opacity-0"
                onChange={(e) => handleTimeChange(e, setDepartureTime)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Arrival Time:
              </label>
              <input
                type="text"
                name="arrivalTime"
                className="w-full p-2 mb-0 text-sm border cursor-pointer sm:text-base rounded-xl"
                value={arrivalTime}
                readOnly
                onClick={(e) => {
                  const input = e.target as HTMLInputElement;
                  const nextInput = input.nextElementSibling as HTMLInputElement;
                  nextInput.showPicker();
                }}
              />
              <input
                type="time"
                className="h-0 opacity-0"
                onChange={(e) => handleTimeChange(e, setArrivalTime)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Origin:
              </label>
              <input
                type="text"
                name="origin"
                placeholder="Enter origin"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Destination:
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Enter destination"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Adult Ticket Price:
              </label>
              <input
                type="number"
                name="adultTicketPrice"
                placeholder="Enter price"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Child Ticket Price:
              </label>
              <input
                type="number"
                name="childTicketPrice"
                placeholder="Enter price"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Available Seats:
              </label>
              <input
                type="number"
                name="availableSeats"
                placeholder="Enter available seats"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Total Seats:
              </label>
              <input
                type="number"
                name="totalSeats"
                placeholder="Enter total seats"
                className="w-full p-2 text-sm border sm:text-base rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
                Select Date:
              </label>
              <input
                type="date"
                name="selectedDate"
                className="w-full p-2 text-sm border cursor-pointer sm:text-base rounded-xl"
                required
                onFocus={(e) => e.target.showPicker()}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold sm:text-base">
                Rating:
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-xl cursor-pointer sm:text-2xl"
                    data-value={star}
                    onClick={handleStarClick}
                    onMouseEnter={handleStarHover}
                    style={{
                      color: "white",
                      fontSize: "24px",
                      WebkitTextStroke:
                        rating >= star ? "2px green" : "1px gray",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600 sm:text-base">
              Upload Profile Picture:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 text-sm sm:text-base rounded-xl cursor-pointer file:cursor-pointer file:border-0 file:rounded-lg file:bg-[#EAB308] bg-white file:shadow-md"
              required
            />
            {profilePicture && (
              <div className="mt-2">
                <img
                  src={profilePicture}
                  alt="Profile Preview"
                  className="object-cover w-20 h-20 border rounded-full sm:w-24 sm:h-24"
                />
              </div>
            )}
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-[200px] px-4 py-2 text-sm sm:text-base bg-[#EAB308] hover:bg-[#fedb73] text-black font-medium rounded-lg"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
