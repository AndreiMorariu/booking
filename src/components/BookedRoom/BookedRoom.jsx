import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "./BookedRoom.css";
import toast from "react-hot-toast";

const roomTypes = {
  1: "single",
  2: "double",
  3: "suite",
  4: "matrimonal",
};

function BookedRoom({ room, rooms, hotels, onCancel, onChange, onReview }) {
  const [isChanging, setIsChanging] = useState(false);
  const [review, setReview] = useState(false);
  const [userRating, setUserRating] = useState({
    cleanliness: 0,
    services: 0,
    staff: 0,
    facilities: 0,
    valueForMoney: 0,
    location: 0,
  });

  const {
    hotelID,
    room: { number, type, price, startDate, endDate },
  } = room;

  const hotel = hotels?.filter((hotel) => hotel.id === room.hotelID);

  const handleReviewSubmit = () => {
    if (
      !userRating.cleanliness ||
      !userRating.services ||
      !userRating.staff ||
      !userRating.facilities ||
      !userRating.valueForMoney ||
      !userRating.location
    ) {
      toast.error("You must rate all the categories");
      return;
    }

    onReview(hotelID, number, userRating);
    setReview(false);
  };

  if (isChanging)
    return (
      <AvailableRooms
        hotel={hotel}
        currentRoomNumber={number}
        setIsChanging={setIsChanging}
        rooms={rooms}
        room={room}
        onChange={onChange}
      />
    );

  return (
    <div className="booked-room-information">
      {review ? (
        <div className="reviews">
          <h2>Rate Your Experience</h2>
          <div>
            <p>
              <b>Cleanliness</b>:
              <Rating
                onClick={(value) =>
                  setUserRating({ ...userRating, cleanliness: value })
                }
              />
            </p>
            <p>
              <b>Services</b>:
              <Rating
                onClick={(value) =>
                  setUserRating({ ...userRating, services: value })
                }
              />
            </p>
            <p>
              <b>Staff</b>:
              <Rating
                onClick={(value) =>
                  setUserRating({ ...userRating, staff: value })
                }
              />
            </p>
            <p>
              <b>Facilities</b>:
              <Rating
                onClick={(value) =>
                  setUserRating({ ...userRating, facilities: value })
                }
              />
            </p>
            <p>
              <b>Value for money</b>:
              <Rating
                onClick={(value) =>
                  setUserRating({ ...userRating, valueForMoney: value })
                }
              />
            </p>
            <p>
              <b>Location</b>:
              <Rating
                onClick={(value) =>
                  setUserRating({ ...userRating, location: value })
                }
              />
            </p>
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
        </div>
      ) : (
        <>
          <p>
            Hotel: <b>{hotel[0]?.name}</b>
          </p>
          <p>
            Number: <b>{number}</b>
          </p>
          <p>
            Type: <b>{type}</b>
          </p>
          <p>
            Price: <b>{price}$</b>
          </p>
          <p>
            Checkin date: <b>{startDate}</b>
          </p>
          <p>
            Checkout date: <b>{endDate}</b>
          </p>
          <div className="action-buttons">
            <button onClick={() => onCancel(hotelID, number)}>Cancel</button>
            <button onClick={() => setIsChanging((prev) => !prev)}>
              Change
            </button>
            <button onClick={() => setReview(true)}>Review</button>
          </div>
        </>
      )}
    </div>
  );
}

function AvailableRooms({
  hotel,
  currentRoomNumber,
  setIsChanging,
  rooms,
  room,
  onChange,
}) {
  const availableRooms = hotel[0].rooms.filter(
    (availableRoom) =>
      availableRoom.number !== currentRoomNumber &&
      availableRoom.isAvailable &&
      !rooms.some(
        (bookedRoom) =>
          bookedRoom.hotelID === hotel[0].id &&
          bookedRoom.room.number === availableRoom.number &&
          ((new Date(room.room.startDate) >=
            new Date(bookedRoom.room.startDate) &&
            new Date(room.room.startDate) <
              new Date(bookedRoom.room.endDate)) ||
            (new Date(room.room.endDate) >
              new Date(bookedRoom.room.startDate) &&
              new Date(room.room.endDate) <= new Date(bookedRoom.room.endDate)))
      )
  );

  return (
    <div>
      <h2>Available Rooms</h2>
      {availableRooms.length === 0 ? (
        <div className="no-rooms">
          <p>No available rooms left.</p>
          <button onClick={() => setIsChanging(false)}>Back</button>
        </div>
      ) : (
        <ul className="available-rooms-list">
          <div className="available-rooms">
            {availableRooms.map((availableRoom) => (
              <li key={availableRoom.number} className="available-room">
                <span>
                  Number: <b>{availableRoom.number}</b>
                </span>
                <span>
                  Type: <b>{roomTypes[availableRoom.type]}</b>
                </span>
                <span>
                  Price: <b>{availableRoom.price}$</b>
                </span>
                <button
                  onClick={() => {
                    onChange(
                      hotel[0].id,
                      room.room.number,
                      availableRoom.number
                    );
                    setIsChanging(false);
                  }}
                >
                  Book
                </button>
              </li>
            ))}
          </div>
          <button onClick={() => setIsChanging(false)}>Cancel</button>
        </ul>
      )}
    </div>
  );
}

export default BookedRoom;
