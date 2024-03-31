import React from "react";
import { isValidURL } from "../../Utils/ValidURLCheck";
import axios from "axios";

function Events({
  clientId,
  setEvent,
  setEventDialog,
  setEventIsEditing,
  eventsForSelectedDate,
  fetchEvents,
}) {
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/coach/client/${clientId}/event/${eventId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Event deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting event", error);
    }
    fetchEvents();
  };

  return (
    <div className="events-container">
      {eventsForSelectedDate.length === 0 ? (
        <div className="event-card">
          <div className="event-details">No events planned for this date</div>
        </div>
      ) : (
        eventsForSelectedDate.map((event) =>
          event.isCancelled === "false" ? (
            <div key={event.id} className="event-card">
              <div className="d-flex justify-content-between">
                <div className="event-name mb-0">{event.title}</div>
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
              {event.details && (
                <div className="event-details row mx-0 px-0">
                  <div className="col-1">
                    <i class="fa-solid fa-circle-info"></i>
                  </div>
                  <div className="col-11">{event.details}</div>
                </div>
              )}
              {event.link && isValidURL(event.link) && (
                <div className="event-link row mx-0 px-0">
                  <div className="col-1">
                    <i class="fa-solid fa-link"></i>
                  </div>
                  <div className="col-11">
                    <a href={event.link}>
                      Link{" "}
                      <i class="fa-solid fa-arrow-up-right-from-square align-items-center"></i>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div key={event.id} className="event-card">
              <div className="event-name mb-0">{event.title}</div>
              <div className="d-flex justify-content-between">
                <div className="event-cancelled mb-0">Cancelled</div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Events;
