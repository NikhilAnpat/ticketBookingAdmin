import React, { useEffect, useRef, useState } from "react";
import { Filter, Clock, Plus, Calendar } from "lucide-react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import the add booking file for add booking
import AddBooking from "../components/modal/addBooking";

import bookingdata from "../components/dummyData/booking/FlightBookingData.json";
import type {
  BookingRowProps,
  Flight,
} from "../components/interfaces/bookingInterface";
import BookingUserDetails from "../components/modal/bookingUserList";

interface Person {
  image: string;
  name: string;
}

const BookingRow: React.FC<BookingRowProps> = ({ flight }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getStatusStyles = (status: string): string => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-2 mb-4 bg-white rounded-lg shadow-md sm:p-4">
      <div className="relative flex flex-col justify-between gap-4 xl:gap-0 xl:flex-row xl:items-center">
        <div className="flex xl:w-[190px] items-center space-x-2 xl:static absolute">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg sm:w-12 sm:h-12">
            <img
              src={flight.logo}
              alt={flight.flightName}
              className="object-contain w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-medium text-[13px] sm:text-[16px]">
              {flight.flightName}
            </h3>
            <p className="text-xs text-gray-500 sm:text-sm">{flight.code}</p>
          </div>
        </div>

        <div className="flex xl:w-[300px] justify-end xl:order-last">
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium text-[12px] sm:text-[14px]">
              {flight.date}
            </p>
          </div>
          <div className="relative flex items-center ml-2 space-x-1 sm:ml-6 sm:space-x-4">
            {/*  cursor-pointer */}
            <div
              className="flex justify-center items-center text-[12px] sm:text-[14px] sm:-space-x-2 cursor-pointer"
              onClick={() => setShowPopup(true)}
            >
              {(flight.people as Person[]).slice(0, 3).map((person, i) => (
                <img
                  key={i}
                  src={
                    person.image ||
                    "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                  }
                  className={`rounded-full border ${
                    i === 0
                      ? "w-7 h-7 sm:w-8 sm:h-8"
                      : "hidden sm:block sm:w-8 sm:h-8"
                  }`}
                  // // call file

                  alt={person.name}
                />
              ))}
              {/* i have added count of passenger here  */}
              {flight.people.length > 0 && (
                <span className="!ml-[2px]">{flight.people.length}</span>
              )}
            </div>
            {/* popup  */}
            {showPopup && (
              <BookingUserDetails
                flight={flight}
                onClose={() => setShowPopup(false)}
              />
            )}
            <span
              className={`p-1.5 sm:static absolute -top-[12px] -right-[10px] sm:px-2 sm:py-1 rounded-full text-[0] sm:flex sm:text-xs lg:text-sm text-white ${getStatusStyles(
                flight.status
              )}`}
            >
              {flight.status}
            </span>
          </div>
        </div>

        <div className="flex-grow order-last p-2 bg-gray-100 rounded-lg xl:order-none xl:mx-4">
          <div className="flex items-center justify-between px-2 sm:px-8">
            <div className="text-center">
              <p className="sm:text-lg text-[10px] font-semibold">
                {flight.range.time1}
              </p>
              <p className="sm:text-sm text-[10px] text-gray-500">
                {flight.range.loc1}
              </p>
            </div>

            <div className="flex-grow p-1 px-4">
              <span className="flex justify-center items-center text-[10px]">
                Duration: {flight.range.duration}
              </span>
                <div className="flex justify-center items-center w-[100%]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5C87C]"></span>
                  <div className="h-0.5 w-full bg-[#E5C87C]"></div>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E5C87C]"></span>
                </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px]">{flight.range.st}</span>
                <span className="text-[10px]">{flight.range.ed}</span>
              </div>
            </div>

            <div className="text-center">
              <p className="sm:text-lg text-[10px] font-semibold">
                {flight.range.time2}
              </p>
              <p className="sm:text-sm text-[10px] text-gray-500">
                {flight.range.loc2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Bookings() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAirlineDropdown, setShowAirlineDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDepartureDropdown, setShowDepartureDropdown] = useState(false);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [tempDateRange, setTempDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [selectedAirline, setSelectedAirline] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const airlineRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const departureRef = useRef<HTMLDivElement>(null);

  const formatDateRange = (start: Date | undefined, end: Date | undefined): string => {
    if (!start || !end) return "Date Range";
    const startDate = start.getDate();
    const endDate = end.getDate();
    const month = start.toLocaleString("default", { month: "long" });
    const year = start.getFullYear();

    if (startDate === endDate) {
      return `${startDate} ${month} ${year}`;
    }
    return `${startDate}-${endDate} ${month} ${year}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
      if (
        airlineRef.current &&
        !airlineRef.current.contains(event.target as Node)
      ) {
        setShowAirlineDropdown(false);
      }
      if (
        statusRef.current &&
        !statusRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        departureRef.current &&
        !departureRef.current.contains(event.target as Node)
      ) {
        setShowDepartureDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const airlines = Array.from(
    new Set((bookingdata as Flight[]).map((flight) => flight.flightName))
  );

  const statusOptions = ["Confirmed", "Pending", "Cancelled"] as const;

  const departureTimes = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ] as const;

  const filteredFlights = (bookingdata as Flight[]).filter((flight) => {
    const flightDate = new Date(flight.date);
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;
    const withinDateRange =
      !startDate ||
      !endDate ||
      (flightDate >= startDate && flightDate <= endDate);

    const matchesAirline = selectedAirline
      ? flight.flightName === selectedAirline
      : true;
    const matchesStatus = selectedStatus
      ? flight.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;
    const matchesDeparture = selectedDeparture
      ? flight.range.time1 === selectedDeparture
      : true;

    return (
      withinDateRange && matchesAirline && matchesStatus && matchesDeparture
    );
  });

  const handleDateSelect = (ranges: RangeKeyDict): void => {
    setTempDateRange([ranges.selection]);
  };

  const applyDateRange = (): void => {
    setDateRange(tempDateRange);
    setShowDatePicker(false);
  };

  return (
    <>
    <div className="p-3 overflow-hidden bg-gray-50">
      <div className="flex flex-col-reverse items-start gap-2 p-3 left-[13rem] top-10 sm:flex-row sm:gap-0 sm:justify-between sm:items-center bg-gray-50  ">
        <div className="flex flex-row justify-center space-x-2 sm:items-center">
          <div className="flex gap-2">
            {/* Date Range Filter */}
            <div className="relative" ref={datePickerRef}>
              <button
                className="border rounded-lg px-3 py-2 sm:text-[15px] text-xs bg-amber-100 text-amber-900 w-full text-left flex items-center justify-between"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <span className="hidden sm:block">
                  {formatDateRange(
                    dateRange[0].startDate,
                    dateRange[0].endDate
                  )}
                </span>
                <Calendar className="w-4 h-4 sm:hidden text-amber-900" />
              </button>
              {showDatePicker && (
                <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg">
                  <DateRange
                    ranges={tempDateRange}
                    onChange={handleDateSelect}
                    moveRangeOnFirstSelection={false}
                    rangeColors={["#f59e0b"]}
                  />
                  <button
                    className="w-full py-2 text-white rounded-b-lg bg-amber-500"
                    onClick={applyDateRange}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Airline Filter */}
            <div className="relative" ref={airlineRef}>
              <button
                className="flex items-center w-full px-3 py-2 space-x-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setShowAirlineDropdown(!showAirlineDropdown)}
              >
                <Filter className="w-4 h-4" />
                <span className="text-xs sm:text-[16px] ">
                  {selectedAirline || "Airline"}
                </span>
              </button>
              {showAirlineDropdown && (
                <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-[120px] max-h-60 overflow-y-auto">
                  <button
                    className="w-full px-3 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setSelectedAirline(null);
                      setShowAirlineDropdown(false);
                    }}
                  >
                    All Airlines
                  </button>
                  {airlines.map((airline) => (
                    <button
                      key={airline}
                      className="w-full px-3 py-2 text-[12px] text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedAirline(airline);
                        setShowAirlineDropdown(false);
                      }}
                    >
                      {airline}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {/* Status Filter */}
            <div className="relative" ref={statusRef}>
              <button
                className="border rounded-lg px-3 py-2 sm:text-[15px] text-xs flex items-center space-x-2 hover:bg-gray-50 w-full"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <Filter className="w-4 h-4" />
                <span>{selectedStatus || "Status"}</span>
              </button>
              {showStatusDropdown && (
                <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg w-[120px]">
                  <button
                    className="w-full px-3 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setSelectedStatus(null);
                      setShowStatusDropdown(false);
                    }}
                  >
                    All Statuses
                  </button>
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedStatus(status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Departure Filter */}
            <div className="relative" ref={departureRef}>
              <button
                className="border rounded-lg px-2 py-2 sm:text-[15px] text-xs flex items-center space-x-2 hover:bg-gray-50 w-full"
                onClick={() => setShowDepartureDropdown(!showDepartureDropdown)}
              >
                <Clock className="w-4 h-4" />
                <span className="hidden sm:block">
                  {selectedDeparture || "Departure"}
                </span>
              </button>
              {showDepartureDropdown && (
                <div className="absolute z-10 right-0  mt-2 bg-white border rounded-lg shadow-lg w-[100px] max-h-60 overflow-y-auto">
                  <button
                    className="w-full px-3 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setSelectedDeparture(null);
                      setShowDepartureDropdown(false);
                    }}
                  >
                    All Times
                  </button>
                  {departureTimes.map((time) => (
                    <button
                      key={time}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedDeparture(time);
                        setShowDepartureDropdown(false);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* add booking popup here */}
        <button
          className="flex items-center px-4 py-2 space-x-2 text-white rounded-lg bg-amber-500 hover:bg-amber-600"
          onClick={() => setIsAddBookingOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add Booking</span>
        </button>
        {/* AddBooking Popup */}
        {isAddBookingOpen && (
          <AddBooking closePopup={() => setIsAddBookingOpen(false)} />
        )}
      </div>

      <div className="space-y-4 mt-[10px] sm:mt-[20px] overflow-y-auto max-h-[calc(100vh-200px)]">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <BookingRow key={index} flight={flight} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No flights match the selected filters.
          </p>
        )}
      </div>
    </div>
   </>
  );
}
