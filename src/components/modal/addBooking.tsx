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
          className="fixed inset-[-16px] flex items-center justify-center bg-black bg-opacity-60 px-8"
          onClick={closePopup}
        >
          <div
            className="bg-white max-h-[500px] h-[500px] rounded-lg shadow-lg relative overflow-hidden justify-center"
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
              className="h-full p-4 space-y-4 overflow-auto bg-gray-100"
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

                <div>
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
                    onClick={(e) => {
                      const input = e.target as HTMLInputElement;
                      const nextInput =
                        input.nextElementSibling as HTMLInputElement;
                      nextInput.showPicker();
                    }}
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
                    onClick={(e) => {
                      const input = e.target as HTMLInputElement;
                      const nextInput =
                        input.nextElementSibling as HTMLInputElement;
                      nextInput.showPicker();
                    }}
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
