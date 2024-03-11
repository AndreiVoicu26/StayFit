import { React, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function ClientDashboard() {
  const { id } = useParams();
  const [client, setClient] = useState({});
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

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/coach/client/${id}/event`,
        event,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Event added successfully");
      }
    } catch (error) {
      console.error("Error adding event", error);
    }

    fetchEvents();
    setEvent({ name: "", details: "", link: "", isCancelled: false, date: "" });
    setEventDialog(false);
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/coach/client/${id}/event/${event.id}`,
        event,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Event updated successfully");
      }
    } catch (error) {
      console.error("Error updating event", error);
    }

    fetchEvents();
    setEvent({ name: "", details: "", link: "", isCancelled: false, date: "" });
    setEventIsEditing(false);
    setEventDialog(false);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/coach/client/${id}/events`,
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
    fetchClient();
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

  useEffect(() => {
    if (event.isCancelled === "true") {
      handleUpdateEvent();
    }
  }, [event.isCancelled]);

  const adjustDate = (date) => {
    const selectedDate = new Date(date);
    let timeZoneOffset = date.getTimezoneOffset() * 60000;
    let adjustedDate = new Date(selectedDate.getTime() - timeZoneOffset);
    return adjustedDate;
  };

  const onChange = (date) => {
    let newDate = adjustDate(date);
    setDate(newDate);
    setEvent({ ...event, date: newDate.toISOString() });
  };

  const tileClassName = ({ date }) => {
    let newDate = adjustDate(date);
    const formattedDate = newDate.toISOString();
    const hasEvent = events.some((event) => formattedDate.includes(event.date));
    return hasEvent ? "event-date" : null;
  };

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="dashboard">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">
                  {client.firstName} {client.lastName}'s Dashboard
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-4 mt-3">
              <div className="card profile">
                <div className="card-header">
                  <h4 className="text-center mb-0">Profile</h4>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <img
                      src={
                        client.profilePicture
                          ? `data:image/jpeg;base64,${client.profilePicture}`
                          : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                      }
                    />
                  </div>
                  <div className="text-center mt-1 mb-1">
                    <h3 className="mb-0">{client.firstName}</h3>
                    <h3 className="mb-0">{client.lastName}</h3>
                  </div>
                  <hr className="mb-2 mt-2" />
                  <div>
                    <h5>Age: {calculateAge(client.dateOfBirth)}</h5>
                    <h5>
                      Email: {client.email ? client.email : "Not available"}
                    </h5>
                    <h5>
                      Phone: {client.phone ? client.phone : "Not available"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card">
                <div className="card-header">
                  <h4 className="text-center mb-0">Calendar</h4>
                </div>
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center">
                    <Calendar
                      onChange={onChange}
                      value={date}
                      locale="en-UK"
                      tileClassName={tileClassName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card">
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
                <div className="card-body events">
                  {eventDialog ? (
                    <div className="dialog px-2">
                      <h2 class="dialog-heading">
                        {eventIsEditing ? "Update event on" : "New event on"}
                        <br />
                        {date.toLocaleDateString("en-UK", {
                          month: "long",
                          day: "numeric",
                        })}
                      </h2>
                      <form
                        class="form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          eventIsEditing
                            ? handleUpdateEvent(e)
                            : handleSaveEvent(e);
                        }}
                        onReset={() => {
                          setEventIsEditing(false);
                          setEvent({});
                          setEventDialog(false);
                        }}
                      >
                        <div class="form-container" align="center">
                          <label class="form-label">Title</label>
                          <input
                            class="input"
                            type="text"
                            maxLength="15"
                            value={event.title}
                            onChange={(e) =>
                              setEvent({ ...event, title: e.target.value })
                            }
                          />
                          <label class="form-label">Details</label>
                          <input
                            class="input"
                            type="text"
                            maxLength="100"
                            value={event.details}
                            onChange={(e) =>
                              setEvent({ ...event, details: e.target.value })
                            }
                          />
                          <label class="form-label">Link</label>
                          <input
                            class="input"
                            type="text"
                            value={event.link}
                            onChange={(e) =>
                              setEvent({ ...event, link: e.target.value })
                            }
                          />
                          <div className="d-flex justify-content-end">
                            {eventIsEditing && (
                              <button
                                type="button"
                                class="btn btn-primary ms-2 me-auto"
                                style={{ width: "150px" }}
                                onClick={() => {
                                  setEvent({ ...event, isCancelled: "true" });
                                }}
                              >
                                Cancel Event
                              </button>
                            )}
                            <button type="submit" class="btn btn-primary me-2">
                              <i class="fa-solid fa-floppy-disk"></i>
                            </button>
                            <button type="reset" class="btn btn-primary me-2">
                              <i class="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="events-container">
                      {eventsForSelectedDate.length === 0 ? (
                        <div className="event-card">
                          <div className="event-details">
                            No events planned for this date
                          </div>
                        </div>
                      ) : (
                        eventsForSelectedDate.map((event) =>
                          event.isCancelled === "false" ? (
                            <div key={event.id} className="event-card">
                              <div className="d-flex justify-content-between">
                                <div className="event-name">{event.title}</div>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setEventIsEditing(true);
                                    setEvent(event);
                                    setEventDialog(true);
                                  }}
                                >
                                  <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                              </div>
                              <div className="event-details">
                                {event.details && (
                                  <i class="fa-solid fa-circle-info"></i>
                                )}{" "}
                                {event.details && `${event.details}`}
                              </div>
                              <div className="event-link">
                                {event.link && <i class="fa-solid fa-link"></i>}{" "}
                                {event.link && `${event.link}`}
                              </div>
                            </div>
                          ) : (
                            <div key={event.id} className="event-card">
                              <div className="event-name">{event.title} :</div>
                              <div className="event-cancelled">Cancelled</div>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center ms-md-5">
            <div className="col-xl-4 mt-3 mb-xl-3">
              <div className="card h-100 shortcut">
                <div className="card-body">
                  <a href={`/client/${id}/tracker`} className="text-center">
                    <h5 className="mb-0">Tracking</h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3 mb-xl-3">
              <div className="card h-100 shortcut">
                <div className="card-body">
                  <a href={`/client/${id}/workout`} className="text-center">
                    <h5 className="mb-0">Workout</h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3 mb-xl-3">
              <div className="card h-100 shortcut">
                <div className="card-body">
                  <a href={`/client/${id}/nutrition`} className="text-center">
                    <h5 className="mb-0">Nutrition</h5>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
