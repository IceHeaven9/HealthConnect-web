import { useState } from "react";
import PropTypes from "prop-types";
export const StarRating = ({
  handleRating,
  consultationDetails,
  currentUser,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(
    consultationDetails.rating || 0
  );
  const [isDisabled] = useState(currentUser.decoded.userType === "doctor");
  const displayRating = selectedRating || 0;

  const handleClick = (newRating) => {
    setSelectedRating(newRating);
    handleRating(newRating);
  };

  return (
    <div className="flex items-center ">
      {[...Array(5)].map((_, index) => (
        <button
          key={index}
          className={`text-3xl ${
            hoverRating > index || displayRating > index
              ? "text-yellow-500"
              : "text-lightBlue"
          }`}
          onClick={() => handleClick(index + 1)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
          disabled={isDisabled}
        >
          ★
        </button>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number,
  handleRating: PropTypes.func.isRequired,
  consultationDetails: PropTypes.shape({
    rating: PropTypes.number,
  }).isRequired,
  currentUser: PropTypes.shape({
    decoded: PropTypes.shape({
      userType: PropTypes.string,
    }).isRequired,
  }),
};
