// src/components/ReviewForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ReviewForm = ({ productId, isVerifiedPurchaser }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerifiedPurchaser) {
      setErrorMessage("Only verified purchasers can leave reviews.");
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage(null);
    setErrorMessage(null);

    // use real api endpoint
    try {
      await axios.post('/api/reviews', {
        productId,
        rating,
        comment,
      });

      setFeedbackMessage("Thank you! Your review has been submitted.");
      setRating(0);
      setComment('');
    } catch (error) {
      console.error("Review submission error:", error);
      setErrorMessage("Failed to submit your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form bg-white p-4 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-center md:text-left">Leave a Review</h2>

      <div className="flex justify-center md:justify-start mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleRatingClick(star)}
            className={`w-8 h-8 md:w-10 md:h-10 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded mb-4 text-sm md:text-base"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
        disabled={!isVerifiedPurchaser}
      />

      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto md:px-6 md:py-3 text-sm md:text-base disabled:opacity-50"
        disabled={isSubmitting || !rating || !comment || !isVerifiedPurchaser}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>

      {feedbackMessage && <p className="text-green-600 mt-2 text-center md:text-left">{feedbackMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-2 text-center md:text-left">{errorMessage}</p>}
    </div>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.number.isRequired,
  isVerifiedPurchaser: PropTypes.bool.isRequired,
};

export default ReviewForm;
