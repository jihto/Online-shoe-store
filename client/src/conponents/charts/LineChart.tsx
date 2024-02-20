import React from "react";
import { Line } from "react-chartjs-2";

const LineChart: React.FC = () => {
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Sample Chart",
        data: [80, 19, 42, 55, 20, 30, 78],
        fill: false,
        backgroundColor: "#29d7f0",
        borderColor: "#5046a5",
        tension: 0.5,

      }, { 
        data: [88, 11, 38, 55, 12, 53, 90],
        fill: false,
        backgroundColor: "#5046a5",
        borderColor: "#29d7f0",
        tension: 0.5,
      },
    ],
  };

  const options  = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
