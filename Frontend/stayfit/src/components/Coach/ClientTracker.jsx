import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
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

function ClientTracker() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(selectedYear, selectedMonth + 1, 0).getDate()
  );
  const [target, setTarget] = useState({
    weight: 0,
    workout: 0,
    calories: 0,
  });
  const [records, setRecords] = useState([]);
  const [weightRecords, setWeightRecords] = useState([]);
  const [caloriesRecords, setCaloriesRecords] = useState([]);
  const [workoutRecords, setWorkoutRecords] = useState([]);
  const [workoutTarget, setWorkoutTarget] = useState([]);
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
  const dayLabels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleSaveTarget = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/coach/client/${id}/target`,
        target,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Target saved successfully");
      }
    } catch (error) {
      console.error("Error saving target", error);
    }
  };

  const fetchClient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/coach/client/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setClient(response.data);
        setTarget({
          weight: response.data.targetWeight,
          workout: response.data.targetWorkout,
          calories: response.data.targetCalories,
        });
        console.log("Client fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching client", error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/coach/client/${id}/records`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRecords(response.data);
        console.log("Records fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchRecords();
  }, []);

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

  const getCaloriesRecords = () => {
    const calories = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      const dateString = date.toISOString().slice(0, 10);
      const record = records.find((record) => record.date == dateString);
      if (record) {
        calories.push(record.calories);
      } else {
        calories.push(null);
      }
    }
    return calories;
  };

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
        workoutTarget.push(target.workout);
      } else {
        workoutTarget.push(null);
      }
    }
    return workoutTarget;
  };

  useEffect(() => {
    setWeightRecords(getWeightRecords());
    setCaloriesRecords(getCaloriesRecords());
    setWorkoutRecords(getWorkoutRecords());
    setWorkoutTarget(getWorkoutTarget());
  }, [selectedMonth, selectedYear, records, target]);

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
        data: Array.from({ length: dayLabels.length }, () => target.weight),
        borderColor: "#cd3f3e",
        backgroundColor: "#cd3f3e",
      },
    ],
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
        data: Array.from({ length: dayLabels.length }, () => target.calories),
        borderColor: "#cd3f3e",
        backgroundColor: "#cd3f3e",
      },
    ],
  };

  const workoutData = {
    labels: dayLabels,
    datasets: [
      {
        label: "Current Workout (min)",
        data: workoutRecords,
        borderColor: "#1c2938",
        backgroundColor: "#1c2938",
      },
      {
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
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="tracker">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">
                  {client.firstName} {client.lastName}'s Tracker
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-12 mt-3">
              <div className="card">
                <div className="card-header text-center">
                  <h5 className="mb-0">Target</h5>
                </div>
                <div className="card-body">
                  <form
                    className="form"
                    onSubmit={(e) => {
                      handleSaveTarget(e);
                    }}
                  >
                    <div className="row">
                      <div className="col-4">
                        <h5>Weight:</h5>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="kg"
                          required
                          value={target.weight}
                          onChange={(e) => {
                            setTarget({ ...target, weight: e.target.value });
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <h5>Workout:</h5>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="min"
                          required
                          value={target.workout}
                          onChange={(e) => {
                            setTarget({ ...target, workout: e.target.value });
                          }}
                        />
                      </div>
                      <div className="col-4">
                        <h5>Calories:</h5>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="kcal"
                          required
                          value={target.calories}
                          onChange={(e) => {
                            setTarget({ ...target, calories: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 ms-auto d-block"
                      style={{ width: "100px" }}
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
              <div className="card mt-3 chart">
                <div className="card-header text-center">
                  <h5 className="mb-0">Calories Progress</h5>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientTracker;
