import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Schedule from "../../Utils/Schedules/Schedule";
import MobileSchedule from "../../Utils/Schedules/MobileSchedule";
import Workout from "./Workout";
import AddWorkout from "./AddWorkout";
import EditWorkout from "./EditWorkout";
import Exercise from "./Exercise";
import AddExercise from "./AddExercise";
import EditExercise from "./EditExercise";
import axios from "axios";

function ClientWorkoutSchedule() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [workouts, setWorkouts] = useState({});
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [workout, setWorkout] = useState({
    name: "",
    dayOfWeek: "",
  });
  const [editingWorkoutIndex, setEditingWorkoutIndex] = useState(null);
  const [showAddExercise, setShowAddExercise] = useState({});
  const [exercise, setExercise] = useState({
    name: "",
    link: "",
    details: "",
  });
  const [editingExerciseIndex, setEditingExerciseIndex] = useState({
    workoutIndex: null,
    exerciseIndex: null,
  });

  const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 992;
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
        console.log("Client fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching client", error);
    }
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/coach/client/${id}/workouts/${activeDay}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setWorkouts(response.data);
        console.log("Workouts fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching workouts: ", error);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchWorkouts();
  }, [activeDay]);

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="workout-nutrition">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">
                  Workout Schedule - {client.firstName} {client.lastName}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            {useCheckMobileScreen()
              ? workouts && (
                  <MobileSchedule
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                  />
                )
              : workouts && (
                  <Schedule activeDay={activeDay} setActiveDay={setActiveDay} />
                )}
          </div>
          <div className="row ms-md-5">
            <div className="col-xl-12 mt-lg-3 mb-3">
              {!activeDay ? (
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="mb-0 fw-bold">
                      Select a day to see the schedule
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3 className="mb-0 fw-bold">
                        Workout Schedule for {activeDay}
                      </h3>
                      <i
                        class="fa-solid fa-plus d-flex align-items-center fs-3"
                        onClick={() => setShowAddWorkout(true)}
                      ></i>
                    </div>
                  </div>
                  {workouts.length === 0 && (
                    <div className="card mt-3">
                      <div className="card-body">
                        <h3 className="text-center">
                          No workouts for this day
                        </h3>
                      </div>
                    </div>
                  )}
                  {showAddWorkout && (
                    <AddWorkout
                      clientId={id}
                      activeDay={activeDay}
                      workout={workout}
                      setWorkout={setWorkout}
                      setShowAddWorkout={setShowAddWorkout}
                      fetchWorkouts={fetchWorkouts}
                    />
                  )}
                  {workouts &&
                    workouts.map((workoutElement, workoutIndex) => (
                      <div className="card mt-3" key={workoutIndex}>
                        <div className="card-header">
                          {editingWorkoutIndex === workoutIndex ? (
                            <EditWorkout
                              clientId={id}
                              workout={workout}
                              setWorkout={setWorkout}
                              setEditingWorkoutIndex={setEditingWorkoutIndex}
                              workoutElement={workoutElement}
                              fetchWorkouts={fetchWorkouts}
                            />
                          ) : (
                            <Workout
                              clientId={id}
                              workoutElement={workoutElement}
                              setWorkout={setWorkout}
                              setShowAddExercise={setShowAddExercise}
                              setEditingWorkoutIndex={setEditingWorkoutIndex}
                              fetchWorkouts={fetchWorkouts}
                              workoutIndex={workoutIndex}
                            />
                          )}
                        </div>
                        <div className="card-body">
                          {showAddExercise[workoutIndex] && (
                            <AddExercise
                              clientId={id}
                              workoutElement={workoutElement}
                              exercise={exercise}
                              setExercise={setExercise}
                              setShowAddExercise={setShowAddExercise}
                              fetchWorkouts={fetchWorkouts}
                              workoutIndex={workoutIndex}
                            />
                          )}
                          {workoutElement.exercises &&
                            workoutElement.exercises.map(
                              (exerciseElement, exerciseIndex) => (
                                <div key={exerciseIndex} className=" mt-3">
                                  {editingExerciseIndex.workoutIndex ===
                                    workoutIndex &&
                                  editingExerciseIndex.exerciseIndex ===
                                    exerciseIndex ? (
                                    <EditExercise
                                      clientId={id}
                                      workoutElement={workoutElement}
                                      exerciseElement={exerciseElement}
                                      exercise={exercise}
                                      setExercise={setExercise}
                                      setEditingExerciseIndex={
                                        setEditingExerciseIndex
                                      }
                                      fetchWorkouts={fetchWorkouts}
                                    />
                                  ) : (
                                    <Exercise
                                      clientId={id}
                                      workoutElement={workoutElement}
                                      exerciseElement={exerciseElement}
                                      setExercise={setExercise}
                                      editingExerciseIndex={
                                        editingExerciseIndex
                                      }
                                      setEditingExerciseIndex={
                                        setEditingExerciseIndex
                                      }
                                      fetchWorkouts={fetchWorkouts}
                                      workoutIndex={workoutIndex}
                                      exerciseIndex={exerciseIndex}
                                    />
                                  )}
                                  <hr />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientWorkoutSchedule;
