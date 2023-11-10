import React, { useState } from 'react';
import './starRating.css';

const StarRating = ({ postId }) => {
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(undefined);

  const submitRating = async (ratingValue) => {
    const payload = { postId, rating: ratingValue }; // Prepare payload with postId and rating

    try {
      const response = await fetch('http://localhost:8080/posts/addRating', { // Endpoint to handle rating updates
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if needed
        },
        body: JSON.stringify(payload),
      });
      console.log('postId: ', postId);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Rating submitted:', responseData);
      // You can set state or trigger a re-fetch of post data here if needed
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleStarClick = (ratingValue) => {
    setCurrentRating(ratingValue);
    submitRating(ratingValue);
  };

  const handleStarHover = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleStarHoverOut = () => {
    setHoverRating(undefined);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        let style = {};
        if (hoverRating !== undefined) {
          style = ratingValue <= hoverRating ? { color: 'orange' } : {};
        } else {
          style = ratingValue <= currentRating ? { color: 'orange' } : {};
        }

        return (
          <span
            key={ratingValue}
            className="star"
            style={style}
            onClick={() => handleStarClick(ratingValue)}
            onMouseEnter={() => handleStarHover(ratingValue)}
            onMouseLeave={handleStarHoverOut}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
