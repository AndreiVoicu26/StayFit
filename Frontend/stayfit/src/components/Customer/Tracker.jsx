import { React, useState, useEffect } from "react";
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

function Tracker() {
  const [profile, setProfile] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(selectedYear, selectedMonth + 1, 0).getDate()
  );
  const [record, setRecord] = useState({
    date: new Date().toISOString().slice(0, 10),
    weight: 0,
    calories: 0,
    workout: 0,
  });
  const [records, setRecords] = useState([]);
  const [weightRecords, setWeightRecords] = useState([]);
  const [caloriesRecords, setCaloriesRecords] = useState([]);
  const [workoutRecords, setWorkoutRecords] = useState([]);
  const [workoutTarget, setWorkoutTarget] = useState([]);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);
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

  const handleSaveRecord = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/record",
        record,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchRecords();
        console.log("Record saved successfully");
      }
    } catch (error) {
      console.log("Error saving record:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/profile",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/records",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setRecords(response.data);
        const currentRecord = response.data.find(
          (record) => record.date === new Date().toISOString().slice(0, 10)
        );
        if (currentRecord) {
          setRecord(currentRecord);
        }
        console.log("Records fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
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
        workoutTarget.push(profile.targetWorkout);
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
      {
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
        data: Array.from(
          { length: dayLabels.length },
          () => profile.targetCalories
        ),
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

  const calculateBMI = (event) => {
    event.preventDefault();
    const weight = parseInt(event.target.weight.value);
    const height = parseInt(event.target.height.value);

    setBmi(weight / ((height / 100) * (height / 100)));
  };

  useEffect(() => {
    if (bmi == null) {
      setBmiCategory("");
    } else if (bmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiCategory("Normal");
    } else if (bmi >= 25 && bmi < 30) {
      setBmiCategory("Overweight");
    } else if (bmi >= 30) {
      setBmiCategory("Obese");
    }
  }, [bmi]);

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="tracker">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Tracker</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-4 mt-3">
              <div className="card">
                <div className="card-header text-center">
                  <h5 className="mb-0">Today</h5>
                </div>
                <div className="card-body">
                  <h3 className="mb-0 text-center">
                    {currentDate.toLocaleDateString("en-UK", {
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header text-center">
                  <h5 className="mb-0">Your Stats</h5>
                </div>
                <div className="card-body">
                  <form
                    className="form"
                    onSubmit={(e) => {
                      handleSaveRecord(e);
                    }}
                  >
                    <div className="mt-1">
                      <h5>Calories consumed:</h5>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="kcal"
                        required
                        value={record.calories}
                        onChange={(e) =>
                          setRecord({
                            ...record,
                            calories: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <h5>Workout period: </h5>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="min"
                        required
                        value={record.workout}
                        onChange={(e) =>
                          setRecord({
                            ...record,
                            workout: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <h5>Weight: </h5>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="kg"
                        required
                        value={record.weight}
                        onChange={(e) =>
                          setRecord({
                            ...record,
                            weight: e.target.value,
                          })
                        }
                      />
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
              <div className="card mt-3">
                <div className="card-header text-center">
                  <h5 className="mb-0">Body Mass Index</h5>
                </div>
                <div className="card-body">
                  <form className="form" onSubmit={calculateBMI}>
                    <div className="d-flex">
                      <div className="mt-1 me-3">
                        <h5>Weight:</h5>
                        <input
                          type="number"
                          name="weight"
                          className="form-control"
                          placeholder="kg"
                          required
                        />
                      </div>
                      <div className="mt-1 ms-3">
                        <h5>Height:</h5>
                        <input
                          type="number"
                          name="height"
                          className="form-control"
                          placeholder="cm"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-3 mb-3"
                    >
                      Calculate
                    </button>
                  </form>
                  <h5>BMI: {bmi}</h5>
                  <hr className="mb-2 mt-2" />
                  <h5 className="mb-0">Category: {bmiCategory}</h5>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header text-center">
                  <h5 className="mb-0">Your Goals</h5>
                </div>
                <div className="card-body mb-3">
                  <h5 className="mt-2">
                    Target Weight:{" "}
                    {profile.targetWeight
                      ? profile.targetWeight + " kg"
                      : "Not available"}
                  </h5>
                  <hr className="mb-4 mt-4" />
                  <h5>
                    Target Workout:{" "}
                    {profile.targetWorkout
                      ? profile.targetWorkout + " min"
                      : "Not available"}
                  </h5>
                  <hr className="mb-4 mt-4" />
                  <h5 className="mb-1">
                    Target Calories:{" "}
                    {profile.targetCalories
                      ? profile.targetCalories + " cal"
                      : "Not available"}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-xl-8 mt-3">
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
            </div>
          </div>
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-12 mb-3">
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

export default Tracker;
