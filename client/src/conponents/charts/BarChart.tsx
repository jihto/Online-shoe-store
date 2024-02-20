// src/components/Chart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, LinearScale } from 'chart.js/auto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)


interface BarChartProps{
  data: Array<number>;
}

const BarChart: React.FC<BarChartProps> = ({data}) => {
  const dataDefault = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October' , 'November' , 'December'],
    datasets: [
      {
        label: 'Total product has post in the year',
        data,
        backgroundColor: [
          '#5046a5',
          '#29d7f0', 
        ],
      },
    ],
  };

  const options = {
    legend: {
      display: false // hide the legend
    },
    scales: {
      x: {
        display: false // hide the x-axis
      }, 
      y: {
        beginAtZero: true,
        display: false // hide the y-axis
      },
    },
    tooltips: {
      enabled: false // disable the tooltips
    }
  };
  
  return (
    <div className="w-full">
      <Bar data={dataDefault} options={options}/>
    </div>
  );
};

export default BarChart;
