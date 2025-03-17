import React from 'react';
import Chart from 'react-apexcharts';

const FlightScheduleChart: React.FC = () => {
  // Chart options
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: "100%",
      width: "90%",
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      
    },
    yaxis: {
      min: 0,
      max: 200,
      tickAmount: 4,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      
      itemMargin: {
        horizontal: 10,
      },
    },
    colors: ['#f59e0b', '#1e293b'], 
    
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
    },
    responsive: [
      {
        breakpoint: 768, // md breakpoint
        options: {
          chart: {
            width: '100%'
          }
        }
      }
    ]
  };

  // Chart series
  const series = [
    {
      name: 'Domestic',
      data: [100, 120, 130, 140, 170, 150, 130, 110],
    },
    {
      name: 'International',
      data: [80, 90, 100, 110, 120, 110, 100, 90],
    },
  ];

  return (
    
      <div className="h-[100%] lg:w-[100%] ">
        <Chart options={options} series={series} type="area" height="250" />
      </div>
    
  );
};

export default FlightScheduleChart;