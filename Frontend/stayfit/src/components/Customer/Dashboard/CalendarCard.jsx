import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarCard({ date, setDate, event, setEvent, events }) {
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
    const hasEvent = events.some(
      (event) =>
        formattedDate.includes(event.date) && event.isCancelled === "false"
    );
    return hasEvent ? "event-date" : null;
  };

  return (
    <div className="col-xl-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4 className="text-center mb-0">My Calendar</h4>
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
  );
}

export default CalendarCard;
