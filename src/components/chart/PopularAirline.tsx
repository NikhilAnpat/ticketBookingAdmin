import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; 
import { Plane   } from 'lucide-react';


const PopularAirline: React.FC = () => {
  
  const series: number[] = [35, 30, 20, 15]; 

  
  const options: ApexOptions = {
    chart: {
      type: 'donut' as const, 
    },
    labels: ['SkyHigh Airlines', 'FlyFast Airways', 'AeroJet', 'Nimbus Airlines'],
    colors: ['#E4C779', '#222222', '#5C5B57', '#83827E'], 
    // legend: {
    //   position: 'bottom',
    //   horizontalAlign: 'left',
    //   formatter: function (seriesName: string, opts) {
    //     return `${seriesName} ${opts.w.globals.series[opts.seriesIndex]}%`;
    //   },
    //   width: undefined, 
    //   itemMargin: {
    //     horizontal: 20, 
    //     vertical: 5, 
    //   },
    // },
    dataLabels: {
      enabled: false, 
    },
    legend:{
      show: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          size: '88%', 
        },
      },
    },
    
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
            
          },
        
        },
      },
    ],
  };

  return (
    <div className='relative' >
      
      <Chart
        options={options}
        series={series}
        type="donut"
        width={200}
        height={200}
        className='flex  justify-center md:items-start '
      />
      

      <div className='absolute top-[30%] left-[43%] translate-x-[-5%] translate-y-0 xl:translate-[-50%, -50%]   xl:left-[38%]'>
        <div className='h-[70px] w-[70px] flex justify-center items-center rounded-full bg-[#E3C678]'>
        <Plane size={50}  className=''  />               
      </div>



        </div>

    </div>
  );
};

export default PopularAirline;