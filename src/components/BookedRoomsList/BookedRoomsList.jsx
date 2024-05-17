import BookedRoom from "../BookedRoom/BookedRoom";

import "./BookedRoomsList.css";

function BookedRoomsList({ rooms, hotels, onCancel, onChange, onReview }) {
  return (
    <div className="booked-rooms-container">
      <h2>Your Bookings</h2>

      <div className="booked-rooms-list">
        {rooms.map((booking, index) => (
          <BookedRoom
            room={booking}
            rooms={rooms}
            key={index}
            hotels={hotels}
            onCancel={onCancel}
            onChange={onChange}
            onReview={onReview}
          />
        ))}
      </div>
    </div>
  );
}

export default BookedRoomsList;
