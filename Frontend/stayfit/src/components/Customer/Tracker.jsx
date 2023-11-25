import { React, useState, useEffect } from "react";
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

function Tracker() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(selectedYear, selectedMonth + 1, 0).getDate()
  );
  const [weightRecords, setWeightRecords] = useState([]);
  const [weightTarget, setWeightTarget] = useState(null);
  const [caloriesRecords, setCaloriesRecords] = useState([]);
  const [caloriesTarget, setCaloriesTarget] = useState(null);
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

  useEffect(() => {
    setWeightRecords(getWeightRecords());
    setCaloriesRecords(getCaloriesRecords());
  }, [selectedMonth, selectedYear]);

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

  const saveStats = (event) => {
    event.preventDefault();
    const calories = parseInt(event.target.calories.value);
    const weight = parseInt(event.target.weight.value);

    const currentDate = new Date().toISOString().slice(0, 10);

    weightDataMap[currentDate] = weight;
    caloriesDataMap[currentDate] = calories;
    console.log(weightDataMap);

    setWeightRecords([...getWeightRecords(), weight]);
    setCaloriesRecords([...getCaloriesRecords(), calories]);
  };

  const calculateBMI = (event) => {
    event.preventDefault();
    const weight = parseInt(event.target.weight.value);
    const height = parseInt(event.target.height.value);

    setBmi(weight / ((height / 100) * (height / 100)));
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
                <h1 className="title ms-md-3">Tracker</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-4 mt-3 mb-3">
              <div className="card">
                <div className="card-header text-center">
                  <h5 className="mb-0">Today</h5>
                </div>
                <div className="card-body">
                  <h3 className="mb-0 text-center">
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                    }) +
                      " " +
                      currentDate.getDate()}
                  </h3>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header text-center">
                  <h5 className="mb-0">Your Stats</h5>
                </div>
                <div className="card-body">
                  <form className="form" onSubmit={saveStats}>
                    <div className="mt-1">
                      <h5>Calories consumed:</h5>
                      <input
                        type="number"
                        name="calories"
                        className="form-control"
                        placeholder="kcal"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <h5>Workout period: </h5>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="min"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <h5>Weight: </h5>
                      <input
                        type="number"
                        name="weight"
                        className="form-control"
                        placeholder="kg"
                        required
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
                  <h5 className="mb-0">Category: {bmiCategory}</h5>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header text-center">
                  <h5 className="mb-0">Your Goals</h5>
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
                    <div className="mt-1">
                      <h5>Target Weight:</h5>
                      <input
                        type="text"
                        name="weightTarget"
                        className="form-control"
                        placeholder="kg"
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <h5>Calories needed:</h5>
                      <input
                        type="text"
                        name="caloriesTarget"
                        className="form-control"
                        placeholder="kcal"
                        required
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
            </div>
            <div className="col-xl-8 mt-3 mb-3">
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

export default Tracker;
