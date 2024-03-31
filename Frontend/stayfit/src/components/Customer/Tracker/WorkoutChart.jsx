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
import { Bar } from "react-chartjs-2";

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

function WorkoutChart({ profile, records }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(selectedYear, selectedMonth + 1, 0).getDate()
  );
  const [workoutRecords, setWorkoutRecords] = useState([]);
  const [workoutTarget, setWorkoutTarget] = useState([]);
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

  const getWorkoutRecords = () => {
    const workout = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      const dateString = date.toISOString().slice(0, 10);
      const record = records.find((record) => record.date == dateString);
      if (record) {
        workout.push(record.workout);
      } else {
        workout.push(null);
      }
    }
    return workout;
  };

  const getWorkoutTarget = () => {
    const workoutTarget = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      const dateString = date.toISOString().slice(0, 10);
      const record = records.find((record) => record.date == dateString);
      if (record) {
        workoutTarget.push(profile.targetWorkout);
      } else {
        workoutTarget.push(null);
      }
    }
    return workoutTarget;
  };

  useEffect(() => {
    setWorkoutRecords(getWorkoutRecords());
    setWorkoutTarget(getWorkoutTarget());
  }, [selectedMonth, selectedYear, records, profile.targetWorkout]);

  const workoutData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Current Workout (min)",
        data: workoutRecords,
        borderColor: "#1c2938",
        backgroundColor: "#1c2938",
      },
      profile.targetWorkout != 0 && {
        label: "Target Workout (min)",
        data: workoutTarget,
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
    <div className="card mt-3 chart">
      <div className="card-header text-center">
        <h5 className="mb-0">Workout Progress</h5>
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
        <Bar data={workoutData} options={options} />
      </div>
    </div>
  );
}

export default WorkoutChart;
