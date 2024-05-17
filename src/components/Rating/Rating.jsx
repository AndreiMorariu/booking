import { AiFillStar } from "react-icons/ai";

import "./Rating.css";

function Rating({ roomNumber, hotelName, ratings }) {
  return (
    <div>
      <div className="review-information">
        <div>
          <p>
            Hotel: <b>{hotelName}</b>
          </p>
        </div>
        <div>
          <p>
            Room: <b>{roomNumber}</b>
          </p>
        </div>
        <div>
          <p>
            Cleanliness: <b>{ratings.cleanliness}</b>
          </p>
          <span>
            <AiFillStar color="#e1ad01" />
          </span>
        </div>
        <div>
          <p>
            Services: <b>{ratings.services}</b>
          </p>
          <span>
            <AiFillStar color="#e1ad01" />
          </span>
        </div>
        <div>
          <p>
            Staff: <b>{ratings.staff}</b>
          </p>
          <span>
            <AiFillStar color="#e1ad01" />
          </span>
        </div>
        <div>
          <p>
            Facilities: <b>{ratings.facilities}</b>
          </p>
          <span>
            <AiFillStar color="#e1ad01" />
          </span>
        </div>
        <div>
          <p>
            Value for money: <b>{ratings.valueForMoney}</b>
          </p>
          <span>
            <AiFillStar color="#e1ad01" />
          </span>
        </div>
        <div>
          <p>
            Location: <b>{ratings.location}</b>
          </p>
          <span>
            <AiFillStar color="#e1ad01" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Rating;
