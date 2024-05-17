import Rating from "../Rating/Rating";

import "./RatingList.css";

function RatingList({ reviews, hotels }) {
  return (
    <div className="rating-container">
      <h2>Your ratings</h2>
      {reviews.map((review) => {
        const hotel = hotels.find((hotel) => hotel.id === review.hotelID);
        return (
          hotel && (
            <Rating
              roomNumber={review.roomNumber}
              ratings={review.reviews}
              hotelName={hotel.name}
              key={`${review.hotelID}-${review.roomNumber}`}
            />
          )
        );
      })}
    </div>
  );
}

export default RatingList;
