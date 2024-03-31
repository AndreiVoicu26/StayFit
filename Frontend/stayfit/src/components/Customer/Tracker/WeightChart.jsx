import { React, useState, useEffect } from "react";
import { months } from "../../Utils/Months";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WeightChart({ profile, records }) {
  const [weightRecords, setWeightRecords] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(selectedYear, selectedMonth + 1, 0).getDate()
  );
  const monthCells = months.map((month, index) => (
    <td
      key={index}
      className={`month ${selectedMonth === index ? "active" : ""}`}
      onClick={() => {
        setSelectedMonth(index);
        setDaysInMonth(new Date(selectedYear, index + 1, 0).getDate());
      }}
    >
      {month}
    </td>
  ));
  const dayLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getWeightRecords = () => {
    const weights = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      const dateString = date.toISOString().slice(0, 10);
      const record = records.find((record) => record.date == dateString);
      if (record) {
        weights.push(record.weight);
      } else {
        weights.push(null);
      }
    }
    return weights;
  };

  useEffect(() => {
    setWeightRecords(getWeightRecords());
  }, [selectedMonth, selectedYear, records, profile.targetWorkout]);

  const weightData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Current Weight (kg)",
        data: weightRecords,
        borderColor: "#1c2938",
        backgroundColor: "#1c2938",
      },
      profile.targetWeight != 0 && {
        label: "Target Weight (kg)",
        data: Array.from(
          { length: dayLabels.length },
          () => profile.targetWeight
        ),
        borderColor: "#cd3f3e",
        backgroundColor: "#cd3f3e",
      },
    ],
  };

  const options = {
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Days",
        },
      },
    },
  };

  return (
    <div className="card chart">
      <div className="card-header text-center">
        <h5 className="mb-0">Weight Progress</h5>
      </div>
      <div className="card-body">
        <div className="year-header">
          <span
            class="left-button"
            onClick={() => {
              setSelectedYear(selectedYear - 1);
            }}
          >
            <i class="fa-solid fa-chevron-left"></i>
          </span>
          <span>{selectedYear}</span>
          <span
            class="right-button"
            onClick={() => {
              setSelectedYear(selectedYear + 1);
            }}
          >
            <i class="fa-solid fa-chevron-right"></i>
          </span>
        </div>
        <table className="months-table w-100">
          <tbody>
            <tr className="months-row">{monthCells}</tr>
          </tbody>
        </table>
        <hr />
        <Line data={weightData} options={options} />
      </div>
    </div>
  );
}

export default WeightChart;
