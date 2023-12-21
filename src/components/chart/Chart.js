import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const MyChart = ({
  totalWordLength,
  rememberWordLength,
  notRememberWordLength,
}) => {
  const data = {
    labels: ["Đã nhớ", "Chưa nhớ", "Chưa học"],
    datasets: [
      {
        data: [
          rememberWordLength,
          notRememberWordLength,
          totalWordLength - rememberWordLength - notRememberWordLength,
        ],
        backgroundColor: ["#36A2EB", "#f7821b", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#f7821b", "#FF6384"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Doughnut style={{ cursor: "pointer" }} data={data} options={options} />
  );
};

export default MyChart;
