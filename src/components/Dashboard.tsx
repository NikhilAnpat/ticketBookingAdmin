import React, { useEffect, useRef, useState } from 'react';
import { Plane, Ship, X, DollarSign, Calendar, User } from 'lucide-react';
import { HiDotsHorizontal } from "react-icons/hi";
import widgetsData from '../dummyData/dashboard/widgets.json';
import progressData from '../dummyData/dashboard/progressBar.json';
import bookingData from '../dummyData/dashboard/booking.json';
import routesData from '../dummyData/dashboard/popularRoutes.json';
import TicketSalesChart from './chart/TicketSalesChart';
import { DateRange, RangeKeyDict, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FlightScheduleChart from './chart/FlightScheduleChart';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PopularAirline from './chart/PopularAirline';

// Define interfaces for props
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
}

interface FlightRouteProgressProps {
  route: string;
  km: number;
  passengers: number;
  maxPassengers: number;
}

interface Airline {
  color: string;
  name: string;
  per: number;
}

interface Hike {
  sign: 'up' | 'down';
  per: string;
}

interface WidgetItem {
  title: string;
  icon: 'Plane' | 'Ship' | 'X' | 'DollarSign';
  numb: number;
  hike: Hike;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane,
  Ship,
  X,
  DollarSign,
};


interface Country {
  name: string;
  progress: number;
  color: string;
}

// StatCard Component
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-white w-[100%] md:w-full px-3 py-3 shadow-md rounded-xl">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-gray-500 text-[13px]">{title}</h3>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <div className={`text-[13px] rounded-md px-2 w-[65px] mt-2 ${changeType === 'up' ? 'bg-[#F2E3BC]' : 'bg-[#222222] text-white'}`}>
          {change}
        </div>
      </div>
      <div className="p-3 flex my-auto bg-amber-100 rounded-full">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

// FlightRouteProgress Component
const FlightRouteProgress: React.FC<FlightRouteProgressProps> = ({ route, km, passengers, maxPassengers }) => {
  const progressValue = (passengers / maxPassengers) * 100;

  return (
    <div className="py-1">
      <div className="flex justify-between items-center mb-1">
        <div className='w-[100%] flex justify-between items-center'>
          <h3 className="text-[10px] text-gray-500">{route}</h3>
          <p className="text-[10px] text-gray-500">{km.toLocaleString()} km</p>
        </div>
      </div>
      <div className="relative w-[100%] h-6 bg-gray-200">
        <div
          className="h-full bg-black rounded-md"
          style={{ width: `${progressValue}%` }}
        ></div>
        <div className="absolute inset-0 flex text-[14px] items-center justify-start pl-2 text-white">
          {passengers.toLocaleString()} Passengers
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const maxPassengers = Math.max(200000);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options: string[] = [
    "This Week",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "Last 9 Months",
    "This Year",
    "Last Year",
  ];

  const airlines: Airline[] = [
    { color: '#E4C779', name: 'SkyHigh Airlines', per: 35 },
    { color: '#222222', name: 'FlyFast Airways', per: 30 },
    { color: '#53524E', name: 'AeroJet', per: 20 },
    { color: '#83827E', name: 'Nimbus Airlines', per: 15 },
  ];

  const typedWidgetsData = widgetsData as WidgetItem[];



  return (
    <div className='flex overflow-y-auto flex-col xl:flex-row h-[calc(100%-64px)]'>
      <div className="Left_part w-[100%] md:w-[100%] lg:w-[100%] xl:w-[75%] py-6 px-3 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {typedWidgetsData.map((item, index) => (
            <StatCard
              key={index}
              icon={iconMap[item.icon]}
              title={item.title}
              value={item.numb.toString()}
              change={`${item.hike.sign === 'up' ? '↑' : '↓'} ${item.hike.per}`}
              changeType={item.hike.sign}
            />
          ))}
        </div>

        <div className="w-[100%] flex xl:flex-row flex-col pb-6 gap-6">
          <div className="bg-white xl:w-[50%] p-6 rounded-xl h-[370px] shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Ticket Sales</h2>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex cursor-pointer items-center gap-2 text-[14px] border rounded-lg px-2 py-2 bg-[#E4C779] shadow-md text-gray-700"
                >
                  <Calendar size={24} />
                  {range[0].startDate && range[0].endDate ? (
                    range[0].startDate.toDateString() === range[0].endDate.toDateString()
                      ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(range[0].startDate)
                      : `${range[0].startDate.getDate()}-${range[0].endDate.getDate()} ${range[0].endDate.toLocaleString('en-GB', { month: 'long' })} ${range[0].endDate.getFullYear()}`
                  ) : 'Select Date'}
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg right-0">
                    <DateRange
                      editableDateInputs={false}
                      onChange={(item: RangeKeyDict) => setRange([item.selection])}
                      moveRangeOnFirstSelection={true}
                      ranges={range}
                      dateDisplayFormat="dd MM yyyy"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 text-start">
              <span className="text-[30px] pr-1 font-bold">12,500</span>
              <span className="text-sm font-semibold text-[#D3D3D1]"> Tickets Sold</span>
            </div>
            <div>
              <TicketSalesChart />
            </div>
          </div>

          <div className="bg-white xl:w-[50%] p-6 rounded-xl h-[370px] shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Flights Schedule</h2>
              <select className="border cursor-pointer rounded-lg px-2 py-2 bg-[#E4C779] min-w-0">
                {options.map((option, index) => (
                  <option className='bg-white' key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</option>
                ))}
              </select>
            </div>
            <div className="relative pt-0">
              <FlightScheduleChart />
            </div>
          </div>
        </div>

        <div className='w-[100%] flex xl:flex-row flex-col gap-6'>
          <div className='bg-white xl:w-[50%] shadow-md rounded-xl p-6 h-[514px]'>
            <div className='flex mb-10 justify-between items-center'>
              <h2 className="text-lg font-semibold">Flights Schedule</h2>
              <select className="border cursor-pointer rounded-lg px-2 py-2 bg-[#E4C779] min-w-0">
                {options.map((option, index) => (
                  <option className='bg-white' key={index} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</option>
                ))}
              </select>
            </div>

            <div className='flex w-[98%] h-[190px] mb-8'>
              <MapContainer center={[0, 0]} zoom={0} scrollWheelZoom={false} zoomControl={false} className='w-full'>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
            </div>
            <div className='flex flex-wrap justify-between w-full'>
              {progressData.countries.map((country: Country, index: number) => (
                <div key={index} className='w-1/2 mb-3 px-2'>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">{country.name}</span>
                    <span className="text-sm font-semibold">{country.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full">
                    <div className="h-2 rounded-full" style={{ width: `${country.progress}%`, backgroundColor: country.color }}></div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className='bg-white shadow-md xl:w-[50%] rounded-xl'>
            <div className='flex p-6 justify-between items-center'>
              <h2 className="text-lg font-semibold">All Bookings</h2>
              <span className='cursor-pointer text-[#AFAEAC]'>See All</span>
            </div>

            <div className='w-full flex flex-col p-3 gap-2 overflow-y-auto overflow-hidden h-[442px]'>
              {bookingData?.map((flight, index: number) => (
                <div key={index} className='flex p-3 bg-gray-50 shadow-md rounded-xl w-[100%]'>
                  <div className='min-w-[100px]'>
                    <span className='text-[12px]'>{flight.flightname}</span>
                    <div className='flex text-[10px] text-[#C5C3C1] xl:justify-between items-center'>
                      <Calendar size={9} />
                      <p className='text-[8px]'>{flight.date}</p>
                      <User size={9} />
                      <p>{flight.range}</p>
                    </div>
                  </div>
                  <div className='border-r-[1px] border-[#C5C3C1] mx-2'></div>
                  <div className='w-[calc(100%-100px)]'>
                    {flight.timedest?.map((time, idx: number) => (
                      <div key={idx} className='flex justify-between xl:justify-center w-[100%] items-center gap-1'>
                        <div className='text-[9px] w-[50px]'>
                          <p>{time.time1}</p>
                          <p>{time.start}</p>
                        </div>
                        <div className='flex flex-col w-[calc(100%-120px)] p-1'>
                          <span className='flex justify-center items-center text-[10px]'>Duration: {time.duration}</span>
                          <div className='flex justify-center items-center w-[100%]'>
                            <span className='h-1.5 w-1.5 rounded-full bg-[#E5C87C]'></span>
                            <div className='h-0.5 xl:w-44 w-[200px] sm:w-[300px] md:w-[570px] bg-[#E5C87C]'></div>
                            <span className='h-1.5 w-1.5 rounded-full bg-[#E5C87C]'></span>
                          </div>
                          <div className='flex justify-between items-center'>
                            <span className='text-[10px]'>{time.st}</span>
                            <span className='text-[10px]'>{time.ed}</span>
                          </div>
                        </div>
                        <div className='text-[9px] text-end flex flex-col justify-center items-center w-[60px]'>
                          <p>{time.time2}</p>
                          <p>{time.end}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right part */}
      <div className='Right_part py-6 px-3 flex w-[100%] xl:w-[25%]'>
        <div className='flex flex-col md:flex-row xl:flex-col gap-4 w-[100%]'>
          <div className='bg-white md:w-[50%] xl:w-full rounded-lg shadow-md h-[415px]'>
            <div className='flex justify-between items-center p-3'>
              <span>Popular Airline</span>
              <HiDotsHorizontal />
            </div>
            <div>
              <PopularAirline />
            </div>
            <div>
              {airlines.map((airline, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 px-4"
                >
                  <div className="flex items-center gap-4 justify-center">
                    <div
                      className="rounded-full w-6 h-2 opacity-70 "
                      style={{ backgroundColor: airline.color }}
                    ></div>
                    <span>{airline.name}</span>
                  </div>
                  <div className="font-bold">{airline.per}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white md:w-[50%] h-[415px] xl:w-full rounded-lg shadow-md'>
            <div className='flex justify-between items-center p-3'>
              <span>Top Flight Routes</span>
              <HiDotsHorizontal />
            </div>
            <div>
              <div className="space-y-5 p-3">
                {(routesData).map((route, index: number) => (
                  <FlightRouteProgress
                    key={index}
                    route={route.Routes}
                    km={route.km}
                    passengers={route.passengers}
                    maxPassengers={maxPassengers}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}