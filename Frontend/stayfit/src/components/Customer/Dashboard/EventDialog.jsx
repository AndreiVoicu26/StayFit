import React, { useEffect } from "react";
import { isValidURL } from "../../Utils/ValidURLCheck";
import axios from "axios";

function EventDialog({
  date,
  event,
  setEvent,
  setEventDialog,
  eventIsEditing,
  setEventIsEditing,
  fetchEvents,
}) {
  const handleSaveEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/event",
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
        `http://localhost:8080/api/v1/customer/event/${event.id}`,
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

  useEffect(() => {
    if (event.isCancelled === "true") {
      handleUpdateEvent();
    }
  }, [event.isCancelled]);

  return (
    <div className="dialog px-2">
      <h2 class="dialog-heading">
        {eventIsEditing ? "Edit event on" : "New event on"}
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
          if (!isValidURL(event.link)) {
            event.link = "";
          }
          eventIsEditing ? handleUpdateEvent(e) : handleSaveEvent(e);
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
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
          <label class="form-label">Details</label>
          <input
            class="input"
            type="text"
            maxLength="100"
            value={event.details}
            onChange={(e) => setEvent({ ...event, details: e.target.value })}
          />
          <label class="form-label">Link</label>
          <input
            class="input"
            type="text"
            value={event.link}
            onChange={(e) => setEvent({ ...event, link: e.target.value })}
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
  );
}

export default EventDialog;
