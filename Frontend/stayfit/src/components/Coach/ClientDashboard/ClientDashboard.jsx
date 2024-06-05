import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import ClientProfile from "./ClientProfile";
import ClientCalendarCard from "./ClientCalendarCard";
import Events from "./Events";
import EventDialog from "./EventDialog";
import ClientDashboardNavbar from "./ClientDashboardNavbar";
import axios from "axios";
import API_URL from "../../../config";

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
      const response = await axios.get(`${API_URL}/api/v1/coach/client/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setClient(response.data);
        console.log("Client fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching client", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/coach/client/${id}/events`,
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
                  Dashboard - {client.firstName} {client.lastName}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <ClientProfile client={client} />
            <ClientCalendarCard
              date={date}
              setDate={setDate}
              event={event}
              setEvent={setEvent}
              events={events}
            />
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
                    <EventDialog
                      clientId={id}
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
                      clientId={id}
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
          <ClientDashboardNavbar clientId={id} />
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
