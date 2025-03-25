import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

function TicketSalesChart() {
  const ticketSales = [
    { day: 'Sun', sold: 2000, target: 4000 },
    { day: 'Mon', sold: 3000, target: 4000 },
    { day: 'Tue', sold: 2500, target: 4000 },
    { day: 'Wed', sold: 3250, target: 4000 },
    { day: 'Thu', sold: 2825, target: 4000 },
    { day: 'Fri', sold: 2075, target: 4000 },
    { day: 'Sat', sold: 2900, target: 4000 },
  ];
  
  const categories = ticketSales.map((data) => data.day);
  const soldData = ticketSales.map((data) => data.sold);
  const targetData = ticketSales.map((data) => data.target - data.sold);
  
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: "100%",
      width: "100%",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
        distributed: false, 
      },
    },
    colors: ['#000000', '#DFDFDF'], 
    series: [
      {
        name: 'Tickets Sold',
        data: soldData,
      },
      {
        name: 'Remaining',
        data: targetData,
      },
    ],
    
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '12px',
          colors: '#718096',
        },
      },
    },
    yaxis: {
      show: true,
      max: 4000,
      labels: {
        formatter: function (value) {
          return value / 1000 + 'k';
        },
      }
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 768, // md breakpoint
        options: {
          chart: {
            width: '100%'
          }
        }
      },
      
    ]
  };
  
  return (
    <div className='w-[100%] '>
      <Chart 
        options={chartOptions} 
        series={chartOptions.series} 
        type="bar" 
        width="100%" 
        height="200" 
      />
    </div>
  );
}

export default TicketSalesChart;