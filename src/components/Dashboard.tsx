import React from 'react';
import { Plane, Ship, X, DollarSign } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change, changeType }: any) => (
  <div className="bg-white p-6 rounded-xl">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <div className={`text-sm mt-2 ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </div>
      </div>
      <div className="p-3 bg-amber-100 rounded-lg">
        <Icon className="w-6 h-6 text-amber-700" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const dummyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    domestic: [65, 75, 70, 90, 85, 95],
    international: [45, 55, 50, 60, 55, 65],
  };

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={Plane}
          title="Completed Flights"
          value="125"
          change="↑ 1.35%"
          changeType="up"
        />
        <StatCard
          icon={Ship}
          title="Active Flights"
          value="80"
          change="↑ 3.68%"
          changeType="up"
        />
        <StatCard
          icon={X}
          title="Cancelled Flights"
          value="25"
          change="↓ 1.45%"
          changeType="down"
        />
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value="$15,000"
          change="↑ 5.84%"
          changeType="up"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Ticket Sales</h2>
            <select className="border rounded-lg px-3 py-2">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {[65, 75, 70, 90, 85, 95, 80].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-amber-200"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-sm mt-2">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Flights Schedule</h2>
            <select className="border rounded-lg px-3 py-2">
              <option>Last 8 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64 relative">
            {/* Simple line chart representation */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gray-200"></div>
            </div>
            <div className="relative h-full flex items-end">
              {dummyChartData.domestic.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-amber-500 opacity-50"
                  style={{ height: `${value}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
              <span className="text-sm">Domestic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <span className="text-sm">International</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}