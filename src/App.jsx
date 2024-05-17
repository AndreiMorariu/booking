import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Navbar from "./components/ui/Navbar/Navbar";
import Header from "./components/ui/Header/Header";
import HotelList from "./components/HotelList/HotelList";
import BookedRoomsList from "./components/BookedRoomsList/BookedRoomsList";
import RatingList from "./components/RatingsList/RatingList";
import Notifier from "./components/ui/Notifier/Notifier";

import hotels from "../db.json";
import calculateDistance from "./helpers/calculateDistance";

import "./App.css";

function App() {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [radius, setRadius] = useState(0);
  const [userPosition, setUserPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isPromptAccepted, setIsPromptAccepted] = useState(false);

  const nearbyHotels = hotels.filter((hotel) => {
    const distanceFromUser = calculateDistance(
      userPosition.latitude,
      userPosition.longitude,
      hotel.latitude,
      hotel.longitude
    );

    return distanceFromUser <= radius * 1000;
  });

  useEffect(() => {
    if (isPromptAccepted) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast.success("Location access granted");
        },
        (error) => {
          toast.error(
            "Location access denied. Default location set to Cluj-Napoca"
          );
          setUserPosition({
            latitude: 46.7712,
            longitude: 23.6236,
          });
        }
      );
    }
  }, [isPromptAccepted]);

  function handleBookRoom(hotelID, room) {
    const isRoomBooked = bookedRooms.some(
      (bookedRoom) =>
        bookedRoom.hotelID === hotelID &&
        bookedRoom.room.number === room.number &&
        !(
          new Date(room.startDate) >= new Date(bookedRoom.room.endDate) ||
          new Date(room.endDate) <= new Date(bookedRoom.room.startDate)
        )
    );

    if (!isRoomBooked) {
      setBookedRooms((prevRooms) => [...prevRooms, { hotelID, room }]);
      toast.success(`Room ${room.number} booked successfully`);
    } else {
      toast.error(
        `Room ${room.number} is already booked for the specified dates.`
      );
    }
  }

  function handleCancelBookedRoom(hotelID, roomNumber) {
    const index = bookedRooms.findIndex(
      (bookedRoom) =>
        bookedRoom.hotelID === hotelID && bookedRoom.room.number === roomNumber
    );

    if (index !== -1) {
      setBookedRooms((prevRooms) => {
        const updatedRooms = [...prevRooms];
        updatedRooms.splice(index, 1);
        toast.success("Booking canceled");
        return updatedRooms;
      });
    } else {
      toast.error(`Room ${roomNumber} was not found.`);
    }
  }

  function handleChangeBookedRoom(hotelID, prevRoomNumber, currRoomNumber) {
    setBookedRooms((prevRooms) => {
      const index = prevRooms.findIndex(
        (bookedRoom) =>
          bookedRoom.hotelID === hotelID &&
          bookedRoom.room.number === prevRoomNumber
      );

      if (index !== -1) {
        const hotel = nearbyHotels.find((hotel) => hotel.id === hotelID);
        const checkInHour = parseInt(hotel.checkInHour.split(":")[0], 10);

        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        const bookingStartDate = new Date(prevRooms[index].room.startDate);

        if (currentDate < bookingStartDate) {
          const updatedRooms = [...prevRooms];
          updatedRooms[index] = {
            hotelID,
            room: {
              ...updatedRooms[index].room,
              number: currRoomNumber,
            },
          };
          return updatedRooms;
        } else if (
          currentDate.getDate() === bookingStartDate.getDate() &&
          currentDate.getMonth() === bookingStartDate.getMonth() &&
          currentDate.getFullYear() === bookingStartDate.getFullYear() &&
          currentHour + 2 < checkInHour
        ) {
          const updatedRooms = [...prevRooms];
          updatedRooms[index] = {
            hotelID,
            room: {
              ...updatedRooms[index].room,
              number: currRoomNumber,
            },
          };
          toast.success("Room changed successfully");
          return updatedRooms;
        } else {
          toast.error(
            `Room cannot be changed. Check-in our ${hotel.checkInHour}`
          );
          return prevRooms;
        }
      } else {
        toast.error(`Room ${prevRoomNumber} was not found.`);
        return prevRooms;
      }
    });
  }

  function handleUserReview(hotelID, roomNumber, reviews) {
    const isReviewed = userReviews.some(
      (review) => review.hotelID === hotelID && review.roomNumber === roomNumber
    );

    if (isReviewed) {
      toast.error(`Room ${roomNumber} has already been reviewd`);
      return;
    }

    setUserReviews((prev) => [...prev, { hotelID, roomNumber, reviews }]);
  }

  return (
    <div className="container">
      <Notifier />
      <Navbar />
      {!isPromptAccepted && (
        <div className="location-prompt">
          <p>Please allow location access to find nearby hotels.</p>
          <button onClick={() => setIsPromptAccepted(true)}>Allow</button>
        </div>
      )}
      {isPromptAccepted && (
        <>
          <Header radius={radius} setRadius={setRadius} />
          <HotelList
            hotels={nearbyHotels}
            onAddBooking={handleBookRoom}
            radius={radius}
          />
          <BookedRoomsList
            rooms={bookedRooms}
            hotels={nearbyHotels}
            onCancel={handleCancelBookedRoom}
            onChange={handleChangeBookedRoom}
            onReview={handleUserReview}
          />
          <RatingList reviews={userReviews} hotels={nearbyHotels} />
        </>
      )}
    </div>
  );
}

export default App;
