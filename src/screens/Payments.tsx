import { useState, useRef, useEffect } from "react";
import { DetailsList, DetailsListLayoutMode, IColumn } from "@fluentui/react";
import { Button } from "@fluentui/react-components";
import { Search, Filter, Calendar } from "lucide-react";
import { DateRange, RangeKeyDict, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { LuSquareArrowOutUpRight } from "react-icons/lu";
import bookingsData from "../components/dummyData/payments/payments.json";
interface Booking {
  id: string;
  image: string;
  name: string;
  bookingCode: string;
  airline: string;
  route: string;
  billingDate: string;
  amount: string;
  status: string;
}
const columns: IColumn[] = [
  {
    key: "name",
    name: "Name",
    fieldName: "name",
    headerClassName: "text-lg font-bold text-gray-800",
    minWidth: 100,
    maxWidth: 250,
    flexGrow: 1,
    onRender: (item: Booking) => (
      <div className="flex items-center gap-2" style={{ fontSize: "16px" }}>
        {item.name}
      </div>
    ),
  },
  {
    key: "bookingCode",
    name: "Booking Code",
    fieldName: "bookingCode",
    headerClassName: "text-lg font-bold text-gray-800",
    minWidth: 100,
    maxWidth: 200,
    flexGrow: 1,
    onRender: (item) => (
      <span style={{ fontSize: "16px" }}>{item.bookingCode}</span>
    ),
  },
  {
    key: "airline",
    name: "Airline",
    fieldName: "airline",
    headerClassName: "text-lg font-bold text-gray-800",
    flexGrow: 1,
    minWidth: 100,
    maxWidth: 200,
    onRender: (item) => (
      <span style={{ fontSize: "16px" }}>{item.airline}</span>
    ),
  },
  {
    key: "route",
    name: "Route",
    fieldName: "route",
    headerClassName: "text-lg font-bold text-gray-800",
    flexGrow: 1,
    minWidth: 100,
    maxWidth: 200,
    onRender: (item) => <span style={{ fontSize: "16px" }}>{item.route}</span>,
  },
  {
    key: "billingDate",
    name: "Billing Date",
    headerClassName: "text-lg font-bold text-gray-800",
    fieldName: "billingDate",
    flexGrow: 1,
    minWidth: 100,
    maxWidth: 200,
    onRender: (item) => (
      <span style={{ fontSize: "16px" }}>{item.billingDate}</span>
    ),
  },
  {
    key: "amount",
    name: "Amount ",
    fieldName: "amount",
    headerClassName: "text-lg font-bold text-gray-800",
    flexGrow: 1,
    minWidth: 90,
    maxWidth: 170,
    onRender: (item) => (
      <span style={{ fontSize: "16px" }}> ${item.amount}</span>
    ),
  },
  {
    key: "status",
    name: "Status",
    fieldName: "status",
    headerClassName: "text-lg font-bold text-gray-800",
    minWidth: 90,
    maxWidth: 120,
    flexGrow: 1,
    onRender: (item: Booking) => {
      let statusClass = "text-white rounded-xl px-2 py-1 text-xs";

      if (item.status === "Confirmed") {
        statusClass += " bg-green-500";
      } else if (item.status === "Pending") {
        statusClass += " bg-yellow-500 px-3.5";
      } else if (item.status === "Cancelled") {
        statusClass += " bg-red-500 px-2.5";
      }

      return <button className={statusClass}>{item.status}</button>;
    },
  },
  {
    key: "action",
    name: "Action",
    minWidth: 90,
    maxWidth: 120,
    flexGrow: 1,
    headerClassName: "text-lg font-bold text-gray-800",
    onRender: () => <Button icon={<LuSquareArrowOutUpRight />} title="View" />,
  },
];
const Payments = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const statusOptions = ["Confirmed", "Pending", "Cancelled"];
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setBookings(bookingsData);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = selectedStatus
      ? booking.status === selectedStatus
      : true;
    const normalizedSearchQuery = searchQuery.replace(/\s+/g, "");
    const matchesSearchQuery =
      booking.name
        .toLowerCase()
        .includes(normalizedSearchQuery.toLowerCase()) ||
      booking.airline
        .toLowerCase()
        .includes(normalizedSearchQuery.toLowerCase()) ||
      booking.route
        .toLowerCase()
        .includes(normalizedSearchQuery.toLowerCase()) ||
      booking.bookingCode
        .toLowerCase()
        .includes(normalizedSearchQuery.toLowerCase());

    return matchesStatus && matchesSearchQuery;
  });
  return (
    <div className="w-full p-5">
      <div className="p-2 bg-white rounded-lg ">
        <div className="flex flex-wrap justify-between p-2 sm:flex-row">
          <h4 className="w-full text-xl font-semibold sm:w-auto">
            Transactions
          </h4>
          <div className="flex flex-wrap justify-center w-full gap-3 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-2 top-1/2" />
              <input
                type="text"
                placeholder="Search name, airline etc."
                className="w-full py-2 pl-10 pr-4 border rounded-lg sm:w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative z-50 w-full sm:w-auto" ref={statusRef}>
              <button
                className="border rounded-lg px-3 py-3 sm:text-[15px] text-xs w-full sm:w-32 flex items-center space-x-2 hover:bg-gray-50"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                <Filter className="w-4 h-4" />
                <span>{selectedStatus || "Status"}</span>
              </button>
              {showStatusDropdown && (
                <div className="absolute  mt-2 bg-white border rounded-lg shadow-lg w-full sm:w-[120px]">
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
                      className="px-3 py-2 text-left hover:bg-gray-100"
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

            {/* Date Range Picker */}
            <div className="relative z-50 w-full sm:w-auto " ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex cursor-pointer items-center gap-2 text-[14px] w-full sm:w-40 border rounded-lg px-2 py-2 bg-[#E4C779] shadow-md text-gray-700"
              >
                <Calendar size={24} />
                <span>
                  {range[0].startDate && range[0].endDate
                    ? range[0].startDate.toDateString() ===
                      range[0].endDate.toDateString()
                      ? new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(range[0].startDate)
                      : `${range[0].startDate.getDate()}-${range[0].endDate.getDate()} ${range[0].endDate.toLocaleString(
                          "en-GB",
                          { month: "long" }
                        )} ${range[0].endDate.getFullYear()}`
                    : "Select Date"}
                </span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                  <DateRange
                    editableDateInputs={false}
                    onChange={(item: RangeKeyDict) =>
                      setRange([item.selection])
                    }
                    moveRangeOnFirstSelection={true}
                    ranges={range}
                    dateDisplayFormat="dd MM yyyy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full overflow-x-auto">
          <div className="min-w-full">
            <DetailsList
              items={filteredBookings}
              columns={columns}
              layoutMode={DetailsListLayoutMode.fixedColumns}
              selectionMode={0}
              className="text-xl font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payments;
