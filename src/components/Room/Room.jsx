import { useState } from "react";
import toast from "react-hot-toast";

import "./Room.css";

const roomTypes = {
  1: "single",
  2: "double",
  3: "suite",
};

function Room({ room, onAddBooking, hotelID }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(e, room) {
    e.preventDefault();

    if (!setEndDate || !endDate) {
      toast.error("You must specify both dates");
      return;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const currentDate = new Date();

    if (endDateObj < startDateObj) {
      toast.error("End date cannot be before the start date.");
      return;
    }

    if (startDateObj < currentDate || endDateObj < currentDate) {
      if (
        startDateObj.getDate() !== currentDate.getDate() ||
        endDateObj < currentDate
      ) {
        toast.error("Start date and end date must be after the current date.");
        return;
      }
    }

    onAddBooking(hotelID, {
      ...room,
      type: roomTypes[room.type],
      startDate,
      endDate,
    });
    setStartDate("");
    setEndDate("");
  }

  return (
    <div className="room">
      <p className="number">
        Room type: <b>{roomTypes[room.type]}</b>
      </p>
      <p>
        Room number: <b>{room.number}</b>
      </p>
      <p>
        Room price: <b>{room.price}$</b>
      </p>
      <div className="container">
        <div className="dates">
          <div>
            <label>Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label>End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button onClick={(e) => handleSubmit(e, room)}>Book</button>
    </div>
  );
}

export default Room;
