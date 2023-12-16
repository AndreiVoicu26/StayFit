import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

function ClientTracker() {
  const initialClients = [
    {
      id: 1,
      name: "Andrei Voicu",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 2,
      name: "Liam Johnson",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 3,
      name: "Olivia Smith",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 4,
      name: "Ethan Davis",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 5,
      name: "Anastasia Brown",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 6,
      name: "Noah Taylor",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
  ];

  const { id } = useParams();

  const client = initialClients.find((client) => client.id === Number(id));

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(selectedYear, selectedMonth + 1, 0).getDate()
  );
  const [weightRecords, setWeightRecords] = useState([]);
  const [weightTarget, setWeightTarget] = useState(null);
  const [caloriesRecords, setCaloriesRecords] = useState([]);
  const [caloriesTarget, setCaloriesTarget] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
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
  const currentDate = new Date();
  const dayLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    setWeightRecords(getWeightRecords());
    setCaloriesRecords(getCaloriesRecords());
  }, [selectedMonth, selectedYear]);

  const weightDataMap = {
    "2023-10-01": 65,
    "2023-10-02": 66,
    "2023-10-03": 66,
    "2023-10-07": 67,
    "2023-10-08": 67,
    "2023-10-09": 66,
    "2023-10-10": 65,
    "2023-10-11": 66,
    "2023-11-07": 65,
    "2023-11-09": 67,
    "2023-11-24": 66,
  };

  const getWeightRecords = () => {
    const weights = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      const dateString = date.toISOString().slice(0, 10);
      const weight = weightDataMap[dateString];
      weights.push(weight || null);
    }
    return weights;
  };

  const weightData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Current Weight (kg)",
        data: weightRecords,
        borderColor: "#1c2938",
        backgroundColor: "#1c2938",
      },
      {
        label: "Target Weight (kg)",
        data: Array.from({ length: dayLabels.length }, () => weightTarget),
        borderColor: "#cd3f3e",
        backgroundColor: "#cd3f3e",
      },
    ],
  };

  const caloriesDataMap = {
    "2023-10-01": 2000,
    "2023-10-02": 2400,
    "2023-10-03": 2000,
    "2023-10-07": 2500,
    "2023-10-08": 2800,
    "2023-10-09": 2000,
    "2023-10-11": 2000,
  };

  const getCaloriesRecords = () => {
    const calories = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      const dateString = date.toISOString().slice(0, 10);
      calories.push(caloriesDataMap[dateString] || null);
    }
    return calories;
  };

  const caloriesData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Calories Consumed (kcal)",
        data: caloriesRecords,
        borderColor: "#1c2938",
        backgroundColor: "#1c2938",
      },
      {
        label: "Calories Needed (kcal)",
        data: Array.from({ length: dayLabels.length }, () => caloriesTarget),
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

  const options_weight = {
    scales: {
      y: {
        min:
          weightTarget &&
          Math.min(...weightRecords.filter((weight) => weight !== null)) >
            weightTarget
            ? weightTarget - 0.5
            : Math.min(...weightRecords.filter((weight) => weight !== null)) -
              0.5,
        max:
          weightTarget && Math.max(...weightRecords) < weightTarget
            ? weightTarget
            : Math.max(...weightRecords) + 0.5,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="tracker">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">{client.name}'s Tracker</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-6 mt-3 mb-3">
              <div className="card h-100">
                <div className="card-header text-center">
                  <h5 className="mb-0">Today</h5>
                </div>
                <div className="card-body d-flex justify-content-center align-items-center">
                  <h3 className="mb-0 text-center">
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                    }) +
                      " " +
                      currentDate.getDate()}
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-6 mt-3 mb-3">
              <div className="card">
                <div className="card-header text-center">
                  <h5 className="mb-0">Goals</h5>
                </div>
                <div className="card-body">
                  <form
                    className="form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setWeightTarget(event.target.weightTarget.value);
                      setCaloriesTarget(event.target.caloriesTarget.value);
                    }}
                  >
                    <div className="row">
                      <div className="col-6">
                        <h5>Target Weight:</h5>
                        <input
                          type="text"
                          name="weightCurrent"
                          className="form-control"
                          placeholder="kg"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <h5>Target Calories:</h5>
                        <input
                          type="text"
                          name="caloriesCurrent"
                          className="form-control"
                          placeholder="kcal"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-12 mt-3 mb-3">
              <div className="card chart">
                <div className="card-header text-center">
                  <h5 className="mb-0">Weight Chart</h5>
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
              <div className="card mt-3 chart">
                <div className="card-header text-center">
                  <h5 className="mb-0">Calories Chart</h5>
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
                  <Line data={caloriesData} options={options} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientTracker;
