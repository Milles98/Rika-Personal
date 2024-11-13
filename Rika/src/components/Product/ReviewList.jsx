// src/components/Reviews/ReviewList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        // Temporary API endpoint for mock data
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        
        const filteredReviews = response.data.slice(0, 5).map((review) => ({
          id: review.id,
          rating: Math.floor(Math.random() * 5) + 1,
          comment: review.body,
          author: `User ${review.userId}`,
        }));

        setReviews(filteredReviews);
      } catch (error) {
        console.log("Failed to load reviews", error)
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="review-list space-y-4">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="review-card p-4 border rounded-md shadow-sm">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-yellow-400 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">by {review.author}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
