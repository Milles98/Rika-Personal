// src/components/Admin/ReviewItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

const ReviewItem = ({ review, onApprove, onDelete }) => (
  <div className="review-item p-4 border rounded-md shadow-sm">
    <div className="flex items-center mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
      <span className="ml-2 text-gray-600">User ID: {review.userID}</span>
    </div>
    <p className="text-gray-700">{review.reviewDescription}</p>
    <div className="mt-2 flex space-x-2">
      <button onClick={onApprove} className="bg-green-500 text-white px-3 py-1 rounded">
        Approve
      </button>
      <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.shape({
    reviewID: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviewDescription: PropTypes.string,
    userID: PropTypes.number.isRequired,
    productID: PropTypes.number.isRequired,
  }).isRequired,
  onApprove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReviewItem;
