import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Status from "./Status";
import CalendarCard from "./CalendarCard";
import Events from "./Events";
import EventDialog from "./EventDialog";
import DashboardNavbar from "./DashboardNavbar";
import axios from "axios";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState(new Date());
  const [eventDialog, setEventDialog] = useState(false);
  const [event, setEvent] = useState({
    title: "",
    details: "",
    link: "",
    isCancelled: false,
    date: date.toISOString(),
  });
  const [events, setEvents] = useState([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);
  const [eventIsEditing, setEventIsEditing] = useState(false);

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

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/events",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setEvents(response.data);
        console.log("Events fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchEvents();
  }, []);

  useEffect(() => {
    setEventsForSelectedDate(
      events.filter(
        (event) =>
          new Date(event.date).getDate() === date.getDate() &&
          new Date(event.date).getMonth() === date.getMonth() &&
          new Date(event.date).getFullYear() === date.getFullYear()
      )
    );
  }, [events, date]);

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="dashboard">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <Status profile={profile} />
            <CalendarCard
              date={date}
              setDate={setDate}
              event={event}
              setEvent={setEvent}
              events={events}
            />
            <div className="col-xl-4 mt-3">
              <div className="card events">
                <div className="card-header d-flex justify-content-between">
                  <h4 className="text-center mb-0">
                    Events on{" "}
                    {date.toLocaleDateString("en-UK", {
                      month: "short",
                      day: "numeric",
                    })}
                  </h4>
                  <button
                    className="d-flex align-items-center btn btn-primary pb-0 pt-0"
                    onClick={() => setEventDialog(true)}
                  >
                    <i className="fa-solid fa-plus fs-3"></i>
                  </button>
                </div>
                <div className="card-body">
                  {eventDialog ? (
                    <EventDialog
                      date={date}
                      event={event}
                      setEvent={setEvent}
                      setEventDialog={setEventDialog}
                      eventIsEditing={eventIsEditing}
                      setEventIsEditing={setEventIsEditing}
                      fetchEvents={fetchEvents}
                    />
                  ) : (
                    <Events
                      setEvent={setEvent}
                      setEventDialog={setEventDialog}
                      setEventIsEditing={setEventIsEditing}
                      eventsForSelectedDate={eventsForSelectedDate}
                      fetchEvents={fetchEvents}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <DashboardNavbar />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
