import { React, useState, useEffect } from "react";
import Navbar from "../Navbar";
import Stats from "./Stats";
import BMI from "./BMI";
import Goals from "./Goals";
import WeightChart from "./WeightChart";
import CaloriesChart from "./CaloriesChart";
import WorkoutChart from "./WorkoutChart";
import axios from "axios";
import API_URL from "../../../config";

function Tracker() {
  const [profile, setProfile] = useState({});
  const [record, setRecord] = useState({
    date: new Date().toISOString().slice(0, 10),
    weight: 0,
    calories: 0,
    workout: 0,
  });
  const [records, setRecords] = useState([]);
  const currentDate = new Date();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/customer/profile`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/customer/records`, {
        withCredentials: true,
      });
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
              <Stats
                record={record}
                setRecord={setRecord}
                fetchRecords={fetchRecords}
              />
              <BMI />
              <Goals profile={profile} />
            </div>
            <div className="col-xl-8 mt-3">
              <WeightChart profile={profile} records={records} />
              <CaloriesChart profile={profile} records={records} />
            </div>
          </div>
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-12 mb-3">
              <WorkoutChart profile={profile} records={records} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;
