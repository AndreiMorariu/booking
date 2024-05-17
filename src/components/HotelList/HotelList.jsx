import { useState } from "react";

import Room from "../Room/Room";

import "./HotelList.css";

function HotelList({ hotels, onAddBooking, radius }) {
  const [showRoomsMap, setShowRoomsMap] = useState(false);

  const toggleShowRooms = (hotelId) => {
    setShowRoomsMap((prevShowRoomsMap) => ({
      ...prevShowRoomsMap,
      [hotelId]: !prevShowRoomsMap[hotelId],
    }));
  };

  return (
    <main>
      <h2>Available hotels in {radius} Km</h2>

      <div className="container">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotels-list">
            <div className="hotel">
              <p>{hotel.name}</p>
              <button onClick={() => toggleShowRooms(hotel.id)}>
                {showRoomsMap[hotel.id] ? "Hide Rooms" : "Show Rooms"}
              </button>
            </div>
            {showRoomsMap[hotel.id] && (
              <div className="hotel-rooms">
                {hotel.rooms.map(
                  (room) =>
                    room.isAvailable && (
                      <Room
                        key={room.number}
                        room={room}
                        onAddBooking={onAddBooking}
                        hotelID={hotel.id}
                      />
                    )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default HotelList;
