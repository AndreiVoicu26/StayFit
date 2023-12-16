import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ClientDashboard() {
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

  const [date, setDate] = useState(new Date());
  const [eventDialog, setEventDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);

  const onChange = (newDate) => {
    setDate(newDate);
  };

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

  const addEvent = (e) => {
    e.preventDefault();
    const dateString = date.toISOString();
    let newEvent = {
      name: e.target.elements["event-name"].value,
      details: e.target.elements["event-details"].value,
      link: e.target.elements["event-link"].value,
      cancelled: false,
      date: date.toISOString(),
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    setEventDialog(false);
  };

  const cancelAddEvent = () => {
    setEventDialog(false);
  };

  const cancelEvent = (eventIndex) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      updatedEvents[eventIndex].cancelled = true;
      return updatedEvents;
    });
  };

  const tileClassName = ({ date }) => {
    const formattedDate = date.toISOString();
    const hasEvent = events.some((event) => event.date.includes(formattedDate));
    return hasEvent ? "event-date" : "";
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
                <h1 className="title ms-md-3">{client.name}'s Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-4 mt-3">
              <div className="card profile">
                <div className="card-body">
                  <div className="d-flex justify-content-center align-items-center">
                    <img src="../images/profile.jpg" alt="profile-picture" />
                    <div className="ms-5 text-center">
                      <h3 className="mb-0">Andrei</h3>
                      <h3 className="mb-0">Voicu</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <hr />
                    <h4>Age: 21</h4>
                    <hr />
                    <h4>Email: andreivoicu80@gmail.com</h4>
                    <hr />
                    <h4>Phone: 0740123456</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card">
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center">
                    <Calendar
                      onChange={onChange}
                      value={date}
                      locale="en-US"
                      tileClassName={tileClassName}
                    />
                  </div>
                  <button
                    className="btn btn-primary mt-5 p-3"
                    onClick={() => setEventDialog(true)}
                  >
                    Add new event
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3">
              <div className="card events">
                <div className="card-body">
                  {eventDialog ? (
                    <div className="dialog px-2">
                      <h2 class="dialog-heading"> Add New Event </h2>
                      <form
                        class="form"
                        onSubmit={addEvent}
                        onReset={cancelAddEvent}
                      >
                        <div class="form-container" align="center">
                          <label class="form-label">Event name</label>
                          <input
                            class="input"
                            name="event-name"
                            type="text"
                            maxLength="15"
                          />
                          <label class="form-label">Details</label>
                          <input
                            class="input"
                            name="event-details"
                            type="text"
                            maxLength="100"
                          />
                          <label class="form-label">Link</label>
                          <input class="input" name="event-link" type="text" />
                          <button type="reset" class="btn btn-primary me-2">
                            Cancel
                          </button>
                          <button type="submit" class="btn btn-primary ms-2">
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="events-container">
                      {eventsForSelectedDate.length === 0 ? (
                        <div className="event-card">
                          <div className="event-details">
                            No events planned for{" "}
                            {date.toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      ) : (
                        eventsForSelectedDate.map((event, index) =>
                          event.cancelled == false ? (
                            <div key={index} className="event-card">
                              <div className="d-flex justify-content-between">
                                <div className="event-name">{event.name} :</div>
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    cancelEvent(index);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                              <div className="event-details">
                                {event.details}
                              </div>
                              <div className="event-link">
                                Link: {event.link}
                              </div>
                            </div>
                          ) : (
                            <div key={index} className="event-card">
                              <div className="event-name">{event.name} :</div>
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
                  <a
                    href={`/client/${id}/tracker`}
                    className="d-flex align-items-center"
                  >
                    <i class="fa-solid fa-arrow-right-long me-4"></i>
                    <h5 className="mb-0">Tracking</h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3 mb-xl-3">
              <div className="card h-100 shortcut">
                <div className="card-body">
                  <a
                    href={`/client/${id}/workout`}
                    className="d-flex align-items-center"
                  >
                    <i class="fa-solid fa-arrow-right-long me-4"></i>
                    <h5 className="mb-0">Workout</h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 mt-3 mb-xl-3">
              <div className="card h-100 shortcut">
                <div className="card-body">
                  <a
                    href={`/client/${id}/nutrition`}
                    className="d-flex align-items-center"
                  >
                    <i class="fa-solid fa-arrow-right-long me-4"></i>
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
