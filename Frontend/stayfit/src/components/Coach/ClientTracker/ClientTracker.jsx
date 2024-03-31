import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import ClientGoals from "./ClientGoals";
import WeightChart from "../../Customer/Tracker/WeightChart";
import CaloriesChart from "../../Customer/Tracker/CaloriesChart";
import WorkoutChart from "../../Customer/Tracker/WorkoutChart";
import axios from "axios";

function ClientTracker() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [target, setTarget] = useState({
    weight: 0,
    workout: 0,
    calories: 0,
  });
  const [records, setRecords] = useState([]);

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
                  Tracker - {client.firstName} {client.lastName}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <ClientGoals
              clientId={id}
              target={target}
              setTarget={setTarget}
              fetchClient={fetchClient}
            />
            <div className="col-xl-12 mt-3 mb-3">
              <WeightChart profile={client} records={records} />
              <CaloriesChart profile={client} records={records} />
              <WorkoutChart profile={client} records={records} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientTracker;
