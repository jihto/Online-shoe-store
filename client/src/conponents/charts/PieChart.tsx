import React from 'react';
import { Pie } from 'react-chartjs-2';

// Define the data for the pie chart
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100, 40, 120, 70],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      hoverOffset: 4
    }
  ]
};

// Define the options for the pie chart
const options = {
  responsive: true, 
};

// Define the pie chart component
const PieChart = () => {
  return (
    <div className="bg-white p-1 rounded-lg shadow-md"> 
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
